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
          color: "shadow_sm",
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
          color: "shadow_md",
          horizontal: 0,
          vertical: 0,
          blur: 8,
          spread: 3,
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
          color: "shadow_md",
          horizontal: 0,
          vertical: 0,
          blur: 12,
          spread: 6,
          inset: false,
        },
      ],
    },
  ],
});
