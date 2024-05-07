import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CodeBlock from "../CodeBlock";

const OffCanvas = ({ isOffcanvasOpen, closeOffcanvas }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted
    ? ReactDOM.createPortal(
        <>
          {isOffcanvasOpen ? (
            <div
              className="offcanvas-backdrop fixed inset-0 bg-[#00000090] z-10"
              onClick={closeOffcanvas}
            />
          ) : (
            ""
          )}
          <div
            className={`${
              isOffcanvasOpen ? "translate-x-0" : "translate-x-full"
            } offcanvas-body bg-white border border-[#ededed] p-4 fixed top-0 right-0 max-w-[575px] w-full transition-transform duration-300 ease-in-out z-[11]`}
          >
            <button
              className="size-8 rounded-full flex justify-center items-center text-2xl absolute top-8 right-5"
              onClick={closeOffcanvas}
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
            <h2 className="ttl text-3xl font-semibold mb-6 pt-4">Code</h2>
            <CodeBlock />
          </div>
        </>,
        document.getElementById("offcanvas-root")
      )
    : null;
};

export default OffCanvas;
