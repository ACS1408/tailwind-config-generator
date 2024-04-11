import { extendState } from "@/atoms/extendState";
import { spacingState } from "@/atoms/spacingState";
import AddSpacingModal from "@/components/AddSpacingModal";
import SpacingBlock from "@/components/SpacingBlock";
import Container from "@/components/utils/Container";
import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const SpacingWidget = () => {
  const [spacingData, setSpacingData] = useRecoilState(spacingState);
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
          <h2 className="title text-3xl font-semibold">Spacing</h2>
          <div className="flex gap-5">
            <div className="ms-5 flex items-center gap-3">
              <span className="text-lg">
                {isExtend.spacing ? "extend" : "theme"}
              </span>
              <Switch
                checked={isExtend.spacing}
                onChange={() =>
                  setIsExtend((prev) => ({ ...prev, spacing: !prev.spacing }))
                }
                className={`${
                  isExtend.spacing ? "bg-[#21DF4B]" : "bg-[#6d7c71]"
                }
                relative inline-flex h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    isExtend.spacing ? "translate-x-[26px]" : "translate-x-0"
                  }
                  pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <button
              className="bg-[#21DF4B] px-5 py-2 text-white text-md ms-5"
              onClick={openModal}
            >
              Add new spacing
            </button>
          </div>
        </div>
        <div className="spacing-block grid grid-cols-12 items-center">
          <div className="col-span-1 py-2 font-bold text-md">Name</div>
          <div className="col-span-1 py-2 px-4 font-bold text-md">Size</div>
          <div className="col-span-1 py-2 px-4 font-bold text-md">Pixels</div>
          <div className="col-span-7 py-2 px-4 font-bold text-md"></div>
          <div className="col-span-2 py-2 px-4 font-bold text-md"></div>
          {spacingData?.map((spacing, i) => {
            return (
              <SpacingBlock
                id={spacing?.id}
                name={spacing?.name}
                size={spacing?.size}
                key={spacing?.id}
              />
            );
          })}
        </div>
      </Container>
      <AddSpacingModal isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
};

export default SpacingWidget;
