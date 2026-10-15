import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "nasa-space-apps-kandy-web-api",
    version: "2.0.0",
    time: new Date().toISOString(),
  });
}
