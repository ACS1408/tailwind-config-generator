import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";

const ImportDataModal = ({ isOpen, closeModal, handleImportJSON }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChangeFileInput = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/json") {
      setUploadedFile(selectedFile);
    } else {
      alert("Please select a JSON file");
      setUploadedFile(null);
    }
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        // Process the JSON data as needed
        const data = JSON.parse(fileContent);
        handleImportJSON(data);
        closeModal();
      };
      reader.readAsText(uploadedFile);
    } else {
      alert("Please select a file to upload");
    }
  };
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
