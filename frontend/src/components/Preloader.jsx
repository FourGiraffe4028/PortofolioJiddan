import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../store";

export default function Preloader({ onDone }) {
  const { t } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 7 + 3));
    }, 90);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <motion.div
      data-testid="preloader"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [1, 1.04, 1] }}
        transition={{ opacity: { duration: 0.6 }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        className="relative"
      >
        <img
          src="/assets/logo.png"
          alt="JA Logo"
          className="h-24 w-24 rounded-2xl object-cover shadow-2xl ring-2 ring-[var(--line)]"
        />
      </motion.div>
      <p className="mt-4 text-xs tracking-[0.25em] uppercase text-[var(--muted)]">{t.preloader.tagline}</p>
      <div className="mt-8 h-[3px] w-56 overflow-hidden rounded-full bg-[var(--line)]">
        <div
          data-testid="preloader-progress"
          className="h-full rounded-full bg-gradient-to-r from-[var(--rose)] to-[var(--pink)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="font-num mt-3 text-sm text-[var(--rose)]">{Math.round(progress)}%</span>
    </motion.div>
  );
}
