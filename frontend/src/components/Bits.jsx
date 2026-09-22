import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 40, x = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export function SectionHeading({ num, title, sub }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-5 flex items-center gap-4">
          <span className="font-num text-sm tracking-[0.35em] text-[var(--gold)]">{num}</span>
          <span className="h-px w-16 bg-[var(--gold)]/60" />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-base text-[var(--muted)] md:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
