import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const campaigns = store.getCampaigns();
  return NextResponse.json({ success: true, campaigns });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.targetUrl) {
      return NextResponse.json(
        { success: false, error: "Nome e URL de destino são obrigatórios." },
        { status: 400 }
      );
    }
    const created = store.createCampaign(body);
    return NextResponse.json({ success: true, campaign: created });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao criar campanha." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();
    const updated = store.updateCampaign(id, data);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Campanha não encontrada." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, campaign: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao atualizar campanha." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID da campanha não informado." },
      { status: 400 }
    );
  }
  const deleted = store.deleteCampaign(id);
  return NextResponse.json({ success: deleted });
}
