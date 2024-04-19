import { colorState } from "@/atoms/colorState";
import { extendState } from "@/atoms/extendState";
import { variablePrefixState } from "@/atoms/variablePrefixState";
import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { useRecoilState } from "recoil";
import Container from "../utils/Container";
import { spacingState } from "@/atoms/spacingState";
import { pxToRem } from "../utils/pxToRem";
import { fontWeightState } from "@/atoms/fontWeightState";
import { fontSizeState } from "@/atoms/fontSizeState";
import { boxShadowState } from "@/atoms/boxShadowState";
import { hexToRGBA } from "../utils/hexToRgba";
import { Tab } from "@headlessui/react";

const CodeBlock = () => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [spacingData, setSpacingData] = useRecoilState(spacingState);
  const [fontWeightData, setFontWeightData] = useRecoilState(fontWeightState);
  const [fontSizeData, setFontSizeData] = useRecoilState(fontSizeState);
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [variablePrefix, setVariablePrefix] =
    useRecoilState(variablePrefixState);
  const [isExtend, setIsExtend] = useRecoilState(extendState);

  let tailwindConfig = `/** @type {import('tailwindcss').Config} */

const colors = {
  ${colorData
    .map((item) => {
      if (item.variants) {
        return `${item.name}: {
    DEFAULT: "var(--${variablePrefix}${item.name})", \n    ${item?.variants
          ?.map((variant) => {
            return `${variant.variant}: "var(--${variablePrefix}${item.name}-${variant.variant})",\n\t`;
          })
          .join("  ")}},\n`;
      } else {
        return `${item.name}: "var(--${variablePrefix}${item.name})",\n`;
      }
    })
    .join("  ")}};

const spacing = {
  ${spacingData
    .map((item) => {
      return `${
        item?.name
      }: "var(--${variablePrefix}spacing-${item?.name.replace(".", "pt")})",\n`;
    })
    .join("  ")}};
    
const fontWeight = {
  ${fontWeightData
    .map((item) => {
      return `${item?.name}: "var(--${variablePrefix}font-${item?.name})",\n`;
    })
    .join("  ")}};

const fontSize = {
  ${fontSizeData
    .map((item) => {
      return `${item?.name}: "var(--${variablePrefix}text-${item?.name.replace(
        ".",
        "pt"
      )})",\n`;
    })
    .join("  ")}};

const boxShadow = {
  ${boxShadowData
    .map((item) => {
      return `${
        item?.name
      }: "var(--${variablePrefix}shadow-${item?.name.replace(".", "pt")})",\n`;
    })
    .join("  ")}};
    
const container = {
  center: true,
  padding: "calc(var(--gutter-x) / 2)",
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
    screens: {
      xs: { max: "576px" },
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1420px",
      xxxl: "1600px",
      laptop: { min: "1200px", max: "1450px" },
    },
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
        return `--${variablePrefix}${
          item.name
        }: ${item?.hex?.toUpperCase()}; \n  ${item?.variants
          ?.map((variant) => {
            return `--${variablePrefix}${item.name}-${
              variant.variant
            }: ${variant?.color?.toUpperCase()};\n`;
          })
          .join("  ")}`;
      } else {
        return `--${variablePrefix}${
          item.name
        }: ${item?.hex?.toUpperCase()};\n`;
      }
    })
    .join("  ")}
  ${spacingData
    .map((item) => {
      return `--${variablePrefix}spacing-${item.name.replace(
        ".",
        "pt"
      )}: ${pxToRem(item?.size)}rem;\n`;
    })
    .join("  ")}
  ${fontWeightData
    .map((item) => {
      return `--${variablePrefix}font-${item.name}: ${item.value};\n`;
    })
    .join("  ")}
  ${fontSizeData
    .map((item) => {
      return `--${variablePrefix}text-${item.name.replace(
        ".",
        "pt"
      )}: ${pxToRem(item?.size)}rem;\n`;
    })
    .join("  ")}
  ${boxShadowData
    .map((item) => {
      return `--${variablePrefix}shadow-${item.name.replace(
        ".",
        "pt"
      )}: ${item.value
        .map((item) => {
          return `${item?.horizontal}px ${item?.vertical}px ${item?.blur}px ${
            item?.spread
          }px ${hexToRGBA(item?.color, item.alpha)};`;
        })
        .join(", \n")}\n`;
    })
    .join("  ")}
  --gutter-x: 24px;
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
    <section className="code-block py-8">
      <Container>
        <h2 className="ttl text-3xl font-semibold mb-6">Output</h2>
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
          <Tab.Panels className="py-4 bg-[#282a36] rounded-b-md">
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
      </Container>
    </section>
  );
};

export default CodeBlock;
