import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-brand-secondary hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a página inicial</span>
        </Link>

        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-brand-secondary">
            DOCUMENTAÇÃO JURÍDICA
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight mt-2">
            Termos de Uso do Serviço — {siteConfig.name}
          </h1>
          <p className="text-xs text-brand-muted font-mono mt-1">
            Última atualização: Outubro de 2026
          </p>
        </div>

        <div className="space-y-6 text-sm text-brand-secondary leading-relaxed border-t border-brand-border pt-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">1. Objeto e Escopo do Serviço</h2>
            <p>
              A plataforma {siteConfig.name} fornece ferramentas de inteligência, análise de
              tráfego, observabilidade de requisições web, detecção de tráfego automatizado e
              roteamento condicional de usuários para fins legítimos de otimização de
              infraestrutura, internacionalização e testes de performance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">2. Uso Aceitável e Conformidade</h2>
            <p>
              O contratante se compromete expressamente a utilizar o serviço em estrita
              conformidade com a legislação aplicável e com as políticas dos ecossistemas digitais.
              É estritamente vedado o uso da plataforma para ocultação de conteúdos ilícitos,
              distribuição de malware, phishing, evasão deliberada de termos de serviço de redes de
              anúncios ou quaisquer atividades enganosas a consumidores finais.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">3. Segurança e Roteamento</h2>
            <p>
              Todos os destinos de roteamento configurados passam por validação contra open
              redirects e listas de bloqueio. O {siteConfig.name} reserva-se o direito de
              desativar regras que violem as normas de segurança da informação.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-white">4. Disponibilidade e SLA</h2>
            <p>
              Empregamos clusters de borda com alta disponibilidade buscando 99.9% de uptime para os
              planos elegíveis, com replicação e failover automatizado.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
