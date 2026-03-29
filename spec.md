# The Big Rubber Ball in Space: Character Creation

## Current State
Empty project — no existing application files.

## Requested Changes (Diff)

### Add
- Full character creation website with dark fantasy/sci-fi aesthetic
- Animated space background (stars + nebula clouds)
- Multi-step character creation wizard (Step 1: Basics, Step 2: Abilities & Skills, Step 3: Character Sheet)
- Step 1: Character Name, Race dropdown (Human, Elf, Dwarf, Orc, Tiefling, Dragonborn, Troll, Goblin, Custom), About Me textarea
- Step 2: 6 ability sliders (Strength, Dexterity, Perception, Knowledge, Mechanical, Technical) with 0-10 point values and live linked skills display
- Skill system: each ability governs specific skills shown as live feedback below each slider
- Smart recommendation system: highlights which ability controls most selected skills and shows suggestion text
- Equipment Synergy panel with tooltips/hover effects explaining skill-equipment relationships
- Step 3: Character Sheet view with PDF generation (jsPDF)
- Save to localStorage, Reset/Edit functionality
- Responsive layout (mobile + desktop)
- Glassmorphism UI panels, glowing accents, smooth animations

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Install jsPDF dependency
2. Create animated space background component (canvas or CSS stars + nebula)
3. Build multi-step wizard with step indicator
4. Step 1: BasicInfo form (name, race, custom race, about)
5. Step 2: AbilitySliders with linked skills display, point-buy tracking
6. Smart recommendation logic based on ability scores
7. Equipment Synergy panel with hover tooltips
8. Step 3: CharacterSheet preview + PDF export using jsPDF
9. localStorage save/load/reset logic
10. Full styling: deep blacks, cosmic purples, gold highlights, glassmorphism, glow effects
