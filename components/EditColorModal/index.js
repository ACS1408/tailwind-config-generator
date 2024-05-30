import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import style from "./EditColorModal.module.scss";
import { colorState } from "@/atoms/colorState";
import { useRecoilState } from "recoil";
import { useFormik } from "formik";
import { settingState } from "@/atoms/settingState";
import { SketchPicker } from "react-color";
import { decimalToHex } from "../utils/decimalToHex";
import { hexToRGBA } from "../utils/hexToRgba";

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
  const [openPicker, setOpenPicker] = useState(false);
  const [openDarkPicker, setOpenDarkPicker] = useState(false);

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
        picker: false,
        dark_picker: false,
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
        hex: values.colorHex.replace("transparent", "#000000"),
        dark_theme_hex: settings?.dark_theme
          ? values.colorDarkHex.replace("transparent", "#000000")
          : "",
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
                            <div className="relative w-full h-20">
                              <button
                                type="button"
                                className="w-full rounded-lg h-full"
                                style={{
                                  backgroundColor: hexToRGBA(
                                    formik.values.colorHex
                                  ),
                                }}
                                onFocus={() => setOpenPicker(true)}
                                onBlur={() => setOpenPicker(false)}
                              >
                                <Transition
                                  appear
                                  show={openPicker}
                                  as={Fragment}
                                >
                                  <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-[90%]"
                                    enterTo="opacity-100 translate-y-full"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-full"
                                    leaveTo="opacity-0 translate-y-[90%]"
                                  >
                                    <div className="absolute bottom-0 left-0 w-full translate-y-full z-10">
                                      <SketchPicker
                                        color={hexToRGBA(
                                          formik.values.colorHex
                                        )}
                                        presetColors={[]}
                                        onChange={(color) => {
                                          formik.setFieldValue(
                                            "colorHex",
                                            decimalToHex(color)
                                          );
                                        }}
                                      />
                                    </div>
                                  </Transition.Child>
                                </Transition>
                              </button>
                            </div>
                          </div>
                          <div className="relative leading-none mb-2">
                            <label
                              htmlFor="colorDarkHex"
                              className="text-black mb-1 block text-sm font-medium"
                            >
                              Dark shade
                            </label>
                            <div className="relative w-full h-20">
                              <button
                                type="button"
                                className="w-full rounded-lg h-full border border-[#ededed] flex justify-center items-center"
                                style={{
                                  backgroundColor: formik.values.colorDarkHex
                                    ? hexToRGBA(formik.values.colorDarkHex)
                                    : "",
                                }}
                                onFocus={() => setOpenDarkPicker(true)}
                                onBlur={() => setOpenDarkPicker(false)}
                              >
                                {!formik.values.colorDarkHex ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    id="block"
                                    width={16}
                                    height={16}
                                    fill="#ff0000"
                                  >
                                    <path d="M8,0c-4.41113,0 -8,3.58887 -8,8c0,4.41113 3.58887,8 8,8c4.41113,0 8,-3.58887 8,-8c0,-4.41113 -3.58887,-8 -8,-8Zm-6,8c0,-1.29382 0.415771,-2.49005 1.11487,-3.47107l8.3562,8.3562c-0.981018,0.699097 -2.17725,1.11487 -3.47107,1.11487c-3.30859,0 -6,-2.69141 -6,-6Zm10.8851,3.47107l-8.3562,-8.3562c0.981018,-0.699097 2.17725,-1.11487 3.47107,-1.11487c3.30859,0 6,2.69141 6,6c0,1.29382 -0.415771,2.49005 -1.11487,3.47107Z" />
                                  </svg>
                                ) : (
                                  ""
                                )}
                                <Transition
                                  appear
                                  show={openDarkPicker}
                                  as={Fragment}
                                >
                                  <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-[90%]"
                                    enterTo="opacity-100 translate-y-full"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-full"
                                    leaveTo="opacity-0 translate-y-[90%]"
                                  >
                                    <div className="absolute bottom-0 left-0 w-full translate-y-full z-10">
                                      <SketchPicker
                                        color={
                                          formik.values.colorDarkHex
                                            ? hexToRGBA(
                                                formik.values.colorDarkHex
                                              )
                                            : ""
                                        }
                                        presetColors={[]}
                                        onChange={(color) => {
                                          formik.setFieldValue(
                                            "colorDarkHex",
                                            decimalToHex(color)
                                          );
                                        }}
                                      />
                                    </div>
                                  </Transition.Child>
                                </Transition>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full max-h-44 h-full">
                          <button
                            type="button"
                            className="w-full rounded-lg h-full"
                            style={{
                              backgroundColor: hexToRGBA(
                                formik.values.colorHex
                              ),
                            }}
                            onFocus={() => setOpenPicker(true)}
                            onBlur={() => setOpenPicker(false)}
                          >
                            <Transition appear show={openPicker} as={Fragment}>
                              <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-[90%]"
                                enterTo="opacity-100 translate-y-full"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-full"
                                leaveTo="opacity-0 translate-y-[90%]"
                              >
                                <div className="absolute bottom-0 left-0 w-full translate-y-full z-10">
                                  <SketchPicker
                                    color={hexToRGBA(formik.values.colorHex)}
                                    presetColors={[]}
                                    onChange={(color) => {
                                      formik.setFieldValue(
                                        "colorHex",
                                        decimalToHex(color)
                                      );
                                    }}
                                  />
                                </div>
                              </Transition.Child>
                            </Transition>
                          </button>
                        </div>
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
                          className="mt-4 w-full h-10 bg-transparent text-[#21df4b] border border-[#21df4b]"
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
                              <label
                                htmlFor={`fields[${i}].variant`}
                                className="-mt-6 block bg-white w-max px-2 text-[15px] font-medium"
                              >
                                Variant {i + 1}
                              </label>
                              <div className="flex items-center gap-2">
                                <div className="border border-[#dedede] h-9 p-1 flex gap-2 w-full">
                                  <div className="relative flex-[0_0_3rem] w-full h-[26px]">
                                    <button
                                      type="button"
                                      className="w-full h-full absolute inset-0"
                                      style={{
                                        backgroundColor: hexToRGBA(
                                          formik.values.fields[i].color
                                        ),
                                      }}
                                      onFocus={() =>
                                        formik.setFieldValue(
                                          `fields[${i}].picker`,
                                          true
                                        )
                                      }
                                      onBlur={() =>
                                        formik.setFieldValue(
                                          `fields[${i}].picker`,
                                          false
                                        )
                                      }
                                    >
                                      <Transition
                                        appear
                                        show={formik.values.fields[i]?.picker}
                                        as={Fragment}
                                      >
                                        <Transition.Child
                                          as={Fragment}
                                          enter="ease-out duration-300"
                                          enterFrom="opacity-0 translate-y-[90%]"
                                          enterTo="opacity-100 translate-y-full"
                                          leave="ease-in duration-200"
                                          leaveFrom="opacity-100 translate-y-full"
                                          leaveTo="opacity-0 translate-y-[90%]"
                                        >
                                          <div className="absolute bottom-0 left-0 w-full translate-y-full z-10">
                                            <SketchPicker
                                              color={hexToRGBA(
                                                formik.values.fields[i].color
                                              )}
                                              presetColors={[]}
                                              onChange={(color) => {
                                                formik.setFieldValue(
                                                  `fields[${i}].color`,
                                                  decimalToHex(color)
                                                );
                                              }}
                                            />
                                          </div>
                                        </Transition.Child>
                                      </Transition>
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    className="w-full"
                                    required
                                    id={`fields[${i}].variant`}
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
                                    <div className="relative flex-[0_0_3rem] w-full h-[26px]">
                                      <button
                                        type="button"
                                        className="w-full h-full absolute inset-0"
                                        style={{
                                          backgroundColor: hexToRGBA(
                                            formik.values.fields[i]
                                              .dark_theme_color
                                          ),
                                        }}
                                        onFocus={() =>
                                          formik.setFieldValue(
                                            `fields[${i}].dark_picker`,
                                            true
                                          )
                                        }
                                        onBlur={() =>
                                          formik.setFieldValue(
                                            `fields[${i}].dark_picker`,
                                            false
                                          )
                                        }
                                      >
                                        <Transition
                                          appear
                                          show={
                                            formik.values.fields[i]?.dark_picker
                                          }
                                          as={Fragment}
                                        >
                                          <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 translate-y-[90%]"
                                            enterTo="opacity-100 translate-y-full"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 translate-y-full"
                                            leaveTo="opacity-0 translate-y-[90%]"
                                          >
                                            <div className="absolute bottom-0 left-0 w-full translate-y-full z-10">
                                              <SketchPicker
                                                color={hexToRGBA(
                                                  formik.values.fields[i]
                                                    .dark_theme_color
                                                )}
                                                presetColors={[]}
                                                onChange={(color) => {
                                                  formik.setFieldValue(
                                                    `fields[${i}].dark_theme_color`,
                                                    decimalToHex(color)
                                                  );
                                                }}
                                              />
                                            </div>
                                          </Transition.Child>
                                        </Transition>
                                      </button>
                                    </div>
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
                        className="mt-4 w-full h-10 bg-[#21df4b] text-white border border-[#21df4b]"
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
