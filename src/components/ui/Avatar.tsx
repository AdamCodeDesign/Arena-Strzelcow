// src/components/Avatar.tsx
import Image from 'next/image';  // Zaimportowanie Image z next/image
import "../../styles/globals.css"; // Import Tailwind CSS

function Avatar() {
    return (
        <div className="flex justify-center items-center rounded-full w-24 h-24 bg-gray-300">
            <Image
                src="/avatars/3fc090a5-9047-4a53-b00c-317617602e95-falloutBoy.png" // Zmieniona ścieżka do obrazu
                alt="avatar"
                className="rounded-full"
                width={96}  // Wartości w px (wielkość ikony)
                height={96}  // Wartości w px (wielkość ikony)
            />
        </div>
    );
}

export default Avatar;
