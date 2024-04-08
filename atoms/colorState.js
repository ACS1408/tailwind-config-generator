import { atom } from "recoil";

export const colorState = atom({
  key: "colorState",
  default: [
    {
      name: "primary",
      hex: "#FF0000",
    },
    {
      name: "secondary",
      hex: "#00F0FF",
    },
    {
      name: "black",
      hex: "#000000",
      variants: [
        {
          variant: "900",
          color: "#313131",
          checked: true,
        },
        {
          variant: "800",
          color: "#616161",
          checked: true,
        },
        {
          variant: "700",
          color: "#919191",
          checked: true,
        },
      ],
    },
    {
      name: "dark",
      hex: "#263251",
    },
  ],
});
