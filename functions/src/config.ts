export interface EmailConfig {
  organizerEmail: string;
  smtpHost?: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser?: string;
  smtpPass?: string;
  fromAddress: string;
}

export function getConfig(): EmailConfig {
  return {
    organizerEmail: process.env.ORGANIZER_EMAIL || "info@nasaspaceapps.lk",
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    smtpSecure: process.env.SMTP_SECURE === "true",
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    fromAddress: process.env.SMTP_FROM || "NASA Space Apps Kandy <info@nasaspaceapps.lk>",
  };
}

export function isEmailConfigured(): boolean {
  const config = getConfig();
  return Boolean(config.smtpHost && config.smtpUser && config.smtpPass);
}
