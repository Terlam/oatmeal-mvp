import React from 'react';
import { ProfileForm } from './ProfileForm';
import { User } from 'firebase/auth';

export default {
  title: 'Organisms/ProfileForm',
  component: ProfileForm,
};

const ProfileFormProps = {
  user: {displayName: 'Test User'} as User,
  onUpdate: async (data: any) => {
    console.log('Profile updated:', data);
  }
}
export const Default = () => <ProfileForm {...ProfileFormProps }/>;
