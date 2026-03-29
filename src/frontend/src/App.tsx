import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import ActionBar from "./components/ActionBar";
import Navbar from "./components/Navbar";
import SpaceBackground from "./components/SpaceBackground";
import Stepper from "./components/Stepper";
import Step1Basics from "./components/steps/Step1Basics";
import Step2Abilities from "./components/steps/Step2Abilities";
import Step3Skills from "./components/steps/Step3Skills";
import Step4Synergy from "./components/steps/Step4Synergy";
import Step5Sheet from "./components/steps/Step5Sheet";
import type { Character } from "./data/gameData";
import { DEFAULT_CHARACTER } from "./data/gameData";

const STORAGE_KEY = "tbrbs_character";
const TOTAL_STEPS = 5;

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [character, setCharacter] = useState<Character>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_CHARACTER;
    } catch {
      return DEFAULT_CHARACTER;
    }
  });
  const [saved, setSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Auto-save on change
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
      setSaved(true);
    }, 1200);
    setSaved(false);
    return () => clearTimeout(timer);
  }, [character]);

  const updateCharacter = useCallback((updates: Partial<Character>) => {
    setCharacter((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleExportPDF = () => {
    setCurrentStep(TOTAL_STEPS);
    // Trigger PDF from Step5
    setTimeout(() => {
      const btn = document.querySelector<HTMLButtonElement>(
        "[data-ocid='sheet.download_pdf.button']",
      );
      btn?.click();
    }, 200);
  };

  const handleReset = () => setShowResetConfirm(true);
  const handleResetConfirm = () => {
    setCharacter(DEFAULT_CHARACTER);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(1);
    setShowResetConfirm(false);
    toast.success("Character reset.");
  };
  const handleResetCancel = () => setShowResetConfirm(false);

  return (
    <div className="min-h-screen relative">
      {/* Animated space background */}
      <SpaceBackground />

      {/* Content layer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 flex flex-col items-center pt-28 pb-24 px-4">
          {/* Page title */}
          <div className="text-center mb-8">
            <h1
              className="font-cinzel font-black text-2xl sm:text-4xl tracking-[0.15em] uppercase"
              style={{
                color: "var(--color-foreground)",
                textShadow: "0 0 30px oklch(45% 0.18 290 / 0.5)",
              }}
            >
              Character Creator
            </h1>
            <div
              className="mt-2 mx-auto h-px w-48"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--color-gold), transparent)",
              }}
            />
          </div>

          {/* Stepper */}
          <div className="w-full max-w-2xl mb-8">
            <Stepper current={currentStep} />
          </div>

          {/* Main glass panel */}
          <div
            className="w-full max-w-2xl rounded-2xl p-6 sm:p-8"
            style={{
              background: "oklch(11% 0.035 285 / 0.65)",
              backdropFilter: "blur(20px) saturate(1.5)",
              WebkitBackdropFilter: "blur(20px) saturate(1.5)",
              border: "1px solid oklch(35% 0.08 285 / 0.45)",
              boxShadow:
                "0 16px 60px oklch(0% 0 0 / 0.5), inset 1px 1px 0 oklch(80% 0.06 285 / 0.1)",
            }}
          >
            {/* Step label */}
            <div className="mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-cinzel font-bold flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(65% 0.1 72), oklch(78% 0.12 76))",
                    color: "oklch(10% 0.02 285)",
                  }}
                >
                  {currentStep}
                </div>
                <div>
                  <h2
                    className="font-cinzel font-bold text-base tracking-widest uppercase"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {
                      [
                        "Character Basics",
                        "Ability Scores",
                        "Skill Selection",
                        "Equipment Synergy",
                        "Character Sheet",
                      ][currentStep - 1]
                    }
                  </h2>
                  <p
                    className="text-[10px] font-rajdhani tracking-wide"
                    style={{ color: "var(--color-muted-fg)" }}
                  >
                    {
                      [
                        "Define your identity",
                        "Distribute your 30 ability points",
                        "Choose your skills",
                        "View active equipment synergies",
                        "Review and export your character",
                      ][currentStep - 1]
                    }
                  </p>
                </div>
              </div>
              <div
                className="mt-4 h-px"
                style={{ background: "oklch(25% 0.06 285 / 0.5)" }}
              />
            </div>

            {/* Step content */}
            {currentStep === 1 && (
              <Step1Basics character={character} onChange={updateCharacter} />
            )}
            {currentStep === 2 && (
              <Step2Abilities
                character={character}
                onChange={updateCharacter}
              />
            )}
            {currentStep === 3 && (
              <Step3Skills character={character} onChange={updateCharacter} />
            )}
            {currentStep === 4 && <Step4Synergy character={character} />}
            {currentStep === 5 && (
              <Step5Sheet character={character} onSave={() => setSaved(true)} />
            )}
          </div>

          {/* Caffeine footer */}
          <p
            className="mt-8 text-[11px] font-rajdhani"
            style={{ color: "var(--color-muted-fg)" }}
          >
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              style={{ color: "var(--color-gold-dim)" }}
            >
              Built with ❤️ using caffeine.ai
            </a>
          </p>
        </main>
      </div>

      {/* Persistent action bar */}
      <ActionBar
        character={character}
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        saved={saved}
        onBack={handleBack}
        onNext={handleNext}
        onExportPDF={handleExportPDF}
        onReset={handleReset}
        showResetConfirm={showResetConfirm}
        onResetConfirm={handleResetConfirm}
        onResetCancel={handleResetCancel}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
}
