# Route File Format Guide

Route files live in `common/data/routes/` and use a plain-text format parsed by the route processor.

---

## File Names

| File | Purpose |
|------|---------|
| `act-1.txt` … `act-10.txt` | Campaign route (ACT 1–10) — from upstream exile-leveling |
| `voidstone-1.txt` … `voidstone-4.txt` | Endgame voidstone progression |

---

## Sections

A section creates a collapsible group with a named header in the UI.

```
#section Section Name
```

Every step below this line (until the next `#section`) belongs to this group.
Keep section names short — they appear as sticky headers when scrolling.

---

## Steps

Each non-empty, non-directive line is a route step. Steps can mix plain text with **fragment tags**.

### Sub-steps (`#sub`)

Sub-steps collapse behind an info icon (ⓘ) on the parent step. Use them for optional tips or context that doesn't need to be visible by default. They support all the same fragment tags as main steps.

```
Main step text
    #sub Sub-step hint
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

Tags are written as `{type|value}` inline within step text. Multiple tags can appear in one step.

### Boss / Enemy

```
{kill|Boss Name}
```
Renders in **orange**. Marks the step as a boss-kill (adds left border highlight). Boss stat hints (level, DPS, resistances) are shown automatically when "Show Stat Hints" is enabled.

```
Kill {kill|Merveil, the Siren}
Kill {kill|The Eater of Worlds}
```

### Arena / Location

```
{arena|Area Name}
```
Renders in **blue**. Use for boss arenas and map portals. Prefix with `➞` for navigation steps.

```
➞ {arena|The Searing Exarch's Domain}
➞ {arena|The Shaper's Realm}
```

### Map Tiers

```
{map_white|T1-T5}     ← White maps  (grey)
{map_yellow|T6-T10}   ← Yellow maps (gold)
{map_red|T11-T16}     ← Red maps    (red)
{map_guardian|T16}    ← Guardian maps (light blue)
{map_pinnacle|T17}    ← Pinnacle maps (purple)
```

```
Run {map_white|T1-T4} influenced maps — complete biome objectives
Farm {map_red|T13-T15} influenced maps until invitation drops
```

### Quest Text / Item Names

```
{quest_text|Item or Quest Name}
```
Renders in **green**. Use for: quest items, invitation fragments, voidstones, key currencies.

```
Alch {quest_text|Screaming Invitation} to Rare
Take the {quest_text|Grasping Voidstone} and socket it into your Atlas Map Device
```

### League Mechanic

```
{league|Mechanic Name}
```
Renders in **red/pink**. Use for league mechanics, mechanic-specific bosses, and named systems.

```
Enable {league|Eater of Worlds} influence when opening maps
Speak with {league|The Envoy} when it appears
```

### Waypoint

```
{waypoint|Area_Id}
```
Renders as a waypoint icon + "Waypoint" label. `Area_Id` must match the internal area database (e.g. `Labyrinth_Airlock`).

### Ascend

```
{ascend|normal}
{ascend|cruel}
{ascend|merciless}
{ascend|eternal}
```
Renders with a trial icon + "Ascend" + level requirement. Adds **green** left border highlight. Also renders a poelab.com link for the daily layout.

### Crafting Recipe

```
{crafting|Area_Id}
```
Renders with a crafting icon. `Area_Id` must be a boss area that unlocks a bench recipe (e.g. `EndGame_Labyrinth_boss_3`).

---

## Conditional Sections (`#ifdef` / `#endif`)

Steps inside `#ifdef` blocks are shown only when the matching config toggle is enabled.

```
#ifdef showCraftingRecipes
Get {crafting|EndGame_Labyrinth_boss_3}
#endif
```

Available config keys:
| Key | Toggle location |
|-----|----------------|
| `showCraftingRecipes` | Campaign → Show Crafting |

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

The UI automatically applies a coloured left border based on step content:

| Highlight | Colour | Trigger |
|-----------|--------|---------|
| Boss | Orange | `{kill|...}` in an ACT route step |
| Pinnacle | Gold | `{kill|...}` in a voidstone route step |
| Ascend | Green | `{ascend|...}` in any route step |

---

## Tips

- Use `➞` (→ arrow, U+27B6) as a navigation prefix before `{arena|...}` steps.
- Plain text in a step (no tags) renders in the default colour.
- Sub-steps support all the same fragment tags as main steps.
- Keep section names concise — they appear as sticky collapsible headers in the UI.
- To edit route files in the app: **Settings → Edit Route** (campaign) or **Settings → Edit Voidstone Route** (voidstones).
