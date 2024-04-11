import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import style from "./EditColorModal.module.scss";
import { colorState } from "@/atoms/colorState";
import { useRecoilState } from "recoil";
import { useFormik } from "formik";

const EditColorModal = ({
  isOpen,
  closeModal,
  defaultColor,
  defaultName,
  variants,
}) => {
  const [colorData, setColorData] = useRecoilState(colorState);

  const handleRemoveField = (key) => {
    formik.setFieldValue(
      "fields",
      formik.values.fields.filter((field) => field.key !== key)
    );
  };

  const handleAddField = () => {
    const newKey = `variant-${Math.floor(Math.random() * 10000) + 1}`;
    formik.setFieldValue(
      "fields",
      formik.values.fields.concat({ key: newKey, color: "", variant: "" })
    );
  };

  const formik = useFormik({
    initialValues: {
      colorHex: defaultColor ?? "",
      colorName: defaultName ?? "",
      fields: variants ?? [],
    },
    onSubmit: (values) => {
      const newData = {
        name: values.colorName,
        hex: values.colorHex,
        variants: values.fields,
      };
      setColorData((prev) =>
        prev.map((item) => (item.name === values.colorName ? newData : item))
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
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl text-center mb-5 font-medium leading-6 text-gray-900"
                >
                  Edit Color
                </Dialog.Title>

                <form action="" onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-3 gap-5 items-center">
                    <div
                      className={`${style.color_picker_main} col-span-1 flex h-full`}
                    >
                      <input
                        type="color"
                        className="w-full h-44 rounded-lg"
                        id="colorHex"
                        name="colorHex"
                        onChange={formik.handleChange}
                        value={formik.values.colorHex}
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        placeholder="Enter name"
                        className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                        id="colorName"
                        name="colorName"
                        onChange={formik.handleChange}
                        value={formik.values.colorName}
                      />
                      {formik.values?.fields?.length === 0 ? (
                        <button
                          type="button"
                          className="mt-4 w-full h-9 bg-[#21DF4B] text-white"
                          onClick={handleAddField}
                        >
                          Add Variants
                        </button>
                      ) : null}
                      <div className={`${style.variant}`}>
                        {formik.values?.fields?.map((field, i) => {
                          return (
                            <div
                              className="flex items-center gap-2 mt-4"
                              key={field.key}
                            >
                              <div className="flex items-center flex-[0_0_70%] max-w-[70%]">
                                <div className="border border-[#dedede] h-9 p-1 flex gap-2">
                                  <input
                                    type="color"
                                    className="flex-[0_0_3rem] w-12 h-[26px]"
                                    required
                                    name={`fields[${i}].color`}
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        `fields[${i}].color`,
                                        e.target.value
                                      )
                                    }
                                    value={formik.values.fields[i]?.color}
                                  />
                                  <input
                                    type="text"
                                    className="w-full"
                                    required
                                    name={`fields[${i}].variant`}
                                    placeholder="variant-name"
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        `fields[${i}].variant`,
                                        e.target.value
                                      )
                                    }
                                    value={formik.values.fields[i]?.variant}
                                  />
                                </div>
                              </div>
                              <div className="flex-[0_0_30px] max-w-[30px] ms-auto flex justify-center items-center">
                                <button
                                  type="button"
                                  className="size-8 rounded-full border border-[#dedede] flex justify-center items-center text-xl"
                                  onClick={() => handleRemoveField(field.key)}
                                >
                                  <span className="-mt-0.5">x</span>
                                </button>
                              </div>
                              <div className="flex-[0_0_30px] max-w-[30px] ms-auto flex justify-center items-center">
                                <button
                                  type="button"
                                  className="size-8 rounded-full border border-[#dedede] flex justify-center items-center text-2xl"
                                  onClick={() => handleAddField(field.key)}
                                >
                                  <span className="-mt-0.5">+</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        type="submit"
                        className="mt-4 w-full h-9 bg-[#21DF4B] text-white
                        "
                      >
                        Update color
                      </button>
                    </div>
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

export default EditColorModal;
