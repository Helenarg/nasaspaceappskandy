import * as nodemailer from "nodemailer";
import { getConfig, isEmailConfigured } from "./config";
import { EmailContent } from "./templates";
import * as logger from "firebase-functions/logger";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  const config = getConfig();

  if (!isEmailConfigured()) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  return transporter;
}

export async function sendEmail(
  to: string,
  content: EmailContent
): Promise<{ ok: boolean; messageId?: string; simulated?: boolean }> {
  const config = getConfig();
  const transport = getTransporter();

  if (!transport) {
    logger.info(`[Email Service - Simulated] To: ${to} | Subject: ${content.subject}`);
    logger.info(`[Email Content Preview]\n${content.text}`);
    return { ok: true, simulated: true };
  }

  try {
    const info = await transport.sendMail({
      from: config.fromAddress,
      to,
      subject: content.subject,
      html: content.html,
      text: content.text,
      replyTo: content.replyTo,
    });
    logger.info(`[Email Sent Successfully] MessageId: ${info.messageId} To: ${to}`);
    return { ok: true, messageId: info.messageId };
  } catch (err: unknown) {
    logger.error(`[Email Send Error] Failed sending to ${to}:`, err);
    return { ok: false };
  }
}
