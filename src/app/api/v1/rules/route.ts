import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const rules = store.getRoutingRules();
  return NextResponse.json({ success: true, rules });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.destinationUrl) {
      return NextResponse.json(
        { success: false, error: "Nome e URL de destino são obrigatórios." },
        { status: 400 }
      );
    }
    const created = store.createRoutingRule(body);
    return NextResponse.json({ success: true, rule: created });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao criar regra de roteamento." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID da regra não informado." },
      { status: 400 }
    );
  }
  const deleted = store.deleteRoutingRule(id);
  return NextResponse.json({ success: deleted });
}
