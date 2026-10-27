"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/ui/Logo";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      // Simulate secure auth handshake
      await new Promise((resolve) => setTimeout(resolve, 600));
      auth.login(email, password);
      router.push("/dashboard");
    } catch {
      setError("Credenciais inválidas. Verifique os dados e tente novamente.");
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
          href="/signup"
          className="text-xs font-mono text-brand-secondary hover:text-white transition"
        >
          Não tem conta? <span className="text-white underline">Criar cadastro</span>
        </Link>
      </div>

      {/* Login Card Form */}
      <div className="w-full max-w-md mx-auto my-auto py-8 font-sans">
        <div className="bg-gradient-to-b from-[#141414] via-[#0f0f0f] to-[#080808] border border-brand-border rounded-2xl p-8 shadow-glow">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Bom ter você de volta.
            </h1>
            <p className="text-xs text-brand-secondary mt-1">
              Entre na sua conta para acompanhar sua operação.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-brand-white font-mono flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-brand-muted hover:text-white">
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-brand-secondary mb-1.5">
                E-MAIL PROFISSIONAL
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operador@suaempresa.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono text-brand-secondary">
                  SENHA DE ACESSO
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-mono text-brand-muted hover:text-white transition"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-brand-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-brand-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-brand-border bg-brand-black text-white focus:ring-0"
                />
                <span className="text-[11px]">Manter conectado neste terminal</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition shadow-glow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="font-mono text-xs">Validando sessão...</span>
              ) : (
                <>
                  <span>Entrar na plataforma</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center text-[11px] font-mono text-brand-muted max-w-md mx-auto">
        Protegido por isolamento de tenant, tokens seguros e auditoria contínua.
      </div>
    </div>
  );
}
