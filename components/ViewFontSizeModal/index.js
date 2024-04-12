import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { pxToRem } from "../utils/pxToRem";

const ViewFontSizeModal = ({ isOpen, closeModal, name, size }) => {
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
              <Dialog.Panel className="w-full max-w-xs transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl text-center mb-4 font-medium leading-6 text-gray-900"
                >
                  .text-{name}
                </Dialog.Title>
                <div className="flex justify-center items-center">
                  <span
                    className="font-medium"
                    style={{ fontSize: `${pxToRem(size)}rem` }}
                  >
                    Aa
                  </span>
                </div>
                <div className="text-center mt-4">
                  Font Size: {pxToRem(size)}rem ({size}px)
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewFontSizeModal;
