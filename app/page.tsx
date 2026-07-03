import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const { data: destaques } = await supabase
    .from("livros")
    .select("id, titulo, autor, genero")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div>
      <section className="bg-brand-900 text-brand-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-24">
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            Um lugar para encontrar
            <br />
            <span className="text-brand-gold">as suas próximas histórias.</span>
          </h1>
          <p className="max-w-xl text-brand-cream/80">
            A Biblioteca Vitória reúne milhares de títulos entre literatura brasileira, obras
            técnicas e clássicos universais, com atendimento gratuito para toda a comunidade.
          </p>
          <Link
            href="/catalogo"
            className="mt-4 rounded bg-brand-gold px-6 py-3 font-medium text-brand-900 hover:brightness-110 transition"
          >
            Explorar o catálogo
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-serif text-2xl text-brand-800 mb-6">Adições recentes</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques?.map((livro) => (
            <div key={livro.id} className="rounded-lg border border-brand-700/20 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-brand-600">{livro.genero}</p>
              <h3 className="mt-1 font-serif text-lg text-brand-900">{livro.titulo}</h3>
              <p className="text-sm text-brand-800/70">{livro.autor}</p>
            </div>
          ))}
          {(!destaques || destaques.length === 0) && (
            <p className="text-brand-800/60">Nenhum livro cadastrado ainda.</p>
          )}
        </div>
      </section>

      <section className="bg-brand-cream border-t border-brand-700/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-3 text-center">
          <div>
            <p className="font-serif text-3xl text-brand-gold">+3.000</p>
            <p className="text-sm text-brand-800/70">Títulos no acervo</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-brand-gold">15</p>
            <p className="text-sm text-brand-800/70">Anos de história</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-brand-gold">Gratuito</p>
            <p className="text-sm text-brand-800/70">Acesso para a comunidade</p>
          </div>
        </div>
      </section>
    </div>
  );
}
