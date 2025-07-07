import { Card, Select } from 'flowbite-react';
import { useState } from 'react';

export const LanguagePreferenceForm = () => {
  const [language, setLanguage] = useState('en');

  return (
    <Card className="bg-brand text-ui animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Language Preference</h2>
      <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </Select>
    </Card>
  );
};