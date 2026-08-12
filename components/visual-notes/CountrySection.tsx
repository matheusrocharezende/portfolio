import Image from "next/image";
import type { VisualNotesCountry } from "@/lib/visual-notes";

export function CountrySection({ country }: { country: VisualNotesCountry }) {
  return (
    <section className="flex w-full flex-col items-start gap-8 bg-black px-10 py-[120px]">
      <div className="relative w-full">
        <Image
          src={country.titleImage}
          alt={country.label}
          width={country.titleImageWidth}
          height={country.titleImageHeight}
          className="h-auto w-full"
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-8">
        {country.photos.map((photo, index) => (
          <div
            key={photo}
            className="relative aspect-[1/1.3318] w-full overflow-hidden"
          >
            <Image
              src={photo}
              alt={`${country.label} — foto ${index + 1}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 45vw, 90vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
