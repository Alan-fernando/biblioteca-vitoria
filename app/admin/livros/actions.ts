"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type EstadoFormulario = { erro?: string } | null;

function dadosDoFormulario(formData: FormData) {
  return {
    titulo: String(formData.get("titulo") ?? "").trim(),
    autor: String(formData.get("autor") ?? "").trim(),
    genero: String(formData.get("genero") ?? "").trim(),
    editora: String(formData.get("editora") ?? "").trim() || null,
    ano_publicacao: formData.get("ano_publicacao")
      ? Number(formData.get("ano_publicacao"))
      : null,
    isbn: String(formData.get("isbn") ?? "").trim() || null,
    exemplares: Number(formData.get("exemplares") ?? 1),
    descricao: String(formData.get("descricao") ?? "").trim() || null,
    capa_url: String(formData.get("capa_url") ?? "").trim() || null
  };
}

export async function criarLivro(_estado: EstadoFormulario, formData: FormData) {
  const supabase = createClient();
  const dados = dadosDoFormulario(formData);

  if (!dados.titulo || !dados.autor || !dados.genero) {
    return { erro: "Título, autor e gênero são obrigatórios." };
  }

  const { error } = await supabase.from("livros").insert(dados);
  if (error) return { erro: error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/catalogo");
  redirect("/admin/dashboard");
}

export async function atualizarLivro(
  id: string,
  _estado: EstadoFormulario,
  formData: FormData
) {
  const supabase = createClient();
  const dados = dadosDoFormulario(formData);

  if (!dados.titulo || !dados.autor || !dados.genero) {
    return { erro: "Título, autor e gênero são obrigatórios." };
  }

  const { error } = await supabase.from("livros").update(dados).eq("id", id);
  if (error) return { erro: error.message };

  revalidatePath("/admin/dashboard");
  revalidatePath("/catalogo");
  redirect("/admin/dashboard");
}

export async function excluirLivro(id: string) {
  "use server";
  const supabase = createClient();
  await supabase.from("livros").delete().eq("id", id);
  revalidatePath("/admin/dashboard");
  revalidatePath("/catalogo");
}
