import { motion } from "motion/react";
import { DND_RACES, SR_METATYPES } from "../../data/gameData";

interface StepRaceProps {
  system: string;
  selected: string | null;
  onSelect: (raceId: string) => void;
}

export default function StepRace({
  system,
  selected,
  onSelect,
}: StepRaceProps) {
  const isDnd = system === "dnd";
  const races = isDnd ? DND_RACES : SR_METATYPES;
  const label = isDnd ? "Race" : "Metatype";

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold uppercase tracking-wider text-foreground">
        STEP 2: SELECT {label.toUpperCase()}
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Your {label.toLowerCase()} determines your base attributes and
        abilities.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {races.map((race, i) => {
          const isSelected = selected === race.id;
          const stats = isDnd
            ? (race as (typeof DND_RACES)[0]).stats
            : (race as (typeof SR_METATYPES)[0]).modifiers;
          const statEntries = Object.entries(stats).slice(0, 4);

          return (
            <motion.button
              key={race.id}
              data-ocid={`race.${race.id}.card`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => onSelect(race.id)}
              className={`card-interactive relative flex flex-col rounded-xl border p-4 text-left ${
                isSelected
                  ? "selected border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="mb-2 text-4xl">{race.emoji}</div>
              <div className="mb-1 font-display text-sm font-bold uppercase tracking-wide text-foreground">
                {race.name}
              </div>
              <p className="mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                {race.description}
              </p>

              {/* Abilities (SR) */}
              {!isDnd &&
                (race as (typeof SR_METATYPES)[0]).abilities.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {(race as (typeof SR_METATYPES)[0]).abilities
                      .slice(0, 2)
                      .map((ab) => (
                        <span
                          key={ab}
                          className="rounded border border-primary/30 bg-primary/5 px-1.5 py-0.5 text-[10px] text-primary"
                        >
                          {ab}
                        </span>
                      ))}
                  </div>
                )}

              {/* Stats */}
              <div className="mt-auto">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  STATS
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {statEntries.map(([key, val]) => (
                    <div
                      key={key}
                      className="rounded bg-surface/70 px-1 py-1 text-center"
                    >
                      <div className="text-[9px] font-medium uppercase text-muted-foreground">
                        {key}
                      </div>
                      <div
                        className={`text-xs font-bold ${
                          Number(val) > 0
                            ? "text-primary"
                            : Number(val) < 0
                              ? "text-destructive"
                              : "text-foreground"
                        }`}
                      >
                        {Number(val) > 0 ? `+${val}` : val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {isSelected && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  ✓
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
