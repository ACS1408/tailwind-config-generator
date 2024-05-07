import { boxShadowState } from "@/atoms/boxShadowState";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment, useEffect } from "react";
import { useRecoilState } from "recoil";
import style from "./EditBoxShadowModal.module.scss";
import { hexToRGBA } from "../utils/hexToRgba";
import { settingState } from "@/atoms/settingState";

const EditBoxShadowModal = ({ id, isOpen, closeModal, name, value }) => {
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [settings, setSettings] = useRecoilState(settingState);

  const handleRemoveField = (key) => {
    formik.setFieldValue(
      "shadowValue",
      formik.values.shadowValue.filter((field) => field.key !== key)
    );
  };

  const handleAddField = () => {
    const newKey = `new-layer-${Math.floor(Math.random() * 10000) + 1}`;
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
        inset: false,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      id: id,
      shadowName: name,
      shadowValue: value,
    },
    onSubmit: (values) => {
      const newData = {
        id: values.id,
        name: values.shadowName,
        value: values.shadowValue,
      };

      setBoxShadowData((prev) =>
        prev.map((item) => (item.id === values.id ? newData : item))
      );
      closeModal();
    },
  });

  useEffect(() => {
    formik.resetForm({
      values: {
        id: id,
        shadowName: name,
        shadowValue: value,
      },
    });
  }, [boxShadowData]);

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
                  Edit Box Shadow
                </Dialog.Title>
                <div className="flex">
                  <div
                    className="rounded-md max-w-[45%] mx-auto flex-1 p-6 text-center mt-6 mb-10"
                    style={{
                      boxShadow: formik.values.shadowValue
                        .map((item) => {
                          return `${item?.inset ? "inset" : ""} ${
                            item?.horizontal
                          }px ${item?.vertical}px ${item?.blur}px ${
                            item?.spread
                          }px ${hexToRGBA(item?.color, item.alpha_light)}`;
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
                            return `${item?.inset ? "inset" : ""} ${
                              item?.horizontal
                            }px ${item?.vertical}px ${item?.blur}px ${
                              item?.spread
                            }px ${hexToRGBA(
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
                    placeholder="Name"
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
                                id={`shadowValue[${i}].alpha_light`}
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
                                      id={`shadowValue[${i}].dark_color`}
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
                                    id={`shadowValue[${i}].alpha_dark`}
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
                                id={`shadowValue[${i}].horizontal`}
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
                                id={`shadowValue[${i}].vertical`}
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
                            <div className="">
                              <label
                                htmlFor={`shadowValue[${i}].blur`}
                                className="text-[15px] text-[#131313] font-medium"
                              >
                                Blur radius
                              </label>
                              <input
                                type="number"
                                className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                                required
                                placeholder="Blur"
                                id={`shadowValue[${i}].blur`}
                                name={`shadowValue[${i}].blur`}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `shadowValue[${i}].blur`,
                                    e.target.value
                                  )
                                }
                                value={formik.values.shadowValue[i]?.blur}
                              />
                            </div>
                            <div className="">
                              <label
                                htmlFor={`shadowValue[${i}].spread`}
                                className="text-[15px] text-[#131313] font-medium"
                              >
                                Spread radius
                              </label>
                              <input
                                type="number"
                                className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                                required
                                placeholder="Spread"
                                id={`shadowValue[${i}].spread`}
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
                            <div className="col-span-2 flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`shadowValue[${i}].inset`}
                                name={`shadowValue[${i}].inset`}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `shadowValue[${i}].inset`,
                                    e.target.checked
                                  )
                                }
                                checked={formik.values.shadowValue[i]?.inset}
                                className="accent-black"
                              />
                              <label
                                htmlFor={`shadowValue[${i}].inset`}
                                className="text-[15px] text-[#131313] font-medium"
                              >
                                Inset
                              </label>
                            </div>
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
                      className="mt-2 text-[#21df4b] text-sm underline"
                      onClick={handleAddField}
                    >
                      New layer
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full h-10 bg-[#21df4b] text-white border border-[#21df4b]"
                  >
                    Save box shadow
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

export default EditBoxShadowModal;
