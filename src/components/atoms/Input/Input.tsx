import React from "react";

/**
 * Input (atom)
 * A simple UI element. Pure, reusable, innocent.
 */

export interface InputProps {
  // TODO: define your props
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="atom-component p-4 border rounded">
      {/* TODO: Flesh out Input component */}
      <p className="text-sm text-gray-500">Input placeholder</p>
    </div>
  );
};
