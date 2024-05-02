import { boxShadowState } from "@/atoms/boxShadowState";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import style from "./AddBoxShadowModal.module.scss";
import { hexToRGBA } from "../utils/hexToRgba";
import { settingState } from "@/atoms/settingState";

const AddBoxShadowModal = ({ isOpen, closeModal }) => {
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [settings, setSettings] = useRecoilState(settingState);

  const handleRemoveField = (key) => {
    formik.setFieldValue(
      "shadowValue",
      formik.values.shadowValue.filter((field) => field.key !== key)
    );
  };

  const handleAddField = () => {
    const newKey = `layer-${Math.floor(Math.random() * 10000) + 1}`;
    formik.setFieldValue(
      "shadowValue",
      formik.values.shadowValue.concat({
        key: newKey,
        color: "#000000",
        dark_color: "#212121",
        alpha_light: 0.1,
        alpha_dark: 0.2,
        horizontal: 0,
        vertical: 0,
        blur: 2,
        spread: 2,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      shadowName: "",
      shadowValue: [
        {
          key: "layer-0",
          color: "#000000",
          dark_color: "#000000",
          alpha_light: 0.1,
          alpha_dark: 0.2,
          horizontal: 0,
          vertical: 0,
          blur: 2,
          spread: 2,
        },
      ],
    },
    onSubmit: (values, { resetForm }) => {
      const newData = {
        id: Math.floor(Math.random() * 9998 + 3),
        name: values.shadowName,
        value: values.shadowValue,
      };
      setBoxShadowData((prev) => [...prev, newData]);
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
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                <Dialog.Title
                  as="h3"
                  className="ttl text-2xl text-center mb-5 font-medium leading-6 text-gray-900"
                >
                  Add Box Shadow
                </Dialog.Title>
                <div className="flex">
                  <div
                    className="rounded-md max-w-[45%] mx-auto flex-1 p-6 text-center mt-6 mb-10"
                    style={{
                      boxShadow: formik.values.shadowValue
                        .map((item) => {
                          return `${item?.horizontal}px ${item?.vertical}px ${
                            item?.blur
                          }px ${item?.spread}px ${hexToRGBA(
                            item?.color,
                            item.alpha_light
                          )}`;
                        })
                        .join(", "),
                    }}
                  >
                    shadow-{formik.values.shadowName}
                    {settings?.dark_theme ? (
                      <div className="">(light)</div>
                    ) : (
                      ""
                    )}
                  </div>
                  {settings?.dark_theme ? (
                    <div
                      className="rounded-md max-w-[45%] mx-auto flex-1 p-6 text-center mt-6 mb-10"
                      style={{
                        boxShadow: formik.values.shadowValue
                          .map((item) => {
                            return ` ${item?.horizontal}px ${
                              item?.vertical
                            }px ${item?.blur}px ${item?.spread}px ${hexToRGBA(
                              item?.dark_color,
                              item.alpha_dark
                            )}`;
                          })
                          .join(", "),
                      }}
                    >
                      shadow-{formik.values.shadowName}
                      <div className="">(dark)</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                  <label
                    htmlFor="shadowName"
                    className="text-[15px] text-[#131313] font-medium"
                  >
                    Shadow name
                  </label>
                  <input
                    type="text"
                    className="mb-3 border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                    required
                    name="shadowName"
                    placeholder="Name (eg: lg, md, etc.)"
                    onChange={formik.handleChange}
                    value={formik.values.shadowName}
                  />
                  <div className="flex flex-col gap-3">
                    {formik.values.shadowValue.map((field, i) => {
                      return (
                        <div
                          className="border border-[#dedede] p-3"
                          key={field.key}
                        >
                          <div className="grid grid-cols-2 gap-3">
                            <div className="">
                              <label
                                htmlFor={`shadowValue[${i}].color`}
                                className="text-[15px] text-[#131313] font-medium"
                              >
                                Shadow color{" "}
                                {settings?.dark_theme ? "(Light)" : ""}
                              </label>
                              <div className="border border-[#dedede] h-10 p-1 flex gap-2 items-center">
                                <input
                                  type="color"
                                  className={`${style.color_picker} flex-[0_0_3rem] w-12 h-[30px]`}
                                  required
                                  id={`shadowValue[${i}].color`}
                                  name={`shadowValue[${i}].color`}
                                  onChange={(e) =>
                                    formik.setFieldValue(
                                      `shadowValue[${i}].color`,
                                      e.target.value
                                    )
                                  }
                                  value={formik.values.shadowValue[i]?.color}
                                />
                                <span>{field?.color}</span>
                              </div>
                            </div>
                            <div className="">
                              <label
                                htmlFor={`shadowValue[${i}].alpha_light`}
                                className="text-[15px] text-[#131313] font-medium"
                              >
                                Opacity {settings?.dark_theme ? "(Light)" : ""}
                              </label>
                              <input
                                type="number"
                                className="border border-[#dedede] text-[#1a1717] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                                required
                                placeholder="Opacity"
                                name={`shadowValue[${i}].alpha_light`}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `shadowValue[${i}].alpha_light`,
                                    e.target.value
                                  )
                                }
                                value={
                                  formik.values.shadowValue[i]?.alpha_light
                                }
                              />
                            </div>
                            {settings?.dark_theme ? (
                              <>
                                <div className="">
                                  <label
                                    htmlFor={`shadowValue[${i}].dark_color`}
                                    className="text-[15px] text-[#131313] font-medium"
                                  >
                                    Shadow color (Dark)
                                  </label>
                                  <div className="border border-[#dedede] h-10 p-1 flex gap-2 items-center">
                                    <input
                                      type="color"
                                      className={`${style.color_picker} flex-[0_0_3rem] w-12 h-[30px]`}
                                      required
                                      name={`shadowValue[${i}].dark_color`}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          `shadowValue[${i}].dark_color`,
                                          e.target.value
                                        )
                                      }
                                      value={
                                        formik.values.shadowValue[i]?.dark_color
                                      }
                                    />
                                    <span>{field?.dark_color}</span>
                                  </div>
                                </div>
                                <div className="">
                                  <label
                                    htmlFor={`shadowValue[${i}].alpha_dark`}
                                    className="text-[15px] text-[#131313] font-medium"
                                  >
                                    Opacity (Dark)
                                  </label>
                                  <input
                                    type="number"
                                    className="border border-[#dedede] text-[#1a1717] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                                    required
                                    placeholder="Opacity"
                                    name={`shadowValue[${i}].alpha_dark`}
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        `shadowValue[${i}].alpha_dark`,
                                        e.target.value
                                      )
                                    }
                                    value={
                                      formik.values.shadowValue[i]?.alpha_dark
                                    }
                                  />
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            <div className="">
                              <label
                                htmlFor={`shadowValue[${i}].horizontal`}
                                className="text-[15px] text-[#131313] font-medium"
                              >
                                Horizontal offset
                              </label>
                              <input
                                type="number"
                                className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                                required
                                placeholder="Horizontal"
                                name={`shadowValue[${i}].horizontal`}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `shadowValue[${i}].horizontal`,
                                    e.target.value
                                  )
                                }
                                value={formik.values.shadowValue[i]?.horizontal}
                              />
                            </div>
                            <div className="">
                              <label
                                htmlFor={`shadowValue[${i}].vertical`}
                                className="text-[15px] text-[#131313] font-medium"
                              >
                                Vertical offset
                              </label>
                              <input
                                type="number"
                                className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                                required
                                placeholder="Vertical"
                                name={`shadowValue[${i}].vertical`}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `shadowValue[${i}].vertical`,
                                    e.target.value
                                  )
                                }
                                value={formik.values.shadowValue[i]?.vertical}
                              />
                            </div>
                            <input
                              type="number"
                              className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                              required
                              placeholder="Blur"
                              name={`shadowValue[${i}].blur`}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  `shadowValue[${i}].blur`,
                                  e.target.value
                                )
                              }
                              value={formik.values.shadowValue[i]?.blur}
                            />
                            <input
                              type="number"
                              className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                              required
                              placeholder="Spread"
                              name={`shadowValue[${i}].spread`}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  `shadowValue[${i}].spread`,
                                  e.target.value
                                )
                              }
                              value={formik.values.shadowValue[i]?.spread}
                            />
                          </div>
                          {i > 0 ? (
                            <div className="text-right">
                              <button
                                type="button"
                                className="text-sm mt-2 text-[#ff0000]"
                                onClick={() => handleRemoveField(field?.key)}
                              >
                                Remove
                              </button>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      className="mt-2 text-[#21DF4B] text-sm underline"
                      onClick={handleAddField}
                    >
                      New layer
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full h-9 bg-[#21DF4B] text-white
                  "
                  >
                    Add box shadow
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

export default AddBoxShadowModal;
