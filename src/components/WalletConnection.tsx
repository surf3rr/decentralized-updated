import React from 'react';
import { motion } from 'framer-motion';
import { showConnect } from '@stacks/connect';
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
        icon: window.location.origin + '/favicon.ico',
      },
      redirectTo: '/',
      onFinish: () => {
        if (userSession) {
          const newUserData = userSession.loadUserData();
          setUserData(newUserData);
        }
      },
      userSession,
    });
  };

  const disconnectWallet = async () => {
    try {
      if (userSession) {
        await userSession.signUserOut();
        setUserData(null);
        // Small delay to ensure state is updated before reload
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      // Fallback - clear state and reload
      setUserData(null);
      window.location.reload();
    }
  };

  if (userData) {
    const address = userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet || 'Unknown';
    const shortAddress = address !== 'Unknown' ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Unknown';

    return (
      <div className="flex items-center space-x-3">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-lg px-4 py-2 rounded-xl border border-green-400/30"
        >
          <User className="w-4 h-4 text-green-300" />
          <span className="text-sm font-medium text-green-200">
            {shortAddress}
          </span>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={disconnectWallet}
          className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-lg px-4 py-2 rounded-xl border border-red-400/30 hover:border-red-400/50 transition-all duration-300"
        >
          <LogOut className="w-4 h-4 text-red-300" />
          <span className="text-sm font-medium text-red-200">Disconnect</span>
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={connectWallet}
      className="relative overflow-hidden group"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl transition-all duration-300 group-hover:from-orange-400 group-hover:to-orange-500"></div>
      
      {/* Content */}
      <div className="relative flex items-center space-x-2 px-6 py-3 text-white font-medium">
        <Wallet className="w-5 h-5" />
        <span>Connect Leather Wallet</span>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.button>
  );
};
