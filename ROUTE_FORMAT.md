# Route File Format Guide

Route files live in `common/data/routes/` and use a plain-text format parsed by the route processor.

---

## File Names

| File | Purpose |
|------|---------|
| `act-1.txt` … `act-10.txt` | Campaign route (ACT 1-10) |
| `voidstone-1.txt` … `voidstone-4.txt` | Endgame voidstone progression |

---

## Sections

A section creates a collapsible group with a header in the UI.

```
#section Section Name
```

Every step below this line (until the next `#section`) belongs to this group.

---

## Steps

Each non-empty, non-directive line is a route step. Steps can mix plain text and **fragment tags**.

### Sub-steps (`#sub`)

Sub-steps are collapsed behind an info icon (ⓘ) on the parent step. Use them for optional tips or context that doesn't need to be visible by default.

```
Main step text
    #sub Sub-step hint (indented with spaces or tab)
    #sub Another hint
```

**Example:**
```
{ascend|eternal}
    #sub Requires level 68 and {quest_text|Offering to the Goddess}
    #sub Obtain Offering by completing a Trial of Ascendancy in a {map_yellow|T6+} map
```

---

## Fragment Tags

Tags are written as `{type|value}` inline within step text.

### Boss / Enemy

```
{kill|Boss Name}
```
Renders in orange. Marks the step as a boss-kill step (adds orange left border highlight).

**Examples:**
```
Kill {kill|Merveil, the Siren}
Kill {kill|The Eater of Worlds}
```

### Arena / Map

```
{arena|Area Name}
```
Renders in blue. Use for boss arenas and endgame map portals. Prefix with `➞` for navigation steps.

```
➞ {arena|The Searing Exarch's Domain}
```

### Map Tiers

```
{map_white|T1-T5}     ← White maps  (grey)
{map_yellow|T6-T10}   ← Yellow maps (gold)
{map_red|T11-T16}     ← Red maps    (red)
{map_guardian|T16}    ← Guardian maps (blue)
{map_pinnacle|T17}    ← Pinnacle maps (purple)
```

Use these for any step that references a map tier range.

**Examples:**
```
Run {map_white|T1-T4} influenced maps — complete biome objectives
Farm {map_red|T13-T15} influenced maps until invitation drops
```

### Quest Text / Item Names

```
{quest_text|Item or Quest Name}
```
Renders in green. Use for: quest items, invitation fragments, voidstones, currencies referenced by name.

```
Alch {quest_text|Screaming Invitation} to Rare
Take the {quest_text|Grasping Voidstone} and socket it into your Atlas Map Device
```

### League Mechanic

```
{league|Mechanic Name}
```
Renders in red/pink. Use for league mechanics, bosses unlocked via mechanics, and named systems.

```
Enable {league|Eater of Worlds} influence when opening maps
Speak with {league|The Envoy} when it appears
```

### Waypoint

```
{waypoint|Area_Id}
```
Renders as a waypoint icon + "Waypoint" label. The `Area_Id` must match the internal area database (e.g., `Labyrinth_Airlock`).

### Ascend

```
{ascend|normal}
{ascend|cruel}
{ascend|merciless}
{ascend|eternal}
```
Renders with a trial icon + "Ascend" label + level requirement. Adds green left border highlight. Also shows a poelab.com link for the daily layout.

### Crafting Recipe

```
{crafting|Area_Id}
```
Renders with a crafting icon. The `Area_Id` must be a boss area that unlocks a crafting recipe (e.g., `EndGame_Labyrinth_boss_3`).

---

## Conditional Sections (`#ifdef` / `#endif`)

Use preprocessor directives to include steps only when a config option is enabled.

```
#ifdef showCraftingRecipes
Get {crafting|some_area}
#endif
```

Config keys currently available:
- `showCraftingRecipes` — show bench recipe unlock steps
- `showSubsteps` — show sub-step content expanded by default

---

## Full Example

```
#section Eater of Worlds Progression
Enable {league|Eater of Worlds} influence when opening maps
Run {map_white|T1-T4} influenced maps — complete biome objectives
Run {map_yellow|T5-T8} influenced maps — complete biome objectives
Run {map_red|T9-T12} influenced maps — complete biome objectives
Farm {map_red|T13-T15} influenced maps until {quest_text|Screaming Invitation} drops

#section The Eater of Worlds
Alch {quest_text|Screaming Invitation} to Rare
➞ {arena|The Absence of Symmetry and Harmony}
Kill {kill|The Eater of Worlds}
Take the {quest_text|Grasping Voidstone} and socket it into your Atlas Map Device
```

---

## Step Highlight Rules

The UI automatically applies a colored left border based on step content:

| Highlight | Color | Trigger |
|-----------|-------|---------|
| Boss | Orange | Step contains `{kill|...}` (act route) |
| Pinnacle | Gold | Step contains `{kill|...}` (voidstone route) |
| Ascend | Green | Step contains `{ascend|...}` |

---

## Tips

- Use `➞` (U+27B6) as a navigation prefix for arena/area transitions. It is recognized as plain text.
- Plain text in a step (no tags) renders as-is in the default colour.
- Sub-steps support the same fragment tags as main steps.
- Keep section names concise — they appear as collapsible section headers in the UI.
