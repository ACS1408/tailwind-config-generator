import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";

const ImportDataModal = ({ isOpen, closeModal, handleImportJSON }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChangeFileInput = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/json") {
      setUploadedFile(selectedFile);
    } else {
      setUploadedFile(null);
      alert("Please select a JSON file"); // TODO: (UI_VAR_TODO_001) Replace with  toast.
    }
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        const data = JSON.parse(fileContent);
        handleImportJSON(data);
        closeModal();
      };
      reader.readAsText(uploadedFile);
    } else {
      alert("Please select a file to upload"); // TODO: (UI_VAR_TODO_001) Replace with  toast.
    }
  };

  useEffect(() => {
    !isOpen && setUploadedFile(null);
  }, [isOpen]);

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
              <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle transition-all relative">
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
                  className="ttl text-2xl mb-5 text-center font-medium leading-6 text-gray-900"
                >
                  Import Data
                </Dialog.Title>
                <form action="" onSubmit={(e) => handleFileUpload(e)}>
                  <div className="file-input relative w-full border border-[#dedede] border-dashed text-[#131313]">
                    <div className="flex justify-center items-center size-full">
                      <label
                        htmlFor="fileUpload"
                        className="flex flex-col items-center justify-center text-[15px] text-[#131313] font-medium p-5"
                      >
                        <Image
                          src="/images/icon-upload.svg"
                          alt="upload icon"
                          width={48}
                          height={48}
                        />
                        <span className="text-center text-md">
                          Click to
                          <span className="text-[#21df4b]"> choose</span> file
                          and upload
                        </span>
                      </label>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      required
                      id="fileUpload"
                      accept=".json"
                      onChange={(e) => handleChangeFileInput(e)}
                    />
                  </div>
                  {uploadedFile ? (
                    <div className="uploaded-file text-sm text-[#21df4b]">
                      {uploadedFile.name}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="submit-wrap mt-4 flex justify-center">
                    <button
                      type="submit"
                      className="bg-[#21df4b] text-white px-8 py-2"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImportDataModal;
