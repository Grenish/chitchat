import React, { useState } from "react";

const Start = ({ onStart }) => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const handleStartClick = () => {
    onStart(roomId, username);
  };

  const handleCreateRoomClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId, username }), 
      });

      if (response.ok) {
        const { roomID } = await response.json(); 
        setRoomId(roomID); 
        onStart(roomID, username); 
      } else {
        console.error("Failed to create room");
      }
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  return (
    <div className="w-full  h-screen flex flex-col justify-center items-center px-4 md:px-0 ">
      <div className="flex flex-col items-center relative">
        <div className="absolute top-14 right-20 z-[-1] p-4 md:p-8 bg-gradient-to-l from-teal-400 to-indigo-400 bolb w-[300px] h-[300px] blur-md" />
        <span className="font-sans text-5xl md:text-6xl font-semibold london bg-gradient-to-r from-indigo-600 to-pink-700 text-transparent bg-clip-text">
          ChitChat
        </span>
        <span className="font-sans text-sm md:text-lg london ">
          Start your way around
        </span>
      </div>

      <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-1/4 p-4 bg-gray-200 mt-5 rounded-xl">
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-2 mt-2 outline-teal-500"
            aria-label="Enter Your Name"
          />
          <input
            type="text"
            placeholder="Joining Code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-2 mt-2 outline-teal-500"
            aria-label="Enter secret code"
          />
          <button
            onClick={handleStartClick}
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-700 text-white font-semibold rounded-xl p-2 mt-2"
            aria-label="Join button"
          >
            Join
          </button>
          <button
            onClick={handleCreateRoomClick}
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-700 text-white font-semibold rounded-xl p-2 mt-2"
            aria-label="Join button"
          >
            Create New Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
