import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Server, Globe, Wrench, FileText, X, FolderOpen, Images, Lock, Layout, ExternalLink, Play } from "lucide-react";
import { useApp } from "../store";
import { Reveal, SectionHeading } from "./Bits";

const catIcons = {
  hardware: Cpu,
  iot: Lock,
  uiux: Layout,
  network: Server,
  web: Globe,
  default: Wrench,
};

const catHues = {
  hardware: "from-[#2A231C] to-[#4A3D2F]",
  iot: "from-[#1A2624] to-[#2B3F3A]",
  uiux: "from-[#1A233A] to-[#2B3859]",
  network: "from-[#1C252E] to-[#2B3947]",
  web: "from-[#242A20] to-[#3B4734]",
};

export default function Portfolio() {
  const { t } = useApp();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const items = t.portfolio.items.filter((it) => filter === "all" || it.cat === filter);

  const openModal = (it) => {
    setSelected(it);
    setActiveImgIndex(0);
  };

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
                  filter === f.id ? "font-bold text-[#191715]" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="portfolio-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--rose)] to-[var(--pink)]"
                    transition={{ duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((it) => {
              const Icon = catIcons[it.cat] || catIcons.default;
              const displayImg = it.images?.[0]?.src || it.image;
              const hasMultipleImgs = it.images && it.images.length > 1;

              return (
                <motion.button
                  layout
                  key={it.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => openModal(it)}
                  data-testid={`portfolio-card-${it.id}`}
                  className="card-lift group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-alt)]">
                    {displayImg ? (
                      <img
                        src={displayImg}
                        alt={it.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${catHues[it.cat] || "from-[#2A231C] to-[#4A3D2F]"}`}>
                        <Icon size={44} className="text-white/85 transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80" />
                    
                    {/* Category Tag */}
                    <span className="absolute bottom-3 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] backdrop-blur-md">
                      {t.portfolio.filters.find((f) => f.id === it.cat)?.label || it.cat}
                    </span>

                    {/* Media Type Badge: Playlist, Video, or Multiple Photos */}
                    {it.playlistId ? (
                      <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-red-600/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-sm">
                        <Play size={11} className="fill-white" />
                        <span>Playlist Video</span>
                      </span>
                    ) : it.video ? (
                      <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-red-600/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-sm">
                        <Play size={11} className="fill-white" />
                        <span>Video Demo</span>
                      </span>
                    ) : hasMultipleImgs ? (
                      <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-white/95 backdrop-blur-md shadow-sm">
                        <Images size={13} className="text-[var(--gold)]" />
                        <span>{it.images.length} Foto</span>
                      </span>
                    ) : null}
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-[var(--ink)]">{it.title}</h3>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">{it.desc}</p>
                  </div>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/65 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-[var(--rose)] px-5 py-2.5 text-sm font-bold text-[#191715] shadow-xl">
                      <FolderOpen size={16} /> {t.portfolio.viewDetails}
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
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            data-testid="portfolio-modal"
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl"
            >
              {/* Media Preview Container with Backdrop Letterbox effect or Embedded Video */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/90 flex items-center justify-center">
                {(() => {
                  if (selected.youtubeId) {
                    const embedUrl = selected.playlistId
                      ? `https://www.youtube.com/embed/videoseries?list=${selected.playlistId}&rel=0`
                      : `https://www.youtube.com/embed/${selected.youtubeId}?start=${selected.youtubeStart || 0}&rel=0`;

                    return (
                      <div className="h-full w-full">
                        <iframe
                          className="h-full w-full"
                          src={embedUrl}
                          title={selected.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    );
                  }

                  const currentImgSrc = selected.images
                    ? selected.images[activeImgIndex]?.src || selected.image
                    : selected.image;
                  const currentLabel = selected.images?.[activeImgIndex]?.label;

                  if (currentImgSrc) {
                    return (
                      <>
                        {/* Subtle blurred backdrop behind the active image */}
                        <img
                          src={currentImgSrc}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                        />
                        <motion.img
                          key={currentImgSrc}
                          src={currentImgSrc}
                          alt={selected.title}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="relative z-10 max-h-full max-w-full object-contain"
                        />
                        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85" />
                        
                        {/* Category & Photo Caption overlay */}
                        <div className="absolute bottom-4 left-6 right-6 z-30 flex items-center justify-between gap-4">
                          <span className="rounded-full border border-white/10 bg-black/70 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[var(--gold)] backdrop-blur-md">
                            {t.portfolio.filters.find((f) => f.id === selected.cat)?.label || selected.cat}
                          </span>
                          {currentLabel && (
                            <span className="rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs italic text-[var(--ink)]/90 backdrop-blur-md">
                              {currentLabel}
                            </span>
                          )}
                        </div>
                      </>
                    );
                  }

                  const Icon = catIcons[selected.cat] || catIcons.default;
                  return (
                    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${catHues[selected.cat] || "from-[#2A231C] to-[#4A3D2F]"}`}>
                      <Icon size={56} className="text-white/85" />
                    </div>
                  );
                })()}
              </div>

              {/* Multi-Photo Thumbnail Selector */}
              {!selected.youtubeId && selected.images && selected.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto border-b border-[var(--line)] bg-black/40 p-3.5">
                  {selected.images.map((imgObj, idx) => {
                    const src = typeof imgObj === "string" ? imgObj : imgObj.src;
                    const label = typeof imgObj === "string" ? `Foto ${idx + 1}` : imgObj.label;
                    const isActive = activeImgIndex === idx;

                    return (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImgIndex(idx)}
                        className={`group flex shrink-0 items-center gap-2.5 rounded-xl border p-1.5 transition-all text-left ${
                          isActive
                            ? "border-[var(--gold)] bg-[var(--surface)] ring-1 ring-[var(--gold)]"
                            : "border-transparent bg-black/50 text-[var(--muted)] hover:border-[var(--line)] hover:text-white"
                        }`}
                      >
                        <img
                          src={src}
                          alt={label}
                          className="h-11 w-16 rounded-lg object-cover ring-1 ring-white/10"
                        />
                        <span className={`pr-2 text-xs font-semibold ${isActive ? "text-[var(--gold)]" : "text-[var(--muted)]"}`}>
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Modal Details Content */}
              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold leading-snug text-[var(--ink)]">{selected.title}</h3>
                  <button
                    data-testid="portfolio-modal-close"
                    onClick={() => setSelected(null)}
                    aria-label={t.portfolio.closeLabel}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--rose)] hover:text-[var(--rose)]"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  {[
                    [t.portfolio.modalLabels.background, selected.background],
                    [t.portfolio.modalLabels.role, selected.role],
                    [t.portfolio.modalLabels.outcome, selected.outcome],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">{label}</span>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)] md:text-base">{value}</p>
                    </div>
                  ))}
                  
                  {/* Status & Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--bg-alt)]/60 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="shrink-0 text-[var(--gold)]" />
                      <span className="text-xs font-medium text-[var(--muted)]">
                        {t.portfolio.modalLabels.deliverable}: <strong className="text-[var(--ink)]">{t.portfolio.pending}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {selected.link && (
                        <a
                          href={selected.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--rose)] px-4 py-1.5 text-xs font-bold text-[#191715] shadow-md transition-transform duration-300 hover:scale-105"
                        >
                          Buka Website <ExternalLink size={13} />
                        </a>
                      )}

                      {selected.video && (
                        <a
                          href={selected.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white shadow-md transition-transform duration-300 hover:scale-105 hover:bg-red-700"
                        >
                          <Play size={11} className="fill-white" /> {selected.playlistId ? "Buka Playlist di YouTube" : "Tonton di YouTube"} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
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
