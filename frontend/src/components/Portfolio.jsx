import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, FileText, Megaphone, CalendarCheck, X, FolderOpen } from "lucide-react";
import { useApp } from "../store";
import { Reveal, SectionHeading } from "./Bits";

const catIcons = { writing: PenLine, business: FileText, media: Megaphone, events: CalendarCheck };
const catHues = {
  writing: "from-[#D45D79] to-[#F2789F]",
  business: "from-[#1F2A5A] to-[#4A5BB5]",
  media: "from-[#F2789F] to-[#C9A227]",
  events: "from-[#C9A227] to-[#D45D79]",
};

export default function Portfolio() {
  const { t } = useApp();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const items = t.portfolio.items.filter((it) => filter === "all" || it.cat === filter);

  return (
    <section id="portfolio" data-testid="portfolio-section" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading num={t.portfolio.num} title={t.portfolio.title} sub={t.portfolio.sub} />

        <Reveal>
          <div className="mb-12 flex flex-wrap gap-2">
            {t.portfolio.filters.map((f) => (
              <button
                key={f.id}
                data-testid={`portfolio-filter-${f.id}`}
                onClick={() => setFilter(f.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  filter === f.id ? "text-[#191715] font-bold" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {filter === f.id && (
                  <motion.span layoutId="portfolio-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--rose)] to-[var(--pink)]" transition={{ duration: 0.4 }} />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((it) => {
              const Icon = catIcons[it.cat];
              return (
                <motion.button
                  layout
                  key={it.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelected(it)}
                  data-testid={`portfolio-card-${it.id}`}
                  className="card-lift group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm"
                >
                  <div className={`relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${catHues[it.cat]}`}>
                    <Icon size={44} className="text-white/85 transition-transform duration-500 group-hover:scale-110" />
                    <span className="absolute bottom-3 left-4 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                      {t.portfolio.filters.find((f) => f.id === it.cat)?.label}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg leading-snug">{it.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">{it.desc}</p>
                  </div>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[rgba(212,93,121,0.85)] opacity-0 backdrop-blur-[2px] transition-opacity duration-400 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[var(--rose)]">
                      <FolderOpen size={15} /> {t.portfolio.viewDetails}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(61,31,43,0.6)] p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            data-testid="portfolio-modal"
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[var(--surface)] shadow-2xl"
            >
              <div className={`flex aspect-[16/6] items-center justify-center bg-gradient-to-br ${catHues[selected.cat]}`}>
                {(() => {
                  const Icon = catIcons[selected.cat];
                  return <Icon size={56} className="text-white/85" />;
                })()}
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl leading-snug">{selected.title}</h3>
                  <button
                    data-testid="portfolio-modal-close"
                    onClick={() => setSelected(null)}
                    aria-label={t.portfolio.closeLabel}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:text-[var(--rose)]"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="mt-6 space-y-5">
                  {[
                    [t.portfolio.modalLabels.background, selected.background],
                    [t.portfolio.modalLabels.role, selected.role],
                    [t.portfolio.modalLabels.outcome, selected.outcome],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">{label}</span>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{value}</p>
                    </div>
                  ))}
                  <div className="pending-dash flex items-center gap-3 rounded-xl px-4 py-3">
                    <FileText size={15} className="shrink-0 text-[var(--rose)]" />
                    <span className="text-xs italic text-[var(--muted)]">
                      {t.portfolio.modalLabels.deliverable}: {t.portfolio.pending}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
