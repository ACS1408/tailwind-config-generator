import { javascript } from "@codemirror/lang-javascript";
import { sass } from "@codemirror/lang-sass";
import useCodeOutput from "./useCodeOutput";

const useCodeBlock = () => {
  const { tailwindConfig, mainCSS } = useCodeOutput();
  const categories = {
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

  return { categories, handleCopyCode };
};

export default useCodeBlock;
