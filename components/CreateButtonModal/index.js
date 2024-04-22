import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import style from "./CreateButtonModal.module.scss";
import { useRecoilState } from "recoil";
import { buttonState } from "@/atoms/buttonState";

const CreateButtonModal = ({
  isCreateButtonModalOpen,
  closeCreateButtonModal,
}) => {
  const [buttonData, setButtonData] = useRecoilState(buttonState);

  const formik = useFormik({
    initialValues: {
      id: "",
      buttonName: "sample",
      buttonType: "filled",
      bgHex: "#000000",
      borderHex: "#000000",
      textHex: "#FFFFFF",
      buttonPadding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
      buttonBorder: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
      },
    },
    onSubmit: (values, { resetForm }) => {
      const newData = {
        id: Math.floor(Math.random() * 9999 + 2),
        name: values.buttonName,
        buttonType: values.buttonType,
        bgColor: values.buttonType === "filled" ? values.bgHex : "",
        borderColor: values.buttonType !== "link" ? values.borderHex : "",
        textColor: values.textHex,
        padding: {
          top: values.buttonPadding.top,
          bottom: values.buttonPadding.bottom,
          left: values.buttonPadding.left,
          right: values.buttonPadding.right,
        },
        border:
          values.buttonType !== "link"
            ? {
                top: values.buttonBorder.top,
                bottom: values.buttonBorder.bottom,
                left: values.buttonBorder.left,
                right: values.buttonBorder.right,
              }
            : "",
      };
      setButtonData((prev) => [...prev, newData]);
      closeCreateButtonModal();
      resetForm();
    },
  });
  return (
    <Transition appear show={isCreateButtonModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeCreateButtonModal}
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
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg transition-all">
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
                      backgroundColor:
                        formik.values.buttonType === "filled"
                          ? formik.values.bgHex
                          : "transparent",
                      color: formik.values.textHex,
                      padding: `${formik.values.buttonPadding.top}px ${formik.values.buttonPadding.right}px ${formik.values.buttonPadding.bottom}px ${formik.values.buttonPadding.left}px`,
                      borderTop: `${
                        formik.values.buttonType !== "link"
                          ? `${formik.values.buttonBorder.top}px solid ${formik.values.borderHex}`
                          : ""
                      }`,
                      borderRight: `${
                        formik.values.buttonType !== "link"
                          ? `${formik.values.buttonBorder.right}px solid ${formik.values.borderHex}`
                          : ""
                      }`,
                      borderBottom: `${
                        formik.values.buttonType !== "link"
                          ? `${formik.values.buttonBorder.bottom}px solid ${formik.values.borderHex}`
                          : ""
                      }`,
                      borderLeft: `${
                        formik.values.buttonType !== "link"
                          ? `${formik.values.buttonBorder.left}px solid ${formik.values.borderHex}`
                          : ""
                      }`,
                    }}
                  >
                    {formik.values.buttonName}
                  </button>
                  <div className="text-center mt-4">
                    .btn-{formik.values.buttonName}
                  </div>
                </div>
                <form
                  action=""
                  className="grid grid-cols-2 gap-4"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Enter button name"
                      className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                      id="buttonName"
                      name="buttonName"
                      onChange={formik.handleChange}
                      value={formik.values.buttonName}
                    />
                  </div>

                  <fieldset className="space-y-4 col-span-2">
                    <legend className="text-sm font-semibold">
                      Button Type
                    </legend>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="filledButton"
                          name="buttonType"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                          onChange={() =>
                            formik.setFieldValue("buttonType", "filled")
                          }
                          checked={formik.values.buttonType === "filled"}
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
                          name="buttonType"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                          onChange={() =>
                            formik.setFieldValue("buttonType", "outline")
                          }
                          checked={formik.values.buttonType === "outline"}
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
                          name="buttonType"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                          onChange={() =>
                            formik.setFieldValue("buttonType", "link")
                          }
                          checked={formik.values.buttonType === "link"}
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

                  {formik.values.buttonType === "outline" ? (
                    <div className="">
                      <label
                        htmlFor="bgHex"
                        className="text-sm font-medium mb-1 block"
                      >
                        Border color
                      </label>
                      <div className="border border-[#dedede] h-9 p-1 flex gap-2">
                        <input
                          type="color"
                          className={`${style.color_picker} flex-[0_0_3rem] w-12 h-[26px]`}
                          id="borderHex"
                          name="borderHex"
                          onChange={formik.handleChange}
                          value={formik.values.borderHex}
                        />
                        <span className="uppercase">
                          {formik.values.borderHex}
                        </span>
                      </div>
                    </div>
                  ) : formik.values.buttonType === "filled" ? (
                    <>
                      <div className="">
                        <label
                          htmlFor="bgHex"
                          className="text-sm font-medium mb-1 block"
                        >
                          Background color
                        </label>
                        <div className="border border-[#dedede] h-9 p-1 flex gap-2">
                          <input
                            type="color"
                            className={`${style.color_picker} flex-[0_0_3rem] w-12 h-[26px]`}
                            id="bgHex"
                            name="bgHex"
                            onChange={formik.handleChange}
                            value={formik.values.bgHex}
                          />
                          <span className="uppercase">
                            {formik.values.bgHex}
                          </span>
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="bgHex"
                          className="text-sm font-medium mb-1 block"
                        >
                          Border color
                        </label>
                        <div className="border border-[#dedede] h-9 p-1 flex gap-2">
                          <input
                            type="color"
                            className={`${style.color_picker} flex-[0_0_3rem] w-12 h-[26px]`}
                            id="borderHex"
                            name="borderHex"
                            onChange={formik.handleChange}
                            value={formik.values.borderHex}
                          />
                          <span className="uppercase">
                            {formik.values.borderHex}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : formik.values.buttonType === "link" ? (
                    <></>
                  ) : null}

                  <div className="">
                    <label
                      htmlFor="bgHex"
                      className="text-sm font-medium mb-1 block"
                    >
                      Text color
                    </label>
                    <div className="border border-[#dedede] h-9 p-1 flex gap-2">
                      <input
                        type="color"
                        className={`${style.color_picker} flex-[0_0_3rem] w-12 h-[26px]`}
                        id="textHex"
                        name="textHex"
                        onChange={formik.handleChange}
                        value={formik.values.textHex}
                      />
                      <span className="uppercase">{formik.values.textHex}</span>
                    </div>
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
                          formik.values.buttonType === "link"
                            ? "brightness-50"
                            : ""
                        }`}
                      >
                        <input
                          type="number"
                          name="buttonBorder.top"
                          id="buttonBorderTop"
                          onChange={formik.handleChange}
                          value={formik.values.buttonBorder.top}
                          className="padding-top text-sm w-7 h-5 absolute top-1 left-1/2 -translate-x-1/2 bg-[#00000000] text-center"
                          disabled={formik.values.buttonType === "link"}
                        />
                        <input
                          type="number"
                          name="buttonBorder.bottom"
                          id="buttonBorderBottom"
                          onChange={formik.handleChange}
                          value={formik.values.buttonBorder.bottom}
                          className="padding-bottom text-sm w-7 h-5 absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#00000000] text-center"
                          disabled={formik.values.buttonType === "link"}
                        />
                        <input
                          type="number"
                          name="buttonBorder.left"
                          id="buttonBorderLeft"
                          onChange={formik.handleChange}
                          value={formik.values.buttonBorder.left}
                          className="padding-left text-sm w-7 h-5 absolute top-1/2 left-1 -translate-y-1/2 bg-[#00000000] text-center"
                          disabled={formik.values.buttonType === "link"}
                        />
                        <input
                          type="number"
                          name="buttonBorder.right"
                          id="buttonBorderRight"
                          onChange={formik.handleChange}
                          value={formik.values.buttonBorder.right}
                          className="padding-right text-sm w-7 h-5 absolute top-1/2 right-1 -translate-y-1/2 bg-[#00000000] text-center"
                          disabled={formik.values.buttonType === "link"}
                        />
                      </div>
                      <div className="bg-[#a3f0b7] border border-dashed border-black inset-x-9 inset-y-7 absolute">
                        <input
                          type="number"
                          name="buttonPadding.top"
                          id="buttonPaddingTop"
                          onChange={formik.handleChange}
                          value={formik.values.buttonPadding.top}
                          className="padding-top text-sm w-7 h-5 absolute top-1 left-1/2 -translate-x-1/2 bg-[#00000000] text-center"
                        />
                        <input
                          type="number"
                          name="buttonPadding.bottom"
                          id=""
                          onChange={formik.handleChange}
                          value={formik.values.buttonPadding.bottom}
                          className="padding-bottom text-sm w-7 h-5 absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#00000000] text-center"
                        />
                        <input
                          type="number"
                          name="buttonPadding.left"
                          id=""
                          onChange={formik.handleChange}
                          value={formik.values.buttonPadding.left}
                          className="padding-left text-sm w-7 h-5 absolute top-1/2 left-1 -translate-y-1/2 bg-[#00000000] text-center"
                        />
                        <input
                          type="number"
                          name="buttonPadding.right"
                          id=""
                          onChange={formik.handleChange}
                          value={formik.values.buttonPadding.right}
                          className="padding-right text-sm w-7 h-5 absolute top-1/2 right-1 -translate-y-1/2 bg-[#00000000] text-center"
                        />
                      </div>
                      <div className="bg-[#93bdec] border border-black absolute inset-x-[72px] inset-y-14 flex justify-center items-center text-sm">
                        w x h
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 col-span-2 w-full h-9 bg-[#21DF4B] text-white"
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
  );
};

export default CreateButtonModal;
