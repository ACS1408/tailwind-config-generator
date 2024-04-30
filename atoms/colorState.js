import { atom } from "recoil";

export const colorState = atom({
  key: "colorState",
  default: [
    {
      id: 0,
      name: "primary",
      hex: "#7300FF",
    },
    {
      id: 1,
      name: "secondary",
      hex: "#00F0FF",
    },
    {
      id: 2,
      name: "black",
      hex: "#000000",
      dark_theme_hex: "#333333",
      variants: [
        {
          id: "variant-0",
          variant: "900",
          color: "#313131",
          dark_theme_color: "#212121",
        },
        {
          id: "variant-1",
          variant: "800",
          color: "#616161",
          dark_theme_color: "#414141",
        },
        {
          id: "variant-2",
          variant: "700",
          color: "#919191",
          dark_theme_color: "#616161",
        },
      ],
    },
    {
      id: 3,
      name: "dark",
      hex: "#263251",
    },
    {
      id: 4,
      name: "error",
      hex: "#FF0000",
    },
    {
      id: 5,
      name: "warning",
      hex: "#FFD500",
    },
    {
      id: 6,
      name: "success",
      hex: "#00FF00",
    },
    {
      id: 7,
      name: "white",
      hex: "#FFFFFF",
    },
  ],
});
