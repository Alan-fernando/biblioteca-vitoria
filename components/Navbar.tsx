import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-brand-900 text-brand-cream sticky top-0 z-40 border-b border-brand-gold/30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl tracking-wide text-brand-gold">
          Biblioteca Vitória
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-brand-gold transition-colors">
            Início
          </Link>
          <Link href="/catalogo" className="hover:text-brand-gold transition-colors">
            Catálogo
          </Link>
          <Link href="/sobre" className="hover:text-brand-gold transition-colors">
            Sobre
          </Link>
          <Link href="/contato" className="hover:text-brand-gold transition-colors">
            Contato
          </Link>
          <Link
            href="/admin/login"
            className="rounded border border-brand-gold px-3 py-1 hover:bg-brand-gold hover:text-brand-900 transition-colors"
          >
            Área do Administrador
          </Link>
        </div>
      </nav>
    </header>
  );
}
