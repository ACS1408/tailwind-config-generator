import { spacingState } from "@/atoms/spacingState";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";

const EditSpacingModal = ({ isOpen, closeModal, id, name, size }) => {
  const [spacingData, setSpacingData] = useRecoilState(spacingState);

  const formik = useFormik({
    initialValues: {
      id: id,
      spacingName: name,
      spacingSize: size,
    },
    onSubmit: (values) => {
      const newData = {
        id: values.id,
        name: values.spacingName,
        size: values.spacingSize,
      };
      setSpacingData((prev) =>
        prev.map((item) => (item.id === values.id ? newData : item))
      );
      closeModal();
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
              <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                <Dialog.Title
                  as="h3"
                  className="ttl text-2xl text-center mb-5 font-medium leading-6 text-gray-900"
                >
                  Edit Spacing
                </Dialog.Title>
                <form action="" onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    className="mb-3 border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                    required
                    name="spacingName"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.spacingName}
                  />
                  <input
                    type="text"
                    className="mb-2 border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                    required
                    name="spacingSize"
                    placeholder="Size"
                    onChange={formik.handleChange}
                    value={formik.values.spacingSize}
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full h-9 bg-[#21DF4B] text-white
                  "
                  >
                    Update spacing
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

export default EditSpacingModal;
