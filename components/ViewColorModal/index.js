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
                        style={{ backgroundColor: darkThemeHex }}
                      />
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
                      <div className="text-base">
                        <b>Hex (dark): </b>{" "}
                        <span className="uppercase">{darkThemeHex}</span>
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
                          <div
                            className="w-10 h-5"
                            style={{ backgroundColor: item?.dark_theme_color }}
                          />
                          <div>{item?.dark_theme_color}</div>
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
