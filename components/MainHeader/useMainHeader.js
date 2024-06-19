import { boxShadowState } from "@/atoms/boxShadowState";
import { buttonState } from "@/atoms/buttonState";
import { colorState } from "@/atoms/colorState";
import { extendState } from "@/atoms/extendState";
import { fontSizeState } from "@/atoms/fontSizeState";
import { fontWeightState } from "@/atoms/fontWeightState";
import { settingState } from "@/atoms/settingState";
import { spacingState } from "@/atoms/spacingState";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useRecoilState } from "recoil";

const useMainHeader = () => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [spacingData, setSpacingData] = useRecoilState(spacingState);
  const [fontWeightData, setFontWeightData] = useRecoilState(fontWeightState);
  const [fontSizeData, setFontSizeData] = useRecoilState(fontSizeState);
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [buttonData, setButtonData] = useRecoilState(buttonState);
  const [settings, setSettings] = useRecoilState(settingState);
  const [isExtend, setIsExtend] = useRecoilState(extendState);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleExportJSON = () => {
    const optionsData = {
      colors: colorData,
      spacings: spacingData,
      font_weights: fontWeightData,
      font_sizes: fontSizeData,
      box_shadows: boxShadowData,
      buttons: buttonData,
      settings: settings,
      extends: isExtend,
    };
    const jsonData = JSON.stringify(optionsData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "options.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (data) => {
    setColorData(data?.colors);
    setSpacingData(data?.spacings);
    setFontWeightData(data?.font_weights);
    setFontSizeData(data?.font_sizes);
    setBoxShadowData(data?.box_shadows);
    setButtonData(data?.buttons);
    setSettings(data?.settings);
    setIsExtend(data?.extends);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("options");
    if (storedData) {
      const retrievedData = JSON.parse(storedData);
      handleImportJSON(retrievedData);
    }
  }, []);

  // HOTKEY: Import JSON
  useHotkeys("ctrl+i", (e) => {
    e.preventDefault();
    openModal();
  });

  // HOTKEY: Export JSON
  useHotkeys("ctrl+e", (e) => {
    e.preventDefault();
    handleExportJSON();
  });

  // HOTKEY: close popups
  useHotkeys("esc", (e) => {
    e.preventDefault();
    if (isOpen) closeModal();
  });

  return { isOpen, openModal, closeModal, handleExportJSON, handleImportJSON };
};

export default useMainHeader;
