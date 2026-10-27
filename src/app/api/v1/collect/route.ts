import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const domain = body.domain || "checkout.phantom-x.io";
    const targetUrl = body.targetUrl || "https://seusite.com/oferta";
    const campaignId = body.campaignId;
    const referrer = body.referrer || req.headers.get("referer") || "Direto";
    const userAgent = body.userAgent || req.headers.get("user-agent") || "Mozilla/5.0";
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "177.18.99.12";

    const event = store.ingestEvent({
      domain,
      targetUrl,
      campaignId,
      referrer,
      userAgent,
      ip,
    });

    return NextResponse.json({
      success: true,
      eventId: event.id,
      routedTo: event.routedTo,
      riskScore: event.riskScore,
      riskCategory: event.riskCategory,
      latencyMs: event.latencyMs,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Falha ao processar payload de telemetria." },
      { status: 400 }
    );
  }
}
