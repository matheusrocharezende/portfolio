import type { ReactNode } from "react";
import {
  certifications,
  education,
  experience,
  skillGroups,
} from "@/lib/about";

const DIVIDER = "border-[#383838]";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="shrink-0 pr-[10px] sm:sticky sm:top-0 sm:w-[445px]">
      <div
        className={`flex h-[202px] w-full flex-col items-start border-t-[5px] ${DIVIDER} pt-[30px] pr-[40px] pb-[40px] pl-[6px]`}
      >
        <p className="w-full max-w-[420px] text-2xl leading-[1.4] font-medium tracking-[-0.24px]">
          {children}
        </p>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section className="flex w-full flex-col gap-[124px] px-10 pb-20">
      <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start">
        <SectionLabel>EXPERIENCE</SectionLabel>
        <div className={`flex min-w-0 flex-1 flex-col gap-20 border-t-[5px] ${DIVIDER} py-20`}>
          {experience.map((job, index) => (
            <div
              key={`${job.company}-${job.period}`}
              className={
                index === 0 ? "" : `border-t-[5px] ${DIVIDER} pt-20`
              }
            >
              <div className="flex flex-wrap items-start gap-5">
                <div className="flex w-full max-w-[600px] shrink-0 flex-col gap-3 text-2xl leading-[1.6]">
                  <h3 className="font-medium">{job.title}</h3>
                  <div className="flex flex-col gap-0.5 text-muted">
                    <p>{job.company}</p>
                    <p>{job.period}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
                <ul className="ms-9 min-w-0 flex-1 list-disc text-2xl leading-[1.6] text-pretty">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start">
        <SectionLabel>SKILLS</SectionLabel>
        <section
          aria-label="Skills"
          className={`flex min-w-0 flex-1 flex-col items-start border-t-[5px] ${DIVIDER} pt-20 text-2xl`}
        >
          <div className="flex w-full flex-wrap gap-5">
            <div className="flex w-full max-w-[600px] flex-col gap-12">
              {skillGroups.slice(0, 2).map((group) => (
                <div key={group.label} className="flex flex-col gap-3">
                  <h4 className="leading-[1.6]">{group.label}</h4>
                  <ul className="list-disc text-muted">
                    {group.items.map((item) => (
                      <li key={item} className="ms-9 leading-[1.6]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex min-w-[260px] flex-1 flex-col gap-3">
              <h4 className="leading-[1.6]">{skillGroups[2].label}</h4>
              <ul className="list-disc text-muted">
                {skillGroups[2].items.map((item) => (
                  <li key={item} className="ms-9 leading-[1.6]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start">
        <SectionLabel>EDUCATION</SectionLabel>
        <section
          aria-label="Educational background"
          className={`flex min-w-0 flex-1 flex-col items-start border-t-[5px] ${DIVIDER} py-20 text-2xl`}
        >
          <div>
            <h4 className="mb-0 leading-[1.4]">{education.degree}</h4>
            <h4 className="leading-[1.4] text-muted">{education.school}</h4>
          </div>
        </section>
      </div>

      <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start">
        <SectionLabel>CERTIFICATIONS</SectionLabel>
        <section
          aria-label="Certifications"
          className={`flex min-w-0 flex-1 flex-col items-start border-t-[5px] ${DIVIDER} pt-20 text-2xl`}
        >
          <div className="grid grid-cols-1 gap-x-[37px] gap-y-[37px] sm:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.title}>
                <h4 className="mb-0 leading-[1.4]">{cert.title}</h4>
                <h4 className="leading-[1.4] text-muted">{cert.school}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
