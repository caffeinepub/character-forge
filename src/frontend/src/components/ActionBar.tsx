import type { Character } from "@/data/gameData";

interface Props {
  character: Character;
  currentStep: number;
  totalSteps: number;
  saved: boolean;
  onBack: () => void;
  onNext: () => void;
  onExportPDF: () => void;
  onReset: () => void;
  showResetConfirm: boolean;
  onResetConfirm: () => void;
  onResetCancel: () => void;
}

export default function ActionBar({
  character,
  currentStep,
  totalSteps,
  saved,
  onBack,
  onNext,
  onExportPDF,
  onReset,
  showResetConfirm,
  onResetConfirm,
  onResetCancel,
}: Props) {
  const getRace = () =>
    character.race === "Custom"
      ? character.customRace || "Custom"
      : character.race;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
      style={{
        background: "oklch(7% 0.025 290 / 0.95)",
        borderTop: "1px solid oklch(30% 0.06 285 / 0.4)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          {character.name ? (
            <div>
              <p
                className="text-xs font-cinzel truncate"
                style={{ color: "var(--color-gold)" }}
              >
                {character.name}
              </p>
              <p
                className="text-[10px] font-rajdhani"
                style={{ color: "var(--color-muted-fg)" }}
              >
                {getRace() || "Unknown Race"}
              </p>
            </div>
          ) : (
            <p
              className="text-xs font-rajdhani"
              style={{ color: "var(--color-muted-fg)" }}
            >
              No character yet
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: saved
                  ? "oklch(60% 0.15 145)"
                  : "oklch(40% 0.08 285)",
                boxShadow: saved ? "0 0 6px oklch(60% 0.15 145 / 0.6)" : "none",
              }}
            />
            <span
              className="text-[10px] font-cinzel tracking-widest uppercase"
              style={{
                color: saved ? "oklch(60% 0.15 145)" : "var(--color-muted-fg)",
              }}
            >
              {saved ? "Saved" : "Unsaved"}
            </span>
          </div>

          {!showResetConfirm ? (
            <button
              type="button"
              data-ocid="actionbar.reset.button"
              onClick={onReset}
              className="text-[10px] font-cinzel tracking-widest uppercase px-3 py-1 rounded-full transition-colors"
              style={{
                border: "1px solid oklch(30% 0.06 285 / 0.5)",
                color: "var(--color-muted-fg)",
              }}
            >
              Reset
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-rajdhani"
                style={{ color: "var(--color-foreground)" }}
              >
                Sure?
              </span>
              <button
                type="button"
                data-ocid="actionbar.reset.confirm_button"
                onClick={onResetConfirm}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--color-destructive)",
                  color: "white",
                }}
              >
                Yes
              </button>
              <button
                type="button"
                data-ocid="actionbar.reset.cancel_button"
                onClick={onResetCancel}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  border: "1px solid oklch(30% 0.06 285 / 0.5)",
                  color: "var(--color-muted-fg)",
                }}
              >
                No
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {currentStep > 1 && (
            <button
              type="button"
              data-ocid="actionbar.back.button"
              onClick={onBack}
              className="px-4 py-2 rounded-full text-sm font-rajdhani font-semibold transition-colors"
              style={{
                border: "1px solid oklch(30% 0.06 285 / 0.5)",
                color: "var(--color-muted-fg)",
              }}
            >
              ← Back
            </button>
          )}

          {currentStep < totalSteps && (
            <button
              type="button"
              data-ocid="actionbar.next.button"
              onClick={onNext}
              className="btn-purple px-5 py-2 text-sm"
            >
              Next →
            </button>
          )}

          {currentStep === totalSteps && (
            <button
              type="button"
              data-ocid="actionbar.export_pdf.button"
              onClick={onExportPDF}
              className="btn-gold px-5 py-2 text-sm"
            >
              📄 Export PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
