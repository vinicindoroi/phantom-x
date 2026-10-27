import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const domains = store.getDomains();
  return NextResponse.json({ success: true, domains });
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Nome do domínio é obrigatório." },
        { status: 400 }
      );
    }
    const newDomain = store.addDomain(name);
    return NextResponse.json({ success: true, domain: newDomain });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao registrar domínio." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();
    const verified = store.verifyDomainDNS(id);
    if (!verified) {
      return NextResponse.json(
        { success: false, error: "Domínio não encontrado." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, domain: verified });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erro ao verificar DNS." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID do domínio não informado." },
      { status: 400 }
    );
  }
  const deleted = store.deleteDomain(id);
  return NextResponse.json({ success: deleted });
}
