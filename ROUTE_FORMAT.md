# Route File Format

Route files live in `common/data/routes/` and use plain text parsed by the route processor.

## Files

| File | Purpose |
|------|---------|
| `act-1.txt` … `act-10.txt` | Campaign (from upstream exile-leveling) |
| `voidstone-1.txt` … `voidstone-4.txt` | Voidstone progression |

Edit in app: **Settings → Edit Route / Edit Voidstone Route / Edit Challenges**

---

## Directives

```
#section Section Name        → collapsible section header
    #sub Hint text           → sub-step, hidden behind ⓘ icon on parent step
#ifdef showCraftingRecipes
...steps...
#endif                       → conditional block (config key must match)
```

Available `#ifdef` keys:

| Key | Toggle |
|-----|--------|
| `showCraftingRecipes` | Campaign → Show Crafting |

---

## Fragment Tags  `{type|value}`

| Tag | Colour | Use |
|-----|--------|-----|
| `{kill|Boss Name}` | Orange | Boss kill step (adds left border highlight) |
| `{arena|Area Name}` | Blue | Boss arena / map portal — prefix with `➞` |
| `{quest_text|Name}` | Green | Quest items, invitations, voidstones |
| `{league|Name}` | Red | League mechanics, mechanic-named bosses |
| `{ascend|normal\|cruel\|merciless\|eternal}` | — | Ascendancy step (green highlight, poelab link) |
| `{waypoint|Area_Id}` | — | Waypoint icon |
| `{crafting|Area_Id}` | — | Crafting recipe unlock |
| `{map_white|T1-T5}` | Grey | White map tier range |
| `{map_yellow|T6-T10}` | Gold | Yellow map tier range |
| `{map_red|T11-T16}` | Red | Red map tier range |
| `{map_guardian|T16}` | Blue | Guardian map |
| `{map_pinnacle|T17}` | Purple | Pinnacle map |

---

## Step Highlights

| Highlight | Colour | Trigger |
|-----------|--------|---------|
| Boss | Orange | `{kill|...}` in ACT route |
| Pinnacle | Gold | `{kill|...}` in voidstone route |
| Ascend | Green | `{ascend|...}` |

---

## Example

```
#section The Eater of Worlds
Alch {quest_text|Screaming Invitation} to Rare
➞ {arena|The Absence of Symmetry and Harmony}
Kill {kill|The Eater of Worlds}
Take the {quest_text|Grasping Voidstone} and socket it into your Atlas Map Device

#section Eternal Labyrinth
{ascend|eternal}
    #sub Requires level 68 and {quest_text|Offering to the Goddess}
    #sub Obtain Offering by completing a Trial in a {map_yellow|T6+} map
#ifdef showCraftingRecipes
Get {crafting|EndGame_Labyrinth_boss_3}
#endif
```
