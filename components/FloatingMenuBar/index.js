import SettingsWidget from "@/widgets/SettingsWidget";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import OffCanvas from "../OffCanvas";
import { useRecoilState } from "recoil";
import { colorState } from "@/atoms/colorState";
import { spacingState } from "@/atoms/spacingState";
import { fontWeightState } from "@/atoms/fontWeightState";
import { fontSizeState } from "@/atoms/fontSizeState";
import { boxShadowState } from "@/atoms/boxShadowState";
import { buttonState } from "@/atoms/buttonState";
import { settingState } from "@/atoms/settingState";
import { extendState } from "@/atoms/extendState";

const FloatingMenuBar = ({ saveProgress, setSaveProgress }) => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [spacingData, setSpacingData] = useRecoilState(spacingState);
  const [fontWeightData, setFontWeightData] = useRecoilState(fontWeightState);
  const [fontSizeData, setFontSizeData] = useRecoilState(fontSizeState);
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [buttonData, setButtonData] = useRecoilState(buttonState);
  const [settings, setSettings] = useRecoilState(settingState);
  const [isExtend, setIsExtend] = useRecoilState(extendState);

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

  const handleSaveData = () => {
    setSaveProgress("progress");
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
    localStorage.setItem("options", jsonData);
    setTimeout(() => {
      setSaveProgress("completed");
      setTimeout(() => {
        setSaveProgress("");
      }, 5000);
    }, 1000);
  };

  useEffect(() => {
    console.log("save");
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

  return (
    <div className="floating-menu-bar-wrap fixed bottom-5 left-0 w-full flex justify-center pointer-events-none">
      <div className="floating-menu-bar bg-white rounded-md p-3 border border-[#ededed] flex gap-4 items-center pointer-events-auto">
        <button
          className="btn-generate-code bg-black border border-black text-white h-12 px-6 py-2 rounded-md flex items-center gap-3"
          onClick={openOffcanvas}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18.821"
            viewBox="0 0 20 18.821"
          >
            <path
              id="Path_12"
              data-name="Path 12"
              d="M8.629,1.57l-1.386.518a.282.282,0,0,0,0,.529l1.386.518.518,1.386a.282.282,0,0,0,.529,0l.518-1.386,1.386-.518a.283.283,0,0,0,0-.529L10.195,1.57,9.676.184a.282.282,0,0,0-.529,0ZM1.695,14.537a1.769,1.769,0,0,0,0,2.5l1.272,1.272a1.768,1.768,0,0,0,2.5,0L19.482,4.283a1.769,1.769,0,0,0,0-2.5L18.21.518a1.769,1.769,0,0,0-2.5,0Zm16.121-11.5L13.956,6.9,13.1,6.04l3.86-3.86.857.857ZM.276,4.309a.424.424,0,0,0,0,.794l2.077.779L3.132,7.96a.424.424,0,0,0,.794,0l.779-2.077L6.783,5.1a.424.424,0,0,0,0-.794L4.706,3.529,3.926,1.452a.424.424,0,0,0-.794,0L2.353,3.529Zm12.941,9.412a.424.424,0,0,0,0,.794l2.077.779.779,2.077a.424.424,0,0,0,.794,0l.779-2.077,2.077-.779a.424.424,0,0,0,0-.794l-2.077-.779-.779-2.077a.424.424,0,0,0-.794,0l-.779,2.077Z"
              fill="#ffffff"
            />
          </svg>
          Generate Code
        </button>
        <button className="btn-save-changes" onClick={handleSaveData}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
          >
            <path
              id="Path_1"
              data-name="Path 1"
              d="M3,6.571A3.571,3.571,0,0,1,6.571,3H21.533a3.572,3.572,0,0,1,2.525,1.046l2.9,2.9A3.571,3.571,0,0,1,28,9.467V24.429A3.571,3.571,0,0,1,24.429,28H6.571A3.571,3.571,0,0,1,3,24.429ZM6.571,4.786A1.786,1.786,0,0,0,4.786,6.571V24.429a1.786,1.786,0,0,0,1.786,1.786V18.179A2.679,2.679,0,0,1,9.25,15.5h12.5a2.679,2.679,0,0,1,2.679,2.679v8.036a1.786,1.786,0,0,0,1.786-1.786V9.467A1.786,1.786,0,0,0,25.691,8.2l-2.9-2.9a1.786,1.786,0,0,0-1.263-.523h-.676V9.25a2.679,2.679,0,0,1-2.679,2.679H11.036A2.679,2.679,0,0,1,8.357,9.25V4.786Zm3.571,0V9.25a.893.893,0,0,0,.893.893h7.143a.893.893,0,0,0,.893-.893V4.786Zm12.5,21.429V18.179a.893.893,0,0,0-.893-.893H9.25a.893.893,0,0,0-.893.893v8.036Z"
              transform="translate(-3 -3)"
              fill="#212121"
            />
          </svg>
        </button>
        <button className="btn-settings" onClick={openModal}>
          <svg
            id="Group_1"
            data-name="Group 1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path
              id="Path_2"
              data-name="Path 2"
              d="M27,16.76V15.23l1.92-1.68A2,2,0,0,0,29.3,11L26.94,7a2.018,2.018,0,0,0-2.37-.9l-2.43.82a11.35,11.35,0,0,0-1.31-.75l-.51-2.52a2,2,0,0,0-2-1.61H13.64a2,2,0,0,0-2,1.61l-.51,2.52a11.48,11.48,0,0,0-1.32.75L7.43,6.06A2,2,0,0,0,6.79,6,2,2,0,0,0,5.06,7L2.7,11a2,2,0,0,0,.41,2.51L5,15.24v1.53L3.11,18.45A2,2,0,0,0,2.7,21l2.36,4a2.018,2.018,0,0,0,2.37.9l2.43-.82a11.35,11.35,0,0,0,1.31.75l.51,2.52a2,2,0,0,0,2,1.61H18.4a2,2,0,0,0,2-1.61l.51-2.52a11.48,11.48,0,0,0,1.32-.75l2.42.82a2.018,2.018,0,0,0,2.37-.9l2.28-4a2,2,0,0,0-.41-2.51ZM25.21,24l-3.43-1.16a8.86,8.86,0,0,1-2.71,1.57L18.36,28H13.64l-.71-3.55a9.36,9.36,0,0,1-2.7-1.57L6.79,24,4.43,20l2.72-2.4a8.9,8.9,0,0,1,0-3.13L4.43,12,6.79,8l3.43,1.16a8.86,8.86,0,0,1,2.71-1.57L13.64,4h4.72l.71,3.55a9.36,9.36,0,0,1,2.7,1.57L25.21,8l2.36,4-2.72,2.4a8.9,8.9,0,0,1,0,3.13L27.57,20Z"
              transform="translate(0 0)"
            />
            <path
              id="Path_3"
              data-name="Path 3"
              d="M16,22a6,6,0,1,1,6-6,5.94,5.94,0,0,1-6,6Zm0-10a3.91,3.91,0,0,0-4,4,3.91,3.91,0,0,0,4,4,3.91,3.91,0,0,0,4-4,3.91,3.91,0,0,0-4-4Z"
              transform="translate(0 0)"
            />
            <path
              id="Path_4"
              data-name="Path 4"
              d="M0,0H32V32H0Z"
              fill="none"
            />
          </svg>
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => false && closeModal()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#00000090]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle transition-all relative">
                  <button
                    className="size-7 flex justify-center items-center absolute top-3 right-3"
                    onClick={closeModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="close"
                      width={24}
                      height={24}
                    >
                      <g>
                        <path d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                      </g>
                    </svg>
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="ttl text-2xl mb-5 font-medium leading-6 text-gray-900"
                  >
                    Settings
                  </Dialog.Title>
                  <SettingsWidget />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <OffCanvas
        isOffcanvasOpen={isOffcanvasOpen}
        closeOffcanvas={closeOffcanvas}
      />
    </div>
  );
};

export default FloatingMenuBar;
