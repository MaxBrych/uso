import { SessionType, useSession } from '@lens-protocol/react-web';
import LogInPage from './LoginPage';

export default function SessionManager() {
  const { data, error, loading } = useSession();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  switch (data?.type) {
    case SessionType.Anonymous:
      return <LogInPage />;
    case SessionType.JustWallet:
      return <div>Wallet Connected, Profile Pending...</div>;
    case SessionType.WithProfile:
      return <div>Welcome {data.profile.handle?.fullHandle ?? data.profile.id}</div>;
    default:
      return <p>Something went wrong.</p>;
  }
}