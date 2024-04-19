import { buttonState } from "@/atoms/buttonState";
import CreateButtonModal from "@/components/CreateButtonModal";
import Container from "@/components/utils/Container";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const ButtonsWidget = () => {
  const [buttonData, setButtonData] = useRecoilState(buttonState);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <section className="buttons-widget py-8">
        <Container>
          <div className="flex justify-between mb-6">
            <h2 className="ttl text-3xl font-semibold">Buttons</h2>
            <button
              className="bg-[#21DF4B] px-5 py-2 text-white text-md ms-5"
              onClick={openModal}
            >
              Create new button
            </button>
          </div>
          <div className="flex gap-4">
            {buttonData?.map((button) => {
              return (
                <button
                  key={button?.id}
                  type="button"
                  className="btn capitalize"
                  style={{
                    backgroundColor: button?.bgColor,
                    padding: `${button?.padding?.top}px ${button?.padding?.right}px ${button?.padding?.bottom}px ${button?.padding?.left}px`,
                    color: button?.textColor,
                    borderTop: `${
                      button?.buttonType !== "link"
                        ? `${button?.border.top}px solid ${button?.borderColor}`
                        : ""
                    }`,
                    borderRight: `${
                      button?.buttonType !== "link"
                        ? `${button?.border.right}px solid ${button?.borderColor}`
                        : ""
                    }`,
                    borderBottom: `${
                      button?.buttonType !== "link"
                        ? `${button?.border.bottom}px solid ${button?.borderColor}`
                        : ""
                    }`,
                    borderLeft: `${
                      button?.buttonType !== "link"
                        ? `${button?.border.left}px solid ${button?.borderColor}`
                        : ""
                    }`,
                  }}
                >
                  {button?.name}
                </button>
              );
            })}
          </div>
        </Container>
      </section>
      <CreateButtonModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default ButtonsWidget;
