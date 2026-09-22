import { motion } from "framer-motion";
import { Briefcase, Languages, PenLine, Mic, CalendarCheck, ClipboardList, Boxes, Wrench } from "lucide-react";
import { useApp } from "../store";
import { Reveal, SectionHeading } from "./Bits";

const icons = {
  briefcase: Briefcase,
  languages: Languages,
  pen: PenLine,
  mic: Mic,
  calendar: CalendarCheck,
  clipboard: ClipboardList,
  boxes: Boxes,
};

export default function Skills() {
  const { t } = useApp();
  return (
    <section id="skills" data-testid="skills-section" className="bg-[var(--bg-alt)] px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading num={t.skills.num} title={t.skills.title} sub={t.skills.sub} />

        <div className="grid gap-12 lg:grid-cols-[45%_55%]">
          <div>
            <Reveal>
              <h3 className="font-display text-xl italic text-[var(--rose)]">{t.skills.langTitle}</h3>
            </Reveal>
            <div className="mt-6 space-y-8">
              {t.skills.languages.map((l, li) => (
                <Reveal key={l.name} delay={0.08 * li}>
                  <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm" data-testid={`skill-lang-${li}`}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-num text-lg text-[var(--ink)]">{l.name}</span>
                      <span className="font-num text-sm text-[var(--rose)]">{l.pct}%</span>
                    </div>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--bg-alt)]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-[var(--rose)] via-[var(--pink)] to-[var(--gold)]"
                      />
                    </div>
                    <p className="mt-2.5 text-xs italic text-[var(--muted)]">{l.note}</p>
                    {l.aspects.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {l.aspects.map((a) => (
                          <span key={a} className="rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                            {a}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <h3 className="font-display mt-10 text-xl italic text-[var(--rose)]">{t.skills.softTitle}</h3>
              <div className="mt-4 flex flex-wrap gap-2" data-testid="skill-soft">
                {t.skills.soft.map((s) => (
                  <span key={s} className="chip !px-4 !py-2 !text-xs">{s}</span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="font-display mt-10 flex items-center gap-2 text-xl italic text-[var(--rose)]">
                <Wrench size={17} /> {t.skills.toolsTitle}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2" data-testid="skill-tools">
                {t.skills.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--ink)]">
                    {tool}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="font-display text-xl italic text-[var(--rose)]">{t.skills.profTitle}</h3>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {t.skills.professional.map((p, i) => {
                const Icon = icons[p.icon];
                return (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
                    className="card-lift flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm"
                    data-testid={`skill-prof-${i}`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-[#191715] shadow-sm">
                      <Icon size={19} className="stroke-[2.2]" />
                    </span>
                    <span className="text-sm font-semibold leading-snug text-[var(--ink)]">{p.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
