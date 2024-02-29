import React, { useState } from "react";
import { ChatInterface, Start } from "./components";

const App = () => {
  const [roomId, setRoomId] = useState(null);
  const [username, setUsername] = useState(null);

  const handleStart = (roomId, username) => {
    setRoomId(roomId);
    setUsername(username);
  };

  return (
    <div className=" h-screen ">
      {roomId && username ? (
        <ChatInterface roomId={roomId} username={username} />
      ) : (
        <Start onStart={handleStart} />
      )}
    </div>
  );
};

export default App;
