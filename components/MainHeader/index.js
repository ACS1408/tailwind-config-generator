import React, { useState } from "react";
import Container from "../utils/Container";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { colorState } from "@/atoms/colorState";
import { spacingState } from "@/atoms/spacingState";
import { fontWeightState } from "@/atoms/fontWeightState";
import { fontSizeState } from "@/atoms/fontSizeState";
import { boxShadowState } from "@/atoms/boxShadowState";
import { buttonState } from "@/atoms/buttonState";
import { settingState } from "@/atoms/settingState";
import { extendState } from "@/atoms/extendState";
import ImportDataModal from "../ImportDataModal";

const MainHeader = () => {
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
  return (
    <>
      <header className="main-header fixed py-3 w-full h-20 flex items-center bg-white border-b border-b-[#ededed] z-10">
        <Container className="max-w-[1600px]">
          <div className="flex justify-between">
            <Link href="/">
              <figure className="max-w-48">
                <Image
                  src="/logo.svg"
                  alt="ui-variables logo"
                  width={251}
                  height={64}
                />
              </figure>
            </Link>
            <nav className="flex items-center gap-4">
              <button
                className="bg-black text-white px-5 py-2"
                onClick={handleExportJSON}
              >
                Export Data
              </button>
              <button
                className="bg-white text-black border border-black px-5 py-2"
                onClick={openModal}
              >
                Import Data
              </button>
            </nav>
          </div>
        </Container>
      </header>
      <ImportDataModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleImportJSON={handleImportJSON}
      />
    </>
  );
};

export default MainHeader;
