import { Data } from "../../../../common/data";
import { RouteData } from "../../../../common/route-processing/types";
import { GameData } from "../../../../common/types";
import { decodeBase64Url } from "../../utility";
import { UniqueItem } from "../../state/unique-items";
import pako from "pako";

// ─── PoB gem ID quirks ────────────────────────────────────────────────────────
// https://github.com/PathOfBuildingCommunity/PathOfBuilding/blob/0d3bdf009c8bc9579eb8cffb5548f03c45e57373/src/Export/Scripts/skills.lua#L504

const GEM_ID_REMAP: Record<string, string> = {
  "Metadata/Items/Gems/Smite": "Metadata/Items/Gems/SkillGemSmite",
  "Metadata/Items/Gems/ConsecratedPath":
    "Metadata/Items/Gems/SkillGemConsecratedPath",
  "Metadata/Items/Gems/VaalAncestralWarchief":
    "Metadata/Items/Gems/SkillGemVaalAncestralWarchief",
  "Metadata/Items/Gems/HeraldOfAgony":
    "Metadata/Items/Gems/SkillGemHeraldOfAgony",
  "Metadata/Items/Gems/HeraldOfPurity":
    "Metadata/Items/Gems/SkillGemHeraldOfPurity",
  "Metadata/Items/Gems/ScourgeArrow":
    "Metadata/Items/Gems/SkillGemScourgeArrow",
  "Metadata/Items/Gems/RainOfSpores": "Metadata/Items/Gems/SkillGemToxicRain",
  "Metadata/Items/Gems/SummonRelic": "Metadata/Items/Gems/SkillGemSummonRelic",
  // Outdated wiki data?
  "Metadata/Items/Gems/SkillGemNewPhaseRun":
    "Metadata/Items/Gems/SkillGemPhaseRun",
  "Metadata/Items/Gems/SkillGemNewArcticArmour":
    "Metadata/Items/Gems/SkillGemArcticArmour",
};

function MapGemId(gemId: string) {
  const pobRemapId = GEM_ID_REMAP[gemId];
  if (pobRemapId) gemId = pobRemapId;

  const vaalToNormalId = Data.VaalGemLookup[gemId];
  if (vaalToNormalId) gemId = vaalToNormalId;

  const awakenedToNormalId = Data.AwakenedGemLookup[gemId];
  if (awakenedToNormalId) gemId = awakenedToNormalId;

  return gemId;
}

// ─── Decoding ─────────────────────────────────────────────────────────────────

function decodePathOfBuildingCode(code: string) {
  const buffer = pako.inflate(decodeBase64Url(code));
  const decoder = new TextDecoder();
  const xmlString = decoder.decode(buffer);
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, "application/xml");
}

// ─── Text cleaning ────────────────────────────────────────────────────────────
// PoB color codes take the form ^x<hex> or ^<digit>

const POB_COLOUR_REGEX = /\^(x[a-zA-Z0-9]{6}|[0-9])/g;

function cleanPobText(dirty: string) {
  return dirty.replace(POB_COLOUR_REGEX, "");
}

// ─── Skill / gem processing ───────────────────────────────────────────────────

function processSkills(
  requiredGems: RouteData.RequiredGem[],
  gemLinks: RouteData.GemLinkGroup[],
  parentElement: Element,
  parentTitle: string | undefined,
  characterClass: string
) {
  const skillElements = Array.from(
    parentElement.getElementsByTagName("Skill")
  );

  let recentEmptySkillLabel: string | undefined;
  for (const skillElement of skillElements) {
    const skillEnabled = skillElement.attributes.getNamedItem("enabled");
    if (!skillEnabled || skillEnabled.value == "false") continue;

    const skillLabel = skillElement.attributes.getNamedItem("label")?.value;

    const gemElements = Array.from(skillElement.getElementsByTagName("Gem"));
    if (gemElements.length == 0) recentEmptySkillLabel = skillLabel;

    let primaryGemIds: string[] = [];
    let secondaryGemIds: string[] = [];
    for (const gemElement of gemElements) {
      const attribute = gemElement.attributes.getNamedItem("gemId");
      if (attribute) {
        const gemId = MapGemId(attribute.value);
        const note = cleanPobText(
          recentEmptySkillLabel || parentTitle || skillLabel || ""
        );
        const gem: RouteData.RequiredGem = {
          id: gemId,
          note: note,
          count: 1,
        };

        if (!requiredGems.some((x) => x.id === gemId)) {
          requiredGems.push(gem);
        }

        if (Data.Gems[gemId]?.is_support) secondaryGemIds.push(gemId);
        else primaryGemIds.push(gemId);
      }
    }

    const gemLinkTitle = cleanPobText(
      parentTitle || recentEmptySkillLabel || "Default"
    );
    if (primaryGemIds.length > 0)
      gemLinks.push({
        title: gemLinkTitle,
        primaryGems: primaryGemIds.map((x) =>
          gemIdToGemLink(x, characterClass)
        ),
        secondaryGems: secondaryGemIds.map((x) =>
          gemIdToGemLink(x, characterClass)
        ),
      });
    else if (secondaryGemIds.length > 0)
      gemLinks.push({
        title: gemLinkTitle,
        primaryGems: secondaryGemIds.map((x) =>
          gemIdToGemLink(x, characterClass)
        ),
        secondaryGems: [],
      });
  }
}

function gemIdToGemLink(
  gemId: GameData.Gem["id"],
  characterClass: string
): RouteData.GemLink {
  const quests: RouteData.GemLink["quests"] = [];
  for (const quest of Object.values(Data.Quests)) {
    for (const [rewardOfferId, rewardOffer] of Object.entries(
      quest.reward_offers
    )) {
      if (rewardOffer) {
        const vendor = rewardOffer.vendor[gemId];
        const existsForClass =
          vendor?.classes.length === 0 ||
          vendor?.classes.includes(characterClass);

        if (existsForClass) {
          quests.push({ questId: quest.id, rewardOfferId });
        }
      }
    }
  }
  return { id: gemId, quests };
}

// ─── Unique item parsing ──────────────────────────────────────────────────────
//
// PoB item text format inside each <Item> tag:
//   Rarity: UNIQUE       ← key line
//   <Name>               ← line after Rarity
//   <Base Type>          ← line after Name
//
// Returns deduplicated items by name.

function parseUniqueItems(doc: Document): UniqueItem[] {
  const items: UniqueItem[] = [];
  const seen = new Set<string>();

  const itemElements = Array.from(doc.getElementsByTagName("Item"));
  for (const itemEl of itemElements) {
    const raw = itemEl.textContent ?? "";
    const lines = raw
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const rarityIdx = lines.findIndex((l) =>
      l.toLowerCase().startsWith("rarity:")
    );
    if (rarityIdx === -1) continue;

    const rarity = lines[rarityIdx].replace(/rarity:/i, "").trim();
    if (rarity.toUpperCase() !== "UNIQUE") continue;

    const name = lines[rarityIdx + 1] ?? "";
    const base = lines[rarityIdx + 2] ?? "";

    if (!name || seen.has(name)) continue;
    seen.add(name);

    items.push({ name, base });
  }

  return items;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface PobData {
  buildData: RouteData.BuildData;
  requiredGems: RouteData.RequiredGem[];
  buildTrees: RouteData.BuildTree[];
  gemLinks: RouteData.GemLinkGroup[];
  uniqueItems: UniqueItem[];
}

export function processPob(pobCode: string): PobData | undefined {
  let doc: Document;
  try {
    doc = decodePathOfBuildingCode(pobCode);
  } catch (e) {
    return undefined;
  }

  const buildElement = Array.from(doc.getElementsByTagName("Build"));
  if (buildElement.length === 0) return undefined;

  const characterClass =
    buildElement[0].attributes.getNamedItem("className")?.value ?? "";

  const bandit =
    buildElement[0].attributes.getNamedItem("bandit")?.value || "None";

  const requiredGems: RouteData.RequiredGem[] = [];
  const gemLinks: RouteData.GemLinkGroup[] = [];

  const skillSetElements = Array.from(doc.getElementsByTagName("SkillSet"));
  if (skillSetElements.length > 0) {
    for (const skillSetElement of skillSetElements) {
      processSkills(
        requiredGems,
        gemLinks,
        skillSetElement,
        skillSetElement.attributes.getNamedItem("title")?.value,
        characterClass
      );
    }
  } else {
    processSkills(
      requiredGems,
      gemLinks,
      doc.documentElement,
      undefined,
      characterClass
    );
  }

  const buildTrees: RouteData.BuildTree[] = [];
  const specElements = Array.from(doc.getElementsByTagName("Spec"));
  for (const specElement of specElements) {
    const urlEl = specElement.getElementsByTagName("URL")[0];
    if (!urlEl) continue;
    buildTrees.push({
      name: cleanPobText(specElement.getAttribute("title") || "Default"),
      version: specElement.getAttribute("treeVersion") ?? "",
      url: urlEl.textContent?.trim() ?? "",
    });
  }

  const uniqueItems = parseUniqueItems(doc);

  return {
    buildData: {
      characterClass,
      bandit: bandit as RouteData.BuildData["bandit"],
      leagueStart: true,
      library: true,
    },
    requiredGems,
    buildTrees,
    gemLinks,
    uniqueItems,
  };
}
