import { Card } from 'flowbite-react';

export const SettingsPanel = () => {
  return (
    <Card className="bg-brand text-ui animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      <p className="text-sm text-accent">Manage your general account preferences and settings.</p>
    </Card>
  );
};
