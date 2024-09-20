import React, { useState } from "react";

interface StartUpProps {
  onJoin: (name: string) => void; // Accept the onJoin function as a prop
}

const StartUp: React.FC<StartUpProps> = ({ onJoin }) => {
  const [name, setName] = useState<string>("");
  const [joiningCode, setJoiningCode] = useState<string>("");

  const handleJoin = () => {
    if (name.trim()) {
      onJoin(name); // Pass the name to the parent component when the user joins
    } else {
      alert("Please enter your name to join the chat.");
    }
  };

  const handleCreateRoom = () => {
    console.log("Creating new room");
  };

  return (
    <div className="h-screen">
      <div className="relative min-h-screen flex items-center justify-center bg-dracula-darker-900 overflow-hidden">
        {/* LoFi Background Blurs */}
        <div className="absolute border1 top-10 left-10 w-52 h-52 sm:w-72 sm:h-72 bg-gradient-to-r from-dracula-purple to-dracula-pink rounded-full blur-3xl opacity-30"></div>
        <div className="absolute border2 bottom-10 right-10 w-52 h-52 sm:w-72 sm:h-72 bg-gradient-to-r from-dracula-cyan to-dracula-green rounded-full blur-3xl opacity-30"></div>

        {/* Main Content */}
        <div className="relative z-10 text-center  bg-dracula-darkest-700 bg-opacity-70 p-6 sm:p-10 rounded-2xl shadow-2xl backdrop-blur-xl w-full sm:w-2/3 lg:w-1/3 sm:h-full h-screen">
          <h1 className="text-4xl font-Courgette sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-dracula-purple to-dracula-pink">
            ChitChat
          </h1>
          <p className="text-sm sm:text-xl capitalize text-dracula-light font-Caveat">
            Start your way around
          </p>

          <div className="space-y-4 mt-8">
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-dracula-darkest-600 text-dracula-darker-800 rounded-lg border-none focus:ring-2 focus:ring-dracula-purple outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Joining Code"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-dracula-darkest-600 text-dracula-darker-800 rounded-lg border-none focus:ring-2 focus:ring-dracula-purple outline-none"
              value={joiningCode}
              onChange={(e) => setJoiningCode(e.target.value)}
            />

            <button
              onClick={handleJoin}
              className="w-full py-2 sm:py-3 transition-all duration-300 bg-gradient-to-r from-dracula-purple to-dracula-pink text-dracula-darker-900 rounded-md hover:scale-105 hover:shadow-lg"
            >
              Join
            </button>
            <button
              onClick={handleCreateRoom}
              className="w-full py-2 sm:py-3 transition-all duration-300 bg-gradient-to-r from-dracula-cyan to-dracula-green text-dracula-darker-900 rounded-md hover:scale-105 hover:shadow-lg"
            >
              Create New Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartUp;
