import { SettingsPanel } from '../components/SettingsPanel/SettingsPanel';
import { NotificationSettings } from '../components/NotificationSettings/NotificationSettings';
import { LanguagePreferenceForm } from '../components/LanguagePreferenceForm/LanguagePreferenceForm';
const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center text-ui">Settings</h1>
      <SettingsPanel />
      <NotificationSettings />
      <LanguagePreferenceForm />
    </div>
  );
};

export default SettingsPage;
