import type { EmailContent } from "./templates";
import nodemailer, { type Transporter } from "nodemailer";

export interface MailerConfig {
  organizerEmail: string;
  fromAddress: string;
  resendApiKey?: string;
  smtpHost?: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser?: string;
  smtpPass?: string;
}

export function getMailerConfig(): MailerConfig {
  return {
    organizerEmail: process.env.ORGANIZER_EMAIL || "info@nasaspaceapps.lk",
    fromAddress: process.env.SMTP_FROM || process.env.RESEND_FROM || "NASA Space Apps Kandy <info@nasaspaceapps.lk>",
    resendApiKey: process.env.RESEND_API_KEY,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    smtpSecure: process.env.SMTP_SECURE === "true",
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
  };
}

let smtpTransporter: Transporter | null = null;

function getSmtpTransporter(config: MailerConfig): Transporter | null {
  if (smtpTransporter) return smtpTransporter;
  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
    return null;
  }
  smtpTransporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });
  return smtpTransporter;
}

export async function sendEmail(
  to: string,
  content: EmailContent
): Promise<{ ok: boolean; simulated?: boolean; messageId?: string; error?: string }> {
  const config = getMailerConfig();

  // 1. Resend API (Free Tier: 3,000 emails/month, 100/day)
  if (config.resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: config.fromAddress,
          to,
          subject: content.subject,
          html: content.html,
          text: content.text,
          reply_to: content.replyTo,
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[Resend Error] Status ${res.status}:`, errorText);
        return { ok: false, error: errorText };
      }
      const data = await res.json() as { id?: string };
      console.log(`[Resend Sent] To: ${to} | ID: ${data.id}`);
      return { ok: true, messageId: data.id };
    } catch (err) {
      console.error(`[Resend Send Exception]`, err);
      return { ok: false, error: String(err) };
    }
  }

  // 2. SMTP Transporter (Nodemailer, Gmail SMTP, etc.)
  const transport = getSmtpTransporter(config);
  if (transport) {
    try {
      const info = await transport.sendMail({
        from: config.fromAddress,
        to,
        subject: content.subject,
        html: content.html,
        text: content.text,
        replyTo: content.replyTo,
      });
      console.log(`[SMTP Sent] MessageId: ${info.messageId} To: ${to}`);
      return { ok: true, messageId: info.messageId };
    } catch (err) {
      console.error(`[SMTP Error] Failed sending to ${to}:`, err);
      return { ok: false, error: String(err) };
    }
  }

  // 3. Simulation fallback (logs to console without failing)
  console.log(`[Email Simulated] To: ${to} | Subject: ${content.subject}`);
  return { ok: true, simulated: true };
}
