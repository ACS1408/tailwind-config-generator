import { atom } from "recoil";

export const boxShadowState = atom({
  key: "boxShadowState",
  default: [
    {
      id: 0,
      name: "xs",
      value: [
        {
          color: "#000000",
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
      name: "3xl",
      value: [
        {
          color: "#000000",
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
      name: "4xl",
      value: [
        {
          color: "#000000",
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
