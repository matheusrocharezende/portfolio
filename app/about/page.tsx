import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">
          About
        </p>
        <h1 className="text-4xl font-medium tracking-tight text-balance">
          Sobre mim
        </h1>
      </header>

      <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-muted text-pretty">
        <p>
          Escreva aqui uma breve apresentação sobre quem você é, sua trajetória
          e o tipo de trabalho que desenvolve.
        </p>
        <p>
          Esta página pode incluir experiência profissional, áreas de atuação,
          formação e links para contato.
        </p>
      </div>
    </div>
  );
}
