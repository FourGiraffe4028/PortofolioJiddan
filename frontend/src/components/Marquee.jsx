import { Sparkles } from "lucide-react";
import { useApp } from "../store";

export default function Marquee() {
  const { t } = useApp();
  const row = [...t.marquee, ...t.marquee];
  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-[var(--bg-alt)] py-8" data-testid="marquee">
      <div className="marquee-track gap-10">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10">
                <span className="whitespace-nowrap font-display text-2xl italic text-[var(--ink)]/75 md:text-4xl">{item}</span>
                <Sparkles size={18} className="shrink-0 text-[var(--gold)]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
