import React from "react";

/**
 * UserCard (molecule)
 * Composed of atoms. Slightly more complex. May include logic or layout.
 */

export interface UserCardProps {
  // TODO: define your props
}

export const UserCard: React.FC<UserCardProps> = (props) => {
  return (
    <div className="molecule-component p-4 border rounded">
      {/* TODO: Flesh out UserCard component */}
      <p className="text-sm text-gray-500">UserCard placeholder</p>
    </div>
  );
};
