import React from "react";

interface ChatBubblesProps {
  user: string;
  messages: string[];
  time: string[];
}

const ChatBubbles: React.FC<ChatBubblesProps> = ({ user, messages, time }) => {
  return (
    <div className="p-4 w-full sm:w-full md:w-2/3 lg:w-1/2 mx-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            user === "Me" ? "justify-end" : "justify-start"
          } mb-2`}
        >
          <div
            className={`p-3 rounded-3xl max-w-xs relative ${
              user === "Me"
                ? "bg-dracula-darker-500 text-white rounded-br-none"
                : "bg-dracula-darker-800 text-gray-300 rounded-bl-none"
            }`}
          >
            <p className="leading-snug">{message}</p>
            <span className="text-xs text-gray-400 flex justify-end mt-1">
              {time[index]}
            </span>

            {/* Adding the tail to the chat bubble */}
            {user === "Me" ? (
              <div className="absolute right-0 bottom-0 transform translate-x-2 translate-y-1 bg-dracula-darker-900 h-3 w-3 rounded-full"></div>
            ) : (
              <div className="absolute left-0 bottom-0 transform -translate-x-2 translate-y-1 bg-dracula-darker-800 h-3 w-3 rounded-full"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBubbles;
