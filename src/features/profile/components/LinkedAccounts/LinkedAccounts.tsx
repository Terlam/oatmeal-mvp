import React from 'react'
import { Card, Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent, Button, Badge } from 'flowbite-react';

type LinkedAccountsProps = {
  accounts: { id: string; name: string; linked: boolean }[];
  toggle: (id: string) => void;
};

export const LinkedAccounts: React.FC<LinkedAccountsProps> = ({ accounts, toggle }) => {
  return (
    <Card className="bg-brand text-ui animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Linked Accounts</h2>
      <Accordion collapseAll>
        {accounts.map((account) => (
          <AccordionPanel key={account.id}>
            <AccordionTitle>
              <div className="flex justify-between w-full">
                <span>{account.name}</span>
                <Badge color={account.linked ? 'success' : 'gray'}>
                  {account.linked ? 'Linked' : 'Not Linked'}
                </Badge>
              </div>
            </AccordionTitle>
            <AccordionContent>
              {account.id === 'google' ? (
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  Google is your primary authentication method and cannot be unlinked.
                </p>
              ) : (
                <Button color={account.linked ? 'failure' : 'info'} onClick={() => toggle(account.id)}>
                  {account.linked ? 'Unlink' : 'Link'} {account.name}
                </Button>
              )}
            </AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
    </Card>
  );
};
