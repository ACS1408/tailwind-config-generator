import { extendState } from "@/atoms/extendState";
import { fontWeightState } from "@/atoms/fontWeightState";
import AddFontWeightModal from "@/components/AddFontWeightModal";
import FontWeightBlock from "@/components/FontWeightBlock";
import NoDataPlaceholder from "@/components/NoDataPlaceholder";
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
          <h2 className="ttl text-3xl font-semibold">Font Weights</h2>
          <div className="flex gap-5">
            <div className="ms-5 flex items-center gap-3">
              <span className="text-lg">
                {isExtend.font_weight ? "Extend" : "Theme"}
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
        {fontWeightData?.length > 0 ? (
          <>
            <div className="spacing-block flex flex-wrap -mx-[6px] gap-y-3">
              {fontWeightData?.map((weight, i) => {
                return (
                  <div
                    className="flex-[0_0_15%] max-w-[15%] px-[6px]"
                    key={weight?.id}
                  >
                    <FontWeightBlock
                      id={weight?.id}
                      name={weight?.name}
                      value={weight?.value}
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <NoDataPlaceholder />
        )}
      </Container>
      <AddFontWeightModal isOpen={isOpen} closeModal={closeModal} />
    </section>
  );
};

export default FontWeightWidget;
