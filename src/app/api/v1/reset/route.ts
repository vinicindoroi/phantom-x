import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST() {
  store.resetAccountToZero();
  return NextResponse.json({
    success: true,
    message: "Store zerado com sucesso",
  });
}
