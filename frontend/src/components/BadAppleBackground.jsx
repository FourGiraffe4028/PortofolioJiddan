import { useEffect, useRef, useState, useCallback } from "react";
import LZString from "lz-string";
import { Play, Pause, Volume2, VolumeX, Eye, Maximize2, Minimize2 } from "lucide-react";

const OPACITY_PRESETS = [0.28, 0.45, 0.70];

export default function BadAppleBackground() {
  const containerRef = useRef(null);
  const preRef = useRef(null);
  const audioRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const framesRef = useRef(null);
  const startTimeRef = useRef(0);
  const pauseTimeRef = useRef(0);
  const isPlayingRef = useRef(true);
  const isInViewRef = useRef(false);

  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [opacityIndex, setOpacityIndex] = useState(0);
  const [isCover, setIsCover] = useState(true);
  const [fontSize, setFontSize] = useState(24);

  const currentOpacity = OPACITY_PRESETS[opacityIndex];

  // Dynamically calculate responsive font-size to ensure wide, full-coverage display
  const handleResize = useCallback(() => {
    if (!containerRef.current) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 100 columns ASCII art:
    // With monospace font, width is approx 0.6 * fontSize.
    // 41 lines: height is approx 1.05 * 41 * fontSize ≈ 43 * fontSize.
    const sizeFromW = width / 58;
    const sizeFromH = height / 42;

    const baseSize = isCover ? Math.max(sizeFromW, sizeFromH) : Math.min(sizeFromW, sizeFromH);
    const calculated = Math.max(12, Math.min(42, Math.round(baseSize)));
    setFontSize(calculated);
  }, [isCover]);

  // Fetch and decompress framesData.lz
  useEffect(() => {
    let canceled = false;
    handleResize();
    window.addEventListener("resize", handleResize);

    const loadData = async () => {
      try {
        const res = await fetch("/assets/framesData.lz");
        if (!res.ok) throw new Error("Gagal mengambil framesData.lz");
        const compressedBase64 = await res.text();
        if (canceled) return;

        const decompressed = LZString.decompressFromBase64(compressedBase64);
        if (canceled || !decompressed) return;

        const parsed = JSON.parse(decompressed);
        framesRef.current = parsed;
        startTimeRef.current = performance.now();
        setLoaded(true);
      } catch (err) {
        console.error("Gagal memuat Bad Apple ASCII:", err);
      }
    };

    loadData();

    return () => {
      canceled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // Main animation render loop (pure DOM update for 60fps performance without React re-renders)
  const renderLoop = useCallback(() => {
    if (!isPlayingRef.current || !isInViewRef.current || !framesRef.current || !preRef.current) {
      return;
    }

    const frames = framesRef.current;
    const audio = audioRef.current;
    let targetIndex = 0;

    if (audio && !audio.paused) {
      targetIndex = Math.floor(audio.currentTime * 30);
      if (targetIndex >= frames.length) {
        targetIndex = targetIndex % frames.length;
      }
    } else {
      const elapsedMs = performance.now() - startTimeRef.current;
      targetIndex = Math.floor((elapsedMs / (1000 / 30)) % frames.length);
    }

    const currentFrame = frames[targetIndex];
    if (currentFrame) {
      preRef.current.textContent = currentFrame.replace(/\\n/g, "\n");
    }

    animFrameIdRef.current = requestAnimationFrame(renderLoop);
  }, []);

  // Sync animation playing state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (isPlaying && loaded && isInViewRef.current) {
      if (pauseTimeRef.current > 0) {
        const pausedDuration = performance.now() - pauseTimeRef.current;
        startTimeRef.current += pausedDuration;
        pauseTimeRef.current = 0;
      }
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    } else {
      if (!pauseTimeRef.current) {
        pauseTimeRef.current = performance.now();
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying, loaded, renderLoop]);

  // IntersectionObserver: Only animate when section is in viewport (saves CPU/Battery)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            if (isPlayingRef.current && loaded) {
              animFrameIdRef.current = requestAnimationFrame(renderLoop);
            }
          } else {
            if (animFrameIdRef.current) {
              cancelAnimationFrame(animFrameIdRef.current);
            }
            if (audioRef.current && !audioRef.current.paused) {
              audioRef.current.pause();
              setIsAudioPlaying(false);
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded, renderLoop]);

  // Toggle play/pause
  const handleTogglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (!next && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
      return next;
    });
  };

  // Toggle audio
  const handleToggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      // Sync audio currentTime with current ASCII animation frame
      if (framesRef.current) {
        const elapsedSec = ((performance.now() - startTimeRef.current) / 1000) % (framesRef.current.length / 30);
        audio.currentTime = elapsedSec;
      }
      audio.play().then(() => {
        setIsAudioPlaying(true);
        if (!isPlaying) setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play prevented:", err);
      });
    }
  };

  // Cycle opacity levels
  const handleCycleOpacity = () => {
    setOpacityIndex((prev) => (prev + 1) % OPACITY_PRESETS.length);
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 select-none"
      aria-hidden="true"
    >
      {/* Audio Element */}
      <audio ref={audioRef} src="/assets/bad_apple.mp3" loop preload="none" />

      {/* Floating Interactive Controls in Education Section */}
      <div className="pointer-events-auto absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/85 px-3 py-1.5 text-xs shadow-md backdrop-blur-md transition-all md:right-8 md:top-8">
        <div className="flex items-center gap-1.5 pr-1 font-medium text-[var(--ink)]">
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${
                isPlaying && loaded ? "animate-ping bg-emerald-400 opacity-75" : "bg-gray-400 opacity-40"
              }`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                isPlaying && loaded ? "bg-emerald-500" : "bg-gray-400"
              }`}
            />
          </span>
          <span className="hidden font-semibold sm:inline">Bad Apple</span>
          <span className="font-mono text-[10px] text-[var(--muted)]">ASCII</span>
        </div>

        <div className="h-3 w-px bg-[var(--line)]" />

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          title={isPlaying ? "Jeda animasi" : "Putar animasi"}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--line)]/50 hover:text-[var(--rose)]"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} className="translate-x-0.5" />}
        </button>

        {/* Audio Mute/Unmute Button */}
        <button
          type="button"
          onClick={handleToggleAudio}
          title={isAudioPlaying ? "Matikan musik Bad Apple" : "Putar musik Bad Apple"}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
            isAudioPlaying
              ? "bg-[var(--rose)] text-[#191715] shadow-sm"
              : "text-[var(--muted)] hover:bg-[var(--line)]/50 hover:text-[var(--ink)]"
          }`}
          aria-label={isAudioPlaying ? "Mute music" : "Play music"}
        >
          {isAudioPlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </button>

        {/* Opacity Cycle Button */}
        <button
          type="button"
          onClick={handleCycleOpacity}
          title={`Ubah kecerahan latar (${Math.round(currentOpacity * 100)}%)`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--line)]/50 hover:text-[var(--ink)]"
          aria-label="Cycle opacity"
        >
          <Eye size={13} />
        </button>

        {/* Size Mode Toggle: Full Cover / Fit */}
        <button
          type="button"
          onClick={() => setIsCover((prev) => !prev)}
          title={isCover ? "Ukuran: Penuh (Cover) - Klik untuk Fit" : "Ukuran: Pas (Fit) - Klik untuk Penuh"}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--line)]/50 hover:text-[var(--ink)]"
          aria-label="Toggle size mode"
        >
          {isCover ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
        </button>
      </div>

      {/* Sticky ASCII Renderer: Follows viewport as user scrolls through the Education section */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <pre
          ref={preRef}
          className="font-mono leading-[1.04] tracking-tight whitespace-pre text-center select-none transition-opacity duration-300"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: 'Consolas, "Courier New", Monaco, monospace',
            color: "var(--ink)",
            opacity: currentOpacity,
            maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
            textShadow: "0 0 12px rgba(216, 195, 176, 0.18)",
          }}
        >
          {!loaded && (
            <span className="text-xs text-[var(--muted)] italic">Memuat Bad Apple ASCII...</span>
          )}
        </pre>
      </div>
    </div>
  );
}
