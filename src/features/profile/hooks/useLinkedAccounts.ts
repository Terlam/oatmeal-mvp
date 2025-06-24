// features/profile/hooks/useLinkedAccounts.ts
import { useState } from 'react';

export const useLinkedAccounts = () => {
  const [accounts, setAccounts] = useState([
    { id: 'github', name: 'GitHub', linked: true },
    { id: 'twitter', name: 'Twitter', linked: false },
    { id: 'google', name: 'Google', linked: false },
  ]);

  const toggle = (id: string) => {
    setAccounts(prev =>
      prev.map(account =>
        account.id === id ? { ...account, linked: !account.linked } : account
      )
    );
  };

  return { accounts, toggle };
};