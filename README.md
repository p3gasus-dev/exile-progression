# Exile Progression

A Path of Exile progression tracker covering the full journey from campaign to endgame, built on top of [exile-leveling](https://github.com/HeartofPhos/exile-leveling) for core ACT 1–10 routing.

## Tabs

| Tab | Description |
|---|---|
| **Dashboard** | Route progress bars, unique item acquisition list, Pantheon/Anoints/Special Mods summary |
| **Route** | ACT 1–10 step tracker, Voidstone 1–4 boss routes, Challenge 1–40 tracker |
| **Campaign** | League start / library settings; display toggles (gems only, hints, crafting, stat hints) |
| **Atlas** | Voidstone completion order, unique drop display toggle, Labyrinth tracker |
| **Challenges** | Show/hide challenges toggle; editable challenge guide source |
| **Build** | PoB import, gem editor, search strings; Pantheon picker, Anoint builder, Special Mods |
| **Settings** | League selection, edit route source files, 3rd-party clipboard export |

---

## Getting Started

```bash
npm i
npm run dev -w web
```

---

## Architecture

### Upstream dependency

The ACT 1–10 route files and core route parser are sourced from
[heartofphos/exile-leveling](https://github.com/HeartofPhos/exile-leveling).
Exile Progression layers additional features on top without modifying the parser.

### New files added by Exile Progression

#### Route data
| File | Purpose |
|---|---|
| `common/data/routes/voidstone-1.txt` | Eater of Worlds route |
| `common/data/routes/voidstone-2.txt` | Searing Exarch route |
| `common/data/routes/voidstone-3.txt` | The Maven route |
| `common/data/routes/voidstone-4.txt` | Uber Elder route |

#### State
| File | Purpose |
|---|---|
| `web/src/state/atlas-config.ts` | Voidstone order, unique drop flag, lab tracker flag |
| `web/src/state/build-settings.ts` | Pantheon, Anoints, Special Mods |
| `web/src/state/challenge-progress.ts` | Toggle state for 40 challenges |
| `web/src/state/lab-progress.ts` | Toggle state for Normal/Cruel/Merciless/Uber lab |
| `web/src/state/progress-summary.ts` | Derived selectors: act/voidstone/challenge counts |
| `web/src/state/sidebar.ts` | Sidebar expanded atom + sidebar-visible selector |
| `web/src/state/unique-items.ts` | Unique items parsed from PoB import |
| `web/src/state/voidstone-progress.ts` | Toggle state for voidstone boss steps |
| `web/src/state/voidstone-route-files.ts` | Loads voidstone route files |
| `web/src/state/voidstone-route.ts` | Parses voidstone route files into structured Route |

#### Data tables
| File | Purpose |
|---|---|
| `web/src/data/challenge-list.ts` | 40 league-agnostic challenge definitions with auto-detect keys |
| `web/src/data/oil-data.ts` | 13 oil tiers + Prismatic, with display colours |
| `web/src/data/pantheon-data.ts` | 4 major + 8 minor Pantheon gods with base effects |
| `web/src/data/stat-targets.ts` | Boss stat hints: level, DPS, resistances (acts + pinnacles) |
| `web/src/data/unique-drop-sources.ts` | Unique item → boss/area source map; div card rule |

#### Components
| File | Purpose |
|---|---|
| `web/src/components/BuildImportForm/pob.ts` | PoB XML decoder; parses gems, trees, uniques |
| `web/src/components/BuildSettingsForm/` | Pantheon pickers, anoint rows, special mods textarea |
| `web/src/components/ChallengeBadge/` | Auto-complete challenge badge (internal, not shown in route) |
| `web/src/components/Navbar/` | 7-tab navbar with hamburger expand (Reset Progress, GitHub) |
| `web/src/components/StatHintChips/` | Inline boss stat hints (level · DPS · resistances) |
| `web/src/components/UniqueItemBadge/` | Drop badge shown on voidstone boss steps |

#### Containers
| File | Purpose |
|---|---|
| `web/src/containers/Atlas/` | Voidstone order (drag/arrows), unique drops toggle, lab tracker |
| `web/src/containers/Atlas/LabTracker/` | Normal/Cruel/Merciless/Uber lab checkboxes + poelab.com links |
| `web/src/containers/Build/` | Build Import + Build Settings sections |
| `web/src/containers/Campaign/` | ACT 1–10 Settings + Campaign Display toggles |
| `web/src/containers/Challenges/` | Show Challenges toggle + editable challenge guide |
| `web/src/containers/Dashboard/` | Route Progress, Unique Items, Misc panels |
| `web/src/containers/Route/` | Three-tab Route view: ACT 1-10, Voidstones, Challenges |
| `web/src/containers/Route/ChallengeTracker/` | Challenge list with auto-detect and progress bar |
| `web/src/containers/Route/VoidstoneRoute/` | Voidstone step list with unique item annotations |
| `web/src/containers/Settings/` | League selector, Edit Route, 3rd-Party Export |

---

## Divination Card Rule

Divination card recipes are **never shown as an acquisition method** unless `divCardOnly: true` in `unique-drop-sources.ts` — meaning there is no reliable direct drop source for that item. If a direct boss or area drop exists, the div card is suppressed entirely.

---

## Seeding

### Passive Tree

```bash
npm run seed tree -w seeding
```

### General

Find the required `dat` files in `seeding/data/index.ts`.
Use [exile-export](https://github.com/HeartofPhos/exile-export) to get `.dat.json` files, then:

```bash
npm run seed data -w seeding
```

---

## Route Customisation

- **Campaign route**: Settings → Edit Route
- **Voidstone route**: Settings → Edit Voidstone Route
- **Challenge guide**: Challenges → Edit Challenges
- For syntax, see [ROUTE_FORMAT.md](ROUTE_FORMAT.md)

---

## Adding New League Challenges

Replace or extend `web/src/data/challenge-list.ts`. The `autoDetectKey` field wires a challenge to a route step (e.g. a boss kill) so it auto-completes when that step is checked off.

---

## Adding New Unique Item Sources

Add entries to `web/src/data/unique-drop-sources.ts`. Follow the divination card rule:
- If a direct boss drop exists → set `bosses` or `areas` (div card suppressed)
- If div card is the only way → set `divCard` + `divCardOnly: true`

---

## AI Disclaimer

This project was created with the assistance of AI.
