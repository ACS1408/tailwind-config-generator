import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import style from "./EditColorModal.module.scss";
import { colorState } from "@/atoms/colorState";
import { useRecoilState } from "recoil";
import { useFormik } from "formik";
import { settingState } from "@/atoms/settingState";

const EditColorModal = ({
  id,
  isOpen,
  closeModal,
  defaultColor,
  defaultColorDark,
  defaultName,
  variants,
}) => {
  const [colorData, setColorData] = useRecoilState(colorState);
  const [settings, setSettings] = useRecoilState(settingState);

  const handleRemoveField = (key) => {
    formik.setFieldValue(
      "fields",
      formik.values.fields.filter((field) => field.id !== key)
    );
  };

  const handleAddField = () => {
    const newKey = `new-variant-${Math.floor(Math.random() * 10000) + 1}`;
    formik.setFieldValue(
      "fields",
      formik.values.fields.concat({
        id: newKey,
        color: formik.values.colorHex,
        dark_theme_color: formik.values.colorDarkHex,
        variant: "",
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      id: id,
      colorHex: defaultColor ?? "",
      colorDarkHex: defaultColorDark ?? "",
      colorName: defaultName ?? "",
      fields: variants ?? [],
    },
    onSubmit: (values) => {
      const newData = {
        id: values.id,
        name: values.colorName,
        hex: values.colorHex,
        dark_theme_hex: values.colorDarkHex,
        variants: values.fields,
      };
      setColorData((prev) =>
        prev.map((item) => (item.id === values.id ? newData : item))
      );
      closeModal();
    },
  });

  useEffect(() => {
    formik.resetForm({
      values: {
        id: id,
        colorHex: defaultColor ?? "",
        colorDarkHex: defaultColorDark ?? "",
        colorName: defaultName ?? "",
        fields: variants ?? [],
      },
    });
  }, [colorData]);

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
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle transition-all relative">
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
                  Edit Color
                </Dialog.Title>

                <form action="" onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-3 gap-5 items-center">
                    <div
                      className={`${style.color_picker_main} col-span-1 flex h-full`}
                    >
                      {settings?.dark_theme ? (
                        <div className="w-full">
                          <div className="relative leading-none mb-2">
                            <label
                              htmlFor="colorHex"
                              className="text-black mb-1 block text-sm font-medium"
                            >
                              Light shade
                            </label>
                            <input
                              type="color"
                              className="w-full h-16 rounded-lg cursor-pointer"
                              id="colorHex"
                              name="colorHex"
                              onChange={formik.handleChange}
                              value={formik.values.colorHex}
                            />
                          </div>
                          <div className="relative leading-none mb-2">
                            <label
                              htmlFor="colorDarkHex"
                              className="text-black mb-1 block text-sm font-medium"
                            >
                              Dark shade
                            </label>
                            <input
                              type="color"
                              className="w-full h-16 rounded-lg cursor-pointer"
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
                          className="mt-4 w-full h-9 bg-transparent text-black border border-black"
                          onClick={handleAddField}
                        >
                          Add variants
                        </button>
                      ) : null}
                      <div className={`${style.variant}`}>
                        {formik.values?.fields?.map((field, i) => {
                          return (
                            <div
                              key={field.id}
                              className="border border-[#ededed] p-2.5 mt-4 relative"
                            >
                              <button
                                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white border border-[#ededed] rounded-full size-5 flex justify-center items-center"
                                onClick={() => handleRemoveField(field.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  id="close"
                                  width={16}
                                  height={16}
                                >
                                  <g>
                                    <path d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                                  </g>
                                </svg>
                              </button>
                              <div className="flex items-center gap-2">
                                <div className="border border-[#dedede] h-9 p-1 flex gap-2 w-full">
                                  <input
                                    type="color"
                                    className="flex-[0_0_3rem] w-full h-[26px]"
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
                              {settings?.dark_theme ? (
                                <div
                                  className="flex items-center gap-2 mt-4"
                                  key={field.key}
                                >
                                  <div className="border border-[#dedede] h-9 p-1 flex gap-2 w-full">
                                    <input
                                      type="color"
                                      className="flex-[0_0_3rem] w-full h-[26px]"
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
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                        {formik.values?.fields?.length > 0 ? (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="text-sm text-black mt-1 underline"
                              onClick={handleAddField}
                            >
                              <span>Add Field</span>
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <button
                        type="submit"
                        className="mt-4 w-full h-10 bg-black text-white border border-black"
                      >
                        Save color
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
