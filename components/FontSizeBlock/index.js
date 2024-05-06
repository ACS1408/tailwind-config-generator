import React, { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { pxToRem } from "../utils/pxToRem";
import { fontSizeState } from "@/atoms/fontSizeState";
import EditFontSizeModal from "../EditFontSizeModal";
import ViewFontSizeModal from "../ViewFontSizeModal";
import { Menu, Transition } from "@headlessui/react";

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
      <div className="flex-[0_0_10%] max-w-[10%] py-1 text-md">{name}</div>
      <div className="flex-[0_0_15%] max-w-[15%] py-1 px-4 text-md">
        {pxToRem(size)}rem
      </div>
      <div className="flex-[0_0_15%] max-w-[15%] py-1 px-4 text-md">
        {size}px
      </div>
      <div className="flex-[0_0_40%] max-w-[40%] py-1 px-4 text-md">
        <div
          className="h-4 bg-[#21df4b] rounded-sm"
          style={{ width: `${pxToRem(size)}rem` }}
        />
      </div>
      <div className="flex-[0_0_20%] max-w-[20%] py-1 ps-4 text-md flex gap-2 justify-end">
        <Menu as="div" className="relative">
          <Menu.Button className="bg-white border border-[#ededed] size-7 rounded-full flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-10 absolute right-0 mt-2 p-2 w-32 origin-top-right rounded-md overflow-hidden bg-white border border-[#ededed]">
              <Menu.Item>
                <button
                  className="group flex w-full items-center px-2 py-1.5 rounded-sm text-sm hover:bg-[#ededed] transition-all ease-in-out duration-300"
                  onClick={openViewFontSizeModal}
                >
                  View
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="group flex w-full items-center px-2 py-1.5 rounded-sm text-sm hover:bg-[#ededed] transition-all ease-in-out duration-300"
                  onClick={openEditFontSizeModal}
                >
                  Edit
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="group flex w-full items-center px-2 py-1.5 rounded-sm text-sm hover:bg-[#ededed] transition-all ease-in-out duration-300"
                  onClick={() => handleRemove(id)}
                >
                  Delete
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
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
