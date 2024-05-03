import SettingsWidget from "@/widgets/SettingsWidget";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import OffCanvas from "../OffCanvas";

const FloatingMenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };
  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  return (
    <>
      <div className="floating-menu-bar bg-white rounded-md fixed bottom-5 left-1/2 -translate-x-1/2 p-3 border border-[#ededed] flex gap-4 items-center">
        <button
          className="btn-generate-code bg-[#21DF4B] text-white h-12 px-6 py-2 rounded-md"
          onClick={openOffcanvas}
        >
          Generate Code
        </button>
        <button className="btn-settings" onClick={openModal}>
          <svg
            id="Group_1"
            data-name="Group 1"
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 34 34"
          >
            <path
              id="Path_1"
              data-name="Path 1"
              d="M18.417,34H15.583a2.128,2.128,0,0,1-2.125-2.125V29.237a12.645,12.645,0,0,1-2.607-1.082L8.985,30.022a2.177,2.177,0,0,1-3.005,0l-2-2a2.124,2.124,0,0,1,0-3l1.866-1.867a12.564,12.564,0,0,1-1.08-2.606H2.125A2.128,2.128,0,0,1,0,18.416V15.583a2.125,2.125,0,0,1,2.125-2.125H4.763a12.647,12.647,0,0,1,1.081-2.606L3.978,8.985a2.126,2.126,0,0,1,0-3l2-2a2.177,2.177,0,0,1,3.005,0l1.866,1.866a12.639,12.639,0,0,1,2.605-1.08V2.125A2.128,2.128,0,0,1,15.583,0h2.833a2.128,2.128,0,0,1,2.125,2.125V4.763a12.652,12.652,0,0,1,2.605,1.08l1.866-1.866a2.177,2.177,0,0,1,3.005,0l2,2a2.124,2.124,0,0,1,0,3l-1.866,1.866a12.583,12.583,0,0,1,1.081,2.607h2.637A2.128,2.128,0,0,1,34,15.583v2.833a2.125,2.125,0,0,1-2.125,2.125H29.237a12.644,12.644,0,0,1-1.081,2.607l1.866,1.866a2.126,2.126,0,0,1,0,3l-2,2a2.177,2.177,0,0,1-3.005,0l-1.865-1.866a12.647,12.647,0,0,1-2.606,1.081v2.638A2.129,2.129,0,0,1,18.417,34Zm-7.68-7.439a.71.71,0,0,1,.369.1A11.246,11.246,0,0,0,14.333,28a.708.708,0,0,1,.542.689v3.183a.709.709,0,0,0,.708.708h2.833a.709.709,0,0,0,.708-.708V28.692A.708.708,0,0,1,19.667,28a11.245,11.245,0,0,0,3.227-1.339.709.709,0,0,1,.871.1l2.251,2.252a.73.73,0,0,0,1,0l2-2a.708.708,0,0,0,0-1l-2.252-2.252a.708.708,0,0,1-.1-.871A11.234,11.234,0,0,0,28,19.665a.708.708,0,0,1,.689-.543h3.183a.706.706,0,0,0,.708-.707V15.583a.709.709,0,0,0-.708-.708H28.692A.708.708,0,0,1,28,14.332,11.227,11.227,0,0,0,26.666,11.1a.708.708,0,0,1,.1-.871l2.252-2.252a.708.708,0,0,0,0-1l-2-2a.727.727,0,0,0-1,0L23.763,7.229a.7.7,0,0,1-.871.1,11.237,11.237,0,0,0-3.226-1.338.706.706,0,0,1-.542-.687V2.125a.709.709,0,0,0-.708-.708H15.583a.709.709,0,0,0-.708.708V5.308A.708.708,0,0,1,14.333,6a11.243,11.243,0,0,0-3.227,1.338.707.707,0,0,1-.87-.1L7.984,4.979a.727.727,0,0,0-1,0l-2,2a.708.708,0,0,0,0,1l2.252,2.252a.708.708,0,0,1,.1.871A11.231,11.231,0,0,0,6,14.332a.708.708,0,0,1-.689.543H2.125a.706.706,0,0,0-.708.708v2.833a.709.709,0,0,0,.708.708H5.308A.708.708,0,0,1,6,19.667a11.238,11.238,0,0,0,1.338,3.226.708.708,0,0,1-.1.871L4.979,26.016a.708.708,0,0,0,0,1l2,2a.727.727,0,0,0,1,0l2.251-2.252A.7.7,0,0,1,10.736,26.561Z"
            />
            <path
              id="Path_2"
              data-name="Path 2"
              d="M21.083,28.167a7.083,7.083,0,1,1,7.083-7.083A7.091,7.091,0,0,1,21.083,28.167Zm0-12.75a5.667,5.667,0,1,0,5.667,5.667A5.673,5.673,0,0,0,21.083,15.417Z"
              transform="translate(-4.083 -4.083)"
            />
          </svg>
        </button>
      </div>
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
                <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle transition-all">
                  <Dialog.Title
                    as="h3"
                    className="ttl text-2xl mb-5 font-medium leading-6 text-gray-900"
                  >
                    Settings
                  </Dialog.Title>
                  <SettingsWidget />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <OffCanvas
        isOffcanvasOpen={isOffcanvasOpen}
        closeOffcanvas={closeOffcanvas}
      />
    </>
  );
};

export default FloatingMenuBar;
