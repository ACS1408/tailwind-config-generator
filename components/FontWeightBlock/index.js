import React, { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { fontWeightState } from "@/atoms/fontWeightState";
import EditFontWeightModal from "../EditFontWeightModal";
import { Menu, Transition } from "@headlessui/react";

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
      <div className="font-weight-block rounded-md border border-[#ededed] p-6 relative">
        <div className="text-sm mb-4 text-center pt-3">font-{name}</div>
        <div className="text-5xl text-center" style={{ fontWeight: value }}>
          {value}
        </div>
        <div className="text-md mt-4 text-center">{name}</div>
        <Menu as="div" className="absolute top-2 right-2">
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
            <Menu.Items className="z-10 absolute right-0 mt-2 p-2 w-32 origin-top-right rounded-md overflow-hidden bg-white shadow-lg">
              <Menu.Item>
                <button
                  className="group flex w-full items-center px-2 py-1.5 rounded-sm text-sm hover:bg-[#ededed] transition-all ease-in-out duration-300"
                  onClick={openEditFontWeightModal}
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
