export interface StatTarget {
  label: string;
  value: string;
  note?: string;
  warn?: boolean;
}

export interface StatPhase {
  phase: string;
  note?: string;
  targets: StatTarget[];
}

/**
 * Per-boss stat hints. Keys match `{kill|Name}` route fragments.
 * Each entry: Level → DPS (HP/60s) → Max hits → Resistances → Immunities
 */
export const BOSS_STEP_HINTS: Record<string, StatTarget[]> = {

  // ── Act 1 ─────────────────────────────────────────────────────────────────

  "Hailrake": [
    { label: "Level",    value: "5" },
    { label: "DPS",      value: "~100",   note: "~5k HP / 60s" },
    { label: "Cold",     value: "~150",   note: "Ice spears" },
    { label: "Cold Res", value: "75%" },
    { label: "Freeze",   value: "Immune", note: "Ice spears can Freeze" },
  ],
  "Brutus, Lord Incarcerator": [
    { label: "Level",    value: "8" },
    { label: "DPS",      value: "~200",   note: "~12k HP / 60s" },
    { label: "Phys",     value: "~300",   note: "Chain slam" },
    { label: "Light",    value: "~200",   note: "Lightning chain" },
    { label: "Light Res", value: "75%" },
  ],
  "Captain Fairgraves": [
    { label: "Level",    value: "11" },
    { label: "DPS",      value: "~150",   note: "~9k HP / 60s" },
    { label: "Light",    value: "~200",   note: "Lightning bolts" },
    { label: "Phys",     value: "~150",   note: "Melee" },
    { label: "Light Res", value: "75%" },
  ],
  "Merveil, the Siren": [
    { label: "Level",    value: "12" },
    { label: "DPS",      value: "~300",   note: "~18k HP / 60s" },
    { label: "Cold",     value: "~500",   warn: true, note: "Ice Nova" },
    { label: "Phys",     value: "~300",   note: "Melee swipe" },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Freeze",   value: "Immune", warn: true, note: "Ice Nova applies Freeze" },
  ],

  // ── Act 2 ─────────────────────────────────────────────────────────────────

  "Fidelitas, the Mourning": [
    { label: "Level",    value: "14" },
    { label: "DPS",      value: "~300",   note: "~18k HP / 60s" },
    { label: "Fire",     value: "~300",   warn: true, note: "Fire projectiles" },
    { label: "Phys",     value: "~200",   note: "Melee" },
    { label: "Fire Res", value: "75%",    warn: true },
  ],
  "The Weaver": [
    { label: "Level",    value: "16" },
    { label: "DPS",      value: "~600",   note: "~35k HP / 60s" },
    { label: "Phys",     value: "~400",   note: "Web slam" },
    { label: "Chaos",    value: "~300",   warn: true, note: "Poison stacks" },
    { label: "Chaos Res", value: "≥ 0%",  note: "Reduce poison damage" },
    { label: "Poison",   value: "Immune", note: "Web attacks apply Poison" },
  ],
  "Vaal Oversoul": [
    { label: "Level",    value: "21" },
    { label: "DPS",      value: "~1.7k",  note: "~100k HP / 60s" },
    { label: "Phys",     value: "~800",   note: "Slam" },
    { label: "Light",    value: "~500",   note: "Lightning bolt" },
    { label: "Light Res", value: "75%" },
    { label: "Stun",     value: "Immune", note: "Slam can Stun" },
  ],

  // ── Act 3 ─────────────────────────────────────────────────────────────────

  "Dominus, High Templar": [
    { label: "Level",    value: "29" },
    { label: "DPS",      value: "~3.3k",  note: "~200k HP / 60s" },
    { label: "Phys",     value: "~600",   note: "Tentacle slam" },
    { label: "Cold",     value: "~600",   note: "Ice storm" },
    { label: "Cold Res", value: "75%" },
    { label: "Bleed",    value: "Immune", note: "Blood rain phase causes Bleed" },
  ],

  // ── Act 4 ─────────────────────────────────────────────────────────────────

  "Malachai, The Nightmare": [
    { label: "Level",    value: "36" },
    { label: "DPS",      value: "~8k",    note: "~480k HP / 60s" },
    { label: "Phys",     value: "~1.2k",  warn: true, note: "Slam" },
    { label: "Fire",     value: "~800",   warn: true, note: "Fire tendrils" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Chaos Res", value: "≥ 0%",  note: "Chaos ground patches" },
  ],

  // ── Acts 5 & 10 ───────────────────────────────────────────────────────────

  "Kitava, the Insatiable": [
    { label: "Level",    value: "38 / 58",     note: "Act 5 / Act 10" },
    { label: "DPS",      value: "~13k / ~83k", note: "~800k (A5) / ~5M (A10) HP / 60s" },
    { label: "Fire",     value: "~1.8k–4k",   warn: true, note: "Fire beam (A5 ~1.8k / A10 ~4k)" },
    { label: "Phys",     value: "~1k–2k",     note: "Slam" },
    { label: "Fire Res", value: "75%",         warn: true },
    { label: "Bleed",    value: "Immune",      note: "Act 10 broken altars cause Bleed" },
  ],

  // ── Act 6 ─────────────────────────────────────────────────────────────────

  "Tukohama, Karui God of War": [
    { label: "Level",    value: "44" },
    { label: "DPS",      value: "~5k",    note: "~300k HP / 60s" },
    { label: "Fire",     value: "~800",   warn: true, note: "Flame totems" },
    { label: "Phys",     value: "~700",   note: "Slam" },
    { label: "Fire Res", value: "75%",    warn: true },
  ],
  "Shavronne the Returned": [
    { label: "Level",    value: "43" },
    { label: "DPS",      value: "~3.3k",  note: "~200k HP / 60s" },
    { label: "Light",    value: "~600",   note: "Lightning bolts" },
    { label: "Phys",     value: "~400",   note: "Melee" },
    { label: "Light Res", value: "75%" },
  ],
  "Reassembled Brutus": [
    { label: "Level",    value: "43" },
    { label: "DPS",      value: "~2.5k",  note: "~150k HP / 60s" },
    { label: "Phys",     value: "~700",   warn: true, note: "Chain slam" },
    { label: "Stun",     value: "Immune", note: "Heavy slam can Stun" },
    { label: "Bleed",    value: "Immune", note: "Slam can Bleed" },
  ],
  "Ryslatha, the Puppet Mistress": [
    { label: "Level",    value: "44" },
    { label: "DPS",      value: "~10k",   note: "~600k HP / 60s" },
    { label: "Chaos",    value: "~700",   warn: true, note: "Chaos DoT" },
    { label: "Phys",     value: "~600",   note: "Slam" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Poison",   value: "Immune", note: "Minions apply Poison" },
  ],
  "Tsoagoth, The Brine King": [
    { label: "Level",    value: "46" },
    { label: "DPS",      value: "~25k",   note: "~1.5M HP / 60s" },
    { label: "Cold",     value: "~1.3k",  warn: true, note: "Ice slam" },
    { label: "Phys",     value: "~1k",    note: "Slam" },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Freeze",   value: "Immune", warn: true, note: "Ice ground / chill stacks" },
  ],

  // ── Act 7 ─────────────────────────────────────────────────────────────────

  "Maligaro, the Artist": [
    { label: "Level",    value: "47" },
    { label: "DPS",      value: "~5k",    note: "~300k HP / 60s" },
    { label: "Light",    value: "~700",   note: "Lightning slam" },
    { label: "Phys",     value: "~600",   note: "Melee" },
    { label: "Light Res", value: "75%" },
  ],
  "Greust, Lord of the Forest": [
    { label: "Level",    value: "47" },
    { label: "DPS",      value: "~3.3k",  note: "~200k HP / 60s" },
    { label: "Phys",     value: "~700",   note: "Slam" },
    { label: "Light",    value: "~500",   note: "Lightning strike" },
    { label: "Light Res", value: "75%" },
  ],
  "Abberath, the Cloven One": [
    { label: "Level",    value: "46" },
    { label: "DPS",      value: "~3.3k",  note: "~200k HP / 60s" },
    { label: "Fire",     value: "~700",   warn: true, note: "Flame hoof / fire trail" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Ignite",   value: "Immune", note: "Fire ground can Ignite" },
  ],
  "Gruthkul, Mother of Despair": [
    { label: "Level",    value: "50" },
    { label: "DPS",      value: "~6.7k",  note: "~400k HP / 60s" },
    { label: "Phys",     value: "~900",   warn: true, note: "Slam" },
    { label: "Cold",     value: "~600",   note: "Cold ground" },
    { label: "Cold Res", value: "75%" },
    { label: "Bleed",    value: "Immune", note: "Slam can Bleed" },
  ],
  "Arakaali, Spinner of Shadows": [
    { label: "Level",    value: "51" },
    { label: "DPS",      value: "~33k",   note: "~2M HP / 60s" },
    { label: "Chaos",    value: "~1.2k",  warn: true, note: "Chaos bolt" },
    { label: "Light",    value: "~800",   note: "Lightning strike" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Poison",   value: "Immune", note: "Spider minions apply Poison" },
  ],

  // ── Act 8 ─────────────────────────────────────────────────────────────────

  "Doedre the Vile": [
    { label: "Level",    value: "51" },
    { label: "DPS",      value: "~5k",    note: "~300k HP / 60s" },
    { label: "Chaos",    value: "~700",   warn: true, note: "Chaos DoT" },
    { label: "Light",    value: "~500",   note: "Lightning beam" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Poison",   value: "Immune", note: "Chaos pools apply Poison" },
  ],
  "Dawn, Harbinger of Solaris": [
    { label: "Level",    value: "52" },
    { label: "DPS",      value: "~2.5k",  note: "~150k HP / 60s" },
    { label: "Fire",     value: "~600",   warn: true, note: "Fire slam" },
    { label: "Fire Res", value: "75%",    warn: true },
  ],
  "Dusk, Harbinger of Lunaris": [
    { label: "Level",    value: "52" },
    { label: "DPS",      value: "~2.5k",  note: "~150k HP / 60s" },
    { label: "Cold",     value: "~600",   warn: true, note: "Cold slam" },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Freeze",   value: "Immune", note: "Cold attacks can Freeze" },
  ],
  "Lunaris, Eternal Moon": [
    { label: "Level",    value: "54" },
    { label: "DPS",      value: "~20k",   note: "~1.2M HP / 60s" },
    { label: "Cold",     value: "~1.5k",  warn: true, note: "Cold slam" },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Freeze",   value: "Immune", warn: true, note: "Cold slams can Freeze" },
  ],
  "Solaris, Eternal Sun": [
    { label: "Level",    value: "54" },
    { label: "DPS",      value: "~20k",   note: "~1.2M HP / 60s" },
    { label: "Fire",     value: "~1.6k",  warn: true, note: "Fire ray" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Ignite",   value: "Immune", note: "Fire ray can Ignite" },
  ],
  "Yugul, Reflection of Terror": [
    { label: "Level",    value: "53" },
    { label: "DPS",      value: "~8k",    note: "~500k HP / 60s" },
    { label: "Cold",     value: "~800",   warn: true, note: "Cold slam" },
    { label: "Light",    value: "~600",   note: "Lightning strike" },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Freeze",   value: "Immune", note: "Cold attacks can Freeze" },
  ],

  // ── Act 9 ─────────────────────────────────────────────────────────────────

  "Shakari, Queen of the Sands": [
    { label: "Level",    value: "54" },
    { label: "DPS",      value: "~13k",   note: "~800k HP / 60s" },
    { label: "Chaos",    value: "~900",   warn: true, note: "Sand+chaos" },
    { label: "Phys",     value: "~700",   note: "Slam" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Poison",   value: "Immune", note: "Sand attacks apply Poison" },
  ],
  "Garukhan, Queen of the Winds": [
    { label: "Level",    value: "57" },
    { label: "DPS",      value: "~20k",   note: "~1.2M HP / 60s" },
    { label: "Light",    value: "~1k",    warn: true, note: "Lightning slam" },
    { label: "Phys",     value: "~700",   note: "Slam" },
    { label: "Light Res", value: "75%",   warn: true },
  ],
  "Doedre, Darksoul": [
    { label: "Level",    value: "56" },
    { label: "DPS",      value: "~6.7k",  note: "~400k HP / 60s" },
    { label: "Chaos",    value: "~900",   warn: true, note: "Chaos DoT" },
    { label: "Fire",     value: "~700",   note: "Fire slam" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Fire Res", value: "75%" },
  ],
  "Maligaro, The Broken": [
    { label: "Level",    value: "56" },
    { label: "DPS",      value: "~6.7k",  note: "~400k HP / 60s" },
    { label: "Phys",     value: "~900",   warn: true, note: "Melee slam" },
    { label: "Light",    value: "~700",   note: "Lightning" },
    { label: "Light Res", value: "75%" },
    { label: "Stun",     value: "Immune", note: "Heavy slams can Stun" },
  ],
  "Shavronne, Unbound": [
    { label: "Level",    value: "56" },
    { label: "DPS",      value: "~6.7k",  note: "~400k HP / 60s" },
    { label: "Fire",     value: "~900",   warn: true, note: "Fire slam" },
    { label: "Cold",     value: "~700",   note: "Cold bolt" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Cold Res", value: "75%" },
  ],
  "The Depraved Trinity": [
    { label: "Level",    value: "57" },
    { label: "DPS",      value: "~42k",   note: "~2.5M HP combined / 60s" },
    { label: "Fire",     value: "~1.2k",  note: "Fire phase" },
    { label: "Cold",     value: "~1.2k",  note: "Cold phase" },
    { label: "Light",    value: "~1.2k",  note: "Lightning phase" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Light Res", value: "75%",   warn: true },
  ],

  // ── Act 10 ────────────────────────────────────────────────────────────────

  "Plaguewing": [
    { label: "Level",    value: "58" },
    { label: "DPS",      value: "~1.7k",  note: "~100k HP / 60s" },
    { label: "Light",    value: "~600",   note: "Lightning beam" },
    { label: "Chaos",    value: "~500",   warn: true, note: "Chaos DoT" },
    { label: "Chaos Res", value: "≥ 0%",  note: "Chaos pool damage" },
  ],
  "Vilenta": [
    { label: "Level",    value: "59" },
    { label: "DPS",      value: "~5k",    note: "~300k HP / 60s" },
    { label: "Chaos",    value: "~800",   warn: true, note: "Chaos nova" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Poison",   value: "Immune", note: "Chaos attacks can Poison" },
  ],
  "Avarius, Reassembled": [
    { label: "Level",    value: "60" },
    { label: "DPS",      value: "~10k",   note: "~600k HP / 60s" },
    { label: "Phys",     value: "~900",   warn: true, note: "Holy slam" },
    { label: "Light",    value: "~700",   note: "Holy beam" },
    { label: "Light Res", value: "75%" },
    { label: "Bleed",    value: "Immune", note: "Slam attacks can Bleed" },
  ],

  // ── Shaper Guardians ──────────────────────────────────────────────────────

  "The Shaper Guardian (Minotaur)": [
    { label: "Level",    value: "80" },
    { label: "DPS",      value: "~580k",  warn: true, note: "~35M HP / 60s" },
    { label: "Phys",     value: "~6k",    warn: true, note: "Slam" },
    { label: "Light",    value: "~3k",    note: "Lightning strike" },
    { label: "Phys Res", value: "≥ 60%",  note: "Armour helps mitigate slam" },
    { label: "Bleed",    value: "Immune", note: "Heavy slams cause Bleed" },
  ],
  "The Shaper Guardian (Chimera)": [
    { label: "Level",    value: "80" },
    { label: "DPS",      value: "~580k",  warn: true, note: "~35M HP / 60s" },
    { label: "Fire",     value: "~5k",    warn: true, note: "Fire balls" },
    { label: "Phys",     value: "~4k",    note: "Slam" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Ignite",   value: "Immune", note: "Fire attacks can Ignite" },
  ],
  "The Shaper Guardian (Hydra)": [
    { label: "Level",    value: "80" },
    { label: "DPS",      value: "~580k",  warn: true, note: "~35M HP / 60s" },
    { label: "Cold",     value: "~5k",    warn: true, note: "Cold beam / arrow storm" },
    { label: "Phys",     value: "~3k",    note: "Ground slam" },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Freeze",   value: "Immune", warn: true, note: "Cold beam applies Freeze" },
  ],
  "The Shaper Guardian (Phoenix)": [
    { label: "Level",    value: "80" },
    { label: "DPS",      value: "~580k",  warn: true, note: "~35M HP / 60s" },
    { label: "Fire",     value: "~5k",    warn: true, note: "Fire tornado" },
    { label: "Phys",     value: "~3k",    note: "Slam" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Ignite",   value: "Immune", note: "Fire tornado can Ignite" },
  ],

  // ── Elder Guardians ───────────────────────────────────────────────────────

  "The Elder Guardian (Constrictor)": [
    { label: "Level",    value: "80" },
    { label: "DPS",      value: "~580k",  warn: true, note: "~35M HP / 60s" },
    { label: "Chaos",    value: "~4k",    warn: true, note: "Chaos projectiles" },
    { label: "Phys",     value: "~3k",    note: "Slam" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Poison",   value: "Immune", note: "Chaos projectiles apply Poison" },
  ],
  "The Elder Guardian (Enslaver)": [
    { label: "Level",    value: "80" },
    { label: "DPS",      value: "~580k",  warn: true, note: "~35M HP / 60s" },
    { label: "Fire",     value: "~4k",    warn: true, note: "Fire slam" },
    { label: "Chaos",    value: "~3k",    warn: true, note: "Chaos DoT" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
  ],
  "The Elder Guardian (Eradicator)": [
    { label: "Level",    value: "80" },
    { label: "DPS",      value: "~580k",  warn: true, note: "~35M HP / 60s" },
    { label: "Light",    value: "~4k",    warn: true, note: "Lightning beam" },
    { label: "Chaos",    value: "~3k",    warn: true, note: "Chaos degen" },
    { label: "Light Res", value: "75%",   warn: true },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
  ],
  "The Elder Guardian (Purifier)": [
    { label: "Level",    value: "80" },
    { label: "DPS",      value: "~580k",  warn: true, note: "~35M HP / 60s" },
    { label: "Fire",     value: "~4k",    warn: true, note: "Fire beam" },
    { label: "Chaos",    value: "~3k",    warn: true, note: "Chaos ground" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
  ],

  // ── Voidstone pinnacle bosses ─────────────────────────────────────────────

  "The Eater of Worlds": [
    { label: "Level",    value: "85" },
    { label: "DPS",      value: "~500k",  warn: true, note: "~30M HP / 60s" },
    { label: "Chaos",    value: "~7.5k",  warn: true, note: "Tentacle slam (phys+chaos)" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Poison",   value: "Immune", note: "Chaos damage can Poison" },
  ],
  "The Searing Exarch": [
    { label: "Level",    value: "85" },
    { label: "DPS",      value: "~500k",  warn: true, note: "~30M HP / 60s" },
    { label: "Fire",     value: "~9k",    warn: true, note: "Fire beam" },
    { label: "Fire Res", value: "75%",    warn: true },
    { label: "Ignite",   value: "Immune", note: "Fire beam can Ignite" },
  ],
  "The Maven": [
    { label: "Level",    value: "84" },
    { label: "DPS",      value: "~330k",  warn: true, note: "~20M HP / 60s" },
    { label: "Cold",     value: "~5k",    warn: true, note: "Memory game bolts" },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Freeze",   value: "Immune", warn: true, note: "Frozen during memory = death" },
  ],
  "The Shaper": [
    { label: "Level",    value: "84" },
    { label: "DPS",      value: "~420k",  warn: true, note: "~25M HP / ~4 min Zana" },
    { label: "Phys",     value: "~10k",   warn: true, note: "Slam (biggest threat)" },
    { label: "Cold",     value: "~4k",    note: "Cold beam" },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Freeze",   value: "Immune", warn: true, note: "Cold beam can Freeze" },
  ],
  "The Elder": [
    { label: "Level",    value: "84" },
    { label: "DPS",      value: "~250k",  warn: true, note: "~15M HP / 60s" },
    { label: "Chaos",    value: "~6.5k",  warn: true, note: "Tentacle slam" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Poison",   value: "Immune", note: "Chaos attacks apply Poison" },
  ],
  "The Uber Elder": [
    { label: "Level",    value: "84" },
    { label: "DPS",      value: "~670k",  warn: true, note: "~20M HP each / 60s" },
    { label: "Phys",     value: "~12k",   warn: true, note: "Shaper slam" },
    { label: "Chaos",    value: "~7k",    warn: true, note: "Elder tentacles" },
    { label: "Cold Res", value: "75%",    warn: true },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
    { label: "Freeze",   value: "Immune", warn: true, note: "Shaper freeze = death" },
  ],
};

export const STAT_TARGETS: StatPhase[] = [
  {
    phase: "Acts 1–4",
    targets: [
      { label: "Max Life",       value: "≥ 1 000",  note: "End of Act 4" },
      { label: "Resistances",    value: "≥ 25%",    note: "Before Act 5 penalty" },
      { label: "Move Speed",     value: "15%+",     note: "On boots" },
    ],
  },
  {
    phase: "Act 5 Kitava (−30% Res)",
    note: "All resistances drop by 30% after defeating Kitava. Compensate before Act 6.",
    targets: [
      { label: "All Resistances", value: "≥ 0%",   warn: true, note: "After −30% penalty" },
      { label: "Max Life",        value: "≥ 1 500", note: "Entering Act 6" },
    ],
  },
  {
    phase: "Acts 6–10",
    targets: [
      { label: "Max Life",        value: "≥ 2 000", note: "End of Act 10" },
      { label: "Resistances",     value: "≥ 40%",   note: "Must cap after Act 10 penalty" },
      { label: "Chaos Res",       value: "≥ −60%",  note: "Reduce chaos spike damage" },
    ],
  },
  {
    phase: "Act 10 Kitava (−30% Res)",
    note: "Another −30% to all resistances. You now need to cover a total of −60% penalty.",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true, note: "Fully capped for maps" },
      { label: "Max Life",        value: "≥ 3 000", note: "Minimum for white maps" },
      { label: "Move Speed",      value: "25%+",    note: "On boots" },
    ],
  },
  {
    phase: "White Maps (T1–T5)",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true },
      { label: "Max Life",        value: "≥ 3 500" },
      { label: "Chaos Res",       value: "≥ −20%",  note: "Start working toward 0%" },
      { label: "DPS",             value: "Comfortable", note: "Clear packs without dying" },
    ],
  },
  {
    phase: "Yellow Maps (T6–T10)",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true },
      { label: "Max Life",        value: "≥ 4 500" },
      { label: "Chaos Res",       value: "≥ 0%",    note: "Recommended before red maps" },
      { label: "DPS (Boss)",      value: "< 30 s",  note: "Map boss kill time" },
    ],
  },
  {
    phase: "Red Maps + Voidstones (T11–T16)",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true },
      { label: "Chaos Res",       value: "≥ 0%",    warn: true },
      { label: "EHP",             value: "≥ 5 500", note: "Effective health vs hits" },
      { label: "Stun / Bleed",    value: "Immune",  note: "Or reliable recovery" },
      { label: "DPS (Boss)",      value: "< 2 min", note: "Pinnacle boss kill time" },
    ],
  },
  {
    phase: "Endgame (All 4 Voidstones)",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true },
      { label: "Chaos Res",       value: "≥ 0%",    warn: true },
      { label: "EHP",             value: "≥ 6 000", note: "Maven / Uber Elder" },
      { label: "Crit Immunity",   value: "100%",    note: "\"Cannot be Crit\" preferred" },
      { label: "Freeze Immunity", value: "100%",    note: "For Maven fight phases" },
      { label: "DPS (Pinnacle)",  value: "< 60 s",  note: "Enrage timer for Ubers" },
    ],
  },
];
