import React, { useState, useEffect, useRef } from "react";
import {
  UilCopyAlt,
  UilCheckCircle,
  UilUserPlus,
  UilMessage,
  UilCancel,
  UilImage,
} from "@iconscout/react-unicons";
import socketIOClient from "socket.io-client";
import Linkify from "linkify-react";

const ChatInterface = ({ roomId, username }) => {
  const [copy, setCopy] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [preText, setPreText] = useState("");
  const newMessage = useRef(null);
  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    // Single socket initialization
    const newSocket = socketIOClient("https://chitchat-uwed.onrender.com");
    setSocket(newSocket);

    newSocket.on("user connected", ({ username }) => {
      setUserStatus(`${username} connected`);
    });

    newSocket.on("user disconnected", ({ username }) => {
      setUserStatus(`${username} disconnected`);
    });

    // Listen for incoming messages
    newSocket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setText(event.target.value);
  };

  const handlePreInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setPreText(event.target.value);
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
    if (text.trim() !== "" && socket) {
      const message = { text, sender: username, image: imageData };
      socket.emit("chat message", message);
      setText("");
      setImageData(null);
    }
  };

  const sendPreMessage = () => {
    if (socket) {
      const message = { text: preText, sender: username, image: imageData };
      socket.emit("chat message", message);
      setPreText("");
      setImageData(null);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Please select an image file below 1MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewSrc(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (newMessage.current) {
      newMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
        <div className="w-full ">
          <div className="md:w-2/3 w-full h-[93vh] sm:h-screen m-auto relative">
            {/* Chat Messages */}
            <div className="p-4 pt-16 w-full h-[85vh] sm:h-[90vh] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-end ${
                    message.sender === username
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {userStatus && (
                    <div className="text-center">
                      <span className="bg-slate-200 p-1 text-xs rounded-xl">
                        {userStatus}
                      </span>
                    </div>
                  )}

                  <div
                    key={index}
                    className={`flex ${
                      message.sender === username
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {/* message box */}
                    <div
                      ref={newMessage}
                      className={`${
                        message.sender === username
                          ? "bg-neutral-300 rounded-l-2xl"
                          : "bg-neutral-300 rounded-r-2xl"
                      } mt-2 p-2 rounded-t-2xl flex flex-col`}
                    >
                      <span className="text-xs font-bold">
                        {message.sender === username ? "You" : message.sender}
                      </span>
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Sent"
                          className="rounded-lg w-[500px] h-[350px] object-cover"
                        />
                      )}
                      <span>
                        <Linkify as="p">{message.text}</Linkify>
                      </span>

                      {/* time */}
                      <span
                        className={`text-xs text-gray-400 ${
                          message.sender === username
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        <p>
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Field and Send Button */}
            <div className="absolute w-full bottom-0 p-2">
              <div className="p-2 bg-white rounded-full sm:rounded-xl flex items-center border relative">
                {previewSrc && (
                  <div className="absolute w-full sm:w-[500px] flex flex-col bg-rose-500 bottom-16 left-0 rounded-xl p-3">
                    <img
                      src={previewSrc}
                      alt="Preview"
                      className="rounded-lg object-cover h-[350px]"
                    />
                    <div className="">
                      <input
                        type="text"
                        onChange={handlePreInput}
                        value={preText}
                        placeholder="Say Hi..."
                        className="w-full p-2 outline-none bg-transparent"
                      />
                    </div>
                    <div className="flex justify-end items-center mt-2 w-full">
                      <button
                        className="flex items-center bg-rose-400 px-2 py-2 rounded-lg mr-5 group"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewSrc(null);
                        }}
                      >
                        <span className="mr-3">Cancel</span>
                        <UilCancel
                          size="25"
                          className="text-gray-400 group-hover:text-gray-600 transition-colors ease-in-out duration-300"
                        />
                      </button>
                      <button
                        className="flex items-center bg-rose-400 px-2 py-2 rounded-lg group"
                        onClick={() => {
                          sendPreMessage();
                          setSelectedFile(null);
                          setPreviewSrc(null);
                        }}
                      >
                        <span className="mr-3">Send</span>
                        <UilMessage
                          size="25"
                          className="text-gray-400 group-hover:text-gray-600 transition-colors ease-in-out duration-300"
                        />
                      </button>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <input
                    type="file"
                    name="file"
                    id="fileInput"
                    hidden
                    onChange={handleFileChange}
                  />
                  <UilImage
                    size="30"
                    className="text-gray-400 hover:text-gray-600 transition-colors ease-in-out duration-300 mr-2"
                  />
                </button>
                <input
                  type="text"
                  onChange={handleInput}
                  value={text}
                  placeholder="Say Hi..."
                  className="w-full p-2 outline-none bg-transparent"
                  onKeyUp={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
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
