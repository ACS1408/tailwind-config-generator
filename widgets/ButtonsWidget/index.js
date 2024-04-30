import { buttonState } from "@/atoms/buttonState";
import ButtonBlock from "@/components/ButtonBlock";
import CreateButtonModal from "@/components/CreateButtonModal";
import Container from "@/components/utils/Container";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const ButtonsWidget = () => {
  const [buttonData, setButtonData] = useRecoilState(buttonState);
  const [isCreateButtonModalOpen, setIsCreateButtonModalOpen] = useState(false);

  const closeCreateButtonModal = () => {
    setIsCreateButtonModalOpen(false);
  };

  const openCreateButtonModal = () => {
    setIsCreateButtonModalOpen(true);
  };

  return (
    <>
      <section className="buttons-widget py-8">
        <Container>
          <div className="flex justify-between mb-6">
            <h2 className="ttl text-3xl font-semibold">Buttons</h2>
            <button
              className="flex items-center gap-2 text-md ms-5"
              onClick={openCreateButtonModal}
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
              <span className="text-lg text-black">Add new</span>
            </button>
          </div>
          <div className="flex gap-4">
            {buttonData?.map((button) => {
              return <ButtonBlock key={button?.id} button={button} />;
            })}
          </div>
        </Container>
      </section>
      <CreateButtonModal
        isCreateButtonModalOpen={isCreateButtonModalOpen}
        closeCreateButtonModal={closeCreateButtonModal}
      />
    </>
  );
};

export default ButtonsWidget;
