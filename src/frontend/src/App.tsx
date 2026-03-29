import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import CharacterCreator from "./components/CharacterCreator";
import CharactersGallery from "./components/CharactersGallery";
import Navbar from "./components/Navbar";

type View = "create" | "characters";

export default function App() {
  const [view, setView] = useState<View>("create");

  return (
    <div className="min-h-screen">
      <Navbar view={view} onViewChange={setView} />

      <main className="min-h-[calc(100vh-56px-56px)]">
        {view === "create" && (
          <CharacterCreator onViewCharacters={() => setView("characters")} />
        )}
        {view === "characters" && (
          <CharactersGallery onCreateNew={() => setView("create")} />
        )}
      </main>

      <footer className="border-t border-border bg-card/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Character Forge — D&D &amp; Shadowrun Character Creator
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <Toaster richColors />
    </div>
  );
}
