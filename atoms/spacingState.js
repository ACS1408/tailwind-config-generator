import { atom } from "recoil";

export const spacingState = atom({
  key: "spacingState",
  default: [
    {
      id: 0,
      name: "4.5",
      size: "18",
    },
    {
      id: 1,
      name: "5.5",
      size: "22",
    },
    {
      id: 2,
      name: "6.5",
      size: "26",
    },
    {
      id: 3,
      name: "7.5",
      size: "30",
    },
  ],
});
