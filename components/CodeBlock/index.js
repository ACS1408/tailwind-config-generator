import { colorState } from "@/atoms/colorState";
import { extendState } from "@/atoms/extendState";
import { variablePrefixState } from "@/atoms/variablePrefixState";
import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { useRecoilState } from "recoil";
import Container from "../utils/Container";
import { spacingState } from "@/atoms/spacingState";
import { pxToRem } from "../utils/pxToRem";

const CodeBlock = () => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [spacingData, setSpacingData] = useRecoilState(spacingState);
  const [variablePrefix, setVariablePrefix] =
    useRecoilState(variablePrefixState);
  const [isExtend, setIsExtend] = useRecoilState(extendState);

  let tailwindConfig = `/** @type {import('tailwindcss').Config} */

const colors = {
  ${colorData
    .map((item) => {
      if (item.variants) {
        return `${item.name}: {
    DEFAULT: "var(--${variablePrefix}-${item.name})", \n    ${item?.variants
          ?.map((variant) => {
            return `${variant.variant}: "var(--${variablePrefix}-${item.name}-${variant.variant})",\n\t`;
          })
          .join("  ")}}\n`;
      } else {
        return `${item.name}: "var(--${variablePrefix}-${item.name})",\n`;
      }
    })
    .join("  ")}};

const spacing = {
  ${spacingData
    .map((item) => {
      return `${item?.name}: "var(--${variablePrefix}-spacing-${item?.name})",\n`;
    })
    .join("  ")}};

module.exports = {
  content: [
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {${!isExtend.colors ? "\n    colors," : ""}${
    !isExtend.spacing ? "\n    spacing," : ""
  }
    extend: {${isExtend.colors ? "\n      colors,    " : ""}${
    isExtend.spacing ? "\n      spacing,\n    " : ""
  }},
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
        return `--${variablePrefix}-${
          item.name
        }: ${item?.hex?.toUpperCase()}; \n  ${item?.variants
          ?.map((variant) => {
            return `--${variablePrefix}-${item.name}-${
              variant.variant
            }: ${variant?.color?.toUpperCase()};\n`;
          })
          .join("  ")}`;
      } else {
        return `--${variablePrefix}-${
          item.name
        }: ${item?.hex?.toUpperCase()};\n`;
      }
    })
    .join("  ")}
  ${spacingData
    .map((item) => {
      return `--${variablePrefix}-spacing-${item.name}: ${pxToRem(
        item?.name
      )}rem;\n`;
    })
    .join("  ")}}`;

  return (
    <section className="code-block py-8">
      <Container>
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
      </Container>
    </section>
  );
};

export default CodeBlock;
