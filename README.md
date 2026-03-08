# Exile Progression

A Path of Exile progression tracker from campaign to endgame, built on [exile-leveling](https://github.com/HeartofPhos/exile-leveling) for ACT 1–10 routing.

## Tabs

| Tab | Contents |
|---|---|
| **Dashboard** | Progress bars, unique item list, Pantheon/Anoints/Mods |
| **Route** | ACT 1–10 · Voidstone 1–4 (toggleable) · Challenge 1–40 (toggleable) |
| **Campaign** | League start, library; display toggles (gems, hints, crafting, stat hints) |
| **Atlas** | Voidstone order, show voidstone route, unique drops, lab tracker |
| **Challenges** | Show/hide challenges tab |
| **Build** | PoB import, gem editor, search strings, Pantheon, Anoints, Special Mods |
| **Settings** | League, edit route/voidstone/challenge files, 3rd-party export |

## Getting Started

```bash
npm i
npm run dev -w web
```

## Architecture

ACT 1–10 route files and the core route parser come from [heartofphos/exile-leveling](https://github.com/HeartofPhos/exile-leveling). Exile Progression adds features on top without modifying the parser.

### Key additions

**Route data** (`common/data/routes/`): `voidstone-1.txt` through `voidstone-4.txt`

**State** (`web/src/state/`): `atlas-config` · `build-settings` · `challenge-progress` · `lab-progress` · `sidebar` · `unique-items` · `voidstone-progress` · `voidstone-route`

**Data** (`web/src/data/`): `challenge-list` · `oil-data` · `pantheon-data` · `stat-targets` · `unique-drop-sources`

**Key components**: `StatHintChips` · `Navbar` · `Atlas/LabTracker` · `Route/ChallengeTracker` · `Route/VoidstoneRoute`

## Route Customisation

Edit source files in **Settings**: Edit Route, Edit Voidstone Route, Edit Challenges. See [ROUTE_FORMAT.md](ROUTE_FORMAT.md) for syntax.

## Divination Card Rule

Div cards are suppressed unless `divCardOnly: true` in `unique-drop-sources.ts` — meaning no direct boss/area drop exists.

## Seeding

```bash
npm run seed tree -w seeding   # passive tree
npm run seed data -w seeding   # game data (requires .dat.json files)
```

## AI Disclaimer

This project was created with the assistance of AI.
