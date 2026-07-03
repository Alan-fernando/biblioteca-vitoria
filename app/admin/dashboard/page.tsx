import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/AdminSidebar";
import { excluirLivro } from "@/app/admin/livros/actions";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: livros } = await supabase
    .from("livros")
    .select("id, titulo, autor, genero, exemplares")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-[calc(100vh-140px)]">
      <AdminSidebar />
      <div className="flex-1 px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-brand-900">Gerenciar Livros</h1>
          <Link
            href="/admin/livros/novo"
            className="rounded bg-brand-gold px-4 py-2 text-sm font-medium text-brand-900 hover:brightness-110"
          >
            + Novo Livro
          </Link>
        </div>

        <table className="w-full overflow-hidden rounded-lg border border-brand-700/10 bg-white text-sm">
          <thead className="bg-brand-cream text-left text-brand-800">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Autor</th>
              <th className="px-4 py-3">Gênero</th>
              <th className="px-4 py-3">Exemplares</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros?.map((livro) => (
              <tr key={livro.id} className="border-t border-brand-700/10">
                <td className="px-4 py-3">{livro.titulo}</td>
                <td className="px-4 py-3">{livro.autor}</td>
                <td className="px-4 py-3">{livro.genero}</td>
                <td className="px-4 py-3">{livro.exemplares}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/livros/${livro.id}`}
                    className="mr-3 text-brand-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <form action={excluirLivro.bind(null, livro.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:underline">
                      Excluir
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {livros && livros.length === 0 && (
          <p className="mt-6 text-brand-800/60">Nenhum livro cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
