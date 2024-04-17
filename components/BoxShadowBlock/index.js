import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { boxShadowState } from "@/atoms/boxShadowState";
import { hexToRGBA } from "../utils/hexToRgba";
import EditBoxShadowModal from "../EditBoxShadowModal";

const BoxShadowBlock = ({ id, name, value }) => {
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [isEditBoxShadowModalOpen, setIsEditBoxShadowModalOpen] =
    useState(false);

  const closeEditBoxShadowModal = () => {
    setIsEditBoxShadowModalOpen(false);
  };

  const openEditBoxShadowModal = () => {
    setIsEditBoxShadowModalOpen(true);
  };

  const handleRemove = (id) => {
    setBoxShadowData(boxShadowData.filter((item) => item.id !== id));
  };
  return (
    <>
      <div className="box-shadow-block">
        <div
          className="rounded-md p-6 text-center"
          style={{
            boxShadow: value
              .map((item) => {
                return ` ${item?.horizontal}px ${item?.vertical}px ${
                  item?.blur
                }px ${item?.spread}px ${hexToRGBA(item?.color, item.alpha)}`;
              })
              .join(", "),
          }}
        >
          shadow-{name}
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <button
            className="bg-black text-white px-3 py-1 text-sm w-full"
            onClick={openEditBoxShadowModal}
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
      <EditBoxShadowModal
        id={id}
        name={name}
        value={value}
        isOpen={isEditBoxShadowModalOpen}
        closeModal={closeEditBoxShadowModal}
      />
    </>
  );
};

export default BoxShadowBlock;
