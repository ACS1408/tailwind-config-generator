import { atom } from "recoil";

export const settingState = atom({
  key: "settingState",
  default: {
    variable_prefix: "wac-",
    dark_theme: false,
  },
});
