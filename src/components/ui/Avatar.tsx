// src/components/Avatar.tsx
import Image from 'next/image';  // Zaimportowanie Image z next/image
import "../../styles/globals.css"; // Import Tailwind CSS

// src/components/Avatar.tsx
type AvatarProps = {
    name: string; // np. "Adam Leszczyk"
  };
  
  function Avatar({ name }: AvatarProps) {
    const getInitials = (name: string) =>
      name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")
        .slice(0, 2);
  
    return (
      <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-600 text-white text-lg font-semibold">
        {getInitials(name)}
      </div>
    );
  }
  
  export default Avatar;
  