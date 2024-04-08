"use client";
import ColorBlock from "@/components/ColorBlock";
import Container from "@/components/utils/Container";
import React, { useState } from "react";
import AddColorModal from "@/components/AddColorModal";

const ColorWidget = ({ variablePrefix }) => {
  const [colorData, setColorData] = useState(colors);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <section className="color-widget py-16 ">
        <Container>
          <h2 className="title text-3xl font-semibold mb-6">Colors</h2>
          <div className="grid gap-7 grid-cols-10">
            {colorData?.map((color, i) => {
              return (
                <div key={i}>
                  <ColorBlock
                    hex={color?.hex}
                    name={color?.name}
                    variants={color?.variants}
                    variablePrefix={variablePrefix}
                    colorData={colorData}
                    setColorData={setColorData}
                  />
                </div>
              );
            })}
            <div>
              <div
                className="w-full h-full bg-[#21DF4B] rounded-lg grid place-items-center"
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

const colors = [
  {
    name: "primary",
    hex: "#FF0000",
  },
  {
    name: "secondary",
    hex: "#00F0FF",
  },
  {
    name: "black",
    hex: "#000000",
    variants: [
      {
        variant: "900",
        color: "#313131",
        checked: true,
      },
      {
        variant: "800",
        color: "#616161",
        checked: true,
      },
      {
        variant: "700",
        color: "#919191",
        checked: true,
      },
    ],
  },
  {
    name: "dark",
    hex: "#263251",
  },
];
