import { atom } from "recoil";

export const colorState = atom({
  key: "colorState",
  default: [
    {
      id: 0,
      name: "primary",
      hex: "#8060f6",
    },
    {
      id: 1,
      name: "secondary",
      hex: "#b093fb",
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
          picker: false,
          dark_picker: false,
        },
        {
          id: "variant-1",
          variant: "800",
          color: "#616161",
          dark_theme_color: "#414141",
          picker: false,
          dark_picker: false,
        },
        {
          id: "variant-2",
          variant: "700",
          color: "#919191",
          dark_theme_color: "#616161",
          picker: false,
          dark_picker: false,
        },
      ],
    },
    {
      id: 3,
      name: "white",
      hex: "#FFFFFF",
    },
    {
      id: 4,
      name: "dark",
      hex: "#263251",
    },
    {
      id: 5,
      name: "error",
      hex: "#FF0000",
    },
    {
      id: 6,
      name: "warning",
      hex: "#FFD500",
    },
    {
      id: 7,
      name: "success",
      hex: "#00FF00",
    },
  ],
});
