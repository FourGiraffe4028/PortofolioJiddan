import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useApp } from "../store";
import { NAV_IDS } from "../data";
import { scrollToId } from "../lenis";

export default function Navbar() {
  const { t } = useApp();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 180 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    setActive(id);
    scrollToId(id);
  };

  const linkCls = (id) =>
    `relative text-[13px] font-medium tracking-wide transition-colors duration-300 ${
      active === id ? "text-[var(--rose)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
    }`;

  return (
    <motion.header
      animate={{ y: hidden ? "-120%" : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[70]"
    >
      <nav
        className={`mx-4 mt-4 flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-[background-color,box-shadow,border-color] duration-500 lg:mx-auto ${
          scrolled ? "glass shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)]" : "border border-transparent"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => go(e, "home")}
          data-testid="nav-logo"
          aria-label="Home"
          className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-105"
        >
          <img
            src="/assets/logo.png"
            alt="JA Logo"
            className="h-10 w-10 rounded-xl object-cover shadow-sm ring-1 ring-[var(--line)]"
          />
        </a>

        {/* Right-aligned navigation items & mobile menu trigger */}
        <div className="flex items-center gap-7">
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_IDS.map((id) => (
              <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} data-testid={`nav-link-${id}`} className={linkCls(id)}>
                {t.nav[id]}
                {active === id && (
                  <motion.span layoutId="nav-dot" className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--rose)]" />
                )}
              </a>
            ))}
          </div>

          <button
            data-testid="nav-hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] lg:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-4 mt-2 rounded-2xl p-6 lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-4">
              {NAV_IDS.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  data-testid={`mobile-nav-link-${id}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`font-display text-2xl ${active === id ? "text-gradient" : "text-[var(--ink)]"}`}
                >
                  {t.nav[id]}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
