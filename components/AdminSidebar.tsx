import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function sair() {
  "use server";
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export default function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-brand-700/10 bg-white px-4 py-8">
      <p className="font-serif text-lg text-brand-900 mb-8">Painel Admin</p>
      <nav className="flex flex-col gap-2 text-sm">
        <Link href="/admin/dashboard" className="rounded px-3 py-2 hover:bg-brand-cream text-brand-800">
          Gerenciar Livros
        </Link>
        <Link href="/admin/livros/novo" className="rounded px-3 py-2 hover:bg-brand-cream text-brand-800">
          Novo Livro
        </Link>
        <Link href="/catalogo" className="rounded px-3 py-2 hover:bg-brand-cream text-brand-800">
          Ver Catálogo Público
        </Link>
        <form action={sair}>
          <button
            type="submit"
            className="mt-4 w-full rounded px-3 py-2 text-left text-red-600 hover:bg-red-50"
          >
            Sair
          </button>
        </form>
      </nav>
    </aside>
  );
}
