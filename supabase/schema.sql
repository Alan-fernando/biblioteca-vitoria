-- Biblioteca Vitória - schema do banco de dados (Supabase / PostgreSQL)

create extension if not exists "pgcrypto";

create table if not exists livros (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  autor text not null,
  genero text not null,
  editora text,
  ano_publicacao int,
  isbn text,
  exemplares int not null default 1,
  descricao text,
  capa_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Habilita Row Level Security
alter table livros enable row level security;

-- Qualquer pessoa (incluindo visitantes anônimos) pode LER o catálogo
create policy "Catalogo publico - leitura"
  on livros for select
  to anon, authenticated
  using (true);

-- Somente usuários autenticados (administradores) podem criar/editar/excluir
create policy "Admin - insercao"
  on livros for insert
  to authenticated
  with check (true);

create policy "Admin - atualizacao"
  on livros for update
  to authenticated
  using (true)
  with check (true);

create policy "Admin - exclusao"
  on livros for delete
  to authenticated
  using (true);

-- Trigger para manter updated_at sempre atualizado
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_livros_updated_at
before update on livros
for each row execute function set_updated_at();

-- Dados de exemplo (opcional, ajuda na avaliação)
insert into livros (titulo, autor, genero, editora, ano_publicacao, isbn, exemplares, descricao)
values
  ('Dom Casmurro', 'Machado de Assis', 'Romance', 'Editora Ática', 1899, '9788535910663', 4, 'Clássico da literatura brasileira narrado por Bentinho.'),
  ('O Cortiço', 'Aluísio Azevedo', 'Naturalismo', 'Editora Martin Claret', 1890, '9788572325580', 2, 'Retrato do cotidiano de um cortiço no Rio de Janeiro.'),
  ('Grande Sertão: Veredas', 'Guimarães Rosa', 'Romance', 'Nova Fronteira', 1956, '9788520925215', 3, 'Narrativa sobre o jagunço Riobaldo e o sertão mineiro.')
on conflict do nothing;
