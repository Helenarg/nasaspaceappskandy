// Set SITE_LAUNCH_MODE=live and rebuild to restore the full website.
export const isComingSoon = process.env.SITE_LAUNCH_MODE !== "live";
