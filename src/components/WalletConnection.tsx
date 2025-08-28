import React from 'react';
import { showConnect, disconnect } from '@stacks/connect';
import { Wallet, LogOut, User } from 'lucide-react';

interface WalletConnectionProps {
  userSession: any;
  userData: any;
  setUserData: (data: any) => void;
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({
  userSession,
  userData,
  setUserData,
}) => {
  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'DecentralizedFreelance',
        icon: window.location.origin + '/logo.svg',
      },
      redirectTo: '/',
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    disconnect();
    window.location.reload();
  };

  if (userData) {
    const address = userData.profile?.stxAddress?.testnet || 'Unknown';
    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          <User className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            {shortAddress}
          </span>
        </div>
        <button
          onClick={disconnectWallet}
          className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg border border-red-200 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium text-red-700">Disconnect</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
    >
      <Wallet className="w-4 h-4" />
      <span>Connect Leather Wallet</span>
    </button>
  );
};
