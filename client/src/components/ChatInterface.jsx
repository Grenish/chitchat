import React, { useState } from "react";
import {
  UilCopyAlt,
  UilCheckCircle,
  UilUserPlus,
} from "@iconscout/react-unicons";
// import { Input } from "antd";
// const { TextArea } = Input;

const ChatInterface = ({ roomId, username }) => {
  const [copy, setCopy] = useState(false);
  const [text, setText] = useState("");

  const handleInput = (event) => {
    // Set the textarea height to auto to allow it to resize based on content
    event.target.style.height = "auto";

    // Set the textarea height to the scrollHeight, which is the actual height of the content
    event.target.style.height = `${event.target.scrollHeight}px`;

    // Update the state with the current text
    setText(event.target.value);
  };

  const copyToClipboard = () => {
    const code = document.getElementById("seccode");
    navigator.clipboard.writeText(code.innerText);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  return (
    <div>
      <div className="relative w-full">
        <header className="border-b border-gray-300 bg-white fixed top-0 z-[99] left-0 w-full">
          <nav>
            <div className="flex flex-row justify-between items-center p-4">
              <div className="flex flex-row items-center space-x-2">
                <span className="font-semibold text-lg" id="seccode">
                  {roomId}
                </span>
                <button onClick={copyToClipboard}>
                  {copy ? (
                    <UilCheckCircle size="20" className="text-gray-400" />
                  ) : (
                    <UilCopyAlt size="20" className="text-gray-400" />
                  )}
                </button>
              </div>
              {/* <div className="">{username}</div> */}
              <div className="flex flex-row items-center">
                <button className="rounded-full  flex justify-center items-center">
                  <UilUserPlus
                    size="30"
                    className="text-gray-400 hover:text-gray-600 transition-colors ease-in-out duration-300"
                  />
                </button>
              </div>
            </div>
          </nav>
        </header>
        <div className="w-full">
          <div className="w-2/3 h-screen bg-rose-500 m-auto relative">
            {/* Chat Messages */}

            {/* Input Field and Send Button */}
            <div className="absolute w-full bottom-4">
              <div className="p-3">
                <textarea
                  value={text}
                  onChange={handleInput}
                  placeholder="Type something..."
                  className="border border-gray-300 rounded p-2 outline-teal-500"
                  rows={1}
                  style={{
                    minHeight: "6px",
                    maxHeight: "100px",
                    overflowY: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
