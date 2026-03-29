import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Character } from "../backend.d";
import { getAvatar } from "../data/gameData";
import { useDeleteCharacter, useGetAllCharacters } from "../hooks/useQueries";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

interface CharactersGalleryProps {
  onCreateNew: () => void;
}

export default function CharactersGallery({
  onCreateNew,
}: CharactersGalleryProps) {
  const { data: characters, isLoading, isError } = useGetAllCharacters();
  const deleteCharacter = useDeleteCharacter();

  async function handleDelete(id: bigint, name: string) {
    try {
      await deleteCharacter.mutateAsync(id);
      toast.success(`${name} removed from roster.`);
    } catch {
      toast.error("Failed to delete character.");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-foreground">
            My Characters
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your roster of forged heroes and shadows.
          </p>
        </div>
        <Button
          data-ocid="gallery.create_new.button"
          onClick={onCreateNew}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-teal-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> New Character
        </Button>
      </div>

      {isLoading && (
        <div
          data-ocid="gallery.loading_state"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {SKELETON_KEYS.map((k) => (
            <Skeleton key={k} className="h-52 rounded-xl bg-surface" />
          ))}
        </div>
      )}

      {isError && (
        <div
          data-ocid="gallery.error_state"
          className="flex flex-col items-center gap-3 py-20 text-center"
        >
          <p className="text-destructive">Failed to load characters.</p>
          <Button
            variant="outline"
            onClick={onCreateNew}
            className="border-border"
          >
            Create your first character
          </Button>
        </div>
      )}

      {!isLoading && !isError && characters && characters.length === 0 && (
        <motion.div
          data-ocid="gallery.empty_state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 py-24 text-center"
        >
          <div className="text-6xl">🗡️</div>
          <h2 className="font-display text-xl font-bold uppercase tracking-wider text-foreground">
            No Characters Yet
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Your roster is empty. Forge your first hero in the Character
            Creator.
          </p>
          <Button
            data-ocid="gallery.start_creating.button"
            onClick={onCreateNew}
            className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-teal-sm"
          >
            Start Creating
          </Button>
        </motion.div>
      )}

      {!isLoading && !isError && characters && characters.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {characters.map((char: Character, i: number) => {
            const avatarEmoji = getAvatar(char.race, char.gender);
            const raceDisplay = char.race.replace("sr-", "").replace(/-/g, " ");
            const classDisplay = char.archetype.replace(/-/g, " ");

            return (
              <motion.div
                key={String(char.id)}
                data-ocid={`gallery.item.${i + 1}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative flex flex-col rounded-xl border border-border bg-card shadow-card transition-all hover:border-primary/40"
              >
                <div className="flex h-32 items-center justify-center rounded-t-xl bg-surface text-5xl">
                  {avatarEmoji}
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <div className="mb-1 truncate font-display text-sm font-bold uppercase tracking-wide text-foreground">
                    {char.name}
                  </div>
                  <div className="mb-2 flex flex-wrap gap-1">
                    <Badge
                      variant="outline"
                      className="border-primary/40 bg-primary/5 px-1.5 text-[10px] text-primary"
                    >
                      {char.gameSystem === "dnd" ? "D&D" : "SR"}
                    </Badge>
                  </div>
                  <div className="truncate text-xs capitalize text-muted-foreground">
                    {raceDisplay} · {classDisplay}
                  </div>
                </div>
                <button
                  type="button"
                  data-ocid={`gallery.delete_button.${i + 1}`}
                  onClick={() => handleDelete(char.id, char.name)}
                  disabled={deleteCharacter.isPending}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card/80 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:border-destructive hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                  aria-label={`Delete ${char.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
