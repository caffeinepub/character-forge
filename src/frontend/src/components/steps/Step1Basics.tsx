import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Character } from "@/data/gameData";
import { RACES } from "@/data/gameData";

interface Props {
  character: Character;
  onChange: (updates: Partial<Character>) => void;
}

const glassInput = {
  background: "oklch(10% 0.03 285 / 0.7)",
  border: "1px solid oklch(30% 0.06 285 / 0.5)",
  color: "var(--color-foreground)",
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: "15px",
  outline: "none",
};

export default function Step1Basics({ character, onChange }: Props) {
  return (
    <div className="animate-slide-up space-y-6">
      <div className="text-center mb-6">
        <p className="text-[var(--color-muted-fg)] font-rajdhani text-sm tracking-widest uppercase">
          Define your identity in the cosmos
        </p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label
          className="text-[10px] font-cinzel tracking-[0.2em] uppercase"
          style={{ color: "var(--color-label)" }}
        >
          Character Name
        </Label>
        <Input
          data-ocid="character.name.input"
          value={character.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Enter your designation..."
          className="rounded-xl h-11 placeholder:text-[var(--color-muted-fg)] focus:ring-1 focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)]"
          style={glassInput}
        />
      </div>

      {/* Race */}
      <div className="space-y-2">
        <Label
          className="text-[10px] font-cinzel tracking-[0.2em] uppercase"
          style={{ color: "var(--color-label)" }}
        >
          Species / Race
        </Label>
        <Select
          value={character.race}
          onValueChange={(v) => onChange({ race: v })}
        >
          <SelectTrigger
            data-ocid="character.race.select"
            className="rounded-xl h-11"
            style={glassInput}
          >
            <SelectValue placeholder="Select your lineage..." />
          </SelectTrigger>
          <SelectContent
            style={{
              background: "oklch(12% 0.04 285)",
              border: "1px solid oklch(30% 0.06 285 / 0.5)",
            }}
          >
            {RACES.map((r) => (
              <SelectItem key={r} value={r} className="font-rajdhani">
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Custom race */}
      {character.race === "Custom" && (
        <div className="space-y-2 animate-fade-in">
          <Label
            className="text-[10px] font-cinzel tracking-[0.2em] uppercase"
            style={{ color: "var(--color-label)" }}
          >
            Custom Race Name
          </Label>
          <Input
            data-ocid="character.custom_race.input"
            value={character.customRace}
            onChange={(e) => onChange({ customRace: e.target.value })}
            placeholder="Describe your unique lineage..."
            className="rounded-xl h-11 placeholder:text-[var(--color-muted-fg)] focus:ring-1 focus:ring-[var(--color-gold)]"
            style={glassInput}
          />
        </div>
      )}

      {/* About Me */}
      <div className="space-y-2">
        <Label
          className="text-[10px] font-cinzel tracking-[0.2em] uppercase"
          style={{ color: "var(--color-label)" }}
        >
          About Me
        </Label>
        <Textarea
          data-ocid="character.aboutme.textarea"
          value={character.aboutMe}
          onChange={(e) => onChange({ aboutMe: e.target.value })}
          placeholder="Your origin story, motivations, the cosmic thread that brought you here..."
          rows={5}
          className="rounded-xl resize-none placeholder:text-[var(--color-muted-fg)] focus:ring-1 focus:ring-[var(--color-gold)]"
          style={{ ...glassInput }}
        />
      </div>
    </div>
  );
}
