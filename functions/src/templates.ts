export type FormKind = "messages" | "volunteers" | "ambassadors" | "bootcamps" | "registrations";

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

const kindLabels: Record<FormKind, string> = {
  messages: "Contact Inquiry",
  volunteers: "Volunteer / Mentor Application",
  ambassadors: "Ambassador Application",
  bootcamps: "Bootcamp Registration",
  registrations: "Participant Registration",
};

function escapeHtml(str: unknown): string {
  if (typeof str !== "string") return String(str ?? "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function baseLayout(title: string, contentHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #050B14;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #E2E8F0;
      line-height: 1.6;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 32px 16px;
    }
    .card {
      background-color: #0C1829;
      border: 1px solid #1E3557;
      border-radius: 8px;
      padding: 32px 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }
    .header {
      border-bottom: 1px solid #1E3557;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #00D8FF;
      background-color: rgba(0, 216, 255, 0.1);
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 12px;
    }
    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.01em;
    }
    .ref-tag {
      font-family: 'Courier New', monospace;
      font-size: 13px;
      color: #EEFF00;
      background: rgba(238, 255, 0, 0.08);
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 8px;
    }
    .field-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .field-table th {
      text-align: left;
      padding: 10px 12px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94A3B8;
      border-bottom: 1px solid #1E3557;
      width: 35%;
    }
    .field-table td {
      padding: 10px 12px;
      font-size: 14px;
      color: #F8FAFC;
      border-bottom: 1px solid #1E3557;
    }
    .message-box {
      background: #060E1A;
      border-left: 3px solid #00D8FF;
      padding: 16px;
      margin: 16px 0;
      border-radius: 0 4px 4px 0;
      font-size: 14px;
      color: #E2E8F0;
      white-space: pre-wrap;
    }
    .footer {
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid #1E3557;
      font-size: 12px;
      color: #64748B;
      text-align: center;
    }
    .footer a {
      color: #00D8FF;
      text-decoration: none;
    }
    .btn {
      display: inline-block;
      background: #FFFFFF;
      color: #050B14;
      font-weight: 600;
      font-size: 14px;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      ${contentHtml}
      <div class="footer">
        <p>NASA International Space Apps Challenge &bull; Kandy, Sri Lanka</p>
        <p><a href="https://nasaspaceapps.lk">nasaspaceapps.lk</a> &bull; <a href="mailto:info@nasaspaceapps.lk">info@nasaspaceapps.lk</a></p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function renderOrganizerEmail(
  kind: FormKind,
  id: string,
  data: Record<string, unknown>
): EmailContent {
  const label = kindLabels[kind] || "Submission";
  const applicantName = (data.fullName || data.name || data.leadName || "Applicant") as string;
  const applicantEmail = (data.email || data.leadEmail || "") as string;
  const subject = `[NASA Space Apps Kandy] New ${label}: ${applicantName}`;

  const rows: string[] = [];
  const textLines: string[] = [
    `=== NEW ${label.toUpperCase()} ===`,
    `Reference ID: ${id}`,
    `Submitted Name: ${applicantName}`,
    `Applicant Email: ${applicantEmail}`,
    `Source: ${data.source || "web"} (v${data.appVersion || "2.0.0"})`,
    `----------------------------------------`,
  ];

  for (const [key, value] of Object.entries(data)) {
    if (["createdAt", "status", "source", "appVersion", "notifiedAt", "notificationDetails"].includes(key)) {
      continue;
    }
    const displayValue = Array.isArray(value) ? value.join(", ") : String(value ?? "N/A");
    rows.push(`
      <tr>
        <th>${escapeHtml(key)}</th>
        <td>${escapeHtml(displayValue)}</td>
      </tr>
    `);
    textLines.push(`${key}: ${displayValue}`);
  }

  const html = baseLayout(
    `New ${label}`,
    `
      <div class="header">
        <span class="badge">Organiser Notification</span>
        <h1>New ${escapeHtml(label)} Received</h1>
        <div class="ref-tag">ID: ${escapeHtml(id)}</div>
      </div>
      <p>A new submission was submitted on the NASA Space Apps Kandy website:</p>
      <table class="field-table">
        <tbody>
          <tr>
            <th>Applicant Name</th>
            <td><strong>${escapeHtml(applicantName)}</strong></td>
          </tr>
          <tr>
            <th>Applicant Email</th>
            <td><a href="mailto:${escapeHtml(applicantEmail)}" style="color:#00D8FF;">${escapeHtml(applicantEmail)}</a></td>
          </tr>
          ${rows.join("")}
        </tbody>
      </table>
      ${applicantEmail ? `
        <div style="margin-top: 24px;">
          <a class="btn" href="mailto:${escapeHtml(applicantEmail)}?subject=Re:%20NASA%20Space%20Apps%20Kandy%20-%20${encodeURIComponent(label)}">Reply to ${escapeHtml(applicantName)}</a>
        </div>
      ` : ""}
    `
  );

  return {
    subject,
    html,
    text: textLines.join("\n"),
    replyTo: applicantEmail || undefined,
  };
}

export function renderApplicantEmail(
  kind: FormKind,
  id: string,
  data: Record<string, unknown>
): EmailContent | null {
  const applicantEmail = (data.email || data.leadEmail) as string | undefined;
  if (!applicantEmail) return null;

  const applicantName = (data.fullName || data.name || data.leadName || "Space Enthusiast") as string;
  const label = kindLabels[kind] || "Submission";
  const subject = `Confirmation: We received your ${label.toLowerCase()} (Ref: ${id})`;

  let messageBodyHtml = "";
  let messageBodyText = "";

  switch (kind) {
    case "messages":
      messageBodyHtml = `
        <p>Thank you for reaching out to the NASA Space Apps Kandy organizing team. We have received your inquiry regarding <strong>"${escapeHtml(data.subject || "General inquiry")}"</strong>.</p>
        <p>Our team will review your message and get back to you within <strong>24 to 48 hours</strong>.</p>
        <div class="message-box">${escapeHtml(data.message || "")}</div>
      `;
      messageBodyText = `Thank you for reaching out to the NASA Space Apps Kandy organizing team. We have received your inquiry regarding "${data.subject || "General inquiry"}". Our team will review your message and reply within 24 to 48 hours.`;
      break;

    case "volunteers":
      messageBodyHtml = `
        <p>Thank you for applying to be a <strong>${escapeHtml(data.role || "volunteer")}</strong> for NASA Space Apps Kandy 2026!</p>
        <p>Volunteers and mentors are the backbone of our community hackathon. Our committee reviews applications on a rolling basis, and we will contact you via email and phone regarding your role, orientation, and schedule.</p>
      `;
      messageBodyText = `Thank you for applying to be a ${data.role || "volunteer"} for NASA Space Apps Kandy 2026! We will contact you regarding onboarding and orientation.`;
      break;

    case "ambassadors":
      messageBodyHtml = `
        <p>Thank you for applying to be a <strong>NASA Space Apps Ambassador</strong> (${escapeHtml(data.role || "Lead")}) representing <strong>${escapeHtml(data.institution || "your institution")}</strong>!</p>
        <p>Campus and school leads play an essential role in driving innovation and encouraging student teams across Sri Lanka. Our ambassador coordinators will review your motivation statement and reach out to you within 48 hours with onboarding materials.</p>
      `;
      messageBodyText = `Thank you for applying to be a NASA Space Apps Ambassador (${data.role || "Lead"}) representing ${data.institution || "your institution"}. We will contact you within 48 hours.`;
      break;

    case "bootcamps":
      messageBodyHtml = `
        <p>Thank you for registering your interest in the <strong>NASA Space Apps Pre-Hackathon Bootcamp</strong> in <strong>${escapeHtml(data.city || "Kandy")}</strong>!</p>
        <p>Our hands-on workshops cover open science data, problem breakdown, satellite APIs, and rapid prototyping. We will email you the exact date, venue schedule, and preparation guidelines prior to the session.</p>
      `;
      messageBodyText = `Thank you for registering your interest in the NASA Space Apps Pre-Hackathon Bootcamp in ${data.city || "Kandy"}. We will send you schedule and venue details as the event approaches.`;
      break;

    case "registrations":
      messageBodyHtml = `
        <p>Thank you for registering your interest for <strong>NASA Space Apps Kandy 2026</strong> as a <strong>${escapeHtml(data.track === "team" ? "Team (" + (data.teamName || "Team") + ")" : "Solo Participant")}</strong>.</p>
        <p>Please note: To be eligible for global NASA judging and official challenge certificates, every participant must also create an account on the <a href="https://www.spaceappschallenge.org/2026/local-events/kandy/" style="color:#00D8FF;">official NASA Space Apps Kandy listing</a>.</p>
      `;
      messageBodyText = `Thank you for registering your interest for NASA Space Apps Kandy 2026 (${data.track === "team" ? "Team: " + data.teamName : "Solo"}). Please ensure you also register on the official NASA Space Apps portal.`;
      break;
  }

  const html = baseLayout(
    `Confirmation: ${label}`,
    `
      <div class="header">
        <span class="badge">Submission Received</span>
        <h1>Hello ${escapeHtml(applicantName)},</h1>
        <div class="ref-tag">Receipt Reference: ${escapeHtml(id)}</div>
      </div>
      ${messageBodyHtml}
      <p style="margin-top:24px; color:#94A3B8; font-size:13px;">
        Please keep your reference ID <code>${escapeHtml(id)}</code> for your records. If you have any urgent questions, feel free to reply directly to this email or write to <a href="mailto:info@nasaspaceapps.lk" style="color:#00D8FF;">info@nasaspaceapps.lk</a>.
      </p>
    `
  );

  return {
    subject,
    html,
    text: `Hello ${applicantName},\n\nReference: ${id}\n\n${messageBodyText}\n\nNASA Space Apps Kandy Committee\nhttps://nasaspaceapps.lk\ninfo@nasaspaceapps.lk`,
  };
}
