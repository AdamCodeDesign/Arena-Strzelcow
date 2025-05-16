// src/components/ProfileInfo.tsx

type ProfileInfoProps = {
    name: string;
    email: string;
  };
  
  export default function ProfileInfo({ name, email }: ProfileInfoProps) {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Witaj {name}!</h2>
        <p className="text-gray-600">{email}</p>
      </div>
    );
  }
  