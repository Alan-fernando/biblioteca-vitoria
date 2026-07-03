import { createClient } from "@/lib/supabase/server";

type Livro = {
  id: string;
  titulo: string;
  autor: string;
  genero: string;
  ano_publicacao: number | null;
  exemplares: number;
  descricao: string | null;
};

export default async function CatalogoPage({
  searchParams
}: {
  searchParams: { busca?: string };
}) {
  const supabase = createClient();
  const busca = searchParams.busca?.trim() ?? "";

  let query = supabase
    .from("livros")
    .select("id, titulo, autor, genero, ano_publicacao, exemplares, descricao")
    .order("titulo", { ascending: true });

  if (busca) {
    query = query.or(`titulo.ilike.%${busca}%,autor.ilike.%${busca}%,genero.ilike.%${busca}%`);
  }

  const { data: livros, error } = await query;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-serif text-3xl text-brand-900 mb-2">Catálogo</h1>
      <p className="text-brand-800/70 mb-8">Consulte os títulos disponíveis no acervo.</p>

      <form className="mb-10 flex gap-3" action="/catalogo">
        <input
          type="text"
          name="busca"
          defaultValue={busca}
          placeholder="Buscar por título, autor ou gênero..."
          className="flex-1 rounded border border-brand-700/30 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
        <button
          type="submit"
          className="rounded bg-brand-900 px-5 py-2 text-brand-cream hover:bg-brand-800 transition"
        >
          Buscar
        </button>
      </form>

      {error && <p className="text-red-600">Erro ao carregar o catálogo: {error.message}</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(livros as Livro[] | null)?.map((livro) => (
          <article key={livro.id} className="rounded-lg border border-brand-700/20 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-brand-600">{livro.genero}</p>
            <h2 className="mt-1 font-serif text-lg text-brand-900">{livro.titulo}</h2>
            <p className="text-sm text-brand-800/70">
              {livro.autor} {livro.ano_publicacao ? `· ${livro.ano_publicacao}` : ""}
            </p>
            {livro.descricao && (
              <p className="mt-3 text-sm text-brand-800/70 line-clamp-3">{livro.descricao}</p>
            )}
            <p className="mt-3 text-xs text-brand-600">
              {livro.exemplares > 0
                ? `${livro.exemplares} exemplar(es) disponível(is)`
                : "Sem exemplares disponíveis no momento"}
            </p>
          </article>
        ))}
      </div>

      {livros && livros.length === 0 && (
        <p className="text-brand-800/60">Nenhum título encontrado para essa busca.</p>
      )}
    </div>
  );
}
