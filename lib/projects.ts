import type { Project } from "@/types/project";
import projectsData from "@/content/projects/index.json";

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug);
}
