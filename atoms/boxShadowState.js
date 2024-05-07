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
          color: "black-700",
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
          color: "black-900",
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
          color: "black",
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
