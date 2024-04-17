import { atom } from "recoil";

export const fontSizeState = atom({
  key: "fontSizeState",
  default: [
    {
      id: 0,
      name: "h1",
      size: "48",
    },
    {
      id: 1,
      name: "h2",
      size: "36",
    },
    {
      id: 2,
      name: "h3",
      size: "28",
    },
    {
      id: 3,
      name: "h4",
      size: "24",
    },
    {
      id: 4,
      name: "h5",
      size: "20",
    },
    {
      id: 5,
      name: "h6",
      size: "18",
    },
    {
      id: 6,
      name: "p",
      size: "16",
    },
  ],
});
