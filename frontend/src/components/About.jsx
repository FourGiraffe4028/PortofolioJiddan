import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useApp } from "../store";
import { Reveal, SectionHeading } from "./Bits";

function Stat({ value, suffix = "", decimals = 0, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label.slice(0, 12).replace(/\W+/g, "-").toLowerCase()}`}>
      <div className="font-num text-3xl text-gradient md:text-4xl">
        {display}
        {suffix}
      </div>
      <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-[var(--muted)] md:text-xs">{label}</div>
    </div>
  );
}

export default function About() {
  const { t } = useApp();
  return (
    <section id="about" data-testid="about-section" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading num={t.about.num} title={t.about.title} sub={t.about.sub} />
        <div className="grid items-start gap-14 lg:grid-cols-[42%_58%]">
          <Reveal className="relative">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full bg-[var(--bg-alt)] blur-lg" />
            <div className="card-lift relative -rotate-2 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-xl">
              <img
                src="/assets/jiddan-cafe.jpg"
                alt="Mochammad Jiddan Armansyiah"
                data-testid="about-photo"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[20px] object-cover object-[50%_35%]"
              />
              <p className="mt-4 text-center font-display text-sm italic text-[var(--muted)]">{t.about.photoCaption}</p>
            </div>
          </Reveal>

          <div>
            {t.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className={`text-base leading-relaxed md:text-lg ${i === 0 ? "font-medium text-[var(--ink)]" : "mt-5 text-[var(--muted)]"}`}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <h3 className="font-display mt-10 text-xl italic text-[var(--rose)]">{t.about.infoTitle}</h3>
              <dl className="mt-4 divide-y divide-[var(--line)]">
                {t.about.info.map((row) => (
                  <div key={row.k} className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm md:grid-cols-[150px_1fr]">
                    <dt className="font-semibold uppercase tracking-wider text-[var(--gold)]">{row.k}</dt>
                    <dd className="text-[var(--ink)]">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {t.about.stats?.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-20 grid grid-cols-2 gap-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-6 py-10 shadow-sm sm:grid-cols-3 lg:grid-cols-5" data-testid="about-stats">
              {t.about.stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
