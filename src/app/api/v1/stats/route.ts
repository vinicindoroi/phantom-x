import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const overview = store.getOverviewMetrics();
  const geoData = store.getGeoDistribution();
  const timeSeries = store.getTimeSeries(24);

  return NextResponse.json({
    success: true,
    data: {
      overview,
      geoData,
      timeSeries,
    },
  });
}
