import { IconPaperclip, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import MemberCount from "./MemberCount";

interface TextBoxProps {
  onSend: (message: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isLargeScreen = window.innerWidth > 768;

    if (isLargeScreen) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    }
  };

  const members = [{ name: "John" }, { name: "Alice" }, { name: "Bob" }, { name: "Doe" }, { name: "Jane" }, { name: "Smith" }];
  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center p-4">
      <span className="flex mb-2 w-full sm:w-full md:w-2/3 lg:w-1/2">
        {members.map((member, index) => (
          <MemberCount key={index} name={member.name} />
        ))}
      </span>
      <div className="flex items-center bg-dracula-darker-800 text-gray-300 rounded-2xl w-full max-w-2xl p-2">
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          <IconPaperclip stroke={2} />
          {isHovered && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg z-10">
              Add Image
            </div>
          )}
        </button>

        <textarea
          placeholder="Enter a message..."
          className="bg-transparent flex-grow px-4 text-gray-300 focus:outline-none resize-none h-10 max-h-36"
          rows={1}
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button onClick={handleSend} className="ml-2">
          <IconSend stroke={2} />
        </button>
      </div>
      <p className="text-dracula-darker-100 text-sm">
        Your chat history will be saved on your device for 2 minutes only.
      </p>
    </div>
  );
};

export default TextBox;
