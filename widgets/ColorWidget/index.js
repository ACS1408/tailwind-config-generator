"use client";
import ColorBlock from "@/components/ColorBlock";
import Container from "@/components/utils/Container";
import React, { useState } from "react";
import AddColorModal from "@/components/AddColorModal";
import { useRecoilState } from "recoil";
import { colorState } from "@/atoms/colorState";
import CodeBlock from "@/components/CodeBlock";
import { Switch } from "@headlessui/react";
import { extendState } from "@/atoms/extendState";

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
      <section className="color-widget py-8">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h2 className="title text-3xl font-semibold">Colors</h2>
            <div className="ms-5 flex items-center gap-3">
              <span className="text-lg">
                {isExtend.colors ? "extend" : "theme"}
              </span>
              <Switch
                checked={isExtend.colors}
                onChange={() =>
                  setIsExtend((prev) => ({ ...prev, colors: !prev.colors }))
                }
                className={`${isExtend.colors ? "bg-[#21DF4B]" : "bg-[#6d7c71]"}
              relative inline-flex h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    isExtend.colors ? "translate-x-[26px]" : "translate-x-0"
                  }
                pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
          <div className="grid gap-7 grid-cols-10">
            {colorData?.map((color, i) => {
              return (
                <div key={i}>
                  <ColorBlock
                    hex={color?.hex}
                    name={color?.name}
                    variants={color?.variants}
                    colorData={colorData}
                    setColorData={setColorData}
                  />
                </div>
              );
            })}
            <div>
              <div
                className="w-full h-full bg-[#21DF4B] rounded-lg grid place-items-center py-14"
                onClick={openModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="50px"
                  height="50px"
                >
                  <path
                    d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <CodeBlock />
          </div>
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
