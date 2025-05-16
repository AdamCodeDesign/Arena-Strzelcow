// src/components/Avatar.tsx
import "../../styles/globals.css"; // Import Tailwind CSS

// src/components/Avatar.tsx
type AvatarProps = {
    name: string; // np. "Adam Leszczyk"
};

function Avatar({ name }: AvatarProps) {
    function getInitials(name: string) {
        if (!name) return "";

        const parts = name.trim().split(" ");
        if (parts.length === 1) {
            // tylko jeden wyraz - weź pierwsze 2 litery
            return parts[0].slice(0, 2).toUpperCase();
        }

        // więcej niż jeden wyraz - weź pierwsze litery dwóch pierwszych wyrazów
        return parts
            .slice(0, 2)
            .map((n) => n[0].toUpperCase())
            .join("");
    }

    return (
        <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-600 text-white text-lg font-semibold">
            {getInitials(name)}
        </div>
    );
}

export default Avatar;
