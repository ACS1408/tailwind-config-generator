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
          alpha: 0.1,
          horizontal: 0,
          vertical: 0,
          blur: 2,
          spread: 2,
        },
      ],
      dark_variant: [
        {
          key: "layer-0",
          color: "#212121",
          alpha: 0.1,
          horizontal: 0,
          vertical: 0,
          blur: 2,
          spread: 2,
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
          alpha: 0.06,
          horizontal: 0,
          vertical: 0,
          blur: 4,
          spread: 5,
        },
      ],
      dark_variant: [
        {
          key: "layer-0",
          color: "#414141",
          alpha: 0.06,
          horizontal: 0,
          vertical: 0,
          blur: 4,
          spread: 5,
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
          alpha: 0.15,
          horizontal: 0,
          vertical: 0,
          blur: 6,
          spread: 3,
        },
      ],
      dark_variant: [
        {
          key: "layer-0",
          color: "#616161",
          alpha: 0.15,
          horizontal: 0,
          vertical: 0,
          blur: 6,
          spread: 3,
        },
      ],
    },
  ],
});
