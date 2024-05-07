import { boxShadowState } from "@/atoms/boxShadowState";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { settingState } from "@/atoms/settingState";
import { colorState } from "@/atoms/colorState";
import AddColorModal from "../AddColorModal";

const EditBoxShadowModal = ({ id, isOpen, closeModal, name, value }) => {
  const [boxShadowData, setBoxShadowData] = useRecoilState(boxShadowState);
  const [colorData, setColorData] = useRecoilState(colorState);
  const [settings, setSettings] = useRecoilState(settingState);
  const [isAddColorModalOpen, setIsAddColorModalOpen] = useState(false);

  const openAddColorModal = () => {
    setIsAddColorModalOpen(true);
  };

  const closeAddColorModal = () => {
    setIsAddColorModalOpen(false);
  };

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
        color: "black",
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
    <>
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
                <Dialog.Panel className="max-w-md w-full transform rounded-2xl bg-white p-6 text-left align-middle transition-all relative">
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
                            const [colorMain, colorVariant] =
                              item.color?.split("-");
                            return `${item?.inset ? "inset" : ""} ${
                              item?.horizontal
                            }px ${item?.vertical}px ${item?.blur}px ${
                              item?.spread
                            }px ${
                              !settings?.dark_theme
                                ? colorData?.filter(
                                    (color) => color?.name === item.color
                                  )[0]?.hex ??
                                  colorData
                                    ?.filter(
                                      (color) => color?.name === colorMain
                                    )[0]
                                    ?.variants?.filter(
                                      (variant) =>
                                        variant?.variant === colorVariant
                                    )[0]?.color
                                : colorData?.filter(
                                    (color) => color?.name === item.color
                                  )[0]?.dark_theme_hex ??
                                  colorData
                                    ?.filter(
                                      (color) => color?.name === colorMain
                                    )[0]
                                    ?.variants?.filter(
                                      (variant) =>
                                        variant?.variant === colorVariant
                                    )[0]?.dark_theme_color ??
                                  "transparent"
                            }`;
                          })
                          .join(", "),
                      }}
                    >
                      shadow-{formik.values.shadowName}
                    </div>
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
                              <div className="col-span-2">
                                <label
                                  htmlFor={`shadowValue[${i}].color`}
                                  className="text-[15px] text-[#131313] font-medium"
                                >
                                  Shadow color{" "}
                                  {settings?.dark_theme ? "(Light)" : ""}
                                </label>
                                <Listbox
                                  value={formik.values.shadowValue[i].color}
                                >
                                  <div className="relative">
                                    <Listbox.Button className="relative w-full cursor-default border border-[#dedede] h-10">
                                      <span className="block truncate text-left ps-4 text-md">
                                        {formik.values.shadowValue[i].color}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="12.828"
                                          height="7.414"
                                          viewBox="0 0 12.828 7.414"
                                        >
                                          <path
                                            id="Path_1"
                                            data-name="Path 1"
                                            d="M1,1,6,6l5-5"
                                            transform="translate(0.414 0.414)"
                                            fill="none"
                                            stroke="#000"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                          />
                                        </svg>
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute mt-1 max-h-56 w-full overflow-auto bg-white border border-[#dedede] outline-none p-3 no-scrollbar">
                                        {colorData.map((color, colorIdx) => (
                                          <>
                                            <Listbox.Option
                                              key={colorIdx}
                                              onClick={() =>
                                                formik.setFieldValue(
                                                  `shadowValue[${i}].color`,
                                                  color?.name
                                                )
                                              }
                                              className={({
                                                active,
                                                selected,
                                              }) =>
                                                `relative select-none px-3 py-2 cursor-pointer mb-1 ${
                                                  active
                                                    ? "bg-[#21df4b] text-white"
                                                    : "text-gray-900"
                                                } ${
                                                  selected
                                                    ? "bg-[#21df4b] text-white"
                                                    : "text-gray-900"
                                                }`
                                              }
                                              value={color}
                                            >
                                              {({ active, selected }) => (
                                                <>
                                                  <span
                                                    className={`flex justify-between items-center truncate ${
                                                      selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                    }`}
                                                  >
                                                    <span className="">
                                                      {color.name}
                                                    </span>
                                                    <span
                                                      className={`text-sm ${
                                                        active
                                                          ? "!text-white"
                                                          : "text-[#bbbbbb]"
                                                      } ${
                                                        selected
                                                          ? "!text-white"
                                                          : "text-[#bbbbbb]"
                                                      }`}
                                                    >
                                                      {color.hex}
                                                    </span>
                                                  </span>
                                                </>
                                              )}
                                            </Listbox.Option>
                                            {color?.variants?.map(
                                              (item, itemIdx) => {
                                                return (
                                                  <Listbox.Option
                                                    key={itemIdx}
                                                    onClick={() =>
                                                      formik.setFieldValue(
                                                        `shadowValue[${i}].color`,
                                                        color?.name +
                                                          "-" +
                                                          item?.variant
                                                      )
                                                    }
                                                    className={({
                                                      active,
                                                      selected,
                                                    }) =>
                                                      `relative select-none px-3 py-2 cursor-pointer mb-1 ${
                                                        active
                                                          ? "bg-[#21df4b] text-white"
                                                          : "text-gray-900"
                                                      } ${
                                                        selected
                                                          ? "bg-[#21df4b] text-white"
                                                          : "text-gray-900"
                                                      }`
                                                    }
                                                    value={item}
                                                  >
                                                    {({ active, selected }) => (
                                                      <>
                                                        <span
                                                          className={`flex justify-between items-center truncate ${
                                                            selected
                                                              ? "font-medium"
                                                              : "font-normal"
                                                          }`}
                                                        >
                                                          <span className="">
                                                            {color?.name}-
                                                            {item?.variant}
                                                          </span>
                                                          <span
                                                            className={`text-sm ${
                                                              active
                                                                ? "!text-white"
                                                                : "text-[#bbbbbb]"
                                                            } ${
                                                              selected
                                                                ? "!text-white"
                                                                : "text-[#bbbbbb]"
                                                            }`}
                                                          >
                                                            {item.color}
                                                          </span>
                                                        </span>
                                                      </>
                                                    )}
                                                  </Listbox.Option>
                                                );
                                              }
                                            )}
                                          </>
                                        ))}
                                        <div
                                          className={`group relative select-none px-3 py-2 cursor-pointer mb-1 hover:bg-[#21df4b] hover:text-white`}
                                          onClick={openAddColorModal}
                                        >
                                          <>
                                            <span
                                              className={`flex items-center truncate gap-2`}
                                            >
                                              <div
                                                className={`border rounded-full size-8 flex justify-center items-center group-hover:border-white border-[#dedede]`}
                                              >
                                                <svg
                                                  id="Group_2"
                                                  data-name="Group 2"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="18"
                                                  height="18"
                                                  viewBox="0 0 18 18"
                                                  className="group-hover:fill-white fill-black"
                                                >
                                                  <g
                                                    id="Group_1"
                                                    data-name="Group 1"
                                                  >
                                                    <rect
                                                      id="Rectangle_1"
                                                      data-name="Rectangle 1"
                                                      width="18"
                                                      height="18"
                                                      transform="translate(18 18) rotate(180)"
                                                      opacity="0"
                                                    />
                                                    <path
                                                      id="Path_1"
                                                      data-name="Path 1"
                                                      d="M15.25,9.25h-4.5V4.75a.75.75,0,0,0-1.5,0v4.5H4.75a.75.75,0,0,0,0,1.5h4.5v4.5a.75.75,0,0,0,1.5,0v-4.5h4.5a.75.75,0,0,0,0-1.5Z"
                                                      transform="translate(-1 -1)"
                                                    />
                                                  </g>
                                                </svg>
                                              </div>

                                              <span className="">
                                                Add new color
                                              </span>
                                            </span>
                                          </>
                                        </div>
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </Listbox>
                              </div>
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
                                  value={
                                    formik.values.shadowValue[i]?.horizontal
                                  }
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
                      Add box shadow
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <AddColorModal
        isOpen={isAddColorModalOpen}
        closeModal={closeAddColorModal}
      />
    </>
  );
};

export default EditBoxShadowModal;
