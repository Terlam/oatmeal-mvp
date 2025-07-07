import { Card, ToggleSwitch } from 'flowbite-react';
import { useState } from 'react';

export const NotificationSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <Card className="bg-brand text-ui animate-fade-in space-y-4">
      <h2 className="text-xl font-semibold">Notification Settings</h2>
      <div className="flex items-center justify-between">
        <span>Email Notifications</span>
        <ToggleSwitch checked={emailNotif} onChange={setEmailNotif} />
      </div>
      <div className="flex items-center justify-between">
        <span>SMS Notifications</span>
        <ToggleSwitch checked={smsNotif} onChange={setSmsNotif} />
      </div>
    </Card>
  );
};