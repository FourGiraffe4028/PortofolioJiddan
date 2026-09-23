import { motion } from "framer-motion";
import { Mail, Linkedin, MessageCircle, Github } from "lucide-react";
import { useApp } from "../store";
import { NAV_IDS, EMAIL, LINKEDIN, GITHUB, WHATSAPP_NUMBER } from "../data";
import { scrollToId } from "../lenis";

export default function Footer() {
  const { t } = useApp();
  const socials = [
    { icon: Mail, href: `mailto:${EMAIL}`, label: "Email", testid: "footer-email" },
    { icon: Linkedin, href: LINKEDIN, label: "LinkedIn", testid: "footer-linkedin" },
    { icon: Github, href: GITHUB, label: "GitHub", testid: "footer-github" },
    { icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp", testid: "footer-whatsapp" },
  ];

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-alt)] px-6 py-14 md:px-12 lg:px-20" data-testid="footer">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("home");
            }}
            className="inline-block transition-transform duration-300 hover:scale-105"
            aria-label="Home"
          >
            <img
              src="/assets/logo.png"
              alt="JA Logo"
              className="h-12 w-12 rounded-xl object-cover shadow-sm ring-1 ring-[var(--line)]"
            />
          </a>
          <p className="mt-3 max-w-xs font-display text-sm italic text-[var(--muted)]">{t.footer.tagline}</p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--gold)]">{t.footer.explore}</h4>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                data-testid={`footer-link-${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(id);
                }}
                className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--rose)]"
              >
                {t.nav[id]}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--gold)]">{t.footer.connect}</h4>
          <div className="mt-4 flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  data-testid={s.testid}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-[#191715] shadow-md"
                >
                  <Icon size={18} className="stroke-[2.2]" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-[var(--line)] pt-6 text-center text-xs text-[var(--muted)]">
        {t.footer.rights}
      </div>
    </footer>
  );
}
