import { motion } from "framer-motion";
import { useApp } from "../store";
import { Reveal } from "./Bits";
import SukicchuunoAsciiBackground from "./SukicchuunoAsciiBackground";

export default function Skills() {
  const { t } = useApp();
  const skills = t.skills;

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative bg-[var(--bg-alt)] px-6 py-16 md:px-12 md:py-20 lg:px-20 overflow-hidden"
    >
      {/* Hakos Baelz - Sukicchuuno Colored ASCII Background Animation */}
      <SukicchuunoAsciiBackground />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Main Container Card: Transparent Liquid Glass allowing full video visibility */}
        <div className="rounded-3xl border border-white/15 bg-black/25 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-[2px] sm:p-12 lg:p-16">
          
          {/* Header Area */}
          <div>
            <Reveal>
              <div className="mb-3 flex items-center gap-3">
                <span className="font-num text-xs tracking-[0.35em] text-[var(--gold)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {skills.num}
                </span>
                <span className="h-px w-12 bg-[var(--gold)]/80" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--ink)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-4xl lg:text-5xl">
                {skills.title}
              </h2>
            </Reveal>

            {skills.sub && (
              <Reveal delay={0.14}>
                <p className="mt-3 max-w-2xl text-sm font-normal text-[var(--ink)]/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] sm:text-base">
                  {skills.sub}
                </p>
              </Reveal>
            )}
          </div>

          {/* Horizontal Line under Title */}
          <Reveal delay={0.18}>
            <div className="my-8 h-[2px] w-full bg-white/20 sm:my-10" />
          </Reveal>

          {/* Two-Column Layout: Hard Skill vs Soft Skill */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0">
            
            {/* Left Column: Hard Skill */}
            <div className="lg:pr-12 xl:pr-16" data-testid="hard-skills-list">
              <Reveal delay={0.22}>
                <h3 className="font-display inline-block border-b-2 border-[var(--rose)] pb-1 text-2xl font-bold tracking-wide text-[var(--ink)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] sm:text-3xl">
                  {skills.hardTitle}
                </h3>
              </Reveal>

              <ul className="mt-8 space-y-4">
                {skills.hardSkills.map((skill, i) => (
                  <Reveal key={skill} delay={0.25 + i * 0.04}>
                    <li
                      data-testid={`hard-skill-item-${i}`}
                      className="group flex items-start gap-3.5 transition-transform duration-200 hover:translate-x-1.5"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)] shadow-[0_0_6px_var(--gold)] transition-transform duration-200 group-hover:scale-150" />
                      <span className="text-base font-medium leading-relaxed text-[var(--ink)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] transition-colors duration-200 group-hover:text-[var(--gold)] sm:text-lg">
                        {skill}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Right Column: Soft Skill (separated by vertical divider on lg) */}
            <div
              className="border-t border-white/15 pt-10 lg:border-l lg:border-t-0 lg:border-white/15 lg:pl-12 lg:pt-0 xl:pl-16"
              data-testid="soft-skills-list"
            >
              <Reveal delay={0.22}>
                <h3 className="font-display inline-block border-b-2 border-[var(--rose)] pb-1 text-2xl font-bold tracking-wide text-[var(--ink)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] sm:text-3xl">
                  {skills.softTitle}
                </h3>
              </Reveal>

              <ul className="mt-8 space-y-4">
                {skills.softSkills.map((skill, i) => (
                  <Reveal key={skill} delay={0.25 + i * 0.04}>
                    <li
                      data-testid={`soft-skill-item-${i}`}
                      className="group flex items-start gap-3.5 transition-transform duration-200 hover:translate-x-1.5"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)] shadow-[0_0_6px_var(--gold)] transition-transform duration-200 group-hover:scale-150" />
                      <span className="text-base font-medium leading-relaxed text-[var(--ink)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] transition-colors duration-200 group-hover:text-[var(--gold)] sm:text-lg">
                        {skill}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
