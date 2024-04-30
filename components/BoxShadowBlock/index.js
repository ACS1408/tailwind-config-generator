import React, { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { boxShadowState } from "@/atoms/boxShadowState";
import { hexToRGBA } from "../utils/hexToRgba";
import EditBoxShadowModal from "../EditBoxShadowModal";
import { Menu, Transition } from "@headlessui/react";
import { settingState } from "@/atoms/settingState";

const BoxShadowBlock = ({ id, name, value }) => {
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [settings, setSettings] = useRecoilState(settingState);
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
          className="rounded-md p-6 h-24 text-center relative flex justify-center items-center"
          style={{
            boxShadow: value
              .map((item) => {
                return ` ${item?.horizontal}px ${item?.vertical}px ${
                  item?.blur
                }px ${item?.spread}px ${hexToRGBA(
                  settings?.dark_theme ? item?.dark_color : item?.color,
                  item.alpha
                )}`;
              })
              .join(", "),
          }}
        >
          shadow-{name}
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
                    onClick={openEditBoxShadowModal}
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
