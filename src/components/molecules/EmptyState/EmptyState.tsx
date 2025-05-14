import React from "react";

/**
 * EmptyState (molecule)
 * Composed of atoms. Slightly more complex. May include logic or layout.
 */

export interface EmptyStateProps {
  message?: string
}



export const EmptyState: React.FC<EmptyStateProps> = ({message}) => {
  return(
  <div className="molecule-componen text-center p-8">
    <p className="text-xl text-gray-500 italic">{message}</p>
    <p className="text-sm text-gray-400">This space is as empty as your browser history on incognito.</p>
  </div>
);
}