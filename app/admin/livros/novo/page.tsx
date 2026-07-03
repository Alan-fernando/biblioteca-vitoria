import AdminSidebar from "@/components/AdminSidebar";
import BookForm from "@/components/BookForm";
import { criarLivro } from "@/app/admin/livros/actions";

export default function NovoLivroPage() {
  return (
    <div className="flex min-h-[calc(100vh-140px)]">
      <AdminSidebar />
      <div className="flex-1 px-8 py-8">
        <h1 className="font-serif text-2xl text-brand-900 mb-6">Novo Livro</h1>
        <BookForm action={criarLivro} textoBotao="Cadastrar Livro" />
      </div>
    </div>
  );
}
