export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-cream/70 mt-16 border-t border-brand-gold/20">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm">
        <p>&copy; {new Date().getFullYear()} Biblioteca Vitória. Todos os direitos reservados.</p>
        <p className="mt-1">
          Rua das Letras, 120 — Centro, Chapecó/SC · (49) 3300-0000 · contato@bibliotecavitoria.com.br
        </p>
        <p className="mt-1 text-xs text-brand-cream/50">
          Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento para WEB — Unochapecó.
        </p>
      </div>
    </footer>
  );
}
