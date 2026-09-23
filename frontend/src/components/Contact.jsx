import { useState } from "react";
import { MessageCircle, Mail, Linkedin, MapPin, Send, Github } from "lucide-react";
import { useApp } from "../store";
import { WHATSAPP_NUMBER, EMAIL, LINKEDIN, GITHUB, LOCATION } from "../data";
import { Reveal, SectionHeading } from "./Bits";

export default function Contact() {
  const { t } = useApp();
  const [msg, setMsg] = useState("");
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}${msg.trim() ? `?text=${encodeURIComponent(msg.trim())}` : ""}`;

  const rows = [
    { icon: Mail, label: t.contact.emailLabel, value: EMAIL, href: `mailto:${EMAIL}`, testid: "contact-email" },
    { icon: Linkedin, label: t.contact.linkedinLabel, value: "linkedin.com/in/jiddanarmansiyah", href: LINKEDIN, testid: "contact-linkedin" },
    { icon: Github, label: "GitHub", value: "github.com/FourGiraffe4028", href: GITHUB, testid: "contact-github" },
    { icon: MapPin, label: t.contact.locationLabel, value: LOCATION, href: null, testid: "contact-location" },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading num={t.contact.num} title={t.contact.title} sub={t.contact.sub} />
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {rows.map((r, i) => {
              const Icon = r.icon;
              const inner = (
                <div className="card-lift flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm" data-testid={r.testid}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-[#191715] shadow-sm">
                    <Icon size={19} className="stroke-[2.2]" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">{r.label}</p>
                    <p className="text-sm font-semibold text-[var(--ink)]">{r.value}</p>
                  </div>
                </div>
              );
              return (
                <Reveal key={r.label} delay={i * 0.08}>
                  {r.href ? (
                    <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] p-8 text-[#191715] shadow-xl md:p-10" data-testid="contact-whatsapp-card">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#191715]/10 text-[#191715]">
                <MessageCircle size={26} className="stroke-[2.2]" />
              </span>
              <h3 className="font-display mt-5 text-2xl md:text-3xl text-[#191715]">{t.contact.whatsappTitle}</h3>
              <p className="mt-2 text-sm text-[#191715]/80">{t.contact.whatsappSub}</p>
              <label htmlFor="wa-message" className="mt-7 block text-xs font-bold uppercase tracking-[0.2em] text-[#191715]/75">
                {t.contact.quickLabel}
              </label>
              <textarea
                id="wa-message"
                data-testid="contact-message-input"
                rows={3}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={t.contact.quickPlaceholder}
                className="mt-2 w-full resize-none rounded-2xl border border-[#191715]/20 bg-[#191715]/5 px-4 py-3 text-sm text-[#191715] placeholder-[#191715]/50 outline-none backdrop-blur-sm transition-colors focus:border-[#191715]/50"
              />
              <a
                data-testid="contact-whatsapp-send"
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#191715] px-7 py-3.5 text-sm font-bold text-[var(--ink)] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-[#23201C]"
              >
                <Send size={15} /> {t.contact.send}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
