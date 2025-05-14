// src/components/organisms/Header.tsx
import React from 'react';
import Link from 'next/link';
import  {Button, Avatar }from '@components/atoms';
import clsx from 'clsx';

type HeaderProps = {
  isLoggedIn: boolean;
  username?: string;
  darkMode?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, username, darkMode }) => {
  return (
    <header
      className={clsx(
        'flex items-center justify-between p-4 md:px-8 shadow-theme border-b',
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      )}
    >
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="bowl">🥣</span>
        <Link href="/" className="font-bold text-lg tracking-tight">
          Oatmeal MVP
        </Link>
      </div>

      <nav className="flex items-center space-x-4">
        <Link href="/#features" className="hover:underline">Features</Link>
        <Link href="/#contact" className="hover:underline">Contact</Link>
        {isLoggedIn ? (
          <>
            <span className="hidden sm:inline">Hey, {username || 'Oatfan'} 🐿️</span>
            <Avatar alt={username} />
            <Button variant="secondary">Log out</Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button>Log in</Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary">Get Started</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
