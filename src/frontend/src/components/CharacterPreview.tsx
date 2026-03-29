import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { getAvatar } from "../data/gameData";
import type { WizardState } from "./CharacterCreator";

const STEP_LABELS = ["System", "Race", "Gender", "Class", "Avatar", "Details"];

interface CharacterPreviewProps {
  state: WizardState;
  currentStep: number;
}

export default function CharacterPreview({
  state,
  currentStep,
}: CharacterPreviewProps) {
  const avatarEmoji =
    state.selectedAvatarEmoji ||
    (state.selectedRace && state.selectedGender
      ? getAvatar(state.selectedRace, state.selectedGender)
      : "🧑");

  const raceName = state.selectedRace
    ? state.selectedRace.replace("sr-", "").replace(/-/g, " ")
    : "Unknown";
  const className = state.selectedClass
    ? state.selectedClass.replace(/-/g, " ")
    : "Unknown";
  const displayName =
    state.characterName ||
    `Unnamed ${raceName.charAt(0).toUpperCase() + raceName.slice(1)}`;

  const systemLabel =
    state.selectedSystem === "dnd"
      ? "D&D 5e"
      : state.selectedSystem === "shadowrun"
        ? "Shadowrun"
        : null;

  return (
    <aside className="flex flex-col gap-4">
      {/* Preview Panel */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Character Preview
        </h3>

        {/* Avatar */}
        <motion.div
          key={avatarEmoji}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-4 flex h-36 items-center justify-center rounded-lg border border-border bg-surface text-7xl"
        >
          {avatarEmoji}
        </motion.div>

        {/* Name */}
        <div className="mb-3 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
            {displayName}
          </p>
          {state.characterName && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              Character Name
            </p>
          )}
        </div>

        {/* System badge */}
        {systemLabel && (
          <div className="mb-3 flex justify-center gap-2">
            <Badge
              variant="outline"
              className="border-primary/50 bg-primary/10 text-primary text-xs"
            >
              {systemLabel}
            </Badge>
          </div>
        )}

        {/* Race + Class */}
        {(state.selectedRace || state.selectedClass) && (
          <div className="mb-4 rounded-md border border-border bg-surface/60 px-3 py-2 text-center text-xs">
            {state.selectedRace && (
              <span className="text-foreground capitalize">
                {raceName.replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            )}
            {state.selectedRace && state.selectedClass && (
              <span className="text-muted-foreground"> · </span>
            )}
            {state.selectedClass && (
              <span className="text-foreground capitalize">
                {className.replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            )}
          </div>
        )}

        {/* Stats strip */}
        {state.stats && (
          <div className="mb-4 grid grid-cols-3 gap-1">
            {Object.entries(state.stats)
              .slice(0, 6)
              .map(([key, val]) => (
                <div
                  key={key}
                  className="rounded border border-border bg-surface/60 px-1.5 py-1.5 text-center"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {key}
                  </div>
                  <div className="text-sm font-bold text-primary">
                    {String(val)}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Bio preview */}
        {state.bio && (
          <p className="mb-3 text-xs italic text-muted-foreground line-clamp-3">
            "{state.bio}"
          </p>
        )}
      </div>

      {/* Step progress */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Progress
        </h3>
        <div className="flex flex-col gap-1.5">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold border transition-colors ${
                  i < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : i === currentStep
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-surface text-muted-foreground"
                }`}
              >
                {i < currentStep ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs ${
                  i === currentStep
                    ? "font-semibold text-foreground"
                    : i < currentStep
                      ? "text-primary"
                      : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
