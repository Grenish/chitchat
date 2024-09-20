import React, { useState } from "react";

interface MemberCountProps {
  name: string;
}

const MemberCount: React.FC<MemberCountProps> = ({ name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block mx-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-7 w-7 p-2 text-sm rounded-full bg-gray-800 text-white flex items-center justify-center font-bold border-2 border-gray-600">
        {name.charAt(0).toUpperCase()}
      </div>

      {isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-lg z-10">
          {name}
        </div>
      )}
    </div>
  );
};

export default MemberCount;
