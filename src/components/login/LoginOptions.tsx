import { useProfilesManaged } from '@lens-protocol/react-web';
import LoginAs from './LoginAs';

type LoginOptionsProps = {
  wallet: string;
  onSuccess: (profile: Profile) => void;
};

export default function LoginOptions({ wallet, onSuccess }: LoginOptionsProps) {
  const { data: profiles, error, loading } = useProfilesManaged({
    for: wallet,
    includeOwned: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (profiles.length === 0) return <p>No profiles managed by this wallet.</p>;

  return (
    <div>
      {profiles.map((profile) => (
        <LoginAs key={profile.id} profile={profile} wallet={wallet} onSuccess={onSuccess} />
      ))}
    </div>
  );
}