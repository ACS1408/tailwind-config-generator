import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { pxToRem } from "../utils/pxToRem";
import { fontSizeState } from "@/atoms/fontSizeState";
import EditFontSizeModal from "../EditFontSizeModal";
import ViewFontSizeModal from "../ViewFontSizeModal";

const FontSizeBlock = ({ id, name, size }) => {
  const [fontSizeData, setFontSizeData] = useRecoilState(fontSizeState);
  const [isEditFontSizeModalOpen, setIsEditFontSizeModalOpen] = useState(false);
  const [isViewFontSizeModalOpen, setIsViewFontSizeModalOpen] = useState(false);

  const closeEditFontSizeModal = () => {
    setIsEditFontSizeModalOpen(false);
  };

  const openEditFontSizeModal = () => {
    setIsEditFontSizeModalOpen(true);
  };

  const openViewFontSizeModal = () => {
    setIsViewFontSizeModalOpen(true);
  };
  const closeViewFontSizeModal = () => {
    setIsViewFontSizeModalOpen(false);
  };

  const handleRemove = (id) => {
    setFontSizeData(fontSizeData.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="col-span-1 py-1 text-md">{name}</div>
      <div className="col-span-1 py-1 px-4 text-md">{pxToRem(size)}rem</div>
      <div className="col-span-1 py-1 px-4 text-md">{size}px</div>
      <div className="col-span-7 py-1 px-4 text-md">
        <div
          className="h-4 bg-[#21df4b] rounded-sm"
          style={{ width: `${pxToRem(size)}rem` }}
        />
      </div>
      <div className="col-span-2 py-1 ps-4 text-md flex gap-2 justify-end">
        <button
          className="bg-black text-white px-3 py-0.5 text-sm"
          onClick={openViewFontSizeModal}
        >
          View
        </button>
        <button
          className="bg-black text-white px-3 py-0.5 text-sm"
          onClick={openEditFontSizeModal}
        >
          Edit
        </button>
        <button
          className="border border-black text-black px-3 py-0.5 text-sm"
          onClick={() => handleRemove(id)}
        >
          Remove
        </button>
      </div>
      <ViewFontSizeModal
        id={id}
        name={name}
        size={size}
        isOpen={isViewFontSizeModalOpen}
        closeModal={closeViewFontSizeModal}
      />
      <EditFontSizeModal
        id={id}
        name={name}
        size={size}
        isOpen={isEditFontSizeModalOpen}
        closeModal={closeEditFontSizeModal}
      />
    </>
  );
};

export default FontSizeBlock;
