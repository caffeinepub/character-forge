import type { Character } from "@/data/gameData";
import {
  ABILITIES,
  ABILITY_ICONS,
  EQUIPMENT_SYNERGIES,
  SKILL_MAP,
} from "@/data/gameData";
import { toast } from "sonner";

interface Props {
  character: Character;
  onSave: () => void;
}

const STORAGE_KEY = "tbrbs_character";

export default function Step5Sheet({ character, onSave }: Props) {
  const getRace = () =>
    character.race === "Custom"
      ? character.customRace || "Custom"
      : character.race;

  const activeSynergies = EQUIPMENT_SYNERGIES.filter((syn) =>
    syn.skills.every((s) => character.selectedSkills.includes(s)),
  );

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
    onSave();
    toast.success("Character saved!", { description: "Your legend endures." });
  };

  const handleDownloadPDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const w = 210;
      const margin = 18;
      let y = 0;
      const lineWidth = w - margin * 2;

      doc.setFillColor(11, 8, 18);
      doc.rect(0, 0, w, 297, "F");
      doc.setDrawColor(214, 177, 90);
      doc.setLineWidth(0.8);
      doc.rect(10, 10, w - 20, 277);
      doc.setLineWidth(0.3);
      doc.rect(12, 12, w - 24, 273);

      y = 26;
      doc.setFillColor(74, 43, 115);
      doc.rect(margin, y - 7, lineWidth, 22, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(214, 177, 90);
      doc.text("THE BIG RUBBER BALL IN SPACE", w / 2, y, { align: "center" });
      y += 8;
      doc.setFontSize(15);
      doc.text(
        `CHARACTER SHEET - ${(character.name || "UNNAMED").toUpperCase()}`,
        w / 2,
        y,
        { align: "center" },
      );

      y += 14;
      doc.setDrawColor(214, 177, 90);
      doc.setLineWidth(0.3);
      doc.line(margin, y, w - margin, y);

      y += 8;
      doc.setFontSize(9);
      doc.setTextColor(180, 160, 200);
      doc.text("RACE", margin, y);
      doc.setTextColor(237, 234, 247);
      doc.text(getRace() || "-", margin + 24, y);

      y += 10;
      doc.setDrawColor(74, 43, 115);
      doc.line(margin, y, w - margin, y);

      y += 8;
      doc.setTextColor(214, 177, 90);
      doc.setFontSize(8);
      doc.text("ABOUT ME", margin, y);
      y += 6;
      doc.setTextColor(237, 234, 247);
      doc.setFontSize(8);
      const aboutLines = doc.splitTextToSize(
        character.aboutMe || "No description provided.",
        lineWidth,
      );
      doc.text(aboutLines.slice(0, 6), margin, y);
      y += Math.min(aboutLines.length, 6) * 5 + 4;
      doc.line(margin, y, w - margin, y);

      y += 8;
      doc.setTextColor(214, 177, 90);
      doc.setFontSize(9);
      doc.text("ABILITY SCORES", margin, y);
      y += 6;

      const abilityX = [
        margin,
        margin + 32,
        margin + 64,
        margin + 96,
        margin + 128,
        margin + 160,
      ];
      for (let i = 0; i < ABILITIES.length; i++) {
        const ability = ABILITIES[i];
        const x = abilityX[i];
        doc.setFillColor(74, 43, 115);
        doc.rect(x, y, 28, 14, "F");
        doc.setDrawColor(214, 177, 90);
        doc.rect(x, y, 28, 14);
        doc.setFontSize(6);
        doc.setTextColor(180, 160, 200);
        doc.text(ability.toUpperCase(), x + 14, y + 4, { align: "center" });
        doc.setFontSize(11);
        doc.setTextColor(214, 177, 90);
        doc.text(String(character.abilities[ability]), x + 14, y + 11, {
          align: "center",
        });
      }
      y += 20;
      doc.line(margin, y, w - margin, y);

      y += 8;
      doc.setTextColor(214, 177, 90);
      doc.setFontSize(9);
      doc.text("SELECTED SKILLS", margin, y);
      y += 6;

      for (const ability of ABILITIES) {
        const selected = SKILL_MAP[ability].filter((s) =>
          character.selectedSkills.includes(s),
        );
        if (selected.length === 0) continue;
        if (y > 260) break;
        doc.setFontSize(7);
        doc.setTextColor(180, 160, 200);
        doc.text(`${ability}:`, margin, y);
        doc.setTextColor(237, 234, 247);
        doc.text(selected.join(", "), margin + 28, y);
        y += 6;
      }

      if (activeSynergies.length > 0 && y < 260) {
        y += 4;
        doc.line(margin, y, w - margin, y);
        y += 8;
        doc.setTextColor(214, 177, 90);
        doc.setFontSize(9);
        doc.text("ACTIVE EQUIPMENT SYNERGIES", margin, y);
        y += 6;
        for (const syn of activeSynergies) {
          if (y > 265) break;
          doc.setFontSize(7);
          doc.setTextColor(237, 234, 247);
          doc.text(`${syn.title}: ${syn.effect}`, margin, y);
          y += 5;
        }
      }

      y = 282;
      doc.setDrawColor(214, 177, 90);
      doc.line(margin, y, w - margin, y);
      y += 5;
      doc.setFontSize(6);
      doc.setTextColor(130, 120, 160);
      doc.text("The Big Rubber Ball in Space - Character Sheet", w / 2, y, {
        align: "center",
      });

      doc.save(
        `TBRBS_${(character.name || "Character").replace(/\s+/g, "_")}.pdf`,
      );
      toast.success("PDF downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("PDF generation failed.");
    }
  };

  return (
    <div className="animate-slide-up space-y-4">
      <div
        className="rounded-xl p-5 text-center"
        style={{
          background: "oklch(13% 0.05 285 / 0.8)",
          border: "1px solid oklch(75% 0.1 75 / 0.3)",
          boxShadow: "0 0 30px oklch(75% 0.1 75 / 0.1)",
        }}
      >
        <p
          className="text-[10px] font-cinzel tracking-[0.3em] uppercase"
          style={{ color: "var(--color-muted-fg)" }}
        >
          The Big Rubber Ball in Space
        </p>
        <h2 className="text-3xl font-cinzel font-black mt-1 text-gold-gradient">
          {character.name || "Unnamed Traveler"}
        </h2>
        <p
          className="text-sm font-rajdhani mt-1"
          style={{ color: "var(--color-muted-fg)" }}
        >
          {getRace() || "Unknown Origin"}
        </p>
      </div>

      {character.aboutMe && (
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(10% 0.03 285 / 0.6)",
            border: "1px solid oklch(25% 0.06 285 / 0.4)",
          }}
        >
          <p
            className="text-[10px] font-cinzel tracking-widest uppercase mb-2"
            style={{ color: "var(--color-gold-dim)" }}
          >
            About
          </p>
          <p
            className="text-sm font-rajdhani leading-relaxed"
            style={{ color: "var(--color-muted-fg)" }}
          >
            {character.aboutMe}
          </p>
        </div>
      )}

      <div
        className="rounded-xl p-4"
        style={{
          background: "oklch(10% 0.03 285 / 0.6)",
          border: "1px solid oklch(25% 0.06 285 / 0.4)",
        }}
      >
        <p
          className="text-[10px] font-cinzel tracking-widest uppercase mb-3"
          style={{ color: "var(--color-gold-dim)" }}
        >
          Ability Scores
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {ABILITIES.map((ability) => (
            <div
              key={ability}
              className="text-center rounded-lg py-3"
              style={{
                background: "oklch(13% 0.04 285 / 0.8)",
                border: "1px solid oklch(75% 0.1 75 / 0.2)",
              }}
            >
              <div className="text-lg">{ABILITY_ICONS[ability]}</div>
              <div
                className="text-2xl font-cinzel font-black"
                style={{ color: "var(--color-gold)" }}
              >
                {character.abilities[ability]}
              </div>
              <div
                className="text-[9px] font-cinzel tracking-wider uppercase"
                style={{ color: "var(--color-muted-fg)" }}
              >
                {ability.slice(0, 3)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-xl p-4"
        style={{
          background: "oklch(10% 0.03 285 / 0.6)",
          border: "1px solid oklch(25% 0.06 285 / 0.4)",
        }}
      >
        <p
          className="text-[10px] font-cinzel tracking-widest uppercase mb-3"
          style={{ color: "var(--color-gold-dim)" }}
        >
          Selected Skills
        </p>
        {ABILITIES.map((ability) => {
          const selected = SKILL_MAP[ability].filter((s) =>
            character.selectedSkills.includes(s),
          );
          if (selected.length === 0) return null;
          return (
            <div key={ability} className="mb-2 last:mb-0">
              <span
                className="text-[10px] font-cinzel uppercase tracking-widest"
                style={{ color: "var(--color-muted-fg)" }}
              >
                {ABILITY_ICONS[ability]} {ability}:{" "}
              </span>
              <span
                className="text-xs font-rajdhani"
                style={{ color: "var(--color-foreground)" }}
              >
                {selected.join(" · ")}
              </span>
            </div>
          );
        })}
        {character.selectedSkills.length === 0 && (
          <p
            className="text-xs font-rajdhani"
            style={{ color: "var(--color-muted-fg)" }}
          >
            No skills selected yet.
          </p>
        )}
      </div>

      {activeSynergies.length > 0 && (
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(18% 0.06 75 / 0.2)",
            border: "1px solid oklch(75% 0.1 75 / 0.3)",
          }}
        >
          <p
            className="text-[10px] font-cinzel tracking-widest uppercase mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            Active Synergies
          </p>
          {activeSynergies.map((syn) => (
            <div
              key={syn.id}
              className="flex items-center gap-2 mb-1.5 last:mb-0"
            >
              <span>{syn.icon}</span>
              <span
                className="text-xs font-cinzel"
                style={{ color: "var(--color-gold)" }}
              >
                {syn.title}
              </span>
              <span
                className="text-xs font-rajdhani"
                style={{ color: "var(--color-muted-fg)" }}
              >
                — {syn.effect}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          data-ocid="sheet.save_button"
          onClick={handleSave}
          className="btn-purple px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2"
        >
          💾 Save Character
        </button>
        <button
          type="button"
          data-ocid="sheet.download_pdf.button"
          onClick={handleDownloadPDF}
          className="btn-gold px-4 py-3 text-sm flex items-center justify-center gap-2"
        >
          📄 Download PDF
        </button>
      </div>
    </div>
  );
}
