import type { Metadata } from "next";

const references = [
  {
    title: "Referência de tipografia",
    source: "Nome da fonte ou autor",
    url: "#",
  },
  {
    title: "Referência de layout editorial",
    source: "Nome da fonte ou autor",
    url: "#",
  },
  {
    title: "Referência de direção de arte",
    source: "Nome da fonte ou autor",
    url: "#",
  },
];

export const metadata: Metadata = {
  title: "References",
};

export default function ReferencesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">
          References
        </p>
        <h1 className="text-4xl font-medium tracking-tight text-balance">
          Referências
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
          Leituras, influências e materiais que orientam meu processo criativo.
        </p>
      </header>

      <ul className="divide-y divide-border border-y border-border">
        {references.map((reference) => (
          <li key={reference.title}>
            <a
              href={reference.url}
              className="group flex flex-col gap-1 py-5 transition-colors duration-200 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-medium transition-colors duration-200 group-hover:text-muted">
                {reference.title}
              </span>
              <span className="text-sm text-muted">{reference.source}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
