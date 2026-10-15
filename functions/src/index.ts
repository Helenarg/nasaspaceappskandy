import * as admin from "firebase-admin";
import { onDocumentCreated, FirestoreEvent, QueryDocumentSnapshot } from "firebase-functions/v2/firestore";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { getConfig } from "./config";
import { FormKind, renderOrganizerEmail, renderApplicantEmail } from "./templates";
import { sendEmail } from "./email";

// Initialize Firebase Admin SDK
admin.initializeApp();

/**
 * Common submission processor for all form kinds
 */
async function processSubmission(
  kind: FormKind,
  event: FirestoreEvent<QueryDocumentSnapshot | undefined, { id: string }>
) {
  const snapshot = event.data;
  if (!snapshot) {
    logger.warn(`No data associated with event for ${kind}/${event.params.id}`);
    return;
  }

  const data = snapshot.data();
  const submissionId = event.params.id;

  // Prevent duplicate runs if already marked as notified
  if (data.status === "notified" || data.notificationDetails) {
    logger.info(`Submission ${kind}/${submissionId} already processed. Skipping.`);
    return;
  }

  logger.info(`Processing new ${kind} submission: ${submissionId}`);
  const config = getConfig();

  // 1. Prepare and send notification to the organizing committee
  const organizerEmailContent = renderOrganizerEmail(kind, submissionId, data);
  const organizerResult = await sendEmail(config.organizerEmail, organizerEmailContent);

  // 2. Prepare and send confirmation receipt to applicant
  const applicantEmailContent = renderApplicantEmail(kind, submissionId, data);
  let applicantResult: { ok: boolean; simulated?: boolean } | null = null;

  const applicantTargetEmail = (data.email || data.leadEmail) as string | undefined;
  if (applicantEmailContent && applicantTargetEmail) {
    applicantResult = await sendEmail(applicantTargetEmail, applicantEmailContent);
  }

  // 3. Mark document as notified in Firestore
  try {
    await snapshot.ref.update({
      status: "notified",
      notifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      notificationDetails: {
        organizerNotified: organizerResult.ok,
        applicantNotified: applicantResult ? applicantResult.ok : null,
        simulated: Boolean(organizerResult.simulated),
        processedAt: new Date().toISOString(),
      },
    });
    logger.info(`Successfully processed and updated ${kind}/${submissionId}`);
  } catch (err) {
    logger.error(`Error updating status for ${kind}/${submissionId}:`, err);
  }
}

/**
 * Triggers for each form collection
 */
export const onMessageCreated = onDocumentCreated(
  { document: "messages/{id}", region: "asia-south1" },
  async (event) => {
    await processSubmission("messages", event);
  }
);

export const onVolunteerCreated = onDocumentCreated(
  { document: "volunteers/{id}", region: "asia-south1" },
  async (event) => {
    await processSubmission("volunteers", event);
  }
);

export const onAmbassadorCreated = onDocumentCreated(
  { document: "ambassadors/{id}", region: "asia-south1" },
  async (event) => {
    await processSubmission("ambassadors", event);
  }
);

export const onBootcampCreated = onDocumentCreated(
  { document: "bootcamps/{id}", region: "asia-south1" },
  async (event) => {
    await processSubmission("bootcamps", event);
  }
);

export const onRegistrationCreated = onDocumentCreated(
  { document: "registrations/{id}", region: "asia-south1" },
  async (event) => {
    await processSubmission("registrations", event);
  }
);

/**
 * Simple HTTP healthcheck to verify backend deployment
 */
export const backendHealth = onRequest(
  { region: "asia-south1" },
  (req, res) => {
    res.json({
      status: "healthy",
      service: "nasa-space-apps-kandy-backend",
      version: "2.0.0",
      time: new Date().toISOString(),
    });
  }
);
