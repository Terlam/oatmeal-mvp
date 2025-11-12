import React from 'react';
import { UserCard } from './UserCard';

export default {
  title: 'Molecules/UserCard',
  component: UserCard,
};

export const Default = () => (
  <UserCard 
    user={{
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      isOnline: true,
    }}
  />
);

export const WithDetails = () => (
  <UserCard 
    user={{
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      role: 'admin',
      isOnline: false,
    }}
    showDetails={true}
  />
);
