import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST() {
  const event = store.generateRandomSimulatedEvent();
  return NextResponse.json({
    success: true,
    event,
  });
}
