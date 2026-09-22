import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useApp } from "../store";
import { SectionHeading } from "./Bits";
import BadAppleBackground from "./BadAppleBackground";

export default function Education() {
  const { t } = useApp();
  return (
    <section id="education" data-testid="education-section" className="relative bg-[var(--bg-alt)] px-6 py-24 md:px-12 md:py-32 lg:px-20">
      {/* Bad Apple ASCII Background Animation */}
      <BadAppleBackground />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading num={t.education.num} title={t.education.title} sub={t.education.sub} />
        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-[var(--line)] md:left-1/2 md:-translate-x-1/2" />
          {t.education.items.map((it, i) => {
            const right = i % 2 === 1;
            return (
              <motion.div
                key={it.school}
                initial={{ opacity: 0, x: right ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className={`relative mb-12 pl-12 md:w-1/2 md:pl-0 ${right ? "md:ml-auto md:pl-14" : "md:pr-14"}`}
                data-testid={`education-item-${i}`}
              >
                <span
                  className={`absolute top-2 h-3.5 w-3.5 rounded-full bg-[var(--rose)] ring-4 ring-[var(--bg-alt)] ${
                    right ? "left-4 -translate-x-1/2 md:-left-[7px] md:translate-x-0" : "left-4 -translate-x-1/2 md:left-auto md:-right-[7px] md:translate-x-0"
                  }`}
                />
                <div className="card-lift rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl leading-snug md:text-2xl">{it.school}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">{it.location}</p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-[#191715] shadow-sm">
                      <GraduationCap size={19} className="stroke-[2.2]" />
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[var(--rose)]">{it.period}</p>
                  <p className="mt-1 font-medium text-[var(--ink)]">{it.degree}</p>
                  {it.extra && <p className="font-num mt-1 text-sm text-[var(--navy)]">{it.extra}</p>}
                  {it.image && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--line)] aspect-[16/9] max-h-44 w-full bg-[var(--bg)] shadow-sm">
                      <img
                        src={it.image}
                        alt={it.school}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {it.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                      {it.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--pink)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {it.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {it.tags.map((tag) => (
                        <span key={tag} className="chip">{tag}</span>
                      ))}
                    </div>
                  )}
                  {it.note && (
                    <p className="pending-dash mt-5 rounded-xl px-4 py-2.5 text-xs italic text-[var(--muted)]">{it.note}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
