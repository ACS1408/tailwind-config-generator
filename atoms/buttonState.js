import { atom } from "recoil";

export const buttonState = atom({
  key: "buttonState",
  default: [
    {
      id: 0,
      name: "primary",
      buttonType: "filled",
      bgColor: "#7300FF",
      borderColor: "#7300FF",
      textColor: "#FFFFFF",
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
      border: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
      },
    },
    {
      id: 1,
      name: "secondary",
      buttonType: "filled",
      bgColor: "#00F0FF",
      borderColor: "#00F0FF",
      textColor: "#FFFFFF",
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
      border: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
      },
    },
  ],
});
