import type { Character } from "@/data/gameData";
import {
  ABILITIES,
  ABILITY_COLORS,
  ABILITY_ICONS,
  SKILL_MAP,
} from "@/data/gameData";

interface Props {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
}

export default function Step3Skills({ character, onChange }: Props) {
  const toggleSkill = (skill: string) => {
    const has = character.selectedSkills.includes(skill);
    onChange({
      selectedSkills: has
        ? character.selectedSkills.filter((s) => s !== skill)
        : [...character.selectedSkills, skill],
    });
  };

  const skillCountByAbility = ABILITIES.map((ability) => ({
    ability,
    count: SKILL_MAP[ability].filter((s) =>
      character.selectedSkills.includes(s),
    ).length,
  }));
  const maxEntry = skillCountByAbility.reduce(
    (best, cur) => (cur.count > best.count ? cur : best),
    { ability: ABILITIES[0], count: 0 },
  );
  const recommendation = maxEntry.count > 0 ? maxEntry : null;

  return (
    <div className="animate-slide-up space-y-4">
      {recommendation && (
        <div
          className="rounded-xl px-4 py-3 flex items-start gap-3"
          style={{
            background: "oklch(75% 0.1 75 / 0.08)",
            border: "1px solid oklch(75% 0.1 75 / 0.3)",
          }}
        >
          <span className="text-lg flex-shrink-0">⚡</span>
          <p
            className="text-sm font-rajdhani"
            style={{ color: "var(--color-foreground)" }}
          >
            <span style={{ color: "var(--color-gold)" }} className="font-bold">
              Tip:{" "}
            </span>
            You should prioritize raising{" "}
            <span style={{ color: "var(--color-gold)" }} className="font-bold">
              {recommendation.ability}
            </span>{" "}
            because it supports most of your chosen skills (
            {recommendation.count} selected).
          </p>
        </div>
      )}

      <div className="space-y-3">
        {ABILITIES.map((ability) => {
          const color = ABILITY_COLORS[ability];
          const skills = SKILL_MAP[ability];
          const selected = skills.filter((s) =>
            character.selectedSkills.includes(s),
          );
          const isDominant =
            recommendation?.ability === ability && recommendation.count > 0;

          return (
            <div
              key={ability}
              className="rounded-xl p-4 space-y-2.5 transition-all duration-300"
              style={{
                background: isDominant
                  ? `${color}12`
                  : "oklch(10% 0.03 285 / 0.6)",
                border: `1px solid ${isDominant ? `${color}55` : `${color}22`}`,
                boxShadow: isDominant ? `0 0 16px ${color}22` : "none",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{ABILITY_ICONS[ability]}</span>
                  <span
                    className="font-cinzel font-bold text-sm"
                    style={{ color }}
                  >
                    {ability}
                  </span>
                  {isDominant && (
                    <span
                      className="text-[9px] font-cinzel px-2 py-0.5 rounded-full uppercase tracking-widest"
                      style={{
                        background: `${color}25`,
                        color,
                        border: `1px solid ${color}55`,
                      }}
                    >
                      Recommended
                    </span>
                  )}
                </div>
                <span
                  className="text-xs font-rajdhani"
                  style={{ color: "var(--color-muted-fg)" }}
                >
                  {selected.length}/{skills.length} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => {
                  const active = character.selectedSkills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className="skill-chip"
                      style={
                        active
                          ? {
                              borderColor: color,
                              color,
                              background: `${color}18`,
                              boxShadow: `0 0 8px ${color}30`,
                            }
                          : {}
                      }
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
