import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ShieldCheck, Terminal, Cpu, ZoomIn, X, MapPin, Calendar, Sparkles } from "lucide-react";
import { useApp } from "../store";
import { SectionHeading, Reveal } from "./Bits";

const roleIcons = {
  shield: ShieldCheck,
  terminal: Terminal,
  users: Users,
  cpu: Cpu,
};

export default function Organization() {
  const { t } = useApp();
  const [tab, setTab] = useState("all");
  const [activePhoto, setActivePhoto] = useState(null);

  const org = t.org;
  const club = org.club;

  return (
    <section id="organization" data-testid="organization-section" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading num={org.num} title={org.title} sub={org.sub} />

        {/* Featured Leadership Highlight Card */}
        <Reveal>
          <div className="card-lift relative mb-12 overflow-hidden rounded-3xl border border-[var(--rose)]/30 bg-[var(--surface)] p-8 shadow-md md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="chip text-xs">
                    <Sparkles size={12} className="mr-1 text-[var(--gold)]" /> Organisasi Kampus
                  </span>
                  <span className="font-num text-xs font-semibold text-[var(--gold)]">{club.period}</span>
                </div>
                <h3 className="font-display mt-2 text-2xl font-bold leading-tight md:text-3xl text-[var(--ink)]">
                  {club.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[var(--rose)]">
                  {club.role} · <span className="font-normal text-[var(--muted)]">{club.campus}</span>
                </p>
              </div>

              {/* Quick Highlights Badge Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                {club.highlights.map((h) => (
                  <div key={h.label} className="rounded-xl border border-[var(--line)] bg-[var(--bg)]/50 px-3.5 py-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">{h.label}</p>
                    <p className="mt-0.5 text-xs font-semibold text-[var(--ink)] truncate">{h.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-[var(--muted)] md:text-lg">
              {club.desc}
            </p>

            {club.tags && club.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]/50">
                {club.tags.map((tag) => (
                  <span key={tag} className="chip text-xs">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* Tab Selection Filter */}
        <div className="mb-10 flex flex-wrap gap-2" role="tablist">
          {org.tabs.map((tb) => (
            <button
              key={tb.id}
              role="tab"
              aria-selected={tab === tb.id}
              data-testid={`org-tab-${tb.id}`}
              onClick={() => setTab(tb.id)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${tab === tb.id ? "text-[#191715] font-bold" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
            >
              {tab === tb.id && (
                <motion.span
                  layoutId="org-tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--rose)] to-[var(--pink)]"
                  transition={{ duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{tb.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-14"
          >
            {/* Gallery Section */}
            {(tab === "all" || tab === "gallery") && (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-[#191715] shadow-sm">
                    <Users size={18} className="stroke-[2.2]" />
                  </span>
                  <div>
                    <h4 className="font-display text-xl italic text-[var(--rose)]">Dokumentasi Kegiatan & Workshop LCC</h4>
                    <p className="text-xs text-[var(--muted)]">Klik foto untuk melihat ukuran penuh</p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {org.gallery.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      onClick={() => setActivePhoto(item)}
                      className="card-lift group cursor-zoom-in overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-sm"
                      data-testid={`org-gallery-${item.id}`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg)]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface)]/90 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                        <span className="absolute top-3 left-3 rounded-full bg-[var(--bg)]/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-[var(--gold)] border border-[var(--line)]/50 shadow-sm">
                          {item.tag}
                        </span>
                        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface)]/80 text-[var(--ink)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <ZoomIn size={15} />
                        </span>
                      </div>
                      <div className="p-6">
                        <h5 className="font-display text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--rose)] transition-colors">
                          {item.title}
                        </h5>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Leadership Responsibilities Section */}
            {(tab === "all" || tab === "leadership") && (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--rose)] text-[#191715] shadow-sm">
                    <ShieldCheck size={18} className="stroke-[2.2]" />
                  </span>
                  <div>
                    <h4 className="font-display text-xl italic text-[var(--rose)]">Peran & Tanggung Jawab</h4>
                    <p className="text-xs text-[var(--muted)]">Pilar kepemimpinan dan kontribusi bagi organisasi</p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {org.roles.map((r, i) => {
                    const Icon = roleIcons[r.icon] || ShieldCheck;
                    return (
                      <motion.div
                        key={r.title}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="card-lift rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 shadow-sm"
                        data-testid={`org-role-${i}`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-[#191715] shadow-sm">
                            <Icon size={18} className="stroke-[2.2]" />
                          </span>
                          <div>
                            <h5 className="font-display text-lg font-semibold leading-snug text-[var(--ink)]">{r.title}</h5>
                            <span className="font-num text-xs text-[var(--gold)]">{r.period}</span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{r.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox Modal for Photo Gallery */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
              data-testid="org-photo-modal"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl"
              >
                <div className="relative max-h-[65vh] w-full overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    className="max-h-[65vh] w-auto max-w-full object-contain"
                  />
                  <button
                    onClick={() => setActivePhoto(null)}
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--rose)] text-[#191715] shadow-lg transition-transform hover:scale-105"
                  >
                    <X size={18} className="stroke-[2.2]" />
                  </button>
                </div>
                <div className="p-6 md:p-7">
                  <span className="chip text-xs mb-2 inline-block">{activePhoto.tag}</span>
                  <h4 className="font-display text-xl font-bold text-[var(--ink)] md:text-2xl">
                    {activePhoto.title}
                  </h4>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                    {activePhoto.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
