"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

    setCarregando(false);

    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-6 py-24">
      <h1 className="font-serif text-2xl text-brand-900 mb-1">Área do Administrador</h1>
      <p className="text-sm text-brand-800/60 mb-8">
        Entre com suas credenciais para gerenciar o acervo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-800 mb-1">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-brand-700/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800 mb-1">Senha</label>
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded border border-brand-700/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>

        {erro && <p className="text-sm text-red-600">{erro}</p>}

        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded bg-brand-900 px-4 py-2 text-brand-cream hover:bg-brand-800 transition disabled:opacity-60"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
