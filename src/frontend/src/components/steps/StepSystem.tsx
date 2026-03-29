import { motion } from "motion/react";

interface StepSystemProps {
  selected: string | null;
  onSelect: (system: "dnd" | "shadowrun") => void;
}

const SYSTEMS = [
  {
    id: "dnd" as const,
    title: "Dungeons & Dragons",
    subtitle: "5th Edition",
    description:
      "Enter a world of high fantasy where heroes wield mighty swords and ancient magic. Choose your race, class, and destiny in realms of dragons and dungeon depths.",
    flavor: "⚔️ Roll for Initiative",
    tags: ["Fantasy", "Magic", "Adventure"],
    emoji: "🐉",
  },
  {
    id: "shadowrun" as const,
    title: "Shadowrun",
    subtitle: "Sixth World",
    description:
      "Hack megacorporate servers, summon spirits in neon-drenched sprawls, and survive the shadows of a dystopian future where magic and technology collide.",
    flavor: "💻 Jack In, Chummer",
    tags: ["Cyberpunk", "Magic", "Noir"],
    emoji: "🤖",
  },
];

export default function StepSystem({ selected, onSelect }: StepSystemProps) {
  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold uppercase tracking-wider text-foreground">
        STEP 1: CHOOSE YOUR SYSTEM
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Select the game universe for your character.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SYSTEMS.map((sys, i) => (
          <motion.button
            key={sys.id}
            data-ocid={`system.${sys.id}.card`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(sys.id)}
            className={`card-interactive relative flex flex-col rounded-xl border p-6 text-left ${
              selected === sys.id
                ? "selected border-primary bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            <div className="mb-3 text-5xl">{sys.emoji}</div>
            <div className="mb-1 flex items-baseline gap-2">
              <span className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                {sys.title}
              </span>
            </div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              {sys.subtitle}
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              {sys.description}
            </p>
            <div className="mb-3 text-sm font-medium text-gold">
              {sys.flavor}
            </div>
            <div className="flex flex-wrap gap-1">
              {sys.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            {selected === sys.id && (
              <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] text-primary-foreground">
                ✓
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
