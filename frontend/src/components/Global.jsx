import { motion } from "framer-motion";
import { MapPin, Heart } from "lucide-react";
import { useApp } from "../store";
import { Reveal, SectionHeading } from "./Bits";

export default function Global() {
  const { t } = useApp();
  return (
    <section id="global" data-testid="global-section" className="bg-[var(--bg-alt)] px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading num={t.global.num} title={t.global.title} sub={t.global.sub} />

        <Reveal>
          <div className="relative mx-auto mb-6 max-w-4xl overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm" data-testid="global-map">
            <svg viewBox="0 0 900 360" className="w-full">
              <defs>
                <pattern id="dots" width="34" height="34" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.4" fill="var(--line)" />
                </pattern>
              </defs>
              <rect width="900" height="360" fill="url(#dots)" rx="20" />
              <motion.path
                d="M150 265 C 330 90, 570 90, 750 260"
                fill="none"
                stroke="var(--rose)"
                strokeWidth="2.5"
                strokeDasharray="7 9"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
              />
              {[
                { x: 150, y: 265, label: t.global.from, anchor: "start" },
                { x: 750, y: 260, label: t.global.to, anchor: "end" },
              ].map((p) => (
                <g key={p.label}>
                  <circle cx={p.x} cy={p.y} r="16" fill="var(--pink)" opacity="0.25">
                    <animate attributeName="r" values="10;22;10" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={p.x} cy={p.y} r="6" fill="var(--rose)" />
                  <text x={p.x + (p.anchor === "start" ? 14 : -14)} y={p.y + 34} textAnchor={p.anchor} fontSize="15" fontWeight="600" fill="var(--ink)" fontFamily="Poppins, sans-serif">
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
            <p className="mt-4 text-center font-display text-base italic text-[var(--muted)] md:text-lg">{t.global.mapCaption}</p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.global.programs.map((p, i) => (
            <motion.div
              key={p.program}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-lift flex flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 shadow-sm"
              data-testid={`global-program-${i}`}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">{p.period}</span>
              <h3 className="font-display mt-2 text-xl leading-snug">{p.program}</h3>
              <span className="chip mt-3 self-start">{p.role}</span>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--pink)]" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="card-lift rounded-3xl bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] p-7 text-[#191715] shadow-lg"
            data-testid="global-volunteering"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#191715]/10 text-[#191715]">
              <Heart size={18} className="stroke-[2.2]" />
            </span>
            <h3 className="font-display mt-3 text-xl text-[#191715]">{t.global.volunteeringTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.global.volunteering.map((v) => (
                <li key={v.title} className="flex items-start gap-2.5 text-sm text-[#191715]/90">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#191715]/70" />
                  <span>
                    <span className="font-semibold text-[#191715]">{v.title}</span> · {v.loc}
                    <span className="block text-xs text-[#191715]/70">{v.year}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
