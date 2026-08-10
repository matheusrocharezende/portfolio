import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-6 py-24">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">
        404
      </p>
      <h1 className="mb-4 text-3xl font-medium tracking-tight">
        Página não encontrada
      </h1>
      <p className="mb-8 max-w-md text-muted text-pretty">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="rounded-full border border-border bg-white px-4 py-2 text-sm transition-[transform,box-shadow] duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] active:scale-[0.96]"
      >
        Voltar para home
      </Link>
    </div>
  );
}
