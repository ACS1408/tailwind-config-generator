import { extendState } from "@/atoms/extendState";
import { fontWeightState } from "@/atoms/fontWeightState";
import AddFontWeightModal from "@/components/AddFontWeightModal";
import FontWeightBlock from "@/components/FontWeightBlock";
import Container from "@/components/utils/Container";
import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const FontWeightWidget = () => {
  const [fontWeightData, setFontWeightData] = useRecoilState(fontWeightState);
  const [isExtend, setIsExtend] = useRecoilState(extendState);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <section className="spacing-widget py-8">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <h2 className="title text-3xl font-semibold">Font Weight</h2>
          <div className="flex gap-5">
            <div className="ms-5 flex items-center gap-3">
              <span className="text-lg">
                {isExtend.font_weight ? "extend" : "theme"}
              </span>
              <Switch
                checked={isExtend.font_weight}
                onChange={() =>
                  setIsExtend((prev) => ({
                    ...prev,
                    font_weight: !prev.font_weight,
                  }))
                }
                className={`${
                  isExtend.font_weight ? "bg-[#21DF4B]" : "bg-[#6d7c71]"
                }
                relative inline-flex h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-[transparent] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    isExtend.font_weight
                      ? "translate-x-[26px]"
                      : "translate-x-0"
                  }
                  pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <button
              className="bg-[#21DF4B] px-5 py-2 text-white text-md ms-5"
              onClick={openModal}
            >
              Add new font weight
            </button>
          </div>
        </div>
        <div className="spacing-block grid grid-cols-7 gap-4">
          {fontWeightData?.map((weight, i) => {
            return (
              <FontWeightBlock
                id={weight?.id}
                name={weight?.name}
                value={weight?.value}
                key={weight?.id}
              />
            );
          })}
        </div>
      </Container>
      <AddFontWeightModal isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
};

export default FontWeightWidget;
