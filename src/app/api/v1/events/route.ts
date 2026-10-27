import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { RiskCategory } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain") || undefined;
  const campaignId = searchParams.get("campaignId") || undefined;
  const risk = (searchParams.get("risk") as RiskCategory) || undefined;
  const country = searchParams.get("country") || undefined;
  const search = searchParams.get("search") || undefined;
  const limit = parseInt(searchParams.get("limit") || "50", 10);

  const events = store.getEvents({
    domain,
    campaignId,
    risk,
    country,
    search,
    limit,
  });

  return NextResponse.json({
    success: true,
    total: events.length,
    events,
  });
}
