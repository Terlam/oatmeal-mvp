import { Button as FlowbiteButton, Spinner } from 'flowbite-react';
import React from 'react';

export type ButtonProps = React.ComponentProps<typeof FlowbiteButton> & { loading?: boolean };

export const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => (
  <FlowbiteButton {...props} disabled={loading || props.disabled}>
    {loading && <Spinner size="sm" className="mr-2" />}
    {children}
  </FlowbiteButton>
);