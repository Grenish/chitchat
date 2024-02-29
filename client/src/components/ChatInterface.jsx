import React, { useState, useRef, useEffect } from "react";
import {
  UilCopyAlt,
  UilCheckCircle,
  UilUserPlus,
  UilMessage,
  UilEditAlt,
  UilPen,
} from "@iconscout/react-unicons";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const ChatInterface = ({ roomId, username }) => {
  const [copy, setCopy] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const [penPosition, setPenPosition] = useState({ x: 0, y: 0 });

  const handleInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;

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

  const sendMessage = () => {
    if (text.trim() !== "") {
      setMessages([...messages, { text, sender: "self" }]);

      setText("");
    }
  };

  const handleMouseMove = (e) => {
    setPenPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="flex">
      <div className="relative w-1/4 border-2 border-slate-500">
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
          <div className="h-screen m-auto relative">
            {/* Chat Messages */}
            <div className=" p-4 w-full h-[90vh] flex flex-col justify-end items-end">
              {/* Self Messages */}
              <div className="flex flex-col justify-end items-end w-full">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className="bg-neutral-300 mt-2 p-2 rounded-t-2xl rounded-l-2xl"
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              {/* Other Messages */}
              <div className="flex flex-col justify-start items-start w-full">
                <div className="bg-neutral-300 mt-2 p-2 rounded-t-2xl rounded-r-2xl">
                  Hello there
                </div>
              </div>
            </div>

            {/* Input Field and Send Button */}
            <div className="absolute w-full bottom-0 p-2 ">
              <span className="p-2 text-xs font-pop">
                {username} is typing..
              </span>
              <div className="p-2 bg-white rounded-xl flex items-center border">
                <input
                  type="text"
                  onChange={handleInput}
                  value={text}
                  placeholder="Say Hi..."
                  className="w-full p-2 outline-none bg-transparent"
                />
                <button onClick={sendMessage}>
                  <UilMessage
                    size="30"
                    className="text-gray-400 hover:text-gray-600 transition-colors ease-in-out duration-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen relative" onMouseMove={handleMouseMove}>
        <canvas
          className="bg-slate-50 w-full h-screen"
          onMouseMove={handleMouseMove}
        ></canvas>
        <UilPen
          size="30"
          className="text-gray-900 absolute top-0 left-0 cursor-pointer"
        />
        <div className="absolute z-[99] bottom-5 flex justify-center item-center w-full">
          <div className="flex w-1/2 bg-slate-300 p-2 rounded-2xl justify-evenly">
            <UilEditAlt
              size="30"
              className="text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
            />
            <span className="p-3 rounded-full border-2 cursor-pointer bg-red-500"></span>
            <span className="p-3 rounded-full border-2 cursor-pointer bg-yellow-400"></span>
            <span className="p-3 rounded-full border-2 cursor-pointer bg-blue-600"></span>
            <span className="p-3 rounded-full border-2 cursor-pointer bg-black"></span>
            <span className="p-3 rounded-full border-2 cursor-pointer bg-green-600"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
