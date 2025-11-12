import React from 'react';
import { SignupForm } from './SignupForm';

export default {
  title: 'Organisms/SignupForm',
  component: SignupForm,
};

export const Default = () => (
  <SignupForm 
    onSubmit={(data) => console.log('Signup:', data)}
    loading={false}
    error={null}
  />
);

export const Loading = () => (
  <SignupForm 
    onSubmit={(data) => console.log('Signup:', data)}
    loading={true}
    error={null}
  />
);

export const WithError = () => (
  <SignupForm 
    onSubmit={(data) => console.log('Signup:', data)}
    loading={false}
    error="Email already in use"
  />
);
