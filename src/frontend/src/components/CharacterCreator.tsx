import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DND_RACES, SR_METATYPES, getAvatar } from "../data/gameData";
import { useCreateCharacter } from "../hooks/useQueries";
import CharacterPreview from "./CharacterPreview";
import StepAvatar from "./steps/StepAvatar";
import StepClass from "./steps/StepClass";
import StepDetails from "./steps/StepDetails";
import StepGender from "./steps/StepGender";
import StepRace from "./steps/StepRace";
import StepSystem from "./steps/StepSystem";

export interface WizardState {
  selectedSystem: "dnd" | "shadowrun" | null;
  selectedRace: string | null;
  selectedGender: string | null;
  selectedClass: string | null;
  selectedAvatarId: number;
  selectedAvatarEmoji: string | null;
  characterName: string;
  bio: string;
  stats: Record<string, number> | null;
}

const STEP_LABELS = [
  "Select System",
  "Select Race",
  "Choose Gender",
  "Select Class",
  "Customize Avatar",
  "Details & Bio",
];

const INITIAL_STATE: WizardState = {
  selectedSystem: null,
  selectedRace: null,
  selectedGender: null,
  selectedClass: null,
  selectedAvatarId: 0,
  selectedAvatarEmoji: null,
  characterName: "",
  bio: "",
  stats: null,
};

interface CharacterCreatorProps {
  onViewCharacters: () => void;
}

export default function CharacterCreator({
  onViewCharacters,
}: CharacterCreatorProps) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [isSaved, setIsSaved] = useState(false);
  const createCharacter = useCreateCharacter();

  function canProceed() {
    if (step === 0) return !!state.selectedSystem;
    if (step === 1) return !!state.selectedRace;
    if (step === 2) return !!state.selectedGender;
    if (step === 3) return !!state.selectedClass;
    return true;
  }

  function handleSelectSystem(system: "dnd" | "shadowrun") {
    setState((prev) => ({
      ...prev,
      selectedSystem: system,
      selectedRace: null,
      selectedClass: null,
      stats: null,
    }));
  }

  function handleSelectRace(raceId: string) {
    let stats: Record<string, number> | null = null;
    if (state.selectedSystem === "dnd") {
      const race = DND_RACES.find((r) => r.id === raceId);
      if (race) stats = race.stats as unknown as Record<string, number>;
    } else {
      const race = SR_METATYPES.find((r) => r.id === raceId);
      if (race) stats = race.modifiers as unknown as Record<string, number>;
    }
    setState((prev) => ({ ...prev, selectedRace: raceId, stats }));
  }

  function handleSelectGender(genderId: string) {
    setState((prev) => {
      const emoji = prev.selectedRace
        ? getAvatar(prev.selectedRace, genderId)
        : null;
      return { ...prev, selectedGender: genderId, selectedAvatarEmoji: emoji };
    });
  }

  function handleSelectClass(classId: string) {
    setState((prev) => ({ ...prev, selectedClass: classId }));
  }

  function handleSelectAvatar(id: number, emoji: string) {
    setState((prev) => ({
      ...prev,
      selectedAvatarId: id,
      selectedAvatarEmoji: emoji,
    }));
  }

  function handleNext() {
    if (canProceed() && step < 5) setStep((s) => s + 1);
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function handleSave() {
    if (
      !state.selectedSystem ||
      !state.selectedRace ||
      !state.selectedGender ||
      !state.selectedClass
    )
      return;
    try {
      await createCharacter.mutateAsync({
        name: state.characterName.trim(),
        gameSystem: state.selectedSystem,
        race: state.selectedRace,
        gender: state.selectedGender,
        archetype: state.selectedClass,
        avatarId: BigInt(state.selectedAvatarId),
      });
      setIsSaved(true);
      toast.success("Character saved to your roster!");
    } catch {
      toast.error("Failed to save character. Please try again.");
    }
  }

  function handleCreateAnother() {
    setState(INITIAL_STATE);
    setStep(0);
    setIsSaved(false);
  }

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <StepSystem
            selected={state.selectedSystem}
            onSelect={handleSelectSystem}
          />
        );
      case 1:
        return (
          <StepRace
            system={state.selectedSystem || "dnd"}
            selected={state.selectedRace}
            onSelect={handleSelectRace}
          />
        );
      case 2:
        return (
          <StepGender
            selected={state.selectedGender}
            onSelect={handleSelectGender}
          />
        );
      case 3:
        return (
          <StepClass
            system={state.selectedSystem || "dnd"}
            selected={state.selectedClass}
            onSelect={handleSelectClass}
          />
        );
      case 4:
        return (
          <StepAvatar
            race={state.selectedRace || "human"}
            gender={state.selectedGender || "male"}
            selectedId={state.selectedAvatarId}
            onSelect={handleSelectAvatar}
          />
        );
      case 5:
        return (
          <StepDetails
            characterName={state.characterName}
            bio={state.bio}
            onNameChange={(n) =>
              setState((prev) => ({ ...prev, characterName: n }))
            }
            onBioChange={(b) => setState((prev) => ({ ...prev, bio: b }))}
            onSave={handleSave}
            isSaving={createCharacter.isPending}
            isSaved={isSaved}
            onCreateAnother={handleCreateAnother}
            onViewCharacters={onViewCharacters}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr_280px]">
        {/* Stepper sidebar */}
        <aside className="hidden lg:flex flex-col gap-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Creation Steps
            </h3>
            <div className="flex flex-col gap-1">
              {STEP_LABELS.map((label, i) => (
                <button
                  type="button"
                  key={label}
                  data-ocid={`stepper.step.${i + 1}`}
                  onClick={() => {
                    if (i <= step) setStep(i);
                  }}
                  disabled={i > step}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                    i === step
                      ? "border border-primary/50 bg-primary/10 glow-teal-sm"
                      : i < step
                        ? "border border-transparent hover:bg-surface cursor-pointer"
                        : "cursor-not-allowed opacity-40"
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold border ${
                      i < step
                        ? "border-primary bg-primary text-primary-foreground"
                        : i === step
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      i === step
                        ? "text-foreground"
                        : i < step
                          ? "text-primary"
                          : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          {!isSaved && (
            <div className="flex items-center justify-between">
              <Button
                data-ocid="wizard.back.button"
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
                className="border-border text-foreground hover:bg-surface disabled:opacity-40"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              {step < 5 && (
                <Button
                  data-ocid="wizard.next.button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                >
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Character preview */}
        <div className="hidden lg:block">
          <CharacterPreview state={state} currentStep={step} />
        </div>
      </div>
    </div>
  );
}
