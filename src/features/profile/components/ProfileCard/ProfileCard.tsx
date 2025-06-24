// features/profile/components/molecules/ProfileCard.tsx
import { Card } from 'flowbite-react';
import { Avatar } from 'flowbite-react';

export const ProfileCard = () => {
  return (
    <Card className="bg-brand text-ui animate-fade-in">
      <div className="flex items-center space-x-4">
        <Avatar img="/user_icon.png" alt="User avatar" rounded />
        <div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-sm text-accent">john.doe@example.com</p>
        </div>
      </div>
    </Card>
  );
};
