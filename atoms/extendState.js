import { atom } from "recoil";

export const extendState = atom({
  key: "extendState",
  default: {
    colors: false,
    spacing: true,
  },
});
