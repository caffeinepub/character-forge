import { Button } from "@/components/ui/button";
import { Sword } from "lucide-react";

interface NavbarProps {
  view: "create" | "characters";
  onViewChange: (v: "create" | "characters") => void;
}

export default function Navbar({ view, onViewChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/40 bg-primary/10">
            <Sword className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xs font-semibold tracking-widest text-primary">
              CHARACTER
            </div>
            <div className="font-display text-xs font-semibold tracking-widest text-foreground">
              FORGE
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          <button
            type="button"
            data-ocid="nav.create.link"
            onClick={() => onViewChange("create")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              view === "create"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Create
          </button>
          <button
            type="button"
            data-ocid="nav.characters.link"
            onClick={() => onViewChange("characters")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              view === "characters"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            My Characters
          </button>
        </nav>

        {/* CTA */}
        <Button
          data-ocid="nav.explore.button"
          onClick={() => onViewChange("create")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-teal-sm px-5 text-sm font-semibold"
        >
          Explore
        </Button>
      </div>
    </header>
  );
}
