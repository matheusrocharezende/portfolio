"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { Project } from "@/types/project";

type ProjectCarouselProps = {
  projects: Project[];
};

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const hoveredProject = projects.find((p) => p.slug === hoveredSlug);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    }
  }, []);

  return (
    <>
      <section className="w-full px-10 py-40">
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="carousel-scroll flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth"
          role="region"
          aria-label="Projetos"
        >
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative block shrink-0 snap-start"
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              onFocus={() => setHoveredSlug(project.slug)}
              onBlur={() => setHoveredSlug(null)}
            >
              <div
                className={`relative h-[397px] w-[563px] transition-colors duration-300 ${
                  index === 0
                    ? "bg-project-placeholder-active"
                    : "bg-project-placeholder group-hover:bg-project-placeholder-active"
                }`}
              >
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="563px"
                  />
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center overflow-hidden px-10"
        aria-hidden={!hoveredProject}
      >
        <p
          className={`text-center text-[clamp(3rem,10vw,8rem)] font-medium uppercase leading-normal whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
            hoveredProject ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {hoveredProject?.title ?? ""}
        </p>
      </div>
    </>
  );
}
