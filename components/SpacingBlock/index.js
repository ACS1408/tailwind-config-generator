import { spacingState } from "@/atoms/spacingState";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { pxToRem } from "../utils/pxToRem";
import EditSpacingModal from "../EditSpacingModal";

const SpacingBlock = ({ id, name, size }) => {
  const [spacingData, setSpacingData] = useRecoilState(spacingState);
  const [isEditSpacingModalOpen, setIsEditSpacingModalOpen] = useState(false);

  const closeEditSpacingModal = () => {
    setIsEditSpacingModalOpen(false);
  };

  const openEditSpacingModal = () => {
    setIsEditSpacingModalOpen(true);
  };

  const handleRemove = (id) => {
    setSpacingData(spacingData.filter((item) => item.id !== id));
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
          onClick={openEditSpacingModal}
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
      <EditSpacingModal
        id={id}
        name={name}
        size={size}
        isOpen={isEditSpacingModalOpen}
        closeModal={closeEditSpacingModal}
      />
    </>
  );
};

export default SpacingBlock;
