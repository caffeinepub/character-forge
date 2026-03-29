export type Ability =
  | "Strength"
  | "Dexterity"
  | "Perception"
  | "Knowledge"
  | "Mechanical"
  | "Technical";

export const ABILITY_ICONS: Record<Ability, string> = {
  Strength: "⚔️",
  Dexterity: "🎯",
  Perception: "👁️",
  Knowledge: "📚",
  Mechanical: "⚙️",
  Technical: "🔬",
};

export const ABILITY_COLORS: Record<Ability, string> = {
  Strength: "oklch(55% 0.18 22)",
  Dexterity: "oklch(60% 0.18 145)",
  Perception: "oklch(62% 0.18 210)",
  Knowledge: "oklch(65% 0.18 290)",
  Mechanical: "oklch(68% 0.16 55)",
  Technical: "oklch(60% 0.18 175)",
};

export const SKILL_MAP: Record<Ability, string[]> = {
  Strength: ["Athletics", "Parry", "Brawl", "Base Defense", "Fortitude"],
  Dexterity: ["Dodge", "Block", "Ranged", "Melee"],
  Perception: [
    "Diplomacy",
    "Subterfuge",
    "Investigations",
    "Reconnaissance",
    "Stealth",
    "Con Artist",
    "Initiative",
    "Tracking",
    "Haggle",
    "Reflexes",
  ],
  Knowledge: ["Sabotage", "Siege", "Preparedness", "Willpower"],
  Mechanical: [
    "Outfitting",
    "Warding",
    "Gunnery",
    "Piloting",
    "Mounted Weapons",
  ],
  Technical: [
    "Medicine",
    "Security",
    "Use Device",
    "Tactical",
    "Trapping/Demolitions",
    "Sensors",
    "Shields",
  ],
};

export const ABILITIES: Ability[] = [
  "Strength",
  "Dexterity",
  "Perception",
  "Knowledge",
  "Mechanical",
  "Technical",
];

export const RACES = [
  "Human",
  "Elf",
  "Dwarf",
  "Orc",
  "Tiefling",
  "Dragonborn",
  "Troll",
  "Goblin",
  "Custom",
];

export const TOTAL_POINTS = 30;

export interface EquipmentSynergy {
  id: string;
  title: string;
  description: string;
  skills: string[];
  effect: string;
  icon: string;
}

export const EQUIPMENT_SYNERGIES: EquipmentSynergy[] = [
  {
    id: "acquisition",
    title: "Equipment Acquisition",
    description:
      "Masters of procurement — your skill in negotiation, gadgetry, armor-craft, warding, and siege mechanics lets you acquire superior gear at reduced cost.",
    skills: ["Haggle", "Use Device", "Outfitting", "Warding", "Siege"],
    effect: "Reduced cost & better access to rare equipment",
    icon: "🛒",
  },
  {
    id: "defense",
    title: "Defense Equipment Bonus",
    description:
      "Warding mastery imbues your defensive gear with arcane protection, increasing the effective defense rating of worn armor.",
    skills: ["Warding"],
    effect: "+Defense rating on worn armor",
    icon: "🛡️",
  },
  {
    id: "weapon_power",
    title: "Weapon Power Amplification",
    description:
      "Siege expertise translates to raw destructive capability — your weapons hit harder and penetrate deeper.",
    skills: ["Siege"],
    effect: "Amplified weapon damage & penetration",
    icon: "⚔️",
  },
  {
    id: "crafting",
    title: "Crafting Efficiency",
    description:
      "The fusion of Outfitting and Tactical thinking creates a craftsman who wastes nothing and innovates constantly.",
    skills: ["Outfitting", "Tactical"],
    effect: "Faster crafting with higher quality output",
    icon: "🔨",
  },
  {
    id: "advanced_gear",
    title: "Advanced Gear Handling",
    description:
      "Use Device expertise allows you to operate exotic and experimental technology that others cannot even activate.",
    skills: ["Use Device"],
    effect: "Access to exotic & experimental equipment",
    icon: "🔧",
  },
  {
    id: "mech_crafting",
    title: "Mechanical Crafting Bonus",
    description:
      "Combining Outfitting mastery with raw Strength creates mechanical constructs of exceptional durability and power.",
    skills: ["Outfitting", "Athletics"],
    effect: "+Durability & power on mechanical constructs",
    icon: "⚙️",
  },
];

export interface Character {
  name: string;
  race: string;
  customRace: string;
  aboutMe: string;
  abilities: Record<Ability, number>;
  selectedSkills: string[];
}

export const DEFAULT_CHARACTER: Character = {
  name: "",
  race: "",
  customRace: "",
  aboutMe: "",
  abilities: {
    Strength: 5,
    Dexterity: 5,
    Perception: 5,
    Knowledge: 5,
    Mechanical: 5,
    Technical: 5,
  },
  selectedSkills: [],
};
