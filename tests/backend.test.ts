import test from "node:test";
import assert from "node:assert/strict";
import {
  renderOrganizerEmail,
  renderApplicantEmail,
  type FormKind,
} from "../src/lib/email/templates";
import { getMailerConfig, sendEmail } from "../src/lib/email/mailer";
import { getConfig } from "../functions/src/config";

test("backend mailer config returns fallback organizer email and default port", () => {
  const config = getMailerConfig();
  assert.equal(config.organizerEmail, "info@nasaspaceapps.lk");
  assert.equal(config.smtpPort, 587);

  const fnConfig = getConfig();
  assert.equal(fnConfig.organizerEmail, "info@nasaspaceapps.lk");
});

test("mailer safely simulates delivery when no SMTP/Resend keys are set", async () => {
  const content = {
    subject: "Test Subject",
    html: "<p>Hello</p>",
    text: "Hello",
  };
  const result = await sendEmail("test@example.com", content);
  assert.equal(result.ok, true);
  assert.equal(result.simulated, true);
});

test("organizer email template renders details and reply-to for all form kinds", () => {
  const kinds: FormKind[] = ["messages", "volunteers", "ambassadors", "bootcamps", "registrations"];

  for (const kind of kinds) {
    const payload = {
      name: "Test Applicant",
      fullName: "Test Applicant",
      leadName: "Test Applicant",
      email: "test@example.org",
      leadEmail: "test@example.org",
      role: "mentor",
      city: "Kandy",
      message: "Looking forward to helping.",
      institution: "University of Peradeniya",
      track: "team",
      teamName: "Apollo Kandy",
    };

    const email = renderOrganizerEmail(kind, "test-ref-123", payload);
    assert.ok(email.subject.includes("NASA Space Apps Kandy"));
    assert.ok(email.html.includes("test-ref-123"));
    assert.ok(email.html.includes("Test Applicant"));
    assert.equal(email.replyTo, "test@example.org");
    assert.ok(email.text.includes("test-ref-123"));
  }
});

test("applicant confirmation email template renders personalized message and ref ID", () => {
  const messageEmail = renderApplicantEmail("messages", "MSG-100", {
    name: "Kasun Perera",
    email: "kasun@example.com",
    subject: "Sponsorship",
    message: "We want to sponsor.",
  });
  assert.ok(messageEmail);
  assert.ok(messageEmail.subject.includes("MSG-100"));
  assert.ok(messageEmail.html.includes("Kasun Perera"));
  assert.ok(messageEmail.html.includes("24 to 48 hours"));

  const volunteerEmail = renderApplicantEmail("volunteers", "VOL-200", {
    fullName: "Nimal Silva",
    email: "nimal@example.com",
    role: "mentor",
  });
  assert.ok(volunteerEmail);
  assert.ok(volunteerEmail.html.includes("mentor"));

  const bootcampEmail = renderApplicantEmail("bootcamps", "BTC-300", {
    fullName: "Amali Fernando",
    email: "amali@example.com",
    city: "Galle",
  });
  assert.ok(bootcampEmail);
  assert.ok(bootcampEmail.html.includes("Galle"));
});

test("applicant email returns null if no recipient email exists", () => {
  const noEmail = renderApplicantEmail("messages", "ERR-001", {
    name: "Anonymous",
  });
  assert.equal(noEmail, null);
});
