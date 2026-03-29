import type { Character } from "@/data/gameData";
import { EQUIPMENT_SYNERGIES } from "@/data/gameData";
import { useState } from "react";

interface Props {
  character: Character;
}

export default function Step4Synergy({ character }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const isActive = (skills: string[]) =>
    skills.some((s) => character.selectedSkills.includes(s));

  const allActive = (skills: string[]) =>
    skills.every((s) => character.selectedSkills.includes(s));

  return (
    <div className="animate-slide-up space-y-4">
      <div className="text-center">
        <p
          className="text-xs font-rajdhani tracking-widest uppercase"
          style={{ color: "var(--color-muted-fg)" }}
        >
          Synergies activate based on your selected skills
        </p>
      </div>

      <div className="space-y-3">
        {EQUIPMENT_SYNERGIES.map((syn) => {
          const active = allActive(syn.skills);
          const partial = isActive(syn.skills) && !active;
          const isHovered = hovered === syn.id;

          return (
            <div
              key={syn.id}
              data-ocid={`synergy.${syn.id}.card`}
              className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: active
                  ? "oklch(20% 0.08 75 / 0.35)"
                  : partial
                    ? "oklch(15% 0.05 290 / 0.4)"
                    : "oklch(10% 0.03 285 / 0.6)",
                border: active
                  ? "1px solid oklch(75% 0.1 75 / 0.5)"
                  : partial
                    ? "1px solid oklch(45% 0.18 290 / 0.4)"
                    : "1px solid oklch(25% 0.05 285 / 0.4)",
                boxShadow: active
                  ? "0 0 20px oklch(75% 0.1 75 / 0.15)"
                  : "none",
              }}
              onMouseEnter={() => setHovered(syn.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{syn.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className="font-cinzel font-bold text-sm"
                        style={{
                          color: active
                            ? "var(--color-gold)"
                            : "var(--color-foreground)",
                        }}
                      >
                        {syn.title}
                      </h3>
                      <span
                        className="text-[9px] font-cinzel px-2 py-0.5 rounded-full uppercase tracking-widest"
                        style={{
                          background: active
                            ? "oklch(75% 0.1 75 / 0.2)"
                            : partial
                              ? "oklch(45% 0.18 290 / 0.2)"
                              : "oklch(15% 0.04 285)",
                          color: active
                            ? "var(--color-gold)"
                            : partial
                              ? "var(--color-purple-bright)"
                              : "var(--color-muted-fg)",
                          border: `1px solid ${active ? "oklch(75% 0.1 75 / 0.4)" : partial ? "oklch(45% 0.18 290 / 0.4)" : "oklch(25% 0.05 285)"}`,
                        }}
                      >
                        {active
                          ? "✦ Active"
                          : partial
                            ? "◐ Partial"
                            : "○ Inactive"}
                      </span>
                    </div>

                    {/* Required skills */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {syn.skills.map((skill) => {
                        const has = character.selectedSkills.includes(skill);
                        return (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-0.5 rounded-full font-rajdhani"
                            style={{
                              background: has
                                ? "oklch(75% 0.1 75 / 0.15)"
                                : "oklch(12% 0.03 285)",
                              border: has
                                ? "1px solid oklch(75% 0.1 75 / 0.4)"
                                : "1px solid oklch(25% 0.05 285)",
                              color: has
                                ? "var(--color-gold)"
                                : "var(--color-muted-fg)",
                            }}
                          >
                            {has ? "✓ " : ""}
                            {skill}
                          </span>
                        );
                      })}
                    </div>

                    {/* Expanded description */}
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: isHovered || active ? "200px" : "0px",
                        opacity: isHovered || active ? 1 : 0,
                      }}
                    >
                      <div
                        className="mt-3 pt-3"
                        style={{
                          borderTop: "1px solid oklch(25% 0.05 285 / 0.5)",
                        }}
                      >
                        <p
                          className="text-xs font-rajdhani"
                          style={{ color: "var(--color-muted-fg)" }}
                        >
                          {syn.description}
                        </p>
                        <p
                          className="text-xs font-cinzel mt-2"
                          style={{
                            color: active
                              ? "var(--color-gold)"
                              : "var(--color-purple-bright)",
                          }}
                        >
                          Effect: {syn.effect}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
