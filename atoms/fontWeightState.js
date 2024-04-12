import { atom } from "recoil";

export const fontWeightState = atom({
  key: "fontWeightState",
  default: [
    {
      id: 0,
      name: "light",
      value: "300",
    },
    {
      id: 1,
      name: "regular",
      value: "400",
    },
    {
      id: 2,
      name: "medium",
      value: "500",
    },
    {
      id: 3,
      name: "semibold",
      value: "600",
    },
    {
      id: 4,
      name: "bold",
      value: "700",
    },
  ],
});
