import Link from "next/link";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl border border-border bg-white p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] active:scale-[0.98]"
    >
      <div className="mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100 outline outline-1 outline-black/5">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Sem imagem
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-medium tracking-tight text-balance">
            {project.title}
          </h2>
          {project.year && (
            <span className="shrink-0 text-sm tabular-nums text-muted">
              {project.year}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted text-pretty">
          {project.description}
        </p>
        {project.tags && project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
