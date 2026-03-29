import { Check } from "lucide-react";

const STEPS = [
  { num: 1, label: "Basics" },
  { num: 2, label: "Abilities" },
  { num: 3, label: "Skills" },
  { num: 4, label: "Synergy" },
  { num: 5, label: "Sheet" },
];

interface StepperProps {
  current: number;
}

export default function Stepper({ current }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-2xl mx-auto">
      {STEPS.map((step, i) => {
        const done = step.num < current;
        const active = step.num === current;
        return (
          <div key={step.num} className="flex items-center">
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel font-bold text-sm transition-all duration-300"
                style={{
                  background: done
                    ? "linear-gradient(135deg, oklch(65% 0.1 72), oklch(78% 0.12 76))"
                    : active
                      ? "oklch(15% 0.05 285)"
                      : "oklch(11% 0.03 285)",
                  border: active
                    ? "2px solid var(--color-gold)"
                    : done
                      ? "2px solid var(--color-gold)"
                      : "2px solid oklch(25% 0.05 285)",
                  boxShadow: active
                    ? "0 0 16px oklch(75% 0.1 75 / 0.5)"
                    : done
                      ? "0 0 8px oklch(75% 0.1 75 / 0.25)"
                      : "none",
                  color: done
                    ? "oklch(10% 0.02 285)"
                    : active
                      ? "var(--color-gold)"
                      : "var(--color-muted-fg)",
                }}
              >
                {done ? <Check size={14} strokeWidth={3} /> : step.num}
              </div>
              <span
                className="text-[10px] font-rajdhani font-semibold tracking-widest uppercase"
                style={{
                  color: active
                    ? "var(--color-gold)"
                    : done
                      ? "var(--color-gold-dim)"
                      : "var(--color-muted-fg)",
                }}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className="w-12 sm:w-20 h-px mx-1 relative"
                style={{ background: "oklch(20% 0.04 285)" }}
              >
                <div
                  className="absolute inset-0 transition-all duration-500 origin-left"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-gold-dim), var(--color-gold))",
                    transform:
                      done || (active && step.num < STEPS.length)
                        ? "scaleX(1)"
                        : "scaleX(0)",
                    opacity: done ? 1 : 0,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
