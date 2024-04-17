"use client";
import ColorBlock from "@/components/ColorBlock";
import Container from "@/components/utils/Container";
import React, { useState } from "react";
import AddColorModal from "@/components/AddColorModal";
import { useRecoilState } from "recoil";
import { colorState } from "@/atoms/colorState";
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
            <div className="flex gap-5">
              <div className="ms-5 flex items-center gap-3">
                <span className="text-lg">
                  {isExtend.colors ? "extend" : "theme"}
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
                    pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <button
                className="bg-[#21DF4B] px-5 py-2 text-white text-md ms-5"
                onClick={openModal}
              >
                Add new color
              </button>
            </div>
          </div>
          <div className="grid gap-7 grid-cols-10">
            {colorData?.map((color, i) => {
              return (
                <ColorBlock
                  key={color.id}
                  id={color?.id}
                  hex={color?.hex}
                  name={color?.name}
                  variants={color?.variants}
                  colorData={colorData}
                  setColorData={setColorData}
                />
              );
            })}
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
