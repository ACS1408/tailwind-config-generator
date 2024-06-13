import React from "react";
import { Tab } from "@headlessui/react";
import CodeMirror from "@uiw/react-codemirror";
import { sublime } from "@uiw/codemirror-theme-sublime";
import useCodeBlock from "./useCodeBlock";

const CodeBlock = () => {
  const { categories, handleCopyCode } = useCodeBlock();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="code-block">
      <Tab.Group>
        <Tab.List
          className="flex rounded-t-md"
          style={{
            backgroundColor: sublime[0][1].value.rules[0].match(
              /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g
            )[0],
          }}
        >
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "outline-none px-6 py-3 text-white text-sm relative",
                  "after:content-[''] after:w-full after:h-[2px] after:bg-white after:absolute after:bottom-0 after:left-0",
                  selected ? "" : "after:hidden"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels
          className="py-2 border-none rounded-b-md h-[calc(100vh_-138px)] overflow-auto no-scrollbar px-3"
          style={{
            backgroundColor: sublime[0][1].value.rules[0].match(
              /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g
            )[0],
          }}
        >
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx}>
              <button
                className="fixed bottom-6 right-6 z-10 bg-[#1a2734] size-12 rounded-full grid place-items-center hover:scale-110 transition-transform duration-300 ease-in-out outline-none"
                onClick={() => handleCopyCode(posts.text)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21.452"
                  viewBox="0 0 20 21.452"
                  fill="#fff"
                >
                  <g
                    id="Group_1"
                    data-name="Group 1"
                    transform="translate(-829 -511)"
                  >
                    <path
                      id="Path_1"
                      data-name="Path 1"
                      d="M20.571,35H9.714A1.707,1.707,0,0,0,8,36.714V47.6A1.722,1.722,0,0,0,9.714,49.31H20.6A1.722,1.722,0,0,0,22.31,47.6V36.714A1.743,1.743,0,0,0,20.571,35Zm.286,12.571a.264.264,0,0,1-.262.262H9.714a.264.264,0,0,1-.262-.262V36.714a.264.264,0,0,1,.262-.262H20.6a.264.264,0,0,1,.262.262Z"
                      transform="translate(821 483.143)"
                    />
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M44.571,5H33.714A1.707,1.707,0,0,0,32,6.714v4h1.429v-4a.264.264,0,0,1,.262-.262H44.571a.264.264,0,0,1,.262.262V17.6a.264.264,0,0,1-.262.262H42v1.429h2.571a1.722,1.722,0,0,0,1.714-1.714V6.714A1.707,1.707,0,0,0,44.571,5Z"
                      transform="translate(802.714 506)"
                    />
                  </g>
                </svg>
              </button>
              <CodeMirror
                value={posts.text}
                height="auto"
                theme={sublime}
                editable={false}
                extensions={[posts.language]}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CodeBlock;
