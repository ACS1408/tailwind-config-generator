import React, { Fragment, useState } from "react";
import ViewColorModal from "../ViewColorModal";
import EditColorModal from "../EditColorModal";
import { Menu, Transition } from "@headlessui/react";
import { settingState } from "@/atoms/settingState";
import { useRecoilState } from "recoil";

const ColorBlock = ({
  className,
  id,
  name,
  hex,
  variants,
  type,
  colorData,
  setColorData,
  darkThemeHex,
  ...props
}) => {
  const [settings, setSettings] = useRecoilState(settingState);
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

  const handleDeleteColor = (id) => {
    setColorData(colorData.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className={`color-block ${className}`} {...props}>
        <div
          className="color-box flex justify-center items-center w-full h-24 rounded-2xl border border-[#ededed]"
          style={{ backgroundColor: settings?.dark_theme ? darkThemeHex : hex }}
        >
          {settings?.dark_theme && !darkThemeHex ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              id="block"
              width={16}
              height={16}
              fill="#ff0000"
            >
              <path d="M8,0c-4.41113,0 -8,3.58887 -8,8c0,4.41113 3.58887,8 8,8c4.41113,0 8,-3.58887 8,-8c0,-4.41113 -3.58887,-8 -8,-8Zm-6,8c0,-1.29382 0.415771,-2.49005 1.11487,-3.47107l8.3562,8.3562c-0.981018,0.699097 -2.17725,1.11487 -3.47107,1.11487c-3.30859,0 -6,-2.69141 -6,-6Zm10.8851,3.47107l-8.3562,-8.3562c0.981018,-0.699097 2.17725,-1.11487 3.47107,-1.11487c3.30859,0 6,2.69141 6,6c0,1.29382 -0.415771,2.49005 -1.11487,3.47107Z" />
            </svg>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between mt-2">
          <div className="color-details">
            <div className="color-name text-[15px] font-medium capitalize mb-1">
              {name?.replaceAll(/[_-]/g, " ")}
            </div>
            <div className="color-code text-[13px] text-[#52595f]">
              {settings?.dark_theme && !darkThemeHex ? (
                <span className="">Not set</span>
              ) : (
                <span className="uppercase">
                  {settings?.dark_theme ? darkThemeHex : hex}
                </span>
              )}
            </div>
          </div>
          <Menu as="div" className="relative">
            <Menu.Button className="bg-white size-7 rounded-full flex justify-center items-center">
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
                    onClick={openViewModal}
                  >
                    View
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className="group flex w-full items-center px-2 py-1.5 rounded-sm text-sm hover:bg-[#ededed] transition-all ease-in-out duration-300"
                    onClick={openEditModal}
                  >
                    Edit
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className="group flex w-full items-center px-2 py-1.5 rounded-sm text-sm hover:bg-[#ededed] transition-all ease-in-out duration-300"
                    onClick={() => handleDeleteColor(id)}
                  >
                    Delete
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <ViewColorModal
        isOpen={isViewModalOpen}
        closeModal={closeViewModal}
        name={name}
        hex={hex}
        variants={variants}
        darkThemeHex={darkThemeHex}
      />
      <EditColorModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        setColorData={setColorData}
        id={id}
        defaultColor={hex}
        defaultColorDark={darkThemeHex}
        defaultName={name}
        variants={variants}
      />
    </>
  );
};

export default ColorBlock;
