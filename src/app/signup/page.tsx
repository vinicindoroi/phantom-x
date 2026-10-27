"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/ui/Logo";
import { Lock, Mail, User, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (password.length < 8) {
      setError("A senha deve conter no mínimo 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas informadas não coincidem.");
      return;
    }

    if (!termsAccepted) {
      setError("Você deve concordar com os Termos de Uso e Política de Privacidade.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      auth.signup(name, email);
      router.push("/dashboard");
    } catch {
      setError("Falha ao provisionar a conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex flex-col justify-between p-6">
      {/* Top Header */}
      <div className="flex justify-between items-center max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center space-x-3">
          <Logo size={28} />
          <span className="font-mono text-sm font-bold text-white tracking-widest">
            {siteConfig.name}
          </span>
        </Link>
        <Link
          href="/login"
          className="text-xs font-mono text-brand-secondary hover:text-white transition"
        >
          Já possui conta? <span className="text-white underline">Fazer login</span>
        </Link>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md mx-auto my-auto py-8 font-sans">
        <div className="bg-gradient-to-b from-[#141414] via-[#0f0f0f] to-[#080808] border border-brand-border rounded-2xl p-8 shadow-glow">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Comece a enxergar seu tráfego de outra forma.
            </h1>
            <p className="text-xs text-brand-secondary mt-1">
              Crie sua conta e configure seu ambiente em poucos passos.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white font-mono flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-brand-muted hover:text-white">
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-brand-secondary mb-1.5">
                NOME COMPLETO
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do operador"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-secondary mb-1.5">
                E-MAIL CORPORATIVO
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@empresa.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-secondary mb-1.5">
                SENHA (MÍNIMO 8 CARACTERES)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-secondary mb-1.5">
                CONFIRMAR SENHA
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start space-x-2 text-xs text-brand-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded border-brand-border bg-brand-black text-white focus:ring-0 mt-0.5"
                />
                <span className="text-[11px] leading-tight">
                  Concordo com os{" "}
                  <Link href="/terms" className="text-white underline">
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link href="/privacy" className="text-white underline">
                    Política de Privacidade
                  </Link>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition shadow-glow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="font-mono text-xs">Provisionando organização...</span>
              ) : (
                <>
                  <span>Criar minha conta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-[11px] font-mono text-brand-muted max-w-md mx-auto">
        Seus dados são protegidos por criptografia de ponta a ponta e anonimização de IPs.
      </div>
    </div>
  );
}
