import Image from "next/image";

export function AboutIntro() {
  return (
    <section className="flex w-full flex-col gap-16 px-10 pt-10">
      <Image
        src="/images/about-title.svg"
        alt="About"
        width={1840}
        height={413}
        priority
        className="h-auto w-full"
      />

      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-16">
        <Image
          src="/images/about-decor.svg"
          alt=""
          width={532}
          height={532}
          aria-hidden
          className="h-auto w-full max-w-[280px] shrink-0 sm:max-w-[360px]"
        />

        <div className="flex max-w-[755px] flex-col gap-6 text-2xl leading-[1.6] text-pretty">
          <p>
            <span className="font-medium">I am Matheus</span>, with 11 years
            of professional experience across various fields, including
            graphic design, photography, sales, engineering projects,
            administrative services, and for the past three and a half
            years, as a product designer. I have always been a curious
            person, eager to learn new things and solve problems. My
            experience provides me with a dynamic, creative, and unique
            perspective, which I apply to my design solutions.
          </p>
          <p>
            As a Product Designer, I have worked on e-commerce projects,
            national and international mobile telecommunications services,
            gastronomy services, among others. I have experience in
            developing concepts and complete flows, conducting user
            research, tagging, and creating high-fidelity prototypes. I am
            constantly seeking opportunities to expand my knowledge and
            skills as a designer.
          </p>
        </div>
      </div>
    </section>
  );
}
