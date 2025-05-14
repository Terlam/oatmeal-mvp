import React from "react";

/**
 * Label (atom)
 * A simple UI element. Pure, reusable, innocent.
 */

export interface LabelProps {
  // TODO: define your props
}

export const Label: React.FC<LabelProps> = (props) => {
  return (
    <div className="atom-component p-4 border rounded">
      {/* TODO: Flesh out Label component */}
      <p className="text-sm text-gray-500">Label placeholder</p>
    </div>
  );
};
