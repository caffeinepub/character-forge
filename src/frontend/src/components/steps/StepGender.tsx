import { motion } from "motion/react";
import { GENDERS } from "../../data/gameData";

interface StepGenderProps {
  selected: string | null;
  onSelect: (genderId: string) => void;
}

export default function StepGender({ selected, onSelect }: StepGenderProps) {
  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold uppercase tracking-wider text-foreground">
        STEP 3: CHOOSE GENDER
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Select the gender identity for your character.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {GENDERS.map((gender, i) => (
          <motion.button
            key={gender.id}
            data-ocid={`gender.${gender.id}.card`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(gender.id)}
            className={`card-interactive relative flex flex-col items-center rounded-xl border py-10 ${
              selected === gender.id
                ? "selected border-primary bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            <div className="mb-3 text-5xl">{gender.emoji}</div>
            <div className="font-display text-base font-bold uppercase tracking-widest text-foreground">
              {gender.label}
            </div>
            {selected === gender.id && (
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
