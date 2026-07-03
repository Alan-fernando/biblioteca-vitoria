"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { EstadoFormulario } from "@/app/admin/livros/actions";

type Livro = {
  id?: string;
  titulo?: string;
  autor?: string;
  genero?: string;
  editora?: string | null;
  ano_publicacao?: number | null;
  isbn?: string | null;
  exemplares?: number;
  descricao?: string | null;
  capa_url?: string | null;
};

function BotaoEnviar({ texto }: { texto: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-brand-900 px-5 py-2 text-brand-cream hover:bg-brand-800 transition disabled:opacity-60"
    >
      {pending ? "Salvando..." : texto}
    </button>
  );
}

export default function BookForm({
  livro,
  action,
  textoBotao
}: {
  livro?: Livro;
  action: (estado: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  textoBotao: string;
}) {
  const [estado, formAction] = useFormState(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-brand-800 mb-1">Título *</label>
          <input
            name="titulo"
            defaultValue={livro?.titulo}
            required
            className="w-full rounded border border-brand-700/30 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800 mb-1">Autor *</label>
          <input
            name="autor"
            defaultValue={livro?.autor}
            required
            className="w-full rounded border border-brand-700/30 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800 mb-1">Gênero *</label>
          <input
            name="genero"
            defaultValue={livro?.genero}
            required
            className="w-full rounded border border-brand-700/30 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800 mb-1">Editora</label>
          <input
            name="editora"
            defaultValue={livro?.editora ?? ""}
            className="w-full rounded border border-brand-700/30 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800 mb-1">Ano de publicação</label>
          <input
            type="number"
            name="ano_publicacao"
            defaultValue={livro?.ano_publicacao ?? ""}
            className="w-full rounded border border-brand-700/30 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800 mb-1">ISBN</label>
          <input
            name="isbn"
            defaultValue={livro?.isbn ?? ""}
            className="w-full rounded border border-brand-700/30 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800 mb-1">Exemplares</label>
          <input
            type="number"
            min={0}
            name="exemplares"
            defaultValue={livro?.exemplares ?? 1}
            className="w-full rounded border border-brand-700/30 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-brand-800 mb-1">
            URL da capa (opcional)
          </label>
          <input
            name="capa_url"
            defaultValue={livro?.capa_url ?? ""}
            className="w-full rounded border border-brand-700/30 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-brand-800 mb-1">Descrição</label>
          <textarea
            name="descricao"
            defaultValue={livro?.descricao ?? ""}
            rows={4}
            className="w-full rounded border border-brand-700/30 px-3 py-2"
          />
        </div>
      </div>

      {estado?.erro && <p className="text-sm text-red-600">{estado.erro}</p>}

      <BotaoEnviar texto={textoBotao} />
    </form>
  );
}
