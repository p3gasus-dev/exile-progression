# Exile Progression

A Path of Exile progression tracker covering the full journey from campaign to endgame, built on top of [exile-leveling](https://github.com/HeartofPhos/exile-leveling) for core ACT1-10 routing.

## Tabs

| Tab | Description |
|---|---|
| **Dashboard** | Overall progression overview — route progress, unique item tracking, misc build info |
| **Route** | ACT1-10, Voidstone 1–4, Challenge 1–40 tracking |
| **Campaign** | ACT1-10 settings and campaign-specific options |
| **Atlas** | Atlas point settings, Voidstone routing, endgame config |
| **Build** | Build import (PoB), unique items, anoints, pantheon, special mods |
| **Settings** | Edit route, 3rd-party export, GitHub link |

## Getting Started

- `npm i`
- `npm run dev -w web`

## Seeding

### Passive Tree

- `npm run seed tree -w seeding`

### General

- Find the list of required `dat` files in `seeding/data/index.ts`
- Use https://github.com/HeartofPhos/exile-export to get required `.dat.json` files
- `npm run seed data -w seeding`

## Route

The base ACT1-10 route is sourced from [heartofphos/exile-leveling](https://github.com/HeartofPhos/exile-leveling).  
Use the **Settings → Edit Route** tab to customise the route for your playstyle.

Voidstone routing and Challenge tracking are Exile Progression additions layered on top.
