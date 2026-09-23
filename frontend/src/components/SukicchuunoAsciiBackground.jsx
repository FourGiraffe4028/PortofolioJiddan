import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Eye, Maximize2, Minimize2, Palette } from "lucide-react";

// Presets for vibrant visibility through the transparent glass card
const OPACITY_PRESETS = [0.65, 0.85, 0.45];
// Character ramp with 2 leading spaces for dark background contrast
const ASCII_CHARS = "  ..::--==++**##%%@@";

export default function SukicchuunoAsciiBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const offscreenRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const logicalWidthRef = useRef(1200);
  const logicalHeightRef = useRef(800);

  const isPlayingRef = useRef(true);
  const isInViewRef = useRef(false);
  const isColoredRef = useRef(true);
  const isCoverRef = useRef(true);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [opacityIndex, setOpacityIndex] = useState(0);
  const [isCover, setIsCover] = useState(true);
  const [isColored, setIsColored] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const currentOpacity = OPACITY_PRESETS[opacityIndex];

  // Initialize offscreen canvas once
  useEffect(() => {
    if (!offscreenRef.current) {
      const offCanvas = document.createElement("canvas");
      offscreenRef.current = offCanvas;
    }
  }, []);

  // Sync state to refs for high-performance animation loop
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    isColoredRef.current = isColored;
    isCoverRef.current = isCover;
  }, [isPlaying, isColored, isCover]);

  // Main 60fps colored ASCII render loop using HTML5 2D GPU-accelerated canvas
  const renderLoop = useCallback(() => {
    if (!isPlayingRef.current || !isInViewRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const offscreen = offscreenRef.current;

    if (!video || !canvas || !offscreen || video.readyState < 2) {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    const ctx = canvas.getContext("2d");
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!ctx || !offCtx) {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    const W = logicalWidthRef.current || canvas.width;
    const H = logicalHeightRef.current || canvas.height;
    if (W === 0 || H === 0) {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    // Video natural aspect ratio
    const videoRatio = 16 / 9;

    // Number of columns: responsive based on viewport width
    const cols = W > 1200 ? 115 : W > 768 ? 95 : 70;
    const cellW = W / cols;
    // Monospace character height is ~1.65 * width
    const cellH = cellW * 1.65;
    // Rows needed to completely cover the entire height H plus 1 extra row so there's never a bottom gap
    const rows = Math.ceil(H / cellH) + 1;
    const fontSize = Math.max(9, Math.floor(cellH * 1.05));

    if (offscreen.width !== cols || offscreen.height !== rows) {
      offscreen.width = cols;
      offscreen.height = rows;
    }

    // Video cropping to ensure 100% full cover without gaps or distortion
    const vw = video.videoWidth || 640;
    const vh = video.videoHeight || 360;

    if (isCoverRef.current) {
      // Scale video to fill cols x rows without distortion
      const targetRatio = (cols * cellW) / (rows * cellH * 0.60);
      let sW, sH, sX, sY;
      if (targetRatio > videoRatio) {
        sW = vw;
        sH = sW / targetRatio;
        sX = 0;
        sY = (vh - sH) / 2;
      } else {
        sH = vh;
        sW = sH * targetRatio;
        sX = (vw - sW) / 2;
        sY = 0;
      }
      offCtx.drawImage(
        video,
        Math.max(0, sX),
        Math.max(0, sY),
        Math.min(vw, sW),
        Math.min(vh, sH),
        0,
        0,
        cols,
        rows
      );
    } else {
      // Proportional Fit mode
      offCtx.clearRect(0, 0, cols, rows);
      offCtx.drawImage(video, 0, 0, cols, rows);
    }

    const imgData = offCtx.getImageData(0, 0, cols, rows).data;

    // Scale canvas context for Retina/DPR
    const dpr = canvas.width / W;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    ctx.font = `bold ${fontSize}px "Courier New", Consolas, Monaco, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const chars = ASCII_CHARS;
    const charsLen = chars.length;
    const isColor = isColoredRef.current;

    // Render characters across entire grid to guarantee 100% full coverage
    for (let y = 0; y < rows; y++) {
      const py = y * cellH + cellH * 0.5;
      if (py > H + cellH) break;

      for (let x = 0; x < cols; x++) {
        const px = x * cellW + cellW * 0.5;

        const idx = (y * cols + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];

        // Fast perceptual luminance
        const luminance = (r * 299 + g * 587 + b * 114) / 1000;
        if (luminance < 14) continue;

        const charIdx = Math.min(charsLen - 1, Math.floor((luminance / 255) * charsLen));
        const ch = chars[charIdx];
        if (ch === " ") continue;

        if (isColor) {
          // Vibrant colored ASCII matching Hakos Baelz's anime MV visuals
          ctx.fillStyle = `rgb(${r},${g},${b})`;
        } else {
          // Warm gold/amber monochrome ASCII
          ctx.fillStyle = `rgba(216, 195, 176, ${Math.min(1, luminance / 180)})`;
        }

        ctx.fillText(ch, px, py);
      }
    }

    ctx.restore();
    animFrameIdRef.current = requestAnimationFrame(renderLoop);
  }, []);

  // Handle Canvas Resize: Set canvas dimensions to 100% of container size
  const handleResize = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    logicalWidthRef.current = rect.width;
    logicalHeightRef.current = rect.height;

    canvasRef.current.width = Math.round(rect.width * dpr);
    canvasRef.current.height = Math.round(rect.height * dpr);
  }, []);

  // Setup Resize Listener & Video Autoplay
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    const video = videoRef.current;
    if (video) {
      video.play().then(() => {
        setVideoLoaded(true);
      }).catch((e) => {
        console.warn("Sukicchuuno video autoplay pending user gesture:", e);
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [handleResize]);

  // Sync animation playing state
  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying && isInViewRef.current) {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    } else {
      if (video && !video.paused) {
        video.pause();
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
  }, [isPlaying, renderLoop]);

  // IntersectionObserver: Only render and play audio/video when Skills section is visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
          const video = videoRef.current;
          const audio = audioRef.current;

          if (entry.isIntersecting) {
            if (isPlayingRef.current) {
              if (video && video.paused) video.play().catch(() => {});
              animFrameIdRef.current = requestAnimationFrame(renderLoop);
            }
          } else {
            if (animFrameIdRef.current) {
              cancelAnimationFrame(animFrameIdRef.current);
            }
            if (video && !video.paused) {
              video.pause();
            }
            if (audio && !audio.paused) {
              audio.pause();
              setIsAudioPlaying(false);
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [renderLoop]);

  // Play / Pause toggle
  const handleTogglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      const video = videoRef.current;
      const audio = audioRef.current;

      if (!next) {
        if (video) video.pause();
        if (audio && !audio.paused) {
          audio.pause();
          setIsAudioPlaying(false);
        }
      } else {
        if (video) video.play().catch(() => {});
      }
      return next;
    });
  };

  // Audio Toggle (Music)
  const handleToggleAudio = () => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      if (video) {
        audio.currentTime = video.currentTime;
      }
      audio.play().then(() => {
        setIsAudioPlaying(true);
        if (!isPlaying) setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio playback prevented:", err);
      });
    }
  };

  // Cycle Opacity Presets
  const handleCycleOpacity = () => {
    setOpacityIndex((prev) => (prev + 1) % OPACITY_PRESETS.length);
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Hidden Source Video for Canvas Sampling */}
      <video
        ref={videoRef}
        src="/assets/sukicchuuno.mp4"
        playsInline
        muted
        loop
        preload="auto"
        className="hidden"
        onLoadedData={() => {
          setVideoLoaded(true);
          handleResize();
        }}
      />

      {/* Audio Element for Music Playback */}
      <audio ref={audioRef} loop preload="none">
        <source src="/assets/sukicchuuno.webm" type="audio/webm" />
        <source src="/assets/sukicchuuno.m4a" type="audio/mp4" />
      </audio>

      {/* Floating Interactive Controls in Skills Section */}
      <div className="pointer-events-auto absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/85 px-3 py-1.5 text-xs shadow-md backdrop-blur-md transition-all md:right-8 md:top-8">
        <div className="flex items-center gap-1.5 pr-1 font-medium text-[var(--ink)]">
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${
                isPlaying && videoLoaded ? "animate-ping bg-pink-400 opacity-75" : "bg-gray-400 opacity-40"
              }`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                isPlaying && videoLoaded ? "bg-pink-500" : "bg-gray-400"
              }`}
            />
          </span>
          <span className="hidden font-semibold sm:inline">すきっちゅーの！</span>
          <span className="font-mono text-[10px] text-pink-400 font-bold">
            {isColored ? "COLOR ASCII" : "MONO ASCII"}
          </span>
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
          title={isAudioPlaying ? "Matikan musik すきっちゅーの！" : "Putar musik HoneyWorks - Hakos Baelz"}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
            isAudioPlaying
              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm"
              : "text-[var(--muted)] hover:bg-[var(--line)]/50 hover:text-[var(--ink)]"
          }`}
          aria-label={isAudioPlaying ? "Mute music" : "Play music"}
        >
          {isAudioPlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </button>

        {/* Color Mode Toggle: Full RGB Color / Monochrome */}
        <button
          type="button"
          onClick={() => setIsColored((prev) => !prev)}
          title={isColored ? "Mode Warna Aktif (Klik untuk Monokrom)" : "Mode Monokrom Aktif (Klik untuk Berwarna)"}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
            isColored ? "text-pink-400 hover:text-pink-300" : "text-[var(--muted)] hover:text-[var(--ink)]"
          } hover:bg-[var(--line)]/50`}
          aria-label="Toggle color mode"
        >
          <Palette size={13} />
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

      {/* Full Background ASCII Canvas Renderer: Fills 100% of the Skills section top-to-bottom without any gap */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full select-none transition-opacity duration-300"
        style={{
          opacity: currentOpacity,
          filter: "drop-shadow(0 0 10px rgba(244, 114, 182, 0.25))",
        }}
      />
    </div>
  );
}
