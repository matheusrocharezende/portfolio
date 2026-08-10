import { HeroSection } from "@/components/home/HeroSection";
import { ProjectCarousel } from "@/components/home/ProjectCarousel";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <ProjectCarousel projects={projects} />
    </div>
  );
}
