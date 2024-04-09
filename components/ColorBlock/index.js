import React, { useState } from "react";
import ViewColorModal from "../ViewColorModal";
import AddColorModal from "../AddColorModal";
import EditColorModal from "../EditColorModal";

const ColorBlock = ({
  className,
  name,
  hex,
  variants,
  type,
  colorData,
  setColorData,
  ...props
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const openViewModal = () => {
    setIsViewModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteColor = () => {
    setColorData(colorData.filter((item) => item.name !== name));
  };

  return (
    <>
      <div className={`color-block ${className}`} {...props}>
        <div
          className="color-box w-full h-16 rounded-md"
          style={{ backgroundColor: hex }}
        />
        <div className="color-name mt-3 px-2 h-7 flex items-center justify-center text-center bg-[#E3E3E3] text-sm font-medium text-black">
          {name}
        </div>
        <div className="grid gap-2 grid-cols-2">
          <button
            className="text-center text-sm w-full mt-4 bg-black text-white px-2 py-1"
            onClick={openViewModal}
          >
            View
          </button>
          <button
            className="text-center text-sm w-full mt-4 bg-black text-white px-2 py-1"
            onClick={openEditModal}
          >
            Edit
          </button>
          <button
            className="col-span-2 text-center text-sm w-full bg-black text-white px-2 py-1"
            onClick={handleDeleteColor}
          >
            Delete
          </button>
        </div>
      </div>
      <ViewColorModal
        isOpen={isViewModalOpen}
        closeModal={closeViewModal}
        name={name}
        hex={hex}
        variants={variants}
      />
      <EditColorModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        setColorData={setColorData}
        defaultColor={hex}
        defaultName={name}
        variants={variants}
      />
    </>
  );
};

export default ColorBlock;
