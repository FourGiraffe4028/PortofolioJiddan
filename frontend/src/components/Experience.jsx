import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Briefcase, Laptop, Network, Server, Cpu } from "lucide-react";
import { useApp } from "../store";
import { SectionHeading } from "./Bits";

const iconMap = {
  laptop: Laptop,
  network: Network,
  server: Server,
  cpu: Cpu,
};

export default function Experience() {
  const { t } = useApp();
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 0.78", "end 0.6"] });

  return (
    <section id="experience" data-testid="experience-section" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading num={t.experience.num} title={t.experience.title} sub={t.experience.sub} />
        <div ref={lineRef} className="relative pl-10 md:pl-16">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-[var(--line)] md:left-6" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-[var(--rose)] to-[var(--pink)] md:left-6"
          />
          {t.experience.items.map((job, i) => {
            const IconComponent = (job.icon && iconMap[job.icon]) || (i === 0 ? Laptop : Network);
            return (
              <motion.article
                key={job.company}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.75, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className={`relative mb-10 ${job.featured ? "" : "md:ml-10"}`}
                data-testid={`experience-item-${i}`}
              >
                <span className="absolute -left-10 top-8 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-[#191715] shadow-sm ring-4 ring-[var(--bg)] md:-left-16 md:h-9 md:w-9">
                  <IconComponent size={15} className="stroke-[2.2]" />
                </span>
                <div
                  className={`card-lift rounded-3xl border bg-[var(--surface)] shadow-sm ${
                    job.featured ? "border-[var(--rose)]/30 p-8 md:p-10" : "border-[var(--line)] p-7"
                  }`}
                >
                  {job.featured && (
                    <span className="chip mb-4">
                      <Briefcase size={12} className="mr-1.5" /> {job.role}
                    </span>
                  )}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className={`font-display leading-snug ${job.featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>{job.company}</h3>
                    <span className="font-num text-sm text-[var(--gold)]">{job.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[var(--rose)]">
                    {[job.role, job.location].filter(Boolean).join(" · ")}
                  </p>
                  <p className={`mt-4 leading-relaxed text-[var(--muted)] ${job.featured ? "text-base md:text-lg" : "text-sm"}`}>{job.desc}</p>
                  <div className="mt-5 space-y-2.5">
                    {job.tasks.map((task) => (
                      <div key={task} className="flex items-start gap-3 rounded-xl border border-[var(--line)]/60 bg-[var(--bg)]/40 px-4 py-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--pink)]" />
                        <span className="text-sm text-[var(--ink)]/90 leading-relaxed">{task}</span>
                        {job.pendingNote && (
                          <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-widest text-[var(--rose)]/70">
                            {job.pendingNote}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  {job.tags && job.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="chip text-xs">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
