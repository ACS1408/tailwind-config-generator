import React, { useState } from "react";
import EditButtonModal from "../EditButtonModal";
import { colorState } from "@/atoms/colorState";
import { useRecoilState } from "recoil";
import { settingState } from "@/atoms/settingState";

const ButtonBlock = ({ button }) => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [settings, setSettings] = useRecoilState(settingState);
  const [isEditButtonModalOpen, setIsEditButtonModalOpen] = useState(false);

  const closeEditButtonModal = () => {
    setIsEditButtonModalOpen(false);
  };

  const openEditButtonModal = () => {
    setIsEditButtonModalOpen(true);
  };
  return (
    <>
      <button
        key={button?.id}
        type="button"
        className="btn capitalize"
        onClick={openEditButtonModal}
        style={{
          borderRadius: `${button.radius.top_left}px ${button.radius.top_right}px ${button.radius.bottom_right}px ${button.radius.bottom_left}px`,
          backgroundColor:
            button?.type === "filled"
              ? !settings?.dark_theme
                ? colorData?.filter((color) => color?.name === button.bg)[0]
                    ?.hex ??
                  colorData
                    ?.filter(
                      (color) => color?.name === button.bg.split("-")[0]
                    )[0]
                    ?.variants?.filter(
                      (variant) => variant?.variant === button.bg.split("-")[1]
                    )[0]?.color
                : colorData?.filter((color) => color?.name === button.bg)[0]
                    ?.dark_theme_hex ??
                  colorData
                    ?.filter(
                      (color) => color?.name === button.bg.split("-")[0]
                    )[0]
                    ?.variants?.filter(
                      (variant) => variant?.variant === button.bg.split("-")[1]
                    )[0]?.dark_theme_color
              : "",
          color: !settings?.dark_theme
            ? colorData?.filter((color) => color?.name === button.text.color)[0]
                ?.hex ??
              colorData
                ?.filter(
                  (color) => color?.name === button.text.color.split("-")[0]
                )[0]
                ?.variants?.filter(
                  (variant) =>
                    variant?.variant === button.text.color.split("-")[1]
                )[0]?.color
            : colorData?.filter((color) => color?.name === button.text.color)[0]
                ?.dark_theme_hex ??
              colorData
                ?.filter(
                  (color) => color?.name === button.text.color.split("-")[0]
                )[0]
                ?.variants?.filter(
                  (variant) =>
                    variant?.variant === button.text.color.split("-")[1]
                )[0]?.dark_theme_color,
          padding: `${button.padding.top}px ${button.padding.right}px ${button.padding.bottom}px ${button.padding.left}px`,
          borderTop: `${
            button.type !== "link"
              ? `${button.border.width.top}px solid ${
                  !settings?.dark_theme
                    ? colorData?.filter(
                        (color) => color?.name === button.border.color
                      )[0]?.hex ??
                      colorData
                        ?.filter(
                          (color) =>
                            color?.name === button.border.color.split("-")[0]
                        )[0]
                        ?.variants?.filter(
                          (variant) =>
                            variant?.variant ===
                            button.border.color.split("-")[1]
                        )[0]?.color
                    : colorData?.filter(
                        (color) => color?.name === button.border.color
                      )[0]?.dark_theme_hex ??
                      colorData
                        ?.filter(
                          (color) =>
                            color?.name === button.border.color.split("-")[0]
                        )[0]
                        ?.variants?.filter(
                          (variant) =>
                            variant?.variant ===
                            button.border.color.split("-")[1]
                        )[0]?.dark_theme_color
                }`
              : ""
          }`,
          borderRight: `${
            button.type !== "link"
              ? `${button.border.width.right}px solid ${
                  !settings?.dark_theme
                    ? colorData?.filter(
                        (color) => color?.name === button.border.color
                      )[0]?.hex ??
                      colorData
                        ?.filter(
                          (color) =>
                            color?.name === button.border.color.split("-")[0]
                        )[0]
                        ?.variants?.filter(
                          (variant) =>
                            variant?.variant ===
                            button.border.color.split("-")[1]
                        )[0]?.color
                    : colorData?.filter(
                        (color) => color?.name === button.border.color
                      )[0]?.dark_theme_hex ??
                      colorData
                        ?.filter(
                          (color) =>
                            color?.name === button.border.color.split("-")[0]
                        )[0]
                        ?.variants?.filter(
                          (variant) =>
                            variant?.variant ===
                            button.border.color.split("-")[1]
                        )[0]?.dark_theme_color
                }`
              : ""
          }`,
          borderBottom: `${
            button.type !== "link"
              ? `${button.border.width.bottom}px solid ${
                  !settings?.dark_theme
                    ? colorData?.filter(
                        (color) => color?.name === button.border.color
                      )[0]?.hex ??
                      colorData
                        ?.filter(
                          (color) =>
                            color?.name === button.border.color.split("-")[0]
                        )[0]
                        ?.variants?.filter(
                          (variant) =>
                            variant?.variant ===
                            button.border.color.split("-")[1]
                        )[0]?.color
                    : colorData?.filter(
                        (color) => color?.name === button.border.color
                      )[0]?.dark_theme_hex ??
                      colorData
                        ?.filter(
                          (color) =>
                            color?.name === button.border.color.split("-")[0]
                        )[0]
                        ?.variants?.filter(
                          (variant) =>
                            variant?.variant ===
                            button.border.color.split("-")[1]
                        )[0]?.dark_theme_color
                }`
              : ""
          }`,
          borderLeft: `${
            button.type !== "link"
              ? `${button.border.width.left}px solid ${
                  !settings?.dark_theme
                    ? colorData?.filter(
                        (color) => color?.name === button.border.color
                      )[0]?.hex ??
                      colorData
                        ?.filter(
                          (color) =>
                            color?.name === button.border.color.split("-")[0]
                        )[0]
                        ?.variants?.filter(
                          (variant) =>
                            variant?.variant ===
                            button.border.color.split("-")[1]
                        )[0]?.color
                    : colorData?.filter(
                        (color) => color?.name === button.border.color
                      )[0]?.dark_theme_hex ??
                      colorData
                        ?.filter(
                          (color) =>
                            color?.name === button.border.color.split("-")[0]
                        )[0]
                        ?.variants?.filter(
                          (variant) =>
                            variant?.variant ===
                            button.border.color.split("-")[1]
                        )[0]?.dark_theme_color
                }`
              : ""
          }`,
        }}
      >
        {button?.type} {button?.name}
      </button>
      <EditButtonModal
        isEditButtonModalOpen={isEditButtonModalOpen}
        closeEditButtonModal={closeEditButtonModal}
        id={button?.id}
        name={button?.name}
        type={button?.type}
        bg={button?.bg}
        border={button?.border}
        text={button?.text}
        padding={button?.padding}
        radius={button?.radius}
      />
    </>
  );
};

export default ButtonBlock;
