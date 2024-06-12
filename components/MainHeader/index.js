import React, { useEffect, useState } from "react";
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
import style from "./MainHeader.module.scss";

const MainHeader = ({ saveProgress, setSaveProgress }) => {
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

  return (
    <>
      <header className="main-header fixed py-3 w-full h-20 flex items-center bg-white border-b border-b-[#ededed] z-10">
        <Container className="xxxl:max-w-[1600px] max-w-[1400px]">
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
              <div className="px-4 text-[#ababab] flex items-center gap-2">
                {saveProgress === "save_progress" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      className={style.save_changes_info}
                    >
                      <g
                        id="Group_2"
                        data-name="Group 2"
                        transform="translate(-5.859 -958.222)"
                      >
                        <path
                          id="Path_11"
                          data-name="Path 11"
                          d="M13.857,958.222a8,8,0,0,0-8,8,.544.544,0,1,0,1.087,0,6.908,6.908,0,0,1,12.392-4.2H17.091a.544.544,0,1,0,0,1.087h3.427a.544.544,0,0,0,.544-.544v-3.427a.544.544,0,1,0-1.087,0v1.931a8,8,0,0,0-6.117-2.843ZM21.3,965.67a.544.544,0,0,0-.532.549,6.912,6.912,0,0,1-12.4,4.208h2.254a.544.544,0,1,0,0-1.087H7.145a.544.544,0,0,0-.493.544v3.426a.544.544,0,1,0,1.087,0v-1.937a8,8,0,0,0,14.12-5.154.544.544,0,0,0-.555-.549Z"
                          transform="translate(0 0)"
                          fill="#ababab"
                        />
                      </g>
                    </svg>
                    <span>Saving changes</span>
                  </>
                ) : saveProgress === "save_completed" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g
                        id="Group_2"
                        data-name="Group 2"
                        transform="translate(-5.859 -958.222)"
                      >
                        <path
                          id="Path_11"
                          data-name="Path 11"
                          d="M13.857,958.222a8,8,0,0,0-8,8,.544.544,0,1,0,1.087,0,6.908,6.908,0,0,1,12.392-4.2H17.091a.544.544,0,1,0,0,1.087h3.427a.544.544,0,0,0,.544-.544v-3.427a.544.544,0,1,0-1.087,0v1.931a8,8,0,0,0-6.117-2.843ZM21.3,965.67a.544.544,0,0,0-.532.549,6.912,6.912,0,0,1-12.4,4.208h2.254a.544.544,0,1,0,0-1.087H7.145a.544.544,0,0,0-.493.544v3.426a.544.544,0,1,0,1.087,0v-1.937a8,8,0,0,0,14.12-5.154.544.544,0,0,0-.555-.549Z"
                          transform="translate(0 0)"
                          fill="#ababab"
                        />
                      </g>
                    </svg>
                    <span>Changes saved</span>
                  </>
                ) : saveProgress === "no_changes" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g
                        id="Group_2"
                        data-name="Group 2"
                        transform="translate(-5.859 -958.222)"
                      >
                        <path
                          id="Path_11"
                          data-name="Path 11"
                          d="M13.857,958.222a8,8,0,0,0-8,8,.544.544,0,1,0,1.087,0,6.908,6.908,0,0,1,12.392-4.2H17.091a.544.544,0,1,0,0,1.087h3.427a.544.544,0,0,0,.544-.544v-3.427a.544.544,0,1,0-1.087,0v1.931a8,8,0,0,0-6.117-2.843ZM21.3,965.67a.544.544,0,0,0-.532.549,6.912,6.912,0,0,1-12.4,4.208h2.254a.544.544,0,1,0,0-1.087H7.145a.544.544,0,0,0-.493.544v3.426a.544.544,0,1,0,1.087,0v-1.937a8,8,0,0,0,14.12-5.154.544.544,0,0,0-.555-.549Z"
                          transform="translate(0 0)"
                          fill="#ababab"
                        />
                      </g>
                    </svg>
                    <span>No changes to save</span>
                  </>
                ) : saveProgress === "reset_progress" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      className={style.save_changes_info}
                    >
                      <g
                        id="Group_2"
                        data-name="Group 2"
                        transform="translate(-5.859 -958.222)"
                      >
                        <path
                          id="Path_11"
                          data-name="Path 11"
                          d="M13.857,958.222a8,8,0,0,0-8,8,.544.544,0,1,0,1.087,0,6.908,6.908,0,0,1,12.392-4.2H17.091a.544.544,0,1,0,0,1.087h3.427a.544.544,0,0,0,.544-.544v-3.427a.544.544,0,1,0-1.087,0v1.931a8,8,0,0,0-6.117-2.843ZM21.3,965.67a.544.544,0,0,0-.532.549,6.912,6.912,0,0,1-12.4,4.208h2.254a.544.544,0,1,0,0-1.087H7.145a.544.544,0,0,0-.493.544v3.426a.544.544,0,1,0,1.087,0v-1.937a8,8,0,0,0,14.12-5.154.544.544,0,0,0-.555-.549Z"
                          transform="translate(0 0)"
                          fill="#ababab"
                        />
                      </g>
                    </svg>
                    <span>Reset Progress</span>
                  </>
                ) : saveProgress === "reset_completed" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g
                        id="Group_2"
                        data-name="Group 2"
                        transform="translate(-5.859 -958.222)"
                      >
                        <path
                          id="Path_11"
                          data-name="Path 11"
                          d="M13.857,958.222a8,8,0,0,0-8,8,.544.544,0,1,0,1.087,0,6.908,6.908,0,0,1,12.392-4.2H17.091a.544.544,0,1,0,0,1.087h3.427a.544.544,0,0,0,.544-.544v-3.427a.544.544,0,1,0-1.087,0v1.931a8,8,0,0,0-6.117-2.843ZM21.3,965.67a.544.544,0,0,0-.532.549,6.912,6.912,0,0,1-12.4,4.208h2.254a.544.544,0,1,0,0-1.087H7.145a.544.544,0,0,0-.493.544v3.426a.544.544,0,1,0,1.087,0v-1.937a8,8,0,0,0,14.12-5.154.544.544,0,0,0-.555-.549Z"
                          transform="translate(0 0)"
                          fill="#ababab"
                        />
                      </g>
                    </svg>
                    <span>Reset completed</span>
                  </>
                ) : (
                  ""
                )}
              </div>
              <button
                className="bg-black text-white border border-black px-5 py-3 rounded-md flex items-center gap-3"
                onClick={handleExportJSON}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20.53"
                  height="20.5"
                  viewBox="0 0 20.53 20.5"
                >
                  <g id="export" transform="translate(-1.73 -1.75)">
                    <path
                      id="Path_5"
                      data-name="Path 5"
                      d="M16.44,8.9c3.6.31,5.07,2.16,5.07,6.21v.13c0,4.47-1.79,6.26-6.26,6.26H8.74c-4.47,0-6.26-1.79-6.26-6.26v-.13c0-4.02,1.45-5.87,4.99-6.2"
                      fill="none"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      id="Path_6"
                      data-name="Path 6"
                      d="M12,15V3.62"
                      fill="none"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      id="Path_7"
                      data-name="Path 7"
                      d="M15.35,5.85,12,2.5,8.65,5.85"
                      fill="none"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
                Export selection
              </button>
              <button
                className="bg-white text-black border border-black px-5 py-3 rounded-md flex items-center gap-3"
                onClick={openModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20.54"
                  height="21"
                  viewBox="0 0 20.54 21"
                >
                  <g id="import-1" transform="translate(-1.73 -1.25)">
                    <path
                      id="Path_8"
                      data-name="Path 8"
                      d="M15.26,22.25H8.74c-4.91,0-7.01-2.1-7.01-7.01v-.13c0-4.44,1.75-6.58,5.67-6.95a.772.772,0,0,1,.82.68.751.751,0,0,1-.68.82c-3.14.29-4.31,1.77-4.31,5.46v.13c0,4.07,1.44,5.51,5.51,5.51h6.52c4.07,0,5.51-1.44,5.51-5.51v-.13c0-3.71-1.19-5.19-4.39-5.46a.748.748,0,0,1,.13-1.49c3.98.34,5.76,2.49,5.76,6.96v.13C22.271,20.15,20.17,22.25,15.26,22.25Z"
                      fill="#000000"
                    />
                    <path
                      id="Path_9"
                      data-name="Path 9"
                      d="M12,15.63a.755.755,0,0,1-.75-.75V2a.75.75,0,0,1,1.5,0V14.88A.749.749,0,0,1,12,15.63Z"
                      fill="#000000"
                    />
                    <path
                      id="Path_10"
                      data-name="Path 10"
                      d="M12,16.75a.742.742,0,0,1-.53-.22L8.12,13.18a.75.75,0,0,1,1.06-1.06L12,14.94l2.82-2.82a.75.75,0,0,1,1.06,1.06l-3.35,3.35a.742.742,0,0,1-.53.22Z"
                      fill="#000000"
                    />
                  </g>
                </svg>
                Import selection
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
