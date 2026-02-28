export namespace Language {
  export type Fragment =
    | "kill"
    | "arena"
    | "area"
    | "enter"
    | "logout"
    | "waypoint"
    | "waypoint_get"
    | "portal"
    | "quest"
    | "quest_text"
    | "generic"
    | "league"
    | "reward_quest"
    | "reward_vendor"
    | "trial"
    | "ascend"
    | "crafting"
    | "dir"
    | "copy";

  export interface FragmentParameter {
    name: string;
    description: string;
  }

  export interface FragmentVariant {
    description: string;
    parameters: FragmentParameter[];
  }

  export const FragmentDescriptionLookup: Record<Fragment, FragmentVariant[]> =
    {
      ["kill"]: [
        {
          description: "Kill a monster, certain bosses unlock waypoints",
          parameters: [{ name: "text", description: "Text to display" }],
        },
      ],
      ["arena"]: [
        {
          description: "Sub-areas inside true areas",
          parameters: [{ name: "text", description: "Text to display" }],
        },
      ],
      ["area"]: [
        {
          description: "Lookup an area",
          parameters: [
            {
              name: "area_id",
              description: "Area Id used internally by Path Of Exile",
            },
          ],
        },
      ],
      ["enter"]: [
        {
          description: "Enter an area",
          parameters: [
            {
              name: "area_id",
              description: "Area Id used internally by Path Of Exile",
            },
          ],
        },
      ],
      ["logout"]: [
        {
          description: "Logout or Exit to Character Selection, removes portals",
          parameters: [],
        },
      ],
      ["waypoint"]: [
        {
          description: "A waypoint",
          parameters: [],
        },
        {
          description: "Use a waypoint to travel to a destination area",
          parameters: [
            {
              name: "area_id",
              description: "Destination area Id",
            },
          ],
        },
      ],
      ["waypoint_get"]: [
        {
          description: "Activate the waypoint in the current area",
          parameters: [],
        },
      ],
      ["portal"]: [
        {
          description: "Set or use a Town Portal",
          parameters: [
            {
              name: "action",
              description: "set or use",
            },
          ],
        },
      ],
      ["quest"]: [
        {
          description: "Complete a quest, optionally specifying reward offer ids",
          parameters: [
            {
              name: "quest_id",
              description: "Quest Id used internally by Path Of Exile",
            },
          ],
        },
      ],
      ["quest_text"]: [
        {
          description: "Highlighted quest instruction text",
          parameters: [{ name: "text", description: "Text to display" }],
        },
      ],
      ["generic"]: [
        {
          description: "Generic text",
          parameters: [{ name: "text", description: "Text to display" }],
        },
      ],
      ["league"]: [
        {
          description:
            "A league mechanic interaction — renders with a distinct highlight colour",
          parameters: [
            { name: "text", description: "League mechanic name or instruction" },
          ],
        },
      ],
      ["reward_quest"]: [
        {
          description: "Quest rewards a player should take",
          parameters: [{ name: "text", description: "Text to display" }],
        },
      ],
      ["reward_vendor"]: [
        {
          description: "Vendor rewards a player should buy",
          parameters: [
            { name: "text", description: "Text to display" },
            {
              name: "cost",
              description:
                "Currency cost, wisdom/transmutation/alteration/chance/alchemy",
            },
          ],
        },
      ],
      ["trial"]: [
        {
          description: "Complete the ascendancy trial in the current area",
          parameters: [],
        },
      ],
      ["ascend"]: [
        {
          description: "Complete The Lord's Labyrinth",
          parameters: [
            {
              name: "version",
              description:
                "Version to complete, normal/cruel/merciless/eternal",
            },
          ],
        },
      ],
      ["crafting"]: [
        {
          description: "Get the crafting recipe in the current area",
          parameters: [],
        },
      ],
      ["dir"]: [
        {
          description: "A direction",
          parameters: [
            {
              name: "number",
              description: "Number of degrees in multiples of 45, where 0 = Up",
            },
          ],
        },
      ],
      ["copy"]: [
        {
          description: "One click copy",
          parameters: [
            {
              name: "text",
              description: "Text to copy",
            },
          ],
        },
      ],
    };
}
