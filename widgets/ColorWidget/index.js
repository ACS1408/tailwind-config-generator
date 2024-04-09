"use client";
import ColorBlock from "@/components/ColorBlock";
import Container from "@/components/utils/Container";
import React, { useState } from "react";
import AddColorModal from "@/components/AddColorModal";
import { useRecoilState } from "recoil";
import { colorState } from "@/atoms/colorState";
import { CopyBlock, dracula } from "react-code-blocks";

const ColorWidget = () => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  let tailwindConfig = `/** @type {import('tailwindcss').Config} */

const colors = {
  ${colorData
    .map((item) => {
      if (item.variants) {
        return `${item.name}: {
    DEFAULT: "var(--${item.name})", \n    ${item?.variants
        ?.map((variant) => {
          return `${variant.variant}: "var(--${item.name}-${variant.variant})",\n\t`;
        })
        .join("  ")}}\n`;
    } else {
      return `${item.name}: "var(--${item.name})",\n`;
    }
    })
    .join("  ")}};

module.exports = {
  content: [
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
    extend: {},
  },
  plugins: [],
};`;

  let mainCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  ${colorData
    .map((item) => {
      if (item.variants) {
        return `--${
          item.name
        }: ${item?.hex?.toUpperCase()}; \n  ${item?.variants
          ?.map((variant) => {
            return `--${item.name}-${
              variant.variant
            }: ${variant?.color?.toUpperCase()};\n`;
          })
          .join("  ")}`;
      } else {
        return `--${item.name}: ${item?.hex?.toUpperCase()};\n`;
      }
    })
    .join("  ")}}`;

  return (
    <>
      <section className="color-widget py-16 ">
        <Container>
          <h2 className="title text-3xl font-semibold mb-6">Colors</h2>
          <div className="grid gap-7 grid-cols-10">
            {colorData?.map((color, i) => {
              return (
                <div key={i}>
                  <ColorBlock
                    hex={color?.hex}
                    name={color?.name}
                    variants={color?.variants}
                    colorData={colorData}
                    setColorData={setColorData}
                  />
                </div>
              );
            })}
            <div>
              <div
                className="w-full h-full bg-[#21DF4B] rounded-lg grid place-items-center"
                onClick={openModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="50px"
                  height="50px"
                >
                  <path
                    d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <span className="ps-4 py-2 inline-block italic">
                  tailwind.config.js
                </span>
                <CopyBlock
                  text={tailwindConfig}
                  language={"javascript"}
                  theme={dracula}
                  showLineNumbers
                  wrapLines
                />
              </div>
              <div className="">
                <span className="ps-4 py-2 inline-block italic">main.scss</span>
                <CopyBlock
                  text={mainCSS}
                  language={"scss"}
                  theme={dracula}
                  showLineNumbers
                  wrapLines
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <AddColorModal
        isOpen={isOpen}
        closeModal={closeModal}
        colorData={colorData}
        setColorData={setColorData}
        defaultColor={"#000000"}
        defaultName={""}
      />
    </>
  );
};

export default ColorWidget;
