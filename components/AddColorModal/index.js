import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import style from "./AddColorModal.module.scss";

const AddColorModal = ({
  isOpen,
  closeModal,
  colorData,
  setColorData,
  defaultColor,
  defaultName,
}) => {
  const [color, setColor] = useState(defaultColor ?? "#000000");
  const [name, setName] = useState(defaultName ?? "");
  const [variants, setVariants] = useState(
    defaultName
      ? [].concat.apply(
          [],
          colorData
            ?.filter((item) => item.name === defaultName)
            ?.map((item) => item.variants)
        )
      : []
  );
  const [hasVariants, setHasVariants] = useState(false);
  const [variantCount, setVariantCount] = useState(0);
  const [addVariantFields, setAddVariantFields] = useState(
    variants?.length > 0 ? variants?.length : 1
  );

  const handleToggleVariant = (e, i) => {
    e.target.checked
      ? setVariantCount(variantCount + 1)
      : setVariantCount(variantCount - 1);

    if (variants[i] !== undefined) {
      setVariants((prev) =>
        prev.map((item, index) =>
          index === i ? { ...item, checked: !item?.checked } : item
        )
      );
    } else {
      let isChecked = false;
      setVariants((prev) => [...prev, { checked: !isChecked }]);
    }
  };

  const handleAddVariant = () => {
    setAddVariantFields(addVariantFields + 1);
  };

  const handleEditVariant = (e, i, field) => {
    if (field === "variant") {
      if (variants[i] !== undefined) {
        setVariants((prev) =>
          prev.map((item, index) =>
            index === i ? { ...item, variant: e.target.value } : item
          )
        );
      } else {
        setVariants((prev) => [...prev, { variant: e.target.value }]);
      }
    } else if (field === "color") {
      if (variants[i] !== undefined) {
        setVariants((prev) =>
          prev.map((item, index) =>
            index === i ? { ...item, color: e.target.value } : item
          )
        );
      } else {
        setVariants((prev) => [...prev, { color: e.target.value }]);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let newItem = {};
    if (hasVariants) {
      newItem = {
        name: name,
        hex: color,
        variants: [...variants],
      };
    } else {
      newItem = {
        name: name,
        hex: color,
      };
    }
    const getIndex = colorData.findIndex(
      (item) => item?.name === newItem?.name
    );
    if (getIndex > -1) {
      setColorData((prev) =>
        prev.map((item, index) => (index === getIndex ? newItem : item))
      );
    } else {
      setColorData((prev) => [...prev, newItem]);
    }

    closeModal();
  };

  useEffect(() => {
    variantCount > 0 ? setHasVariants(true) : setHasVariants(false);
  }, [variantCount]);

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
                  Add Color
                </Dialog.Title>

                <form action="" onSubmit={(e) => handleFormSubmit(e)}>
                  <div className="grid grid-cols-3 gap-5 items-center">
                    <div
                      className={`${style.color_picker_main} col-span-1 flex`}
                    >
                      <input
                        type="color"
                        value={color}
                        className="w-full h-44 rounded-lg"
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className={`${style.variant}`}>
                        {[...Array(addVariantFields)]?.map((_, i) => {
                          return (
                            <div
                              className="flex items-center gap-2 mt-4"
                              key={i}
                            >
                              <div className="flex-[0_0_15px] max-w-[15px]">
                                <input
                                  type="checkbox"
                                  checked={
                                    variants[i]?.checked !== undefined
                                      ? variants[i]?.checked
                                      : false
                                  }
                                  onChange={(e) => handleToggleVariant(e, i)}
                                />
                              </div>
                              <div className="flex items-center flex-[0_0_75%] max-w-[75%]">
                                <div
                                  className={`${
                                    !variants[i]?.checked
                                      ? style.disabled_field
                                      : ""
                                  } border border-[#dedede] h-9 p-1 flex gap-2`}
                                >
                                  <input
                                    type="color"
                                    value={variants[i]?.color ?? color}
                                    className="flex-[0_0_3rem] w-12 h-[26px]"
                                    onChange={(e) =>
                                      handleEditVariant(e, i, "color")
                                    }
                                    disabled={
                                      variants[i]?.checked !== undefined
                                        ? !variants[i]?.checked
                                        : true
                                    }
                                  />
                                  <input
                                    type="text"
                                    className="w-full"
                                    value={variants[i]?.variant ?? ""}
                                    onChange={(e) =>
                                      handleEditVariant(e, i, "variant")
                                    }
                                    disabled={
                                      variants[i]?.checked !== undefined
                                        ? !variants[i]?.checked
                                        : true
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex-[0_0_30px] max-w-[30px] ms-auto flex justify-center items-center">
                                <button
                                  type="button"
                                  className="size-8 rounded-full border border-[#dedede] flex justify-center items-center text-2xl"
                                  onClick={handleAddVariant}
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
