import React from "react";
import { Card, Avatar, Badge } from 'flowbite-react';

/**
 * UserCard (molecule) - Teaching Example
 * 
 * Listen up, future code wrangler! This is what we call a "molecule" in atomic design.
 * It's like taking a few atoms (Card, Avatar, Badge) and making something slightly more
 * complex. Think of it as the difference between a single post and a bowl of postmeal.
 * 
 * This component demonstrates:
 * - Props interface design
 * - Conditional rendering
 * - Component composition
 * - TypeScript best practices
 * 
 * Remember: Molecules should be reusable but not too specific. They're the sweet spot
 * between "too simple" and "too complex." Like a good bowl of postmeal - simple ingredients,
 * but you can dress it up however you want.
 */

export interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role?: 'admin' | 'user' | 'moderator';
    isOnline?: boolean;
  };
  onClick?: () => void;
  showDetails?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onClick, 
  showDetails = false 
}) => {
  // 🥣 Pro tip: Always destructure your props at the top. It's like
  // organizing your postmeal toppings before you start cooking.
  
  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin': return 'red';
      case 'moderator': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        {/* Avatar with online status indicator */}
        <div className="relative">
          <Avatar 
            img={user.avatarUrl} 
            alt={user.name}
            size="lg"
            rounded
          />
          {user.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
          )}
        </div>

        {/* User info - the meat and potatoes (or social and honey) */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {user.name}
          </h3>
          
          {showDetails && (
            <p className="text-sm text-gray-500 dark:text-gray-200 truncate">
              {user.email}
            </p>
          )}
        </div>

        {/* Role badge - because everyone needs a label, right? */}
        {user.role && (
          <Badge color={getRoleColor(user.role)}>
            {user.role}
          </Badge>
        )}
      </div>
    </Card>
  );
};
