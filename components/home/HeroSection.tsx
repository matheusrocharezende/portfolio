import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative w-full px-10 pt-[100px]">
      <div className="relative">
        <div className="w-full">
          <Image
            src="/images/hero-title.svg"
            alt={siteConfig.name}
            width={1840}
            height={187}
            priority
            className="h-auto w-full"
          />
        </div>

        <p className="mt-4 text-[22px] font-bold leading-normal">
          {siteConfig.role}
        </p>

        <div className="mt-60 flex flex-col gap-16 lg:flex-row lg:justify-between">
          <div className="shrink-0 lg:h-[790px]">
            <div className="relative h-[355px] w-[327px] lg:sticky lg:top-10">
              <Image
                src="/images/portrait.jpg"
                alt="Retrato de Matheus Rocha"
                fill
                className="object-cover grayscale outline outline-1 outline-black/5"
                sizes="327px"
                priority
              />
            </div>
          </div>

          <p className="max-w-[896px] text-[32px] font-medium leading-normal text-pretty lg:self-end lg:text-right">
            {siteConfig.description}
          </p>
        </div>
      </div>
    </section>
  );
}
