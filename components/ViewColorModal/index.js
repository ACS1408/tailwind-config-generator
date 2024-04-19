import { variablePrefixState } from "@/atoms/variablePrefixState";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";

const ViewColorModal = ({ isOpen, closeModal, name, hex, variants }) => {
  const [variablePrefix, setVariablePrefix] =
    useRecoilState(variablePrefixState);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0">
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
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                <Dialog.Title
                  as="h3"
                  className="ttl text-2xl text-left mb-5 font-medium leading-6 text-gray-900"
                >
                  Main Color
                </Dialog.Title>
                <div className="flex gap-4">
                  <div
                    className="w-32 h-20 rounded-md border border-[#ededed]"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="">
                    <div className="text-base">
                      <b>name: </b> {name}
                    </div>
                    <div className="text-base">
                      <b>hex: </b> {hex}
                    </div>
                    <div className="text-base">
                      <b>variable: </b>
                      <span className="whitespace-nowrap">
                        --{variablePrefix}
                        {name}
                      </span>
                    </div>
                  </div>
                </div>
                {variants ? (
                  <>
                    <Dialog.Title
                      as="h3"
                      className="text-xl text-left mb-5 mt-5 font-medium leading-6 text-gray-900"
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
                          <div>{item?.color}</div>
                          <div className="ps-5 flex-1 text-right">
                            --{variablePrefix}-{name}-{item?.variant}
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
