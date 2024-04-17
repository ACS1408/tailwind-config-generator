import { fontSizeState } from "@/atoms/fontSizeState";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";

const AddFontSizeModal = ({ isOpen, closeModal }) => {
  const [fontSizeData, setFontSizeData] = useRecoilState(fontSizeState);

  const formik = useFormik({
    initialValues: {
      id: "",
      fontName: "",
      fontSize: "",
    },
    onSubmit: (values, { resetForm }) => {
      const newData = {
        id: Math.floor(Math.random() * 9994 + 7),
        name: values.fontName,
        size: values.fontSize,
      };
      setFontSizeData((prev) => [...prev, newData]);
      closeModal();
      resetForm();
    },
  });
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
              <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl text-center mb-5 font-medium leading-6 text-gray-900"
                >
                  Add Font Size
                </Dialog.Title>
                <form action="" onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    className="mb-3 border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                    required
                    name="fontName"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.fontName}
                  />
                  <input
                    type="text"
                    className="mb-2 border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                    required
                    name="fontSize"
                    placeholder="Size"
                    onChange={formik.handleChange}
                    value={formik.values.fontSize}
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full h-9 bg-[#21DF4B] text-white
                  "
                  >
                    Add Font Size
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddFontSizeModal;
