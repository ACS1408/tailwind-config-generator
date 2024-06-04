import { colorState } from "@/atoms/colorState";
import { extendState } from "@/atoms/extendState";
import { settingState } from "@/atoms/settingState";
import React from "react";
import { useRecoilState } from "recoil";
import { spacingState } from "@/atoms/spacingState";
import { pxToRem } from "../utils/pxToRem";
import { fontWeightState } from "@/atoms/fontWeightState";
import { fontSizeState } from "@/atoms/fontSizeState";
import { boxShadowState } from "@/atoms/boxShadowState";
import { Tab } from "@headlessui/react";
import { buttonState } from "@/atoms/buttonState";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { sass } from "@codemirror/lang-sass";
import { sublime } from "@uiw/codemirror-theme-sublime";

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
      return ` p-[${pxToRem(Object.values(padding)[0])}rem]`;
    } else {
      if (top === bottom && left === right) {
        return ` px-[${pxToRem(left)}rem] py-[${pxToRem(top)}rem]`;
      } else if (top === bottom && left !== right) {
        return ` py-[${pxToRem(top)}rem] ps-[${pxToRem(left)}rem] pe-[${pxToRem(
          right
        )}rem]`;
      }
      if (left === right && top !== bottom) {
        return ` px-[${pxToRem(left)}rem] pt-[${pxToRem(top)}rem] pb-[${pxToRem(
          right
        )}rem]`;
      } else {
        return ` ps-[${pxToRem(left)}rem] pe-[${pxToRem(
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
      return ` border${
        Object.values(border)[0] !== 1
          ? ` border-[${Object.values(border)[0]}px]`
          : ""
      }`;
    } else {
      if (top === bottom && left === right) {
        return ` border ${left !== 1 ? ` border-x-[${left}px]` : ""}${
          top !== 1 ? ` border-y-[${top}px]` : ""
        }`;
      } else if (top === bottom && left !== right) {
        return ` border${top !== 1 ? ` border-y-[${top}px]` : ""}${
          left !== 1 ? ` border-s-[${left}px]` : ""
        }${right !== 1 ? ` border-e-[${right}px]` : ""}`;
      }
      if (left === right && top !== bottom) {
        return ` border${left !== 1 ? ` border-x-[${left}px]` : ""}${
          top !== 1 ? ` border-t-[${top}px]` : ""
        }${bottom !== 1 ? ` border-b-[${bottom}px]` : ""}`;
      } else {
        return ` border${left !== 1 ? ` border-s-[${left}px]` : ""}${
          right !== 1 ? ` border-e-[${right}px]` : ""
        }${top !== 1 ? ` border-t-[${top}px]` : ""} ${
          bottom !== 1 ? ` border-b-[${bottom}px]` : ""
        }`;
      }
    }
  };

  let tailwindConfig = `/** @type {import('tailwindcss').Config} */

const colors = {
  ${colorData
    .map((item) => {
      if (item?.variants?.length) {
        return `${item?.name}: {
    DEFAULT: "var(--${settings?.variable_prefix}${
          item?.name
        })", \n    ${item?.variants
          ?.map((variant) => {
            return `${variant?.variant}: "var(--${settings?.variable_prefix}${item?.name}-${variant?.variant})",\n\t`;
          })
          .join("  ")}},\n`;
      } else {
        return `${item?.name}: "var(--${settings?.variable_prefix}${item?.name})",\n`;
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
} @layer base {
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
  
  ${buttonData?.length > 0 ? "//buttons" : ""}
  ${buttonData
    ?.map((button) => {
      return `.btn-${
        button?.type === "filled"
          ? button?.name.toLowerCase().split(" ").join("-")
          : button?.type === "outline"
          ? "outline-" + button?.name.toLowerCase().split(" ").join("-")
          : button?.type === "link"
          ? "link-" + button?.name.toLowerCase().split(" ").join("-")
          : ""
      } {
    @apply ${button?.bg ? `bg-${button?.bg}` : ""}${
        button?.border ? borderCheck(button?.border?.width) : ""
      }${button?.border.color ? ` border-${button?.border.color}` : ""}${
        button?.text.color ? ` text-${button?.text.color}` : ""
      }${button?.padding ? paddingCheck(button?.padding) : ""};
  }`;
    })
    .join("\n  ")}
}

@layer utilities {
}`;
  let categories = {
    "tailwind.config.js": {
      text: tailwindConfig,
      language: javascript({ jsx: false }),
    },
    "main.scss": {
      text: mainCSS,
      language: sass(),
    },
  };

  const handleCopyCode = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="code-block">
      <Tab.Group>
        <Tab.List
          className="flex rounded-t-md"
          style={{
            backgroundColor: sublime[0][1].value.rules[0].match(
              /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g
            )[0],
          }}
        >
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
        <Tab.Panels
          className="py-2 border-none rounded-b-md h-[calc(100vh_-138px)] overflow-auto no-scrollbar px-3"
          style={{
            backgroundColor: sublime[0][1].value.rules[0].match(
              /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g
            )[0],
          }}
        >
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx}>
              <button
                className="fixed bottom-6 right-6 z-10 bg-[#1a2734] size-12 rounded-full grid place-items-center hover:scale-110 transition-transform duration-300 ease-in-out outline-none"
                onClick={() => handleCopyCode(posts.text)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21.452"
                  viewBox="0 0 20 21.452"
                  fill="#fff"
                >
                  <g
                    id="Group_1"
                    data-name="Group 1"
                    transform="translate(-829 -511)"
                  >
                    <path
                      id="Path_1"
                      data-name="Path 1"
                      d="M20.571,35H9.714A1.707,1.707,0,0,0,8,36.714V47.6A1.722,1.722,0,0,0,9.714,49.31H20.6A1.722,1.722,0,0,0,22.31,47.6V36.714A1.743,1.743,0,0,0,20.571,35Zm.286,12.571a.264.264,0,0,1-.262.262H9.714a.264.264,0,0,1-.262-.262V36.714a.264.264,0,0,1,.262-.262H20.6a.264.264,0,0,1,.262.262Z"
                      transform="translate(821 483.143)"
                    />
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M44.571,5H33.714A1.707,1.707,0,0,0,32,6.714v4h1.429v-4a.264.264,0,0,1,.262-.262H44.571a.264.264,0,0,1,.262.262V17.6a.264.264,0,0,1-.262.262H42v1.429h2.571a1.722,1.722,0,0,0,1.714-1.714V6.714A1.707,1.707,0,0,0,44.571,5Z"
                      transform="translate(802.714 506)"
                    />
                  </g>
                </svg>
              </button>
              <CodeMirror
                value={posts.text}
                height="auto"
                theme={sublime}
                editable={false}
                extensions={[posts.language]}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CodeBlock;
