import type { Metadata } from "next";
import { DarkFooter } from "@/components/layout/DarkFooter";
import { CountrySection } from "@/components/visual-notes/CountrySection";
import { VisualNotesHeader } from "@/components/visual-notes/VisualNotesHeader";
import { visualNotesCountries } from "@/lib/visual-notes";

export const metadata: Metadata = {
  title: "Visual Notes",
};

export default function VisualNotesPage() {
  return (
    <div className="flex w-full flex-col items-start bg-black">
      <VisualNotesHeader />
      {visualNotesCountries.map((country) => (
        <CountrySection key={country.slug} country={country} />
      ))}
      <DarkFooter />
    </div>
  );
}
