import React, { useEffect, useRef } from "react";
import ChatBubbles from "./ChatBubbles";

interface ChatMessagesProps {
  messages: string[];
  time: string[];
  user: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  time,
  user,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto p-4 mb-20">
      <ChatBubbles
        messages={messages}
        time={time}
        user={user}
      />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
