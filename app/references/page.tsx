import type { Metadata } from "next";
import { DarkFooter } from "@/components/layout/DarkFooter";
import { DarkHeader } from "@/components/layout/DarkHeader";
import { ReferencesExperience } from "@/components/references/ReferencesExperience";

export const metadata: Metadata = {
  title: "References",
};

export default function ReferencesPage() {
  return (
    <div className="flex w-full flex-col items-start bg-black">
      <DarkHeader />
      <ReferencesExperience />
      <DarkFooter />
    </div>
  );
}
