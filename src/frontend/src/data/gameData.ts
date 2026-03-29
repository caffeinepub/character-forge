// =============================================
// D&D Data
// =============================================

export interface DndRace {
  id: string;
  name: string;
  description: string;
  stats: {
    STR: number;
    DEX: number;
    INT: number;
    WIS: number;
    CHA: number;
    CON: number;
  };
  lore: string;
  emoji: string;
}

export const DND_RACES: DndRace[] = [
  {
    id: "human",
    name: "Human",
    description:
      "Versatile and ambitious, humans dominate most known worlds through sheer adaptability.",
    stats: { STR: 1, DEX: 1, INT: 1, WIS: 1, CHA: 1, CON: 1 },
    lore: "Adaptable",
    emoji: "🧑",
  },
  {
    id: "elf",
    name: "Elf",
    description:
      "Ancient and graceful, elves are masters of magic and the natural world.",
    stats: { STR: 0, DEX: 2, INT: 1, WIS: 1, CHA: 1, CON: 0 },
    lore: "Fey Heritage",
    emoji: "🧝",
  },
  {
    id: "dwarf",
    name: "Dwarf",
    description:
      "Stout and unyielding, dwarves are legendary smiths and fierce warriors.",
    stats: { STR: 1, DEX: 0, INT: 0, WIS: 1, CHA: 0, CON: 2 },
    lore: "Stonecutters",
    emoji: "🧔",
  },
  {
    id: "halfling",
    name: "Halfling",
    description:
      "Small but remarkably lucky, halflings have an uncanny knack for survival.",
    stats: { STR: 0, DEX: 2, INT: 0, WIS: 1, CHA: 1, CON: 0 },
    lore: "Lucky",
    emoji: "🌿",
  },
  {
    id: "gnome",
    name: "Gnome",
    description:
      "Inquisitive and inventive, gnomes are natural tinkerers with a gift for illusion.",
    stats: { STR: 0, DEX: 1, INT: 2, WIS: 0, CHA: 0, CON: 1 },
    lore: "Illusionist",
    emoji: "🔮",
  },
  {
    id: "half-orc",
    name: "Half-Orc",
    description:
      "Powerful and relentless, half-orcs channel orcish fury into devastating combat.",
    stats: { STR: 2, DEX: 0, INT: 0, WIS: 0, CHA: 0, CON: 1 },
    lore: "Savage Attacks",
    emoji: "⚔️",
  },
  {
    id: "tiefling",
    name: "Tiefling",
    description:
      "Touched by infernal power, tieflings carry demonic lineage and arcane potential.",
    stats: { STR: 0, DEX: 0, INT: 1, WIS: 0, CHA: 2, CON: 0 },
    lore: "Infernal",
    emoji: "😈",
  },
  {
    id: "dragonborn",
    name: "Dragonborn",
    description:
      "Dragon-blooded warriors with elemental breath weapons and proud clan traditions.",
    stats: { STR: 2, DEX: 0, INT: 0, WIS: 0, CHA: 1, CON: 0 },
    lore: "Draconic",
    emoji: "🐉",
  },
];

export interface DndClass {
  id: string;
  name: string;
  role: string;
  primaryStat: string;
  hitDie: string;
  emoji: string;
}

export const DND_CLASSES: DndClass[] = [
  {
    id: "fighter",
    name: "Fighter",
    role: "Martial combatant with unmatched weapon mastery",
    primaryStat: "STR/DEX",
    hitDie: "d10",
    emoji: "⚔️",
  },
  {
    id: "wizard",
    name: "Wizard",
    role: "Arcane scholar who bends reality through ancient spells",
    primaryStat: "INT",
    hitDie: "d6",
    emoji: "🧙",
  },
  {
    id: "rogue",
    name: "Rogue",
    role: "Shadow operative dealing devastating sneak attacks",
    primaryStat: "DEX",
    hitDie: "d8",
    emoji: "🗡️",
  },
  {
    id: "cleric",
    name: "Cleric",
    role: "Divine champion channeling godly power",
    primaryStat: "WIS",
    hitDie: "d8",
    emoji: "✝️",
  },
  {
    id: "ranger",
    name: "Ranger",
    role: "Wilderness hunter with beast companions",
    primaryStat: "DEX",
    hitDie: "d10",
    emoji: "🏹",
  },
  {
    id: "paladin",
    name: "Paladin",
    role: "Holy warrior sworn to a sacred oath",
    primaryStat: "STR",
    hitDie: "d10",
    emoji: "🛡️",
  },
  {
    id: "bard",
    name: "Bard",
    role: "Versatile performer with magical inspiration",
    primaryStat: "CHA",
    hitDie: "d8",
    emoji: "🎭",
  },
  {
    id: "druid",
    name: "Druid",
    role: "Nature's guardian who shapeshifts into beasts",
    primaryStat: "WIS",
    hitDie: "d8",
    emoji: "🌿",
  },
  {
    id: "warlock",
    name: "Warlock",
    role: "Pact-bound spellcaster of eldritch power",
    primaryStat: "CHA",
    hitDie: "d8",
    emoji: "👁️",
  },
  {
    id: "barbarian",
    name: "Barbarian",
    role: "Primal rage warrior with unmatched endurance",
    primaryStat: "STR",
    hitDie: "d12",
    emoji: "🪓",
  },
];

// =============================================
// Shadowrun Data
// =============================================

export interface SrMetatype {
  id: string;
  name: string;
  description: string;
  abilities: string[];
  modifiers: {
    BOD: number;
    AGI: number;
    REA: number;
    STR: number;
    CHA: number;
    INT: number;
  };
  emoji: string;
}

export const SR_METATYPES: SrMetatype[] = [
  {
    id: "sr-human",
    name: "Human",
    description:
      "The most common metatype, humans excel at adaptation in the Sixth World.",
    abilities: ["Extra Edge", "Versatile Skills"],
    modifiers: { BOD: 0, AGI: 0, REA: 0, STR: 0, CHA: 0, INT: 0 },
    emoji: "🧑",
  },
  {
    id: "sr-elf",
    name: "Elf",
    description:
      "Slender and charismatic, elves navigate the corporate world with effortless grace.",
    abilities: ["Low-Light Vision", "+2 CHA", "+1 AGI"],
    modifiers: { BOD: 0, AGI: 1, REA: 0, STR: 0, CHA: 2, INT: 0 },
    emoji: "🧝",
  },
  {
    id: "sr-dwarf",
    name: "Dwarf",
    description:
      "Short but tough, dwarves are masters of mechanics and magic resistance.",
    abilities: ["Thermographic Vision", "Magic Resistance", "+2 BOD"],
    modifiers: { BOD: 2, AGI: 0, REA: 0, STR: 2, CHA: 0, INT: 0 },
    emoji: "🧔",
  },
  {
    id: "sr-ork",
    name: "Ork",
    description:
      "Powerful and resilient, orks carve their place in the shadows through strength.",
    abilities: ["Low-Light Vision", "+3 BOD", "+2 STR"],
    modifiers: { BOD: 3, AGI: 0, REA: 0, STR: 2, CHA: -1, INT: 0 },
    emoji: "👹",
  },
  {
    id: "sr-troll",
    name: "Troll",
    description:
      "Massive and imposing, trolls are walking tanks feared across the sprawl.",
    abilities: ["Thermographic Vision", "Dermal Armor", "+4 BOD"],
    modifiers: { BOD: 4, AGI: -1, REA: 0, STR: 4, CHA: -2, INT: 0 },
    emoji: "👺",
  },
];

export interface SrArchetype {
  id: string;
  name: string;
  description: string;
  primarySkill: string;
  emoji: string;
}

export const SR_ARCHETYPES: SrArchetype[] = [
  {
    id: "street-samurai",
    name: "Street Samurai",
    description: "Cybernetically enhanced warrior living by a code",
    primarySkill: "Combat",
    emoji: "🗡️",
  },
  {
    id: "decker",
    name: "Decker",
    description: "Elite hacker jacking into the Matrix",
    primarySkill: "Electronics",
    emoji: "💻",
  },
  {
    id: "mage",
    name: "Mage",
    description: "Hermetic spellcaster harnessing pure magical theory",
    primarySkill: "Spellcasting",
    emoji: "🧙",
  },
  {
    id: "shaman",
    name: "Shaman",
    description: "Spirit caller walking between worlds",
    primarySkill: "Summoning",
    emoji: "🌀",
  },
  {
    id: "rigger",
    name: "Rigger",
    description: "Vehicle specialist with drone army at their command",
    primarySkill: "Piloting",
    emoji: "🚗",
  },
  {
    id: "face",
    name: "Face",
    description: "Social chameleon who talks their way out of anything",
    primarySkill: "Negotiation",
    emoji: "💬",
  },
  {
    id: "adept",
    name: "Adept",
    description: "Channels magic through their own body for peak performance",
    primarySkill: "Athletics",
    emoji: "🥋",
  },
  {
    id: "technomancer",
    name: "Technomancer",
    description: "Communicates with the Matrix through sheer willpower",
    primarySkill: "Resonance",
    emoji: "📡",
  },
];

// =============================================
// Genders
// =============================================

export const GENDERS = [
  { id: "male", label: "Male", emoji: "♂️" },
  { id: "female", label: "Female", emoji: "♀️" },
  { id: "non-binary", label: "Non-Binary", emoji: "⚧️" },
];

// =============================================
// Avatar system
// =============================================

export interface AvatarOption {
  id: number;
  emoji: string;
  label: string;
}

const AVATAR_MAP: Record<string, string> = {
  // D&D races by gender
  "human-male": "🧑",
  "human-female": "👩",
  "human-non-binary": "🧑‍🦱",
  "elf-male": "🧝‍♂️",
  "elf-female": "🧝‍♀️",
  "elf-non-binary": "🧝",
  "dwarf-male": "🧔",
  "dwarf-female": "👩‍🦱",
  "dwarf-non-binary": "🧔‍♀️",
  "halfling-male": "🌿",
  "halfling-female": "🍀",
  "halfling-non-binary": "🌱",
  "gnome-male": "🔮",
  "gnome-female": "🌟",
  "gnome-non-binary": "✨",
  "half-orc-male": "💪",
  "half-orc-female": "🗡️",
  "half-orc-non-binary": "⚔️",
  "tiefling-male": "😈",
  "tiefling-female": "👿",
  "tiefling-non-binary": "🔥",
  "dragonborn-male": "🐉",
  "dragonborn-female": "🦎",
  "dragonborn-non-binary": "⚡",
  // Shadowrun metatypes by gender
  "sr-human-male": "🧑",
  "sr-human-female": "👩",
  "sr-human-non-binary": "🧑‍💻",
  "sr-elf-male": "🧝‍♂️",
  "sr-elf-female": "🧝‍♀️",
  "sr-elf-non-binary": "🧝",
  "sr-dwarf-male": "🧔",
  "sr-dwarf-female": "👩‍🔧",
  "sr-dwarf-non-binary": "🔧",
  "sr-ork-male": "👹",
  "sr-ork-female": "💢",
  "sr-ork-non-binary": "🥊",
  "sr-troll-male": "👺",
  "sr-troll-female": "🦾",
  "sr-troll-non-binary": "🏔️",
};

export function getAvatar(race: string, gender: string): string {
  const key = `${race}-${gender}`;
  return AVATAR_MAP[key] || "🧑";
}

export function getAvatarOptions(race: string, gender: string): AvatarOption[] {
  const base = getAvatar(race, gender);
  const pool = [
    "🧑",
    "👩",
    "🧔",
    "🧝‍♂️",
    "🧝‍♀️",
    "🧙",
    "⚔️",
    "🗡️",
    "🛡️",
    "🔮",
    "🐉",
    "😈",
    "👹",
    "👺",
    "💪",
    "🏹",
    "✝️",
    "🎭",
    "👁️",
    "🪓",
    "🌀",
    "💻",
    "🥋",
    "📡",
    "💬",
    "🚗",
    "🌿",
    "🔥",
    "⚡",
    "🦾",
  ];
  // Start with the ideal avatar, then fill the rest
  const options: AvatarOption[] = [{ id: 0, emoji: base, label: "Default" }];
  let idx = 1;
  for (const emoji of pool) {
    if (emoji !== base && idx < 15) {
      options.push({ id: idx, emoji, label: `Style ${idx}` });
      idx++;
    }
  }
  return options;
}
