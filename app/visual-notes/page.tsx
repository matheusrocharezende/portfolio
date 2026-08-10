import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Notes",
};

export default function VisualNotesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">
          Visual Notes
        </p>
        <h1 className="text-4xl font-medium tracking-tight text-balance">
          Notas visuais
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
          Um espaço para estudos, experimentos e referências visuais do dia a
          dia.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/5] rounded-2xl border border-border bg-white outline outline-1 outline-black/5"
          >
            <div className="flex h-full items-center justify-center text-sm text-muted">
              Adicionar imagem
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
