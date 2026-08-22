import {
  certifications,
  education,
  experience,
  skillGroups,
} from "@/lib/about";

const DIVIDER = "border-[#383838]";

export function ExperienceSection() {
  return (
    <section className="flex w-full flex-col gap-5 px-10 pb-20 sm:flex-row">
      <div className="top-0 shrink-0 pr-[40px] sm:sticky sm:w-[445px]">
        <p className={`border-t-[5px] ${DIVIDER} py-8 text-2xl font-medium tracking-[-0.24px]`}>
          EXPERIENCE
        </p>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-20">
        <div className={`flex flex-col gap-20 border-t-[5px] ${DIVIDER} py-20`}>
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

        <section
          aria-label="Skills"
          className={`flex flex-col gap-10 border-t-[5px] ${DIVIDER} pt-20 text-2xl`}
        >
          <h2 className="font-medium">Skills</h2>
          <div className="flex flex-wrap gap-5">
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

        <section
          aria-label="Educational background"
          className={`flex flex-col gap-10 border-t-[5px] ${DIVIDER} pt-20 text-2xl`}
        >
          <h2 className="font-medium">Education</h2>
          <div>
            <h4 className="mb-0 leading-[1.4]">{education.degree}</h4>
            <h4 className="leading-[1.4] text-muted">{education.school}</h4>
          </div>
        </section>

        <section
          aria-label="Certifications"
          className={`flex flex-col gap-10 border-t-[5px] ${DIVIDER} pt-20 pb-20 text-2xl`}
        >
          <h2 className="font-medium">Certifications:</h2>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
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
