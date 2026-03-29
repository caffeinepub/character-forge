import type { Ability, Character } from "@/data/gameData";
import {
  ABILITIES,
  ABILITY_COLORS,
  ABILITY_ICONS,
  SKILL_MAP,
  TOTAL_POINTS,
} from "@/data/gameData";

interface Props {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
}

export default function Step2Abilities({ character, onChange }: Props) {
  const totalUsed = Object.values(character.abilities).reduce(
    (a, b) => a + b,
    0,
  );
  const remaining = TOTAL_POINTS - totalUsed;

  const setAbility = (ability: Ability, value: number) => {
    const current = character.abilities[ability];
    const delta = value - current;
    if (delta > remaining && delta > 0) return;
    onChange({ abilities: { ...character.abilities, [ability]: value } });
  };

  return (
    <div className="animate-slide-up space-y-4">
      {/* Points remaining banner */}
      <div
        className="rounded-xl px-4 py-2.5 flex items-center justify-between"
        style={{
          background: "oklch(15% 0.06 285 / 0.6)",
          border: "1px solid oklch(75% 0.1 75 / 0.25)",
        }}
      >
        <span
          className="text-xs font-cinzel uppercase tracking-widest"
          style={{ color: "var(--color-muted-fg)" }}
        >
          Ability Points
        </span>
        <div className="flex items-center gap-2">
          <span
            className="text-2xl font-cinzel font-bold"
            style={{
              color:
                remaining > 0
                  ? "var(--color-gold)"
                  : remaining === 0
                    ? "var(--color-gold)"
                    : "var(--color-destructive)",
            }}
          >
            {remaining}
          </span>
          <span
            className="text-xs font-rajdhani"
            style={{ color: "var(--color-muted-fg)" }}
          >
            remaining / {TOTAL_POINTS}
          </span>
        </div>
      </div>

      {/* Points bar */}
      <div
        className="h-1.5 rounded-full"
        style={{ background: "oklch(15% 0.04 285)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${(totalUsed / TOTAL_POINTS) * 100}%`,
            background:
              "linear-gradient(to right, var(--color-gold-dim), var(--color-gold))",
            boxShadow: "0 0 8px oklch(75% 0.1 75 / 0.4)",
          }}
        />
      </div>

      {/* Ability grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ABILITIES.map((ability) => {
          const val = character.abilities[ability];
          const color = ABILITY_COLORS[ability];
          const skills = SKILL_MAP[ability];

          return (
            <div
              key={ability}
              className="rounded-xl p-4 space-y-3"
              style={{
                background: "oklch(10% 0.03 285 / 0.7)",
                border: `1px solid ${color}44`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{ABILITY_ICONS[ability]}</span>
                  <span
                    className="font-cinzel font-bold text-sm tracking-wide"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {ability}
                  </span>
                </div>
                <span
                  className="text-3xl font-cinzel font-black"
                  style={{
                    color: "var(--color-gold)",
                    textShadow: "0 0 12px oklch(75% 0.1 75 / 0.5)",
                  }}
                >
                  {val}
                </span>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={val}
                  onChange={(e) => setAbility(ability, Number(e.target.value))}
                  className="w-full appearance-none h-2 rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, oklch(75% 0.1 75) 0%, oklch(75% 0.1 75) ${val * 10}%, oklch(20% 0.04 285) ${val * 10}%, oklch(20% 0.04 285) 100%)`,
                    accentColor: "var(--color-gold)",
                  }}
                />
                <style>{`
                  input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 18px; height: 18px;
                    border-radius: 50%;
                    background: var(--color-gold);
                    border: 2px solid oklch(7% 0.025 290);
                    box-shadow: 0 0 8px oklch(75% 0.1 75 / 0.6);
                    cursor: pointer;
                  }
                `}</style>
                <div
                  className="flex justify-between text-[10px] mt-1"
                  style={{ color: "var(--color-muted-fg)" }}
                >
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              {/* Governed skills */}
              <div>
                <p
                  className="text-[9px] font-cinzel tracking-widest uppercase mb-1.5"
                  style={{ color: "var(--color-label)" }}
                >
                  Governs
                </p>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded-full font-rajdhani"
                      style={{
                        background: `${color}18`,
                        border: `1px solid ${color}33`,
                        color: `${color}`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
