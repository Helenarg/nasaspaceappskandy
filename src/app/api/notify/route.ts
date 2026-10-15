import { NextResponse } from "next/server";
import {
  renderOrganizerEmail,
  renderApplicantEmail,
  type FormKind,
} from "@/lib/email/templates";
import { sendEmail, getMailerConfig } from "@/lib/email/mailer";

export const runtime = "nodejs";

const validKinds = new Set<FormKind>([
  "messages",
  "volunteers",
  "ambassadors",
  "bootcamps",
  "registrations",
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      kind?: FormKind;
      id?: string;
      data?: Record<string, unknown>;
    };

    if (!body || !body.kind || !validKinds.has(body.kind) || !body.id) {
      return NextResponse.json(
        { ok: false, message: "Invalid submission payload" },
        { status: 400 }
      );
    }

    const { kind, id, data = {} } = body;
    const config = getMailerConfig();

    // 1. Send organizer notification
    const organizerContent = renderOrganizerEmail(kind, id, data);
    const organizerResult = await sendEmail(config.organizerEmail, organizerContent);

    // 2. Send applicant confirmation if an email address exists
    const applicantTarget = (data.email || data.leadEmail) as string | undefined;
    let applicantResult: { ok: boolean; simulated?: boolean } | null = null;

    if (applicantTarget) {
      const applicantContent = renderApplicantEmail(kind, id, data);
      if (applicantContent) {
        applicantResult = await sendEmail(applicantTarget, applicantContent);
      }
    }

    return NextResponse.json({
      ok: true,
      id,
      organizerNotified: organizerResult.ok,
      applicantNotified: applicantResult ? applicantResult.ok : null,
      simulated: Boolean(organizerResult.simulated),
    });
  } catch (error) {
    console.error("[API /api/notify Error]", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
