import { atom } from "recoil";

export const buttonState = atom({
  key: "buttonState",
  default: [
    {
      id: 0,
      name: "primary",
      type: "filled",
      bg: "primary",
      border: {
        color: "primary",
        width: {
          top: 1,
          bottom: 1,
          left: 1,
          right: 1,
        },
      },
      text: {
        color: "white",
        weight: "400",
        size: "16",
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
      radius: {
        top_right: 6,
        bottom_right: 6,
        bottom_left: 6,
        top_left: 6,
      },
    },
    {
      id: 1,
      name: "secondary",
      type: "filled",
      bg: "secondary",
      border: {
        color: "secondary",
        width: {
          top: 1,
          bottom: 1,
          left: 1,
          right: 1,
        },
      },
      text: {
        color: "white",
        weight: "400",
        size: "16",
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
      radius: {
        top_right: 0,
        bottom_right: 0,
        bottom_left: 0,
        top_left: 0,
      },
    },
    {
      id: 2,
      name: "black",
      type: "filled",
      bg: "black",
      border: {
        color: "black",
        width: {
          top: 1,
          bottom: 1,
          left: 1,
          right: 1,
        },
      },
      text: {
        color: "white",
        weight: "400",
        size: "16",
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
      radius: {
        top_right: 0,
        bottom_right: 0,
        bottom_left: 0,
        top_left: 0,
      },
    },
    {
      id: 3,
      name: "black",
      type: "outline",
      bg: "",
      border: {
        color: "black",
        width: {
          top: 1,
          bottom: 1,
          left: 1,
          right: 1,
        },
      },
      text: {
        color: "black",
        weight: "400",
        size: "16",
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
      radius: {
        top_right: 40,
        bottom_right: 40,
        bottom_left: 40,
        top_left: 40,
      },
    },
  ],
});
