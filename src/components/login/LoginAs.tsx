import { Profile, useLogin } from '@lens-protocol/react-web';

type LoginAsProps = {
  profile: Profile;
  wallet: string;
  onSuccess: (profile: Profile) => void;
};

export default function LoginAs({ profile, wallet, onSuccess }: LoginAsProps) {
  const { execute, loading } = useLogin();

  const login = async () => {
    const result = await execute({
      address: wallet,
      profileId: profile.id,
    });

    if (result.isSuccess()) {
      return onSuccess(profile);
    }

    window.alert(result.error.message);
  };

  return (
    <button
      disabled={loading}
      onClick={login}
      className="px-4 py-2 bg-green-500 text-white rounded mt-2"
    >
      {profile.handle?.fullHandle ?? profile.id}
    </button>
  );
}