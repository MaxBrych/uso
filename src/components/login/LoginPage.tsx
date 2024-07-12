import { useAccount, useConnect } from 'wagmi';
import LoginOptions from './LoginOptions';
import { InjectedConnector } from '@wagmi/core/connectors/injected';

export default function LogInPage() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onError: (error) => window.alert(error.message),
  });

  const goToHome = (profile: Profile) => {
    console.log('Logged in as', profile.handle?.fullHandle ?? profile.id);
  };

  if (isDisconnected && !address) {
    return (
      <button
        disabled={isConnecting}
        onClick={connect}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Connect Wallet
      </button>
    );
  }

  return <LoginOptions wallet={address as string} onSuccess={goToHome} />;
}