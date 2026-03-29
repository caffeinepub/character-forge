import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface StepDetailsProps {
  characterName: string;
  bio: string;
  onNameChange: (name: string) => void;
  onBioChange: (bio: string) => void;
  onSave: () => void;
  isSaving: boolean;
  isSaved: boolean;
  onCreateAnother: () => void;
  onViewCharacters: () => void;
}

export default function StepDetails({
  characterName,
  bio,
  onNameChange,
  onBioChange,
  onSave,
  isSaving,
  isSaved,
  onCreateAnother,
  onViewCharacters,
}: StepDetailsProps) {
  const [nameError, setNameError] = useState("");

  function handleSave() {
    if (!characterName.trim()) {
      setNameError("Character name is required.");
      return;
    }
    setNameError("");
    onSave();
  }

  if (isSaved) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 py-16 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 border border-primary">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-foreground">
            Character Saved!
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {characterName}
            </span>{" "}
            has been added to your roster.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            data-ocid="details.create_another.button"
            variant="outline"
            onClick={onCreateAnother}
            className="border-border text-foreground hover:bg-surface"
          >
            Create Another
          </Button>
          <Button
            data-ocid="details.view_characters.button"
            onClick={onViewCharacters}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            View Characters
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold uppercase tracking-wider text-foreground">
        STEP 6: DETAILS & BIO
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Give your character a name and backstory.
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="char-name"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Character Name *
          </Label>
          <Input
            id="char-name"
            data-ocid="details.name.input"
            value={characterName}
            onChange={(e) => {
              onNameChange(e.target.value);
              if (nameError) setNameError("");
            }}
            placeholder="Enter character name..."
            className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/30"
          />
          {nameError && (
            <p
              data-ocid="details.name.error_state"
              className="text-xs text-destructive"
            >
              {nameError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="char-bio"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Backstory / Bio
          </Label>
          <Textarea
            id="char-bio"
            data-ocid="details.bio.textarea"
            value={bio}
            onChange={(e) => onBioChange(e.target.value)}
            placeholder="Write your character's backstory..."
            rows={5}
            className="resize-none border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/30"
          />
        </div>

        <Button
          data-ocid="details.save.submit_button"
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-primary py-5 text-base font-bold text-primary-foreground hover:bg-primary/90 glow-teal-sm"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            "SAVE CHARACTER"
          )}
        </Button>
      </div>
    </div>
  );
}
