import type { Metadata } from "next";
import { DarkFooter } from "@/components/layout/DarkFooter";
import { DarkHeader } from "@/components/layout/DarkHeader";
import { CountrySection } from "@/components/visual-notes/CountrySection";
import { visualNotesCountries } from "@/lib/visual-notes";

export const metadata: Metadata = {
  title: "Visual Notes",
};

export default function VisualNotesPage() {
  return (
    <div className="flex w-full flex-col items-start bg-black">
      <DarkHeader />
      {visualNotesCountries.map((country) => (
        <CountrySection key={country.slug} country={country} />
      ))}
      <DarkFooter />
    </div>
  );
}
