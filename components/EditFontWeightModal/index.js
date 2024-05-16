import { fontWeightState } from "@/atoms/fontWeightState";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment, useEffect } from "react";
import { useRecoilState } from "recoil";

const EditFontWeightModal = ({ isOpen, closeModal, id, name, value }) => {
  const [fontWeightData, setFontWeightData] = useRecoilState(fontWeightState);

  const formik = useFormik({
    initialValues: {
      id: id,
      weightName: name,
      weightValue: value,
    },
    onSubmit: (values) => {
      const newData = {
        id: Math.floor(Math.random() * 9996 + 5),
        name: values.weightName,
        value: values.weightValue,
      };
      setFontWeightData((prev) =>
        prev.map((item) => (item.id === values.id ? newData : item))
      );
      closeModal();
    },
  });

  useEffect(() => {
    formik.resetForm({
      values: {
        id: id,
        weightName: name,
        weightValue: value,
      },
    });
  }, [fontWeightData]);

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
                  className="ttl text-2xl text-center mb-5 font-medium leading-6 text-gray-900"
                >
                  Edit Font Weight
                </Dialog.Title>
                <form action="" onSubmit={formik.handleSubmit}>
                  <label
                    htmlFor="weightName"
                    className="text-[15px] text-[#131313] font-medium"
                  >
                    Weight name
                  </label>
                  <input
                    type="text"
                    className="mb-3 border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                    required
                    name="weightName"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.weightName}
                  />
                  <label
                    htmlFor="weightValue"
                    className="text-[15px] text-[#131313] font-medium"
                  >
                    Weight
                  </label>
                  <input
                    type="text"
                    className="mb-2 border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                    required
                    name="weightValue"
                    placeholder="Weight (eg: 500, 600, etc.)"
                    onChange={formik.handleChange}
                    value={formik.values.weightValue}
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full h-10 bg-[#21df4b] text-white border border-[#21df4b]"
                  >
                    Save font weight
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

export default EditFontWeightModal;
