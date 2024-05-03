import { atom } from "recoil";

export const boxShadowState = atom({
  key: "boxShadowState",
  default: [
    {
      id: 0,
      name: "sm",
      value: [
        {
          key: "layer-0",
          color: "#000000",
          dark_color: "#212121",
          alpha_light: 0.1,
          alpha_dark: 0.1,
          horizontal: 0,
          vertical: 0,
          blur: 2,
          spread: 2,
          inset: true,
        },
      ],
    },
    {
      id: 1,
      name: "md",
      value: [
        {
          key: "layer-0",
          color: "#000000",
          dark_color: "#414141",
          alpha_light: 0.06,
          alpha_dark: 0.06,
          horizontal: 0,
          vertical: 0,
          blur: 4,
          spread: 5,
          inset: false,
        },
      ],
    },
    {
      id: 2,
      name: "lg",
      value: [
        {
          key: "layer-0",
          color: "#000000",
          dark_color: "#616161",
          alpha_light: 0.15,
          alpha_dark: 0.15,
          horizontal: 0,
          vertical: 0,
          blur: 6,
          spread: 3,
          inset: false,
        },
      ],
    },
  ],
});
