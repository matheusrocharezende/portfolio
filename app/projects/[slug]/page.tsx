import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DarkFooter } from "@/components/layout/DarkFooter";
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
    <div className="flex w-full flex-col">
      <section className="flex items-center justify-center gap-[124px] px-10 py-[164px]">
        <Image
          src="/images/about-decor.svg"
          alt=""
          width={532}
          height={532}
          aria-hidden
          className="h-auto w-[532px] shrink-0"
        />
        <p className="text-[171px] leading-none font-semibold text-black uppercase whitespace-nowrap">
          Coming
          <br />
          soon...
        </p>
      </section>
      <DarkFooter />
    </div>
  );
}
