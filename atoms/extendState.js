import { atom } from "recoil";

export const extendState = atom({
  key: "extendState",
  default: {
    colors: false,
    spacing: true,
    font_weight: false,
    font_size: true,
    box_shadow: true,
  },
});
