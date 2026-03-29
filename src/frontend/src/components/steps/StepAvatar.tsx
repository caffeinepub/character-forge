import { motion } from "motion/react";
import { getAvatarOptions } from "../../data/gameData";

interface StepAvatarProps {
  race: string;
  gender: string;
  selectedId: number;
  onSelect: (id: number, emoji: string) => void;
}

export default function StepAvatar({
  race,
  gender,
  selectedId,
  onSelect,
}: StepAvatarProps) {
  const options = getAvatarOptions(race, gender);

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold uppercase tracking-wider text-foreground">
        STEP 5: CHOOSE AVATAR
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Pick a portrait to represent your character.
      </p>

      <div className="grid grid-cols-5 gap-3">
        {options.map((opt, i) => (
          <motion.button
            key={opt.id}
            data-ocid={`avatar.item.${i + 1}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onSelect(opt.id, opt.emoji)}
            className={`card-interactive flex flex-col items-center rounded-xl border p-3 transition-all ${
              selectedId === opt.id
                ? "selected border-primary bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            <div className="text-4xl mb-1">{opt.emoji}</div>
            {selectedId === opt.id && (
              <div className="text-[10px] font-semibold text-primary">✓</div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
