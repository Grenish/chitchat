import { useState, useEffect } from "react";
import ChatMessages from "./components/ChatMessages";
import TextBox from "./components/TextBox";
import StartUp from "./page/StartUp";

const getCurrentTimestamp = () => new Date().getTime();

// Time-to-live (TTL) for the messages in milliseconds (2 minutes)
const MESSAGE_TTL = 2 * 60 * 1000;

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [timeStamps, setTimeStamps] = useState<string[]>([]);
  const [messageSenders, setMessageSenders] = useState<string[]>([]); // Track senders of each message
  const [hasJoined, setHasJoined] = useState<boolean>(false); // Track if user has joined
  const [userName, setUserName] = useState<string>(""); // Track user's name

  useEffect(() => {
    const storedMessages = JSON.parse(
      localStorage.getItem("chatMessages") || "[]"
    );
    const storedTimestamps = JSON.parse(
      localStorage.getItem("chatTimestamps") || "[]"
    );
    const storedSenders = JSON.parse(
      localStorage.getItem("chatMessageSenders") || "[]"
    );
    const storedTime = parseInt(
      localStorage.getItem("chatSavedTime") || "0",
      10
    );

    if (
      storedMessages.length > 0 &&
      getCurrentTimestamp() - storedTime < MESSAGE_TTL
    ) {
      setMessages(storedMessages);
      setTimeStamps(storedTimestamps);
      setMessageSenders(storedSenders);
    }
  }, []);

  const addMessage = (newMessage: string) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMessages = [...messages, newMessage];
    const newTimestamps = [...timeStamps, currentTime];
    const newSenders = [...messageSenders, userName]; // Use the current user's name as sender

    setMessages(newMessages);
    setTimeStamps(newTimestamps);
    setMessageSenders(newSenders);

    localStorage.setItem("chatMessages", JSON.stringify(newMessages));
    localStorage.setItem("chatTimestamps", JSON.stringify(newTimestamps));
    localStorage.setItem("chatMessageSenders", JSON.stringify(newSenders));
    localStorage.setItem("chatSavedTime", getCurrentTimestamp().toString());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedTime = parseInt(
        localStorage.getItem("chatSavedTime") || "0",
        10
      );

      if (getCurrentTimestamp() - storedTime > MESSAGE_TTL) {
        localStorage.removeItem("chatMessages");
        localStorage.removeItem("chatTimestamps");
        localStorage.removeItem("chatMessageSenders");
        localStorage.removeItem("chatSavedTime");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleJoin = (name: string) => {
    setUserName(name);
    setHasJoined(true); // Set the join status to true when the user joins
  };

  return (
    <div className="bg-dracula-darker-900 h-screen flex flex-col justify-between">
      {!hasJoined ? (
        // Show StartUp page if user hasn't joined yet
        <StartUp onJoin={handleJoin} />
      ) : (
        // Show ChatMessages and TextBox if user has joined
        <>
          <ChatMessages
            messages={messages}
            time={timeStamps}
            user={userName} // Pass current user's name
          />
          <TextBox onSend={addMessage} />
        </>
      )}
    </div>
  );
}

export default App;
