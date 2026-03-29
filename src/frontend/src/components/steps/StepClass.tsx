import { motion } from "motion/react";
import { DND_CLASSES, SR_ARCHETYPES } from "../../data/gameData";

interface StepClassProps {
  system: string;
  selected: string | null;
  onSelect: (classId: string) => void;
}

export default function StepClass({
  system,
  selected,
  onSelect,
}: StepClassProps) {
  const isDnd = system === "dnd";
  const classes = isDnd ? DND_CLASSES : SR_ARCHETYPES;
  const label = isDnd ? "Class" : "Archetype";

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold uppercase tracking-wider text-foreground">
        STEP 4: SELECT {label.toUpperCase()}
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Your {label.toLowerCase()} defines your combat role and abilities.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {classes.map((cls, i) => {
          const isSelected = selected === cls.id;
          return (
            <motion.button
              key={cls.id}
              data-ocid={`class.${cls.id}.card`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(cls.id)}
              className={`card-interactive relative flex items-start gap-3 rounded-xl border p-4 text-left ${
                isSelected
                  ? "selected border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="mt-0.5 text-3xl shrink-0">{cls.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="mb-1 font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  {cls.name}
                </div>
                <p className="mb-2 text-xs text-muted-foreground line-clamp-2">
                  {cls.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {isDnd ? (
                    <>
                      <span className="rounded border border-border bg-surface px-2 py-0.5 text-[10px] text-muted-foreground">
                        {(cls as (typeof DND_CLASSES)[0]).primaryStat}
                      </span>
                      <span className="rounded border border-border bg-surface px-2 py-0.5 text-[10px] text-muted-foreground">
                        Hit: {(cls as (typeof DND_CLASSES)[0]).hitDie}
                      </span>
                    </>
                  ) : (
                    <span className="rounded border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] text-primary">
                      {(cls as (typeof SR_ARCHETYPES)[0]).primarySkill}
                    </span>
                  )}
                </div>
              </div>
              {isSelected && (
                <div className="absolute right-2 top-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
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
