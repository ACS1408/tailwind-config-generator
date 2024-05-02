import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import style from "./AddColorModal.module.scss";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";
import { colorState } from "@/atoms/colorState";
import { settingState } from "@/atoms/settingState";

const AddColorModal = ({ isOpen, closeModal }) => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [settings, setSettings] = useRecoilState(settingState);

  const handleRemoveField = (key) => {
    formik.setFieldValue(
      "fields",
      formik.values.fields.filter((field) => field.id !== key)
    );
  };

  const handleAddField = () => {
    const newKey = `variant-${Math.floor(Math.random() * 10000) + 1}`;
    formik.setFieldValue(
      "fields",
      formik.values.fields.concat({
        id: newKey,
        color: "#000000",
        variant: "",
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      colorHex: "#000000",
      colorDarkHex: "#313131",
      colorName: "",
      fields: [],
    },
    onSubmit: (values, { resetForm }) => {
      const newData = {
        id: Math.floor(Math.random() * 9994 + 8),
        name: values.colorName,
        hex: values.colorHex,
        dark_theme_hex: settings?.dark_theme ? values.colorDarkHex : "",
        variants: values.fields,
      };
      setColorData((prev) => [...prev, newData]);
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
              <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                <Dialog.Title
                  as="h3"
                  className="ttl text-2xl text-center mb-5 font-medium leading-6 text-gray-900"
                >
                  Add Color
                </Dialog.Title>

                <form action="" onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-3 gap-5 items-center">
                    <div
                      className={`${style.color_picker_main} col-span-1 flex h-full`}
                    >
                      {settings?.dark_theme ? (
                        <div className="w-full">
                          <div className="relative leading-none mb-0.5">
                            <label
                              htmlFor="colorHex"
                              className="text-black mb-1 block text-sm"
                            >
                              Light
                            </label>
                            <input
                              type="color"
                              className="w-full h-16 rounded-lg"
                              id="colorHex"
                              name="colorHex"
                              onChange={formik.handleChange}
                              value={formik.values.colorHex}
                            />
                          </div>
                          <div className="relative leading-none mb-0.5">
                            <label
                              htmlFor="colorDarkHex"
                              className="text-black mb-1 block text-sm"
                            >
                              Dark
                            </label>
                            <input
                              type="color"
                              className="w-full h-16 rounded-lg"
                              id="colorDarkHex"
                              name="colorDarkHex"
                              onChange={formik.handleChange}
                              value={formik.values.colorDarkHex}
                            />
                          </div>
                        </div>
                      ) : (
                        <input
                          type="color"
                          className="w-full h-44 rounded-lg"
                          id="colorHex"
                          name="colorHex"
                          onChange={formik.handleChange}
                          value={formik.values.colorHex}
                        />
                      )}
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="colorName"
                        className="text-[15px] text-[#131313] font-medium"
                      >
                        Color name
                      </label>
                      <input
                        type="text"
                        placeholder="Color name (eg: dark, grey, etc.)"
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
                          Add variants
                        </button>
                      ) : null}
                      <div className={`${style.variant}`}>
                        {formik.values?.fields?.map((field, i) => {
                          return (
                            <Fragment key={field.id}>
                              <div className="flex items-center gap-2 mt-4">
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
                                      placeholder="Variant name"
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
                                    onClick={() => handleRemoveField(field.id)}
                                  >
                                    <span>
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
                                    </span>
                                  </button>
                                </div>
                                <div className="flex-[0_0_30px] max-w-[30px] ms-auto flex justify-center items-center">
                                  <button
                                    type="button"
                                    className="size-8 rounded-full border border-[#dedede] flex justify-center items-center text-2xl"
                                    onClick={() => handleAddField(field.id)}
                                  >
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        id="plus"
                                        width={22}
                                        height={22}
                                      >
                                        <g>
                                          <g>
                                            <rect
                                              width="24"
                                              height="24"
                                              opacity="0"
                                              transform="rotate(180 12 12)"
                                            />
                                            <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
                                          </g>
                                        </g>
                                      </svg>
                                    </span>
                                  </button>
                                </div>
                              </div>
                              {settings?.dark_theme ? (
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
                                        name={`fields[${i}].dark_theme_color`}
                                        onChange={(e) =>
                                          formik.setFieldValue(
                                            `fields[${i}].dark_theme_color`,
                                            e.target.value
                                          )
                                        }
                                        value={
                                          formik.values.fields[i]
                                            ?.dark_theme_color
                                        }
                                      />
                                      <input
                                        type="text"
                                        className="w-full"
                                        required
                                        name={`fields[${i}].variant`}
                                        placeholder="Dark variant name"
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
                                </div>
                              ) : (
                                ""
                              )}
                            </Fragment>
                          );
                        })}
                      </div>
                      <button
                        type="submit"
                        className="mt-4 w-full h-9 bg-[#21DF4B] text-white
                        "
                      >
                        Add color
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

export default AddColorModal;
