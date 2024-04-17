import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { fontWeightState } from "@/atoms/fontWeightState";
import EditFontWeightModal from "../EditFontWeightModal";

const FontWeightBlock = ({ id, name, value }) => {
  const [fontWeightData, setFontWeightData] = useRecoilState(fontWeightState);
  const [isEditFontWeightModalOpen, setIsEditFontWeightModalOpen] =
    useState(false);

  const closeEditFontWeightModal = () => {
    setIsEditFontWeightModalOpen(false);
  };

  const openEditFontWeightModal = () => {
    setIsEditFontWeightModalOpen(true);
  };

  const handleRemove = (id) => {
    setFontWeightData(fontWeightData.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="font-weight-block rounded-md border border-[#ededed] p-6">
        <div className="text-sm mb-4 text-center">.font-{name}</div>
        <div className="text-5xl text-center" style={{ fontWeight: value }}>
          {value}
        </div>
        <div className="text-md mt-2 mb-4 text-center">{name}</div>
        <div className="flex flex-col gap-2">
          <button
            className="bg-black text-white px-3 py-1 text-sm w-full"
            onClick={openEditFontWeightModal}
          >
            Edit
          </button>
          <button
            className="border border-black text-black px-3 py-1 text-sm w-full"
            onClick={() => handleRemove(id)}
          >
            Remove
          </button>
        </div>
      </div>
      <EditFontWeightModal
        id={id}
        name={name}
        value={value}
        isOpen={isEditFontWeightModalOpen}
        closeModal={closeEditFontWeightModal}
      />
    </>
  );
};

export default FontWeightBlock;
