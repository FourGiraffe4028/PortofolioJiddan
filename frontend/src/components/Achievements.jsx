import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
import { useApp } from "../store";
import { Reveal, SectionHeading } from "./Bits";

function CertCard({ a, onClick, large = false }) {
  return (
    <div
      className={`cert-frame card-lift flex h-full cursor-zoom-in flex-col items-center justify-center rounded-2xl bg-[var(--surface)] text-center ${large ? "p-12" : "p-8"}`}
      onClick={onClick}
    >
      <span className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--rose)] text-[#191715] shadow-sm ${large ? "h-16 w-16" : "h-12 w-12"}`}>
        <Award size={large ? 28 : 20} className="stroke-[2.2]" />
      </span>
      <h3 className={`font-display mt-5 leading-snug ${large ? "text-2xl md:text-3xl" : "text-lg"}`}>{a.title}</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">{a.issuer}</p>
      <p className="font-num mt-3 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{a.year}</p>
    </div>
  );
}

export default function Achievements() {
  const { t } = useApp();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="achievements" data-testid="achievements-section" className="bg-[var(--bg-alt)] px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading num={t.achievements.num} title={t.achievements.title} sub={t.achievements.sub} />

        <Reveal>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef} data-testid="achievements-carousel">
              <div className="flex">
                {t.achievements.items.map((a, i) => (
                  <div key={i} className="min-w-0 flex-[0_0_88%] px-3 sm:flex-[0_0_48%] lg:flex-[0_0_32%]">
                    <CertCard a={a} onClick={() => setLightbox(a)} />
                  </div>
                ))}
              </div>
            </div>
            <button
              data-testid="carousel-prev"
              onClick={prev}
              aria-label="Previous"
              className="absolute -left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--rose)] shadow-lg transition-transform hover:scale-110 md:-left-6"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              data-testid="carousel-next"
              onClick={next}
              aria-label="Next"
              className="absolute -right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--rose)] shadow-lg transition-transform hover:scale-110 md:-right-6"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14">
            <h3 className="font-display flex items-center gap-2 text-xl italic text-[var(--rose)]">
              <Heart size={17} /> {t.achievements.volunteeringTitle}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {t.achievements.volunteering.map((v, i) => (
                <div key={v.title} className="card-lift rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm" data-testid={`volunteering-${i}`}>
                  <span className="font-num text-xs text-[var(--gold)]">{v.year}</span>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--ink)]">{v.title}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(61,31,43,0.7)] p-6 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
            data-testid="achievements-lightbox"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl"
            >
              <CertCard a={lightbox} large onClick={() => setLightbox(null)} />
              <button
                data-testid="lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--rose)] text-[#191715] shadow-lg"
              >
                <X size={18} className="stroke-[2.2]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
