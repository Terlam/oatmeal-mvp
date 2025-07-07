import { Card } from 'flowbite-react'
import { Avatar } from 'flowbite-react'

interface ProfileCardProps {
  name?: string | null
  email?: string | null
  avatarUrl?: string | null
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, avatarUrl }) => {
  return (
    <Card className="bg-brand text-ui animate-fade-in">
      <div className="flex items-center space-x-4">
        <Avatar img={avatarUrl || '/user_icon.png'} alt="User avatar" rounded />
        <div>
          <h2 className="text-xl font-semibold">{name || 'No Name'}</h2>
          <p className="text-sm text-accent">{email || 'No email'}</p>
        </div>
      </div>
    </Card>
  )
}