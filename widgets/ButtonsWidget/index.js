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
              className="bg-[#21DF4B] px-5 py-2 text-white text-md ms-5"
              onClick={openCreateButtonModal}
            >
              Create new button
            </button>
          </div>
          <div className="flex gap-4">
            {buttonData?.map((button) => {
              return (
                <ButtonBlock key={button?.id} button={button} />
              );
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
