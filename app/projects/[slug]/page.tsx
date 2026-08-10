import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/"
        className="mb-10 inline-flex text-sm text-muted transition-colors duration-200 hover:text-foreground"
      >
        ← Voltar para home
      </Link>

      <header className="mb-12 max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted">
          {project.year && (
            <span className="tabular-nums">{project.year}</span>
          )}
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">
          {project.description}
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-border bg-white outline outline-1 outline-black/5">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.title}
            className="aspect-[16/10] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center text-muted">
            Adicione a imagem de capa em public/images/projects/
          </div>
        )}
      </div>

      <section className="mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-muted text-pretty">
        <p>
          Use esta área para detalhar o contexto do projeto, seu papel, processo
          criativo e resultados.
        </p>
      </section>
    </article>
  );
}
