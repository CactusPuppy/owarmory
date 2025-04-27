import { heroes } from "$lib/constants/heroes";
import type { Build } from "$lib/types/build";

export const testDataRoundInfos = [
  {
    id: "1",
    note: "Some short note on the first round",
    sections: [
      {
        id: "1",
        title: "",
        power: {
          id: 1,
          name: "Some power",
          description: "I am some description of a power that will appear in the popover",
          icon: "https://picsum.photos/40",
        },
        items: [
          {
            id: 1,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/a/40",
            rarity: "common",
            cost: 4000,
          },
          {
            id: 2,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/b/40",
            rarity: "rare",
            cost: 2000,
          },
        ],
      },
      {
        id: "2",
        title: "Push maps",
        power: {
          id: 1,
          name: "Some power",
          description: "I am some description of a power that will appear in the popover",
          icon: "https://picsum.photos/40",
        },
        items: [
          {
            id: 1,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/c/40",
            rarity: "common",
            cost: 4000,
          },
          {
            id: 2,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/d/40",
            rarity: "rare",
            cost: 2000,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    note: "Some other short note on the second round",
    sections: [
      {
        id: "1",
        title: "",
        power: null,
        items: [
          {
            id: 3,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/a/40",
            rarity: "common",
            cost: 4000,
          },
          {
            id: 4,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/b/40",
            rarity: "rare",
            cost: 2000,
          },
        ],
      },
      {
        id: "2",
        title: "Low healing",
        power: null,
        items: [
          {
            id: 1,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/c/40",
            rarity: "common",
            cost: 4000,
          },
          {
            id: 2,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/d/40",
            rarity: "rare",
            cost: 2000,
          },
        ],
      },
      {
        id: "3",
        title: "Other",
        power: null,
        items: [
          {
            id: 1,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/c/40",
            rarity: "common",
            cost: 4000,
          },
          {
            id: 2,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/d/40",
            rarity: "rare",
            cost: 2000,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    note: "Some other short note on the second round",
    sections: [
      {
        id: "1",
        title: "",
        power: {
          id: 2,
          name: "Some power",
          description: "I am some description of a power that will appear in the popover",
          icon: "https://picsum.photos/40",
        },
        items: [
          {
            id: 5,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/g/40",
            rarity: "common",
            cost: 4000,
          },
          {
            id: 6,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/h/40",
            rarity: "rare",
            cost: 2000,
          },
        ],
      },
      {
        id: "2",
        title: "Low healing",
        power: {
          id: 2,
          name: "Some power",
          description: "I am some description of a power that will appear in the popover",
          icon: "https://picsum.photos/40",
        },
        items: [
          {
            id: 1,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/i/40",
            rarity: "common",
            cost: 4000,
          },
          {
            id: 2,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/j/40",
            rarity: "rare",
            cost: 2000,
          },
        ],
      },
      {
        id: "3",
        title: "Other",
        power: {
          id: 2,
          name: "Some power",
          description: "I am some description of a power that will appear in the popover",
          icon: "https://picsum.photos/40",
        },
        items: [
          {
            id: 1,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/k/40",
            rarity: "common",
            cost: 4000,
          },
          {
            id: 2,
            name: "Some item",
            description: "I am some description of an item that will appear in the popover",
            icon: "https://picsum.photos/seed/l/40",
            rarity: "rare",
            cost: 2000,
          },
        ],
      },
    ],
  },
];

export const testBuildData: Build = {
  title: "I am a build for a hero",
  introduction:
    "Some short description, consectetur adipiscing elit. Donec ornare justo quis felis feugiat vestibulum. Nulla facilisi. Aliquam volutpat sed ipsum vel finibus. Morbi diam erat, congue ut gravida vitae.",
  description:
    "Some short description, consectetur adipiscing elit. Donec ornare justo quis felis feugiat vestibulum. Nulla facilisi. Aliquam volutpat sed ipsum vel finibus. Morbi diam erat, congue ut gravida vitae.",
  hero: heroes[Math.floor(Math.random() * heroes.length)],
  author: {
    username: "Some guy",
  },
  roundInfos: testDataRoundInfos
};
