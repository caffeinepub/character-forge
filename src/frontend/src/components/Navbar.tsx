import { User } from "lucide-react";

const NAV_LINKS = ["Dashboard", "Creators Lab", "Codex", "Community", "Help"];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="glass rounded-2xl px-5 py-2.5 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex-shrink-0">
          <span className="font-cinzel font-black text-xs tracking-[0.18em] text-gold-gradient uppercase leading-tight">
            THE BIG RUBBER BALL
            <br />
            IN SPACE
          </span>
        </div>

        <nav
          className="hidden md:flex items-center gap-1 rounded-full px-2 py-1"
          style={{
            background: "oklch(10% 0.03 285 / 0.7)",
            border: "1px solid oklch(30% 0.06 285 / 0.4)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link}
              className="px-3 py-1 rounded-full text-xs font-semibold font-rajdhani tracking-wide text-[var(--color-muted-fg)] hover:text-[var(--color-foreground)] transition-colors duration-200 uppercase"
            >
              {link}
            </button>
          ))}
        </nav>

        <div
          className="flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{
            background: "oklch(10% 0.03 285 / 0.7)",
            border: "1px solid oklch(30% 0.06 285 / 0.4)",
          }}
        >
          <div
            className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center"
            style={{ background: "oklch(28% 0.1 290)" }}
          >
            <img
              src="/assets/generated/traveler-avatar-transparent.dim_80x80.png"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-cinzel text-[var(--color-gold)] tracking-widest uppercase">
              Traveler
            </span>
            <span className="text-[9px] text-[var(--color-muted-fg)] font-rajdhani">
              Lv.1
            </span>
          </div>
          <User size={12} className="text-[var(--color-muted-fg)]" />
        </div>
      </div>
    </header>
  );
}
