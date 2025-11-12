// features/profile/hooks/useLinkedAccounts.ts
import { useState } from 'react';

export const useLinkedAccounts = () => {
  // Google is always linked since it's the only way to log in
  const [accounts, setAccounts] = useState([
    { id: 'google', name: 'Google', linked: true },
  ]);

  const toggle = (id: string) => {
    // Google cannot be unlinked since it's the only auth method
    if (id === 'google') {
      return
    }
    setAccounts(prev =>
      prev.map(account =>
        account.id === id ? { ...account, linked: !account.linked } : account
      )
    );
  };

  return { accounts, toggle };
};