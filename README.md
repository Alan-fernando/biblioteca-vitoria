# Biblioteca Vitória — Site Institucional com CRUD

Site institucional de uma biblioteca fictícia, com catálogo público de livros e painel
administrativo para gerenciamento (CRUD) do acervo. Projeto desenvolvido para a disciplina
**Desenvolvimento para WEB** — Unochapecó.

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (PostgreSQL + Auth).

---

## 1. Instalação de dependências

Pré-requisitos: Node.js 18+ e uma conta gratuita no [Supabase](https://supabase.com).

```bash
npm install
```

Isso instala: Next.js, React, Tailwind CSS, TypeScript e os pacotes `@supabase/supabase-js`
e `@supabase/ssr` (integração do Supabase com o Next.js).

---

## 2. Configuração

### 2.1 Criar o projeto no Supabase

1. Crie um projeto gratuito em https://supabase.com.
2. No painel do projeto, vá em **SQL Editor** e execute o conteúdo do arquivo
   `supabase/schema.sql` (cria a tabela `livros`, as políticas de segurança RLS e insere
   3 livros de exemplo).
3. Vá em **Authentication → Users** e crie manualmente um usuário administrador
   (e-mail + senha). Esse será o login usado no painel `/admin`.
4. Vá em **Project Settings → API** e copie:
   - `Project URL`
   - `anon public key`

### 2.2 Variáveis de ambiente

Copie o arquivo de exemplo e preencha com os dados do seu projeto Supabase:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

---

## 3. Execução do projeto

```bash
npm run dev
```

Acesse em: http://localhost:3000

- Site público: `/`, `/catalogo`, `/sobre`, `/contato`
- Painel administrativo: `/admin/login`

---

## 4. Acesso ao sistema (credenciais de teste)

Use o e-mail e senha do usuário administrador que você criou no passo 2.1, em
**Authentication → Users** do Supabase. Exemplo utilizado durante o desenvolvimento:

```
E-mail: admin@bibliotecavitoria.com.br
Senha:  (definida manualmente no Supabase pelo avaliador)
```

> Por segurança, o Supabase não permite definir senha padrão via script público — o
> avaliador deve criar o próprio usuário admin seguindo o passo 2.1 (leva menos de 1 minuto).

Após login, o administrador pode:
- Ver a lista de todos os livros cadastrados (`/admin/dashboard`)
- Cadastrar um novo livro (`/admin/livros/novo`)
- Editar um livro existente (`/admin/livros/[id]`)
- Excluir um livro (botão "Excluir" na listagem)

Rotas em `/admin/*` são protegidas por middleware: usuários não autenticados são
redirecionados automaticamente para `/admin/login`.

---

## 5. Estrutura do projeto

```
app/
  page.tsx                 → Home institucional
  sobre/page.tsx            → Página institucional "Sobre"
  catalogo/page.tsx         → Catálogo público (leitura, com busca)
  contato/page.tsx          → Página de contato
  admin/
    login/page.tsx          → Login do administrador (Supabase Auth)
    dashboard/page.tsx       → Listagem de livros (Read + links Update/Delete)
    livros/novo/page.tsx     → Criar livro (Create)
    livros/[id]/page.tsx     → Editar livro (Update)
    livros/actions.ts         → Server Actions: criar, atualizar, excluir (CRUD)
components/                → Navbar, Footer, AdminSidebar, BookForm
lib/supabase/               → Clientes Supabase (browser e servidor)
middleware.ts               → Proteção de rotas /admin
supabase/schema.sql          → Script de criação da tabela e políticas RLS
```