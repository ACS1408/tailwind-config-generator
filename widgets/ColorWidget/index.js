"use client";
import ColorBlock from "@/components/ColorBlock";
import Container from "@/components/utils/Container";
import React, { useState } from "react";
import AddColorModal from "@/components/AddColorModal";
import { useRecoilState } from "recoil";
import { colorState } from "@/atoms/colorState";
import { Switch } from "@headlessui/react";
import { extendState } from "@/atoms/extendState";
import NoDataPlaceholder from "@/components/NoDataPlaceholder";

const ColorWidget = () => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [isExtend, setIsExtend] = useRecoilState(extendState);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <section className="color-widget py-8 pt-12">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h2 className="ttl text-3xl font-semibold">Color tones</h2>
            <div className="flex gap-5">
              <div className="ms-5 flex items-center gap-3">
                <span className="text-lg">
                  {isExtend.colors ? "Extend" : "Theme"}
                </span>
                <Switch
                  checked={isExtend.colors}
                  onChange={() =>
                    setIsExtend((prev) => ({ ...prev, colors: !prev.colors }))
                  }
                  className={`${
                    isExtend.colors ? "bg-[#21DF4B]" : "bg-[#6d7c71]"
                  }
                  relative inline-flex h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-[transparent] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      isExtend.colors ? "translate-x-[26px]" : "translate-x-0"
                    }
                    pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <button
                className="flex items-center gap-2 text-md ms-5"
                onClick={openModal}
              >
                <div className="rounded-full bg-[#21DF4B] text-white p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="plus"
                    width={28}
                    height={28}
                  >
                    <g>
                      <g>
                        <rect
                          width="24"
                          height="24"
                          opacity="0"
                          transform="rotate(180 12 12)"
                        />
                        <path
                          d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="text-lg text-black font-semibold">Add new</span>
              </button>
            </div>
          </div>
          {colorData?.length > 0 ? (
            <>
              <div className="grid gap-6 grid-cols-6">
                {colorData?.map((color, i) => {
                  return (
                    <ColorBlock
                      key={color.id}
                      id={color?.id}
                      hex={color?.hex}
                      name={color?.name}
                      variants={color?.variants}
                      darkThemeHex={color?.dark_theme_hex}
                      colorData={colorData}
                      setColorData={setColorData}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <NoDataPlaceholder />
          )}
        </Container>
      </section>
      <AddColorModal
        isOpen={isOpen}
        closeModal={closeModal}
        colorData={colorData}
        setColorData={setColorData}
        defaultColor={"#000000"}
        defaultName={""}
      />
    </>
  );
};

export default ColorWidget;
