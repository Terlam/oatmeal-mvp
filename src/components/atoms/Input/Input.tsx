import { TextInput } from 'flowbite-react';
import React from 'react';

export type InputProps = React.ComponentProps<typeof TextInput>;

export const Input: React.FC<InputProps> = (props) => <TextInput {...props} />;
