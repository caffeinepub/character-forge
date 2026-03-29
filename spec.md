# Character Forge

## Current State
New project. Empty Motoko backend and scaffolded React frontend.

## Requested Changes (Diff)

### Add
- Character creator app supporting D&D and Shadowrun systems
- User selects: game system, race, gender, class/archetype
- Avatar selection based on chosen race + gender combination
- Character summary/card display after creation
- Ability to save characters to the backend (per session or named)
- Browse saved characters

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan

### Backend (Motoko)
- Character type: { id, name, system (DnD|Shadowrun), race, gender, class, avatarId, createdAt }
- createCharacter(name, system, race, gender, class, avatarId) -> Character
- getCharacters() -> [Character]
- deleteCharacter(id) -> Bool

### Frontend
- Multi-step character creator wizard:
  1. Choose game system (D&D or Shadowrun)
  2. Choose race (filtered by system)
  3. Choose gender
  4. Choose class/archetype (filtered by system)
  5. Choose avatar (filtered by race + gender)
  6. Name your character + confirm
- Character card preview panel (updates live as user selects)
- Gallery of saved characters
- Dark fantasy/cyberpunk aesthetic

### Data
- D&D Races: Human, Elf, Dwarf, Halfling, Gnome, Half-Orc, Tiefling, Dragonborn
- D&D Classes: Fighter, Wizard, Rogue, Cleric, Ranger, Paladin, Bard, Druid, Warlock, Barbarian
- Shadowrun Races (Metatypes): Human, Elf, Dwarf, Ork, Troll
- Shadowrun Archetypes: Street Samurai, Decker, Mage, Shaman, Rigger, Face, Adept, Technomancer
- Genders: Male, Female, Non-binary
- Avatars: SVG/emoji-based or illustrated placeholders keyed by race+gender
