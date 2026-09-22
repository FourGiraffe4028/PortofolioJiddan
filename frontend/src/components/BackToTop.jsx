import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useApp } from "../store";
import { lenisStore } from "../lenis";

export default function BackToTop() {
  const { t } = useApp();
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          data-testid="back-to-top"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          exit={{ opacity: 0, y: 30 }}
          transition={{
            opacity: { duration: 0.3 },
            y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
          }}
          onClick={() => (lenisStore.instance ? lenisStore.instance.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
          aria-label={t.footer.backTop}
          className="fixed bottom-6 right-6 z-[80] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-[#191715] shadow-xl"
        >
          <ArrowUp size={19} className="stroke-[2.2]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
