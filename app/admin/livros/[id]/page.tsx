import { notFound } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import BookForm from "@/components/BookForm";
import { createClient } from "@/lib/supabase/server";
import { atualizarLivro } from "@/app/admin/livros/actions";

export default async function EditarLivroPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: livro } = await supabase
    .from("livros")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!livro) notFound();

  const acaoComId = atualizarLivro.bind(null, params.id);

  return (
    <div className="flex min-h-[calc(100vh-140px)]">
      <AdminSidebar />
      <div className="flex-1 px-8 py-8">
        <h1 className="font-serif text-2xl text-brand-900 mb-6">Editar Livro</h1>
        <BookForm livro={livro} action={acaoComId} textoBotao="Salvar Alterações" />
      </div>
    </div>
  );
}
