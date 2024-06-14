import { boxShadowState } from "@/atoms/boxShadowState";
import { buttonState } from "@/atoms/buttonState";
import { colorState } from "@/atoms/colorState";
import { extendState } from "@/atoms/extendState";
import { fontSizeState } from "@/atoms/fontSizeState";
import { fontWeightState } from "@/atoms/fontWeightState";
import { settingState } from "@/atoms/settingState";
import { spacingState } from "@/atoms/spacingState";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const useFloatingMenuBar = ({ saveProgress, setSaveProgress }) => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [spacingData, setSpacingData] = useRecoilState(spacingState);
  const [fontWeightData, setFontWeightData] = useRecoilState(fontWeightState);
  const [fontSizeData, setFontSizeData] = useRecoilState(fontSizeState);
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [buttonData, setButtonData] = useRecoilState(buttonState);
  const [settings, setSettings] = useRecoilState(settingState);
  const [isExtend, setIsExtend] = useRecoilState(extendState);

  const [defaultColorData, setDefaultColorData] = useState(colorData);
  const [defaultSpacingData, setDefaultSpacingData] = useState(spacingData);
  const [defaultFontWeightData, setDefaultFontWeightData] =
    useState(fontWeightData);
  const [defaultFontSizeData, setDefaultFontSizeData] = useState(fontSizeData);
  const [defaultBoxShadowData, setDefaultBoxShadowData] =
    useState(boxShadowData);
  const [defaultButtonData, setDefaultButtonData] = useState(buttonData);
  const [defaultSettings, setDefaultSettings] = useState(settings);
  const [defaultIsExtend, setDefaultIsExtend] = useState(isExtend);

  const [isOpen, setIsOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };
  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const handleRevertStatus = () => {
    setTimeout(() => {
      setSaveProgress("");
    }, 3000);
  };
  const handleSaveCompleted = (data) => {
    setSaveProgress("save_progress");
    localStorage.setItem("options", data);
    setTimeout(() => {
      setSaveProgress("save_completed");
      handleRevertStatus();
    }, 500);
  };
  const handleNoSaveCompleted = () => {
    setSaveProgress("save_progress");
    setTimeout(() => {
      setSaveProgress("no_changes");
      handleRevertStatus();
    }, 500);
  };

  const handleSaveData = () => {
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
    const localJson = localStorage.getItem("options");

    if (localJson !== null) {
      if (jsonData === localJson) {
        handleNoSaveCompleted();
      } else {
        handleSaveCompleted(jsonData);
      }
    } else {
      handleSaveCompleted(jsonData);
    }
  };

  const handleResetLocal = () => {
    setSaveProgress("reset_progress");
    const localJson = localStorage.getItem("options");
    if (localJson !== "") {
      localStorage.setItem("options", "");
      setColorData(defaultColorData);
      setSpacingData(defaultSpacingData);
      setFontWeightData(defaultFontWeightData);
      setFontSizeData(defaultFontSizeData);
      setBoxShadowData(defaultBoxShadowData);
      setButtonData(defaultButtonData);
      setSettings(defaultSettings);
      setIsExtend(defaultIsExtend);
      setTimeout(() => {
        setSaveProgress("reset_completed");
        handleRevertStatus();
      }, 500);
    } else {
      setTimeout(() => {
        setSaveProgress("no_reset");
        handleRevertStatus();
      }, 500);
    }
  };

  // !FIXME: (UI_VAR_FIXME_001) This function is for triggering manual actions using keyboard shortcuts.
  // const handleKeyPress = (e) => {
  //   if (e.ctrlKey && e.key === "s") {
  //     e.preventDefault();
  //     handleSaveData();
  //   }
  // };

  useEffect(() => {
    settings?.autosave ? handleSaveData() : "";
  }, [
    colorData,
    spacingData,
    fontWeightData,
    fontSizeData,
    boxShadowData,
    buttonData,
    settings,
    isExtend,
  ]);

  return {
    handleSaveData,
    handleResetLocal,
    // handleKeyPress, // !FIXME: (UI_VAR_FIXME_001) Exported the function for use.
    isOpen,
    isOffcanvasOpen,
    openModal,
    closeModal,
    openOffcanvas,
    closeOffcanvas,
  };
};

export default useFloatingMenuBar;
