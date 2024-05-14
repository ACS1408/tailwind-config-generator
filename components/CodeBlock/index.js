import { colorState } from "@/atoms/colorState";
import { extendState } from "@/atoms/extendState";
import { settingState } from "@/atoms/settingState";
import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { useRecoilState } from "recoil";
import Container from "../utils/Container";
import { spacingState } from "@/atoms/spacingState";
import { pxToRem } from "../utils/pxToRem";
import { fontWeightState } from "@/atoms/fontWeightState";
import { fontSizeState } from "@/atoms/fontSizeState";
import { boxShadowState } from "@/atoms/boxShadowState";
import { Tab } from "@headlessui/react";
import { buttonState } from "@/atoms/buttonState";

const CodeBlock = () => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [spacingData, setSpacingData] = useRecoilState(spacingState);
  const [fontWeightData, setFontWeightData] = useRecoilState(fontWeightState);
  const [fontSizeData, setFontSizeData] = useRecoilState(fontSizeState);
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [buttonData, setButtonData] = useRecoilState(buttonState);
  const [settings, setSettings] = useRecoilState(settingState);
  const [isExtend, setIsExtend] = useRecoilState(extendState);

  const paddingCheck = (padding) => {
    const { top, bottom, left, right } = padding;
    if (
      Object.values(padding).every(
        (value) => value === Object.values(padding)[0]
      )
    ) {
      return `p-[${pxToRem(Object.values(padding)[0])}rem]`;
    } else {
      if (top === bottom && left === right) {
        return `px-[${pxToRem(left)}rem] py-[${pxToRem(top)}rem]`;
      } else if (top === bottom && left !== right) {
        return `py-[${pxToRem(top)}rem] ps-[${pxToRem(left)}rem] pe-[${pxToRem(
          right
        )}rem]`;
      }
      if (left === right && top !== bottom) {
        return `px-[${pxToRem(left)}rem] pt-[${pxToRem(top)}rem] pb-[${pxToRem(
          right
        )}rem]`;
      } else {
        return `ps-[${pxToRem(left)}rem] pe-[${pxToRem(
          right
        )}rem] pt-[${pxToRem(top)}rem] pb-[${pxToRem(bottom)}rem]`;
      }
    }
  };
  const borderCheck = (border) => {
    const { top, bottom, left, right } = border;
    if (
      Object.values(border).every((value) => value === Object.values(border)[0])
    ) {
      return `border ${
        Object.values(border)[0] !== 1
          ? `border-[${Object.values(border)[0]}px]`
          : ""
      }`;
    } else {
      if (top === bottom && left === right) {
        return `border ${left !== 1 ? `border-x-[${left}px]` : ""} ${
          top !== 1 ? `border-y-[${top}px]` : ""
        }`;
      } else if (top === bottom && left !== right) {
        return `border ${top !== 1 ? `border-y-[${top}px]` : ""} ${
          left !== 1 ? `border-s-[${left}px]` : ""
        } ${right !== 1 ? `border-e-[${right}px]` : ""}`;
      }
      if (left === right && top !== bottom) {
        return `border ${left !== 1 ? `border-x-[${left}px]` : ""} ${
          top !== 1 ? `border-t-[${top}px]` : ""
        } ${bottom !== 1 ? `border-b-[${bottom}px]` : ""}`;
      } else {
        return `border ${left !== 1 ? `border-s-[${left}px]` : ""} ${
          right !== 1 ? `border-e-[${right}px]` : ""
        } ${top !== 1 ? `border-t-[${top}px]` : ""} ${
          bottom !== 1 ? `border-b-[${bottom}px]` : ""
        }`;
      }
    }
  };

  let tailwindConfig = `/** @type {import('tailwindcss').Config} */

const colors = {
  ${colorData
    .map((item) => {
      if (item.variants) {
        return `${item.name}: {
    DEFAULT: "var(--${settings?.variable_prefix}${
          item.name
        })", \n    ${item?.variants
          ?.map((variant) => {
            return `${variant.variant}: "var(--${settings?.variable_prefix}${item.name}-${variant.variant})",\n\t`;
          })
          .join("  ")}},\n`;
      } else {
        return `${item.name}: "var(--${settings?.variable_prefix}${item.name})",\n`;
      }
    })
    .join("  ")}};

const spacing = {
  ${spacingData
    .map((item) => {
      return `${item?.name}: "var(--${
        settings?.variable_prefix
      }spacing-${item?.name.replace(".", "pt")})",\n`;
    })
    .join("  ")}};
    
const fontWeight = {
  ${fontWeightData
    .map((item) => {
      return `${item?.name}: "var(--${settings?.variable_prefix}font-${item?.name})",\n`;
    })
    .join("  ")}};

const fontSize = {
  ${fontSizeData
    .map((item) => {
      return `${item?.name}: "var(--${
        settings?.variable_prefix
      }text-${item?.name.replace(".", "pt")})",\n`;
    })
    .join("  ")}};

const boxShadow = {
  ${boxShadowData
    .map((item) => {
      return `${item?.name}: "var(--${
        settings?.variable_prefix
      }shadow-${item?.name.replace(".", "pt")})",\n`;
    })
    .join("  ")}};
    
const container = {
  center: true,
  padding: "calc(var(--gutter-x) / 2)",
};

const screens = {
  xs: { max: "576px" },
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1420px",
  xxxl: "1600px",
  laptop: { min: "1200px", max: "1450px" },
};

module.exports = {
  content: [
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {${!isExtend.colors ? "\n    colors," : ""}${
    !isExtend.spacing ? "\n    spacing," : ""
  }${!isExtend.font_weight ? "\n    fontWeight," : ""}${
    !isExtend.font_size ? "\n    fontSize," : ""
  }${!isExtend.box_shadow ? "\n    boxShadow," : ""}
    container,
    screens,
    extend: {${isExtend.colors ? "\n      colors,    " : ""}${
    isExtend.spacing ? "\n      spacing,    " : ""
  }${isExtend.font_weight ? "\n      fontWeight,    " : ""}${
    isExtend.font_size ? "\n      fontSize,    " : ""
  }${isExtend.box_shadow ? "\n      boxShadow,    " : ""}\n    },
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
        return `--${settings?.variable_prefix}${
          item.name
        }: ${item?.hex?.toUpperCase()}; \n  ${item?.variants
          ?.map((variant) => {
            return `--${settings?.variable_prefix}${item.name}-${
              variant.variant
            }: ${variant?.color?.toUpperCase()};\n`;
          })
          .join("  ")}`;
      } else {
        return `--${settings?.variable_prefix}${
          item.name
        }: ${item?.hex?.toUpperCase()};\n`;
      }
    })
    .join("  ")}
  ${spacingData
    .map((item) => {
      return `--${settings?.variable_prefix}spacing-${item.name.replace(
        ".",
        "pt"
      )}: ${pxToRem(item?.size)}rem;\n`;
    })
    .join("  ")}
  ${fontWeightData
    .map((item) => {
      return `--${settings?.variable_prefix}font-${item.name}: ${item.value};\n`;
    })
    .join("  ")}
  ${fontSizeData
    .map((item) => {
      return `--${settings?.variable_prefix}text-${item.name.replace(
        ".",
        "pt"
      )}: ${pxToRem(item?.size)}rem;\n`;
    })
    .join("  ")}
  ${boxShadowData
    .map((item) => {
      return `--${settings?.variable_prefix}shadow-${item.name.replace(
        ".",
        "pt"
      )}: ${item.value
        .map((item) => {
          const [colorMain, colorVariant] = item?.color?.split("-");
          return `${item?.horizontal}px ${item?.vertical}px ${item?.blur}px ${
            item?.spread
          }px ${
            colorData?.filter((color) => color?.name === item.color)[0]?.hex ??
            colorData
              ?.filter((color) => color?.name === colorMain)[0]
              ?.variants?.filter(
                (variant) => variant?.variant === colorVariant
              )[0]?.color
          };`;
        })
        .join(", \n")}\n`;
    })
    .join("  ")}
  --gutter-x: 24px;
}

${
  settings?.dark_theme
    ? `[data-theme='dark'] {
${colorData
  .map((item) => {
    if (item?.dark_theme_hex) {
      if (item.variants) {
        return `  --${settings?.variable_prefix}${
          item.name
        }: ${item?.dark_theme_hex?.toUpperCase()}; \n  ${item?.variants
          ?.map((variant) => {
            return `--${settings?.variable_prefix}${item.name}-${
              variant.variant
            }: ${variant?.dark_theme_color?.toUpperCase()};\n`;
          })
          .join("  ")}`;
      } else {
        return `--${settings?.variable_prefix}${
          item.name
        }: ${item?.dark_theme_hex?.toUpperCase()};\n`;
      }
    }
  })
  .join("")}
  ${boxShadowData
    .map((item) => {
      return `--${settings?.variable_prefix}shadow-${item.name.replace(
        ".",
        "pt"
      )}: ${item.value
        .map((item) => {
          const [colorMain, colorVariant] = item?.color?.split("-");
          return `${item?.horizontal}px ${item?.vertical}px ${item?.blur}px ${
            item?.spread
          }px ${
            colorData?.filter((color) => color?.name === item.color)[0]
              ?.dark_theme_hex ??
            colorData
              ?.filter((color) => color?.name === colorMain)[0]
              ?.variants?.filter(
                (variant) => variant?.variant === colorVariant
              )[0]?.dark_theme_color
          };`;
        })
        .join(", \n")}\n`;
    })
    .join("  ")}}`
    : ""
}

@layer base {
  h1,
  .h1 {
    &:not(.ttl) {
      @apply text-h1;
    }
  }

  h2,
  .h2 {
    &:not(.ttl) {
      @apply text-h2;
    }
  }

  h3,
  .h3 {
    &:not(.ttl) {
      @apply text-h3;
    }
  }

  h4,
  .h4 {
    &:not(.ttl) {
      @apply text-h4;
    }
  }

  h5,
  .h5 {
    &:not(.ttl) {
      @apply text-h5;
    }
  }

  h6,
  .h6 {
    &:not(.ttl) {
      @apply text-h6;
    }
  }

  p,
  .p {
    &:not(.para) {
      @apply text-p;
    }
  }
}

@layer components {
  .container {
    @apply sm:max-w-[540px] md:max-w-[720px] 
    lg:max-w-[960px] xl:max-w-[1080px] 
    xxl:max-w-[1260px] xxxl:max-w-[1403px];
  }
  
  ${buttonData?.length > 0 ? "//Buttons" : ""}
  ${buttonData
    ?.map((button) => {
      return `.btn-${
        button?.buttonType === "filled"
          ? button?.name.toLowerCase().split(" ").join("-")
          : button?.buttonType === "outline"
          ? "outline-" + button?.name.toLowerCase().split(" ").join("-")
          : button?.buttonType === "link"
          ? "link-" + button?.name.toLowerCase().split(" ").join("-")
          : ""
      } {
    @apply ${
      button?.bgColor
        ? colorData?.findIndex(
            (color) =>
              color.hex?.toLowerCase() === button?.bgColor?.toLowerCase()
          ) > -1
          ? `bg-${
              colorData[
                colorData?.findIndex(
                  (color) =>
                    color.hex?.toLowerCase() === button?.bgColor?.toLowerCase()
                )
              ]?.name
            }`
          : `bg-[${button?.bgColor}]`
        : ""
    } ${button?.border ? borderCheck(button?.border) : ""} ${
        button?.borderColor
          ? colorData?.findIndex(
              (color) =>
                color.hex?.toLowerCase() === button?.borderColor?.toLowerCase()
            ) > -1
            ? `border-${
                colorData[
                  colorData?.findIndex(
                    (color) =>
                      color.hex?.toLowerCase() ===
                      button?.borderColor?.toLowerCase()
                  )
                ]?.name
              }`
            : `border-[${button?.borderColor}]`
          : ""
      } ${
        button?.textColor
          ? colorData?.findIndex(
              (color) =>
                color.hex?.toLowerCase() === button?.textColor?.toLowerCase()
            ) > -1
            ? `text-${
                colorData[
                  colorData?.findIndex(
                    (color) =>
                      color.hex?.toLowerCase() ===
                      button?.textColor?.toLowerCase()
                  )
                ]?.name
              }`
            : `text-[${button?.textColor}]`
          : ""
      } ${button?.padding ? paddingCheck(button?.padding) : ""};
  }
  `;
    })
    .join("")}
}

@layer utilities {
}`;
  let categories = {
    "tailwind.config.js": {
      text: tailwindConfig,
      language: "javascript",
    },
    "main.scss": {
      text: mainCSS,
      language: "scss",
    },
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="code-block">
      <Tab.Group>
        <Tab.List className="flex bg-[#282a36] rounded-t-md">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "outline-none px-6 py-3 text-white text-sm relative",
                  "after:content-[''] after:w-full after:h-[2px] after:bg-white after:absolute after:bottom-0 after:left-0",
                  selected ? "" : "after:hidden"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="py-4 bg-[#282a36] rounded-b-md h-[calc(100vh_-_154px)] overflow-auto no-scrollbar">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx}>
              <CopyBlock
                text={posts.text}
                language={posts.language}
                theme={dracula}
                showLineNumbers
                wrapLines
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CodeBlock;
