import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import style from "./CreateButtonModal.module.scss";
import { useRecoilState } from "recoil";
import { buttonState } from "@/atoms/buttonState";
import AddColorModal from "../AddColorModal";
import { colorState } from "@/atoms/colorState";
import { fontWeightState } from "@/atoms/fontWeightState";
import { pxToRem } from "../utils/pxToRem";
import AddFontWeightModal from "../AddFontWeightModal";

const CreateButtonModal = ({
  isCreateButtonModalOpen,
  closeCreateButtonModal,
}) => {
  const [buttonData, setButtonData] = useRecoilState(buttonState);
  const [colorData, setColorData] = useRecoilState(colorState);
  const [fontWeightData, setFontWeightData] = useRecoilState(fontWeightState);
  const [isAddColorModalOpen, setIsAddColorModalOpen] = useState(false);
  const [isAddWeightModalOpen, setIsAddWeightModalOpen] = useState(false);

  const openAddColorModal = () => {
    setIsAddColorModalOpen(true);
  };

  const closeAddColorModal = () => {
    setIsAddColorModalOpen(false);
  };

  const openAddWeightModal = () => {
    setIsAddWeightModalOpen(true);
  };

  const closeAddWeightModal = () => {
    setIsAddWeightModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "sample",
      type: "filled",
      bg: "black",
      border: {
        color: "black",
        width: {
          top: 1,
          bottom: 1,
          left: 1,
          right: 1,
        },
      },
      text: {
        color: "white",
        weight: "400",
        size: "16",
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
      radius: {
        top_right: 0,
        bottom_right: 0,
        bottom_left: 0,
        top_left: 0,
      },
    },
    onSubmit: (values, { resetForm }) => {
      const newData = {
        id: Math.floor(Math.random() * 9999 + 2),
        name: values.name,
        type: values.type,
        bg: values.type === "filled" ? values.bg : "",
        border:
          values.type !== "link"
            ? {
                color: values.border.color,
                width: {
                  top: values.border.width.top,
                  bottom: values.border.width.bottom,
                  left: values.border.width.left,
                  right: values.border.width.right,
                },
              }
            : "",
        text: {
          color: values.text.color,
          weight: values.text.weight,
          size: values.text.size,
        },
        padding: {
          top: values.padding.top,
          bottom: values.padding.bottom,
          left: values.padding.left,
          right: values.padding.right,
        },
        radius: {
          top_right: values.top_right,
          bottom_right: values.bottom_right,
          bottom_left: values.bottom_left,
          top_left: values.top_left,
        },
      };
      setButtonData((prev) => [...prev, newData]);
      closeCreateButtonModal();
      resetForm();
    },
  });
  return (
    <>
      <Transition appear show={isCreateButtonModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => false && closeCreateButtonModal()}
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
                <Dialog.Panel className="w-full max-w-xl transform rounded-2xl bg-white p-6 text-left align-middle transition-all relative">
                  <button
                    className="size-7 flex justify-center items-center absolute top-3 right-3"
                    onClick={closeCreateButtonModal}
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
                    Create Button
                  </Dialog.Title>
                  <div className="button-container flex flex-col justify-center items-center my-5">
                    <div className="text-sm text-center font-semibold mb-2">
                      Preview
                    </div>
                    <button
                      type="button"
                      className="capitalize"
                      style={{
                        fontSize: `${pxToRem(formik.values.text.size)}rem`,
                        fontWeight: formik.values.text.weight,
                        borderRadius: `${formik.values.radius.top_left}px ${formik.values.radius.top_right}px ${formik.values.radius.bottom_right}px ${formik.values.radius.bottom_left}px`,
                        backgroundColor:
                          formik?.values?.type === "filled"
                            ? colorData?.filter(
                                (color) => color?.name === formik.values.bg
                              )[0]?.hex ??
                              colorData
                                ?.filter(
                                  (color) =>
                                    color?.name ===
                                    formik.values.bg.split("-")[0]
                                )[0]
                                ?.variants?.filter(
                                  (variant) =>
                                    variant?.variant ===
                                    formik.values.bg.split("-")[1]
                                )[0]?.color
                            : "",
                        color:
                          colorData?.filter(
                            (color) => color?.name === formik.values.text.color
                          )[0]?.hex ??
                          colorData
                            ?.filter(
                              (color) =>
                                color?.name ===
                                formik.values.text.color.split("-")[0]
                            )[0]
                            ?.variants?.filter(
                              (variant) =>
                                variant?.variant ===
                                formik.values.text.color.split("-")[1]
                            )[0]?.color,
                        padding: `${formik.values.padding.top}px ${formik.values.padding.right}px ${formik.values.padding.bottom}px ${formik.values.padding.left}px`,
                        borderTop: `${
                          formik.values.type !== "link"
                            ? `${formik.values.border.width.top}px solid ${
                                colorData?.filter(
                                  (color) =>
                                    color?.name === formik.values.border.color
                                )[0]?.hex ??
                                colorData
                                  ?.filter(
                                    (color) =>
                                      color?.name ===
                                      formik.values.border.color.split("-")[0]
                                  )[0]
                                  ?.variants?.filter(
                                    (variant) =>
                                      variant?.variant ===
                                      formik.values.border.color.split("-")[1]
                                  )[0]?.color
                              }`
                            : ""
                        }`,
                        borderRight: `${
                          formik.values.type !== "link"
                            ? `${formik.values.border.width.right}px solid ${
                                colorData?.filter(
                                  (color) =>
                                    color?.name === formik.values.border.color
                                )[0]?.hex ??
                                colorData
                                  ?.filter(
                                    (color) =>
                                      color?.name ===
                                      formik.values.border.color.split("-")[0]
                                  )[0]
                                  ?.variants?.filter(
                                    (variant) =>
                                      variant?.variant ===
                                      formik.values.border.color.split("-")[1]
                                  )[0]?.color
                              }`
                            : ""
                        }`,
                        borderBottom: `${
                          formik.values.type !== "link"
                            ? `${formik.values.border.width.bottom}px solid ${
                                colorData?.filter(
                                  (color) =>
                                    color?.name === formik.values.border.color
                                )[0]?.hex ??
                                colorData
                                  ?.filter(
                                    (color) =>
                                      color?.name ===
                                      formik.values.border.color.split("-")[0]
                                  )[0]
                                  ?.variants?.filter(
                                    (variant) =>
                                      variant?.variant ===
                                      formik.values.border.color.split("-")[1]
                                  )[0]?.color
                              }`
                            : ""
                        }`,
                        borderLeft: `${
                          formik.values.type !== "link"
                            ? `${formik.values.border.width.left}px solid ${
                                colorData?.filter(
                                  (color) =>
                                    color?.name === formik.values.border.color
                                )[0]?.hex ??
                                colorData
                                  ?.filter(
                                    (color) =>
                                      color?.name ===
                                      formik.values.border.color.split("-")[0]
                                  )[0]
                                  ?.variants?.filter(
                                    (variant) =>
                                      variant?.variant ===
                                      formik.values.border.color.split("-")[1]
                                  )[0]?.color
                              }`
                            : ""
                        }`,
                      }}
                    >
                      {formik.values.type} {formik.values.name}
                    </button>
                    <div className="text-center mt-4">
                      .btn-{formik.values.name}
                    </div>
                  </div>
                  <form
                    action=""
                    className="grid grid-cols-2 gap-4"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium mb-1 block"
                      >
                        Button name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter button name"
                        className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                    </div>

                    <fieldset className="space-y-4 col-span-2">
                      <legend className="text-sm font-medium">
                        Button type
                      </legend>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="filledButton"
                            name="type"
                            className="h-4 w-4 accent-black"
                            onChange={() =>
                              formik.setFieldValue("type", "filled")
                            }
                            checked={formik.values.type === "filled"}
                          />
                          <label
                            htmlFor="filledButton"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Button Filled
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="outlinedButton"
                            name="type"
                            className="h-4 w-4 accent-black"
                            onChange={() =>
                              formik.setFieldValue("type", "outline")
                            }
                            checked={formik.values.type === "outline"}
                          />
                          <label
                            htmlFor="outlinedButton"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Button Outline
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="linkButton"
                            name="type"
                            className="h-4 w-4 accent-black"
                            onChange={() =>
                              formik.setFieldValue("type", "link")
                            }
                            checked={formik.values.type === "link"}
                          />
                          <label
                            htmlFor="linkButton"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Button Link
                          </label>
                        </div>
                      </div>
                    </fieldset>

                    {formik.values.type === "outline" ? (
                      <div>
                        <label
                          htmlFor="border.color"
                          className="text-sm font-medium mb-1 block"
                        >
                          Border color
                        </label>
                        <Listbox value={formik.values.border.color}>
                          <div className="relative">
                            <Listbox.Button className="relative w-full cursor-default border border-[#dedede] h-10">
                              <span className="block truncate text-left ps-4 text-md">
                                {formik.values.border.color}
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
                              <Listbox.Options className="absolute mt-1 max-h-56 w-full overflow-auto bg-white border border-[#dedede] outline-none p-3 no-scrollbar z-[2]">
                                {colorData.map((color, colorIdx) => (
                                  <Fragment key={colorIdx}>
                                    <Listbox.Option
                                      onClick={() =>
                                        formik.setFieldValue(
                                          `border.color`,
                                          color?.name
                                        )
                                      }
                                      className={({ active, selected }) =>
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
                                    {color?.variants?.map((item, itemIdx) => {
                                      return (
                                        <Listbox.Option
                                          key={itemIdx}
                                          onClick={() =>
                                            formik.setFieldValue(
                                              `border.color`,
                                              color?.name + "-" + item?.variant
                                            )
                                          }
                                          className={({ active, selected }) =>
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
                                                  {color?.name}-{item?.variant}
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
                                    })}
                                  </Fragment>
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
                                          <g id="Group_1" data-name="Group 1">
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

                                      <span className="">Add new color</span>
                                    </span>
                                  </>
                                </div>
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                    ) : formik.values.type === "filled" ? (
                      <>
                        <div>
                          <label
                            htmlFor="bg"
                            className="text-sm font-medium mb-1 block"
                          >
                            Background color
                          </label>
                          <Listbox value={formik.values.bg}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-default border border-[#dedede] h-10">
                                <span className="block truncate text-left ps-4 text-md">
                                  {formik.values.bg}
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
                                <Listbox.Options className="absolute mt-1 max-h-56 w-full overflow-auto bg-white border border-[#dedede] outline-none p-3 no-scrollbar z-[2]">
                                  {colorData.map((color, colorIdx) => (
                                    <Fragment key={colorIdx}>
                                      <Listbox.Option
                                        onClick={() =>
                                          formik.setFieldValue(
                                            `bg`,
                                            color?.name
                                          )
                                        }
                                        className={({ active, selected }) =>
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
                                      {color?.variants?.map((item, itemIdx) => {
                                        return (
                                          <Listbox.Option
                                            key={itemIdx}
                                            onClick={() =>
                                              formik.setFieldValue(
                                                `bg`,
                                                color?.name +
                                                  "-" +
                                                  item?.variant
                                              )
                                            }
                                            className={({ active, selected }) =>
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
                                      })}
                                    </Fragment>
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
                                            <g id="Group_1" data-name="Group 1">
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

                                        <span className="">Add new color</span>
                                      </span>
                                    </>
                                  </div>
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                        <div>
                          <label
                            htmlFor="border.color"
                            className="text-sm font-medium mb-1 block"
                          >
                            Border color
                          </label>
                          <Listbox value={formik.values.border.color}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-default border border-[#dedede] h-10">
                                <span className="block truncate text-left ps-4 text-md">
                                  {formik.values.border.color}
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
                                <Listbox.Options className="absolute mt-1 max-h-56 w-full overflow-auto bg-white border border-[#dedede] outline-none p-3 no-scrollbar z-[2]">
                                  {colorData.map((color, colorIdx) => (
                                    <Fragment key={colorIdx}>
                                      <Listbox.Option
                                        onClick={() =>
                                          formik.setFieldValue(
                                            `border.color`,
                                            color?.name
                                          )
                                        }
                                        className={({ active, selected }) =>
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
                                      {color?.variants?.map((item, itemIdx) => {
                                        return (
                                          <Listbox.Option
                                            key={itemIdx}
                                            onClick={() =>
                                              formik.setFieldValue(
                                                `border.color`,
                                                color?.name +
                                                  "-" +
                                                  item?.variant
                                              )
                                            }
                                            className={({ active, selected }) =>
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
                                      })}
                                    </Fragment>
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
                                            <g id="Group_1" data-name="Group 1">
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

                                        <span className="">Add new color</span>
                                      </span>
                                    </>
                                  </div>
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                      </>
                    ) : formik.values.type === "link" ? (
                      <></>
                    ) : null}

                    <div>
                      <label
                        htmlFor="border.color"
                        className="text-sm font-medium mb-1 block"
                      >
                        Text color
                      </label>
                      <Listbox value={formik.values.text.color}>
                        <div className="relative">
                          <Listbox.Button className="relative w-full cursor-default border border-[#dedede] h-10">
                            <span className="block truncate text-left ps-4 text-md">
                              {formik.values.text.color}
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
                            <Listbox.Options className="absolute mt-1 max-h-56 w-full overflow-auto bg-white border border-[#dedede] outline-none p-3 no-scrollbar z-[2]">
                              {colorData.map((color, colorIdx) => (
                                <Fragment key={colorIdx}>
                                  <Listbox.Option
                                    onClick={() =>
                                      formik.setFieldValue(
                                        `text.color`,
                                        color?.name
                                      )
                                    }
                                    className={({ active, selected }) =>
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
                                          <span className="">{color.name}</span>
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
                                  {color?.variants?.map((item, itemIdx) => {
                                    return (
                                      <Listbox.Option
                                        key={itemIdx}
                                        onClick={() =>
                                          formik.setFieldValue(
                                            `text.color`,
                                            color?.name + "-" + item?.variant
                                          )
                                        }
                                        className={({ active, selected }) =>
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
                                                {color?.name}-{item?.variant}
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
                                  })}
                                </Fragment>
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
                                        <g id="Group_1" data-name="Group 1">
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

                                    <span className="">Add new color</span>
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
                        htmlFor="size"
                        className="text-sm font-medium mb-1 block"
                      >
                        Font size (px)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Enter button font size"
                          className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                          id="text.size"
                          name="text.size"
                          onChange={formik.handleChange}
                          value={formik.values.text.size}
                        />
                        <span className="text-sm text-[#bbbbbb] absolute top-1/2 right-10 -translate-y-1/2">{`${pxToRem(
                          formik.values.text.size
                        )}rem`}</span>
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="weight"
                        className="text-sm font-medium mb-1 block"
                      >
                        Font weight
                      </label>
                      <Listbox value={formik.values.text.weight}>
                        <div className="relative">
                          <Listbox.Button className="relative w-full cursor-default border border-[#dedede] h-10">
                            <span className="block truncate text-left ps-4 text-md">
                              {formik.values.text.weight}
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
                            <Listbox.Options className="absolute mt-1 max-h-56 w-full overflow-auto bg-white border border-[#dedede] outline-none p-3 no-scrollbar z-[2]">
                              {fontWeightData.map((weight, weightIdx) => (
                                <Fragment key={weightIdx}>
                                  <Listbox.Option
                                    onClick={() =>
                                      formik.setFieldValue(
                                        `text.weight`,
                                        weight?.value
                                      )
                                    }
                                    className={({ active, selected }) =>
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
                                    value={weight}
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
                                            {weight.name}
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
                                            {weight.value}
                                          </span>
                                        </span>
                                      </>
                                    )}
                                  </Listbox.Option>
                                </Fragment>
                              ))}
                              <div
                                className={`group relative select-none px-3 py-2 cursor-pointer mb-1 hover:bg-[#21df4b] hover:text-white`}
                                onClick={openAddWeightModal}
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
                                        <g id="Group_1" data-name="Group 1">
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

                                    <span className="">Add new weight</span>
                                  </span>
                                </>
                              </div>
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>

                    <div
                      className={`${style.box_model} flex flex-col justify-center items-center my-2 col-span-2`}
                    >
                      <div className="text-sm text-center font-semibold mb-2">
                        Other properties
                      </div>
                      <div className="w-64 h-36 relative">
                        <div
                          className={`bg-[#fdffb2] border border-black absolute inset-0 ${
                            formik.values.type === "link" ? "brightness-50" : ""
                          }`}
                        >
                          <>
                            <input
                              type="number"
                              name="radius.top_left"
                              id="radius.top_left"
                              onChange={formik.handleChange}
                              value={
                                formik.values.type !== "link"
                                  ? formik?.values?.radius?.top_left
                                  : ""
                              }
                              placeholder="-"
                              className="padding-top text-sm w-7 h-5 absolute top-0 left-0 -translate-x-full -translate-y-full bg-[#00000000] text-center placeholder:text-black"
                            />
                            <input
                              type="number"
                              name="radius.top_right"
                              id="radius.top_right"
                              onChange={formik.handleChange}
                              value={
                                formik.values.type !== "link"
                                  ? formik?.values?.radius?.top_right
                                  : ""
                              }
                              placeholder="-"
                              className="padding-top text-sm w-7 h-5 absolute top-0 right-0 translate-x-full -translate-y-full bg-[#00000000] text-center placeholder:text-black"
                            />
                            <input
                              type="number"
                              name="radius.bottom_right"
                              id="radius.bottom_right"
                              onChange={formik.handleChange}
                              value={
                                formik.values.type !== "link"
                                  ? formik?.values?.radius?.bottom_right
                                  : ""
                              }
                              placeholder="-"
                              className="padding-top text-sm w-7 h-5 absolute bottom-0 right-0 translate-x-full translate-y-full bg-[#00000000] text-center placeholder:text-black"
                            />
                            <input
                              type="number"
                              name="radius.bottom_left"
                              id="radius.bottom_left"
                              onChange={formik.handleChange}
                              value={
                                formik.values.type !== "link"
                                  ? formik?.values?.radius?.bottom_left
                                  : ""
                              }
                              placeholder="-"
                              className="padding-top text-sm w-7 h-5 absolute bottom-0 left-0 -translate-x-full translate-y-full bg-[#00000000] text-center placeholder:text-black"
                            />
                          </>

                          <input
                            type="number"
                            name="border.width.top"
                            id="border.width.top"
                            onChange={formik.handleChange}
                            value={
                              formik.values.type !== "link"
                                ? formik?.values?.border?.width?.top
                                : ""
                            }
                            placeholder="-"
                            className="padding-top text-sm w-7 h-5 absolute top-1 left-1/2 -translate-x-1/2 bg-[#00000000] text-center placeholder:text-black"
                            disabled={formik?.values?.type === "link"}
                          />
                          <input
                            type="number"
                            name="border.width.bottom"
                            id="border.width.bottom"
                            onChange={formik.handleChange}
                            value={
                              formik.values.type !== "link"
                                ? formik?.values?.border?.width?.bottom
                                : ""
                            }
                            placeholder="-"
                            className="padding-bottom text-sm w-7 h-5 absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#00000000] text-center placeholder:text-black"
                            disabled={formik?.values?.type === "link"}
                          />
                          <input
                            type="number"
                            name="border.width.left"
                            id="border.width.left"
                            onChange={formik.handleChange}
                            value={
                              formik.values.type !== "link"
                                ? formik?.values?.border?.width?.left
                                : ""
                            }
                            placeholder="-"
                            className="padding-left text-sm w-7 h-5 absolute top-1/2 left-1 -translate-y-1/2 bg-[#00000000] text-center placeholder:text-black"
                            disabled={formik?.values?.type === "link"}
                          />
                          <input
                            type="number"
                            name="border.width.right"
                            id="border.width.right"
                            onChange={formik.handleChange}
                            value={
                              formik.values.type !== "link"
                                ? formik?.values?.border?.width?.right
                                : ""
                            }
                            placeholder="-"
                            className="padding-right text-sm w-7 h-5 absolute top-1/2 right-1 -translate-y-1/2 bg-[#00000000] text-center placeholder:text-black"
                            disabled={formik?.values?.type === "link"}
                          />
                        </div>
                        <div className="bg-[#a3f0b7] border border-dashed border-black inset-x-9 inset-y-7 absolute">
                          <input
                            type="number"
                            name="padding.top"
                            id="padding.top"
                            onChange={formik.handleChange}
                            value={formik?.values?.padding?.top}
                            placeholder="-"
                            className="padding-top text-sm w-7 h-5 absolute top-1 left-1/2 -translate-x-1/2 bg-[#00000000] text-center placeholder:text-black"
                          />
                          <input
                            type="number"
                            name="padding.bottom"
                            id="padding.bottom"
                            onChange={formik.handleChange}
                            value={formik?.values?.padding?.bottom}
                            placeholder="-"
                            className="padding-bottom text-sm w-7 h-5 absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#00000000] text-center placeholder:text-black"
                          />
                          <input
                            type="number"
                            name="padding.left"
                            id="padding.left"
                            onChange={formik.handleChange}
                            value={formik?.values?.padding?.left}
                            placeholder="-"
                            className="padding-left text-sm w-7 h-5 absolute top-1/2 left-1 -translate-y-1/2 bg-[#00000000] text-center placeholder:text-black"
                          />
                          <input
                            type="number"
                            name="padding.right"
                            id="padding.right"
                            onChange={formik.handleChange}
                            value={formik?.values?.padding?.right}
                            placeholder="-"
                            className="padding-right text-sm w-7 h-5 absolute top-1/2 right-1 -translate-y-1/2 bg-[#00000000] text-center placeholder:text-black"
                          />
                        </div>
                        <div className="bg-[#93bdec] border border-black absolute inset-x-[72px] inset-y-14 flex justify-center items-center text-sm">
                          w x h
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 col-span-2 w-full h-10 bg-[#21df4b] text-white border border-[#21df4b]"
                    >
                      Create Button
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
      <AddFontWeightModal
        isOpen={isAddWeightModalOpen}
        closeModal={closeAddWeightModal}
      />
    </>
  );
};

export default CreateButtonModal;
