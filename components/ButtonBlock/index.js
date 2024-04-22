import React, { useState } from "react";
import EditButtonModal from "../EditButtonModal";

const ButtonBlock = ({ button }) => {
  const [isEditButtonModalOpen, setIsEditButtonModalOpen] = useState(false);

  const closeEditButtonModal = () => {
    setIsEditButtonModalOpen(false);
  };

  const openEditButtonModal = () => {
    setIsEditButtonModalOpen(true);
  };
  return (
    <>
      <button
        key={button?.id}
        type="button"
        className="btn capitalize"
        onClick={openEditButtonModal}
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
      <EditButtonModal
        isEditButtonModalOpen={isEditButtonModalOpen}
        closeEditButtonModal={closeEditButtonModal}
        id={button?.id}
        buttonName={button?.name}
        buttonType={button?.buttonType}
        bgHex={button?.bgColor}
        borderHex={button?.borderColor}
        textHex={button?.textColor}
        buttonPaddingTop={button?.padding?.top}
        buttonPaddingBottom={button?.padding?.bottom}
        buttonPaddingLeft={button?.padding?.left}
        buttonPaddingRight={button?.padding?.right}
        buttonBorderTop={button?.border?.top}
        buttonBorderBottom={button?.border?.bottom}
        buttonBorderLeft={button?.border?.left}
        buttonBorderRight={button?.border?.right}
      />
    </>
  );
};

export default ButtonBlock;
