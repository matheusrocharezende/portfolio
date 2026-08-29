import type { Metadata } from "next";
import { ReferencesExperience } from "@/components/references/ReferencesExperience";

export const metadata: Metadata = {
  title: "References",
};

export default function ReferencesPage() {
  return <ReferencesExperience />;
}
