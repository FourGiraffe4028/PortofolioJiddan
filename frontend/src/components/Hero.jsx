import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, ArrowDown } from "lucide-react";
import { useApp } from "../store";
import { useTyping } from "../hooks";
import { API_URL } from "../data";
import { scrollToId } from "../lenis";

const line = {
  hidden: { y: "115%" },
  show: (i) => ({ y: 0, transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero({ started }) {
  const { t, lang } = useApp();
  const typed = useTyping(t.hero.roles, started);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const blobX = useTransform(sx, [-1, 1], [-14, 14]);
  const blobY = useTransform(sy, [-1, 1], [-10, 10]);
  const bgX = useTransform(sx, [-1, 1], [22, -22]);
  const bgY = useTransform(sy, [-1, 1], [16, -16]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const state = started ? "show" : "hidden";

  return (
    <section
      id="home"
      data-testid="hero-section"
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:px-12 lg:px-20"
    >
      <motion.div style={{ x: bgX, y: bgY }} className="pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full bg-[var(--bg-alt)] blur-3xl" />
      <motion.div style={{ x: bgY, y: bgX }} className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[var(--rose)]/15 blur-3xl" />


      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[55%_45%]">
        <div className="order-2 lg:order-1">


          <h1 className="font-display">
            <span className="block overflow-hidden">
              <motion.span variants={line} custom={0} initial="hidden" animate={state} className="block text-2xl italic text-[var(--muted)] md:text-3xl">
                {t.hero.greeting}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} custom={1} initial="hidden" animate={state} className="text-gradient block text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                {t.hero.name}
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-num mt-5 min-h-[2rem] text-lg text-[var(--rose)] md:text-xl"
            data-testid="hero-typing"
          >
            {typed}
            <span className="typing-caret">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button data-testid="hero-view-work" onClick={() => scrollToId("portfolio")} className="btn-primary">
              {t.hero.viewWork}
            </button>
            <a

              data-testid="hero-download-cv"
              href="/Jiddan_Armansyiah_CV.pdf"
              download="Jiddan_Armansyiah_CV.pdf"
              className="btn-ghost"
            >
              <Download size={16} /> {t.hero.downloadCv}
            </a>
          </motion.div>
        </div>

        <motion.div style={{ x: blobX, y: blobY }} className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={started ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mx-auto aspect-square w-[280px] sm:w-[360px] lg:w-[420px]"
          >
            {/* Ambient soft glow matching taupe & gold */}
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[var(--rose)]/25 via-[var(--gold)]/20 to-[var(--pink)]/20 blur-2xl transition-all duration-700 group-hover:blur-3xl" />
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[var(--gold)]/15 blur-xl" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-[var(--rose)]/20 blur-xl" />

            {/* Rotating subtle ring border */}
            <div className="ring-spin absolute -inset-1 rounded-[2.3rem] opacity-70 blur-[1px]" />

            {/* Main Logo Card - Rounded Square */}
            <div
              data-testid="hero-portrait"
              className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] border border-[var(--glass-border)] bg-[var(--surface)] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-[1.01]"
            >
              <img
                src="/assets/logo.png"
                alt="JA Logo"
                className="h-full w-full rounded-[1.6rem] object-cover shadow-inner"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        data-testid="hero-scroll-down"
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[var(--muted)]"
        aria-label={t.hero.scroll}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
