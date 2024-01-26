import React, { useState } from "react";
import {
  UilCopyAlt,
  UilCheckCircle,
  UilUserPlus,
  UilMessage,
} from "@iconscout/react-unicons";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const ChatInterface = ({ roomId, username }) => {
  const [copy, setCopy] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

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

  const sendMessage = () => {
    if (text.trim() !== "") {
      setMessages([...messages, { text, sender: "self" }]);

      setText("");
    }
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
          <div className="w-2/3 h-screen m-auto relative">
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
            <div className="absolute w-full bottom-0 p-2">
              <span className="p-2 text-xs font-pop">{username} is typing..</span>
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
    </div>
  );
};

export default ChatInterface;
