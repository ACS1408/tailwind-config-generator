import { settingState } from "@/atoms/settingState";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";

const ViewColorModal = ({
  isOpen,
  closeModal,
  name,
  hex,
  darkThemeHex,
  variants,
}) => {
  const [settings, setSettings] = useRecoilState(settingState);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => false && closeModal()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#00000090]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle transition-all relative">
                <button
                  className="size-7 flex justify-center items-center absolute top-3 right-3"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="close"
                    width={24}
                    height={24}
                  >
                    <g>
                      <path d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                    </g>
                  </svg>
                </button>
                <Dialog.Title
                  as="h3"
                  className="ttl text-2xl text-left mb-5 font-medium leading-6 text-gray-900"
                >
                  Main Color
                </Dialog.Title>
                <div className="flex gap-4">
                  <div
                    className={`w-36 h-24 rounded-md border border-[#ededed] overflow-hidden ${
                      settings?.dark_theme ? "grid grid-cols-2" : ""
                    }`}
                  >
                    <div
                      className="size-full"
                      style={{ backgroundColor: hex }}
                    />
                    {settings?.dark_theme ? (
                      <div
                        className="size-full"
                        style={{ backgroundColor: darkThemeHex ?? "" }}
                      >
                        {!darkThemeHex ? (
                          <span className="flex flex-col items-center justify-center size-full gap-1">
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
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : null}
                  </div>
                  <div className="">
                    <div className="text-base">
                      <b>Name: </b> {name}
                    </div>
                    <div className="text-base">
                      <b>Hex: </b> <span className="uppercase">{hex}</span>
                    </div>
                    {settings?.dark_theme ? (
                      <div className="text-base flex items-center gap-1">
                        <b>Hex (dark): </b>
                        {darkThemeHex ? (
                          <span className="uppercase">{darkThemeHex}</span>
                        ) : (
                          <span className="flex items-center gap-1">
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
                            <div>Not set</div>
                          </span>
                        )}
                      </div>
                    ) : null}
                    <div className="text-base">
                      <b>CSS variable: </b>
                      <span className="whitespace-nowrap">
                        --{settings?.variable_prefix}
                        {name}
                      </span>
                    </div>
                  </div>
                </div>
                {variants?.length ? (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="ttl text-xl text-left mb-5 mt-5 font-medium leading-6 text-gray-900"
                    >
                      Variants
                    </Dialog.Title>
                    {variants?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="flex justify-center items-center gap-3 mb-2"
                        >
                          <div className="pe-1">
                            <b>{item?.variant}:</b>
                          </div>
                          <div
                            className="w-10 h-5"
                            style={{ backgroundColor: item?.color }}
                          />
                          <div className="uppercase">{item?.color}</div>
                          <div className="ps-5 flex-1 text-right">
                            --{settings?.variable_prefix}
                            {name}-{item?.variant}
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
                {settings?.dark_theme && variants?.length ? (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="ttl text-xl text-left mb-5 mt-7 font-medium leading-6 text-gray-900"
                    >
                      Dark Variants
                    </Dialog.Title>
                    {variants?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="flex justify-center items-center gap-3 mb-2"
                        >
                          <div className="pe-1">
                            <b>{item?.variant}:</b>
                          </div>
                          {item?.dark_theme_color ? (
                            <>
                              <div
                                className="w-10 h-5 border border-[#dedede]"
                                style={{
                                  backgroundColor: item?.dark_theme_color,
                                }}
                              />
                              <div>{item?.dark_theme_color}</div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center justify-center">
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
                              </div>
                              <div>Not set</div>
                            </>
                          )}
                          <div className="ps-5 flex-1 text-right">
                            --{settings?.variable_prefix}
                            {name}-{item?.variant}
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewColorModal;
