import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/AboutIntro";
import { ExperienceSection } from "@/components/about/ExperienceSection";
import { DarkFooter } from "@/components/layout/DarkFooter";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col">
      <AboutIntro />
      <ExperienceSection />
      <DarkFooter />
    </div>
  );
}
