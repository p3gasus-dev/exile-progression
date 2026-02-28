# Exile Progression — Apply Order

All files in this directory are the **canonical latest version**.
Apply them to the `heartofphos/exile-leveling` fork in the order listed below.
Files are grouped by dependency layer so you never import something that hasn't
been written yet.

---

## Layer 1 — Route data (no code dependencies)

```
common/data/routes/voidstone-1.txt
common/data/routes/voidstone-2.txt
common/data/routes/voidstone-3.txt
common/data/routes/voidstone-4.txt
```

**Why:** DSL corrected to use `{kill|Boss Name}`, `{generic|text}`, `{arena|map}`
syntax that the route parser actually understands. The previous versions were
plain text and produced no `KillFragment` objects.

---

## Layer 2 — State atoms & selectors (depend only on existing repo internals)

```
web/src/state/atlas-config.ts
web/src/state/build-settings.ts
web/src/state/challenge-progress.ts
web/src/state/unique-items.ts
web/src/state/voidstone-progress.ts
web/src/state/voidstone-route-files.ts
web/src/state/voidstone-route.ts
web/src/state/progress-summary.ts
```

---

## Layer 3 — Data tables (no React, no state)

```
web/src/data/challenge-list.ts
web/src/data/unique-drop-sources.ts
web/src/data/oil-data.ts
web/src/data/pantheon-data.ts
```

---

## Layer 4 — Components (depend on state + data)

```
web/src/components/BuildImportForm/pob.ts
web/src/components/BuildSettingsForm/index.tsx
web/src/components/BuildSettingsForm/styles.module.css
web/src/components/UniqueItemBadge/index.tsx
web/src/components/UniqueItemBadge/styles.module.css
web/src/components/Navbar/index.tsx
web/src/components/Navbar/styles.module.css
```

---

## Layer 5 — Containers (depend on components + state)

```
web/src/containers/Route/index.tsx
web/src/containers/Route/styles.module.css
web/src/containers/Route/ChallengeTracker/index.tsx
web/src/containers/Route/ChallengeTracker/styles.module.css
web/src/containers/Route/VoidstoneRoute/index.tsx
web/src/containers/Atlas/index.tsx
web/src/containers/Atlas/styles.module.css
web/src/containers/Build/index.tsx
web/src/containers/Build/styles.module.css
web/src/containers/Campaign/index.tsx
web/src/containers/Campaign/styles.module.css
web/src/containers/Dashboard/index.tsx
web/src/containers/Dashboard/styles.module.css
web/src/containers/Settings/index.tsx
web/src/containers/Settings/styles.module.css
web/src/containers/index.tsx
```

---

## Bug fixes incorporated

| Bug | File | Symptom |
|-----|------|---------|
| `pob.ts` missing `pako` import, lost `GEM_ID_REMAP`, wrong color-code regex | `BuildImportForm/pob.ts` | Crash on PoB import |
| `ChallengeTracker` — hooks called inside `.filter()` | `Route/ChallengeTracker/index.tsx` | React invariant crash |
| Voidstone route files — plain text, no DSL fragments | `common/data/routes/voidstone-*.txt` | No boss kill steps, no unique badges |
| `voidstone-route-files.ts` — backed by persistent atom | `state/voidstone-route-files.ts` | Stale localStorage blocked file updates |
| `Route/index.tsx` — unused `borderListStyles` import | `containers/Route/index.tsx` | Lint error |
| `Settings/index.tsx` — reset wrote `[]` not null | `containers/Settings/index.tsx` | Empty array persisted to storage |
| `progress-summary.ts` — voidstone count used all toggle keys | `state/progress-summary.ts` | Inflated voidstone completion count |
| `Dashboard/index.tsx` — unused `FaLayerGroup` import | `containers/Dashboard/index.tsx` | Lint warning |
