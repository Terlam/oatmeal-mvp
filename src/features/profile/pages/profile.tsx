// features/profile/pages/profile.tsx
import { ProfileCard } from '../components/ProfileCard/ProfileCard';
import { LinkedAccounts } from '../components/LinkedAccounts/LinkedAccounts';
import { useLinkedAccounts } from '../hooks/useLinkedAccounts';

const ProfilePage = () => {
  const { accounts, toggle } = useLinkedAccounts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center text-ui">Your Profile</h1>
      <ProfileCard />
      <LinkedAccounts accounts={accounts} toggle={toggle} />
    </div>
  );
};

export default ProfilePage;