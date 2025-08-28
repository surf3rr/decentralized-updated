import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppConfig, UserSession } from '@stacks/connect';
import { WalletConnection } from './components/WalletConnection';
import { ProjectCreator } from './components/ProjectCreator';
import { ProjectList } from './components/ProjectList';
import { DashboardStats } from './components/DashboardStats';
import { FreelancersList } from './components/FreelancersList';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const App: React.FC = () => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [refreshProjects, setRefreshProjects] = useState(0);

  useEffect(() => {
    // Initialize user session
    const appConfig = new AppConfig(['store_write', 'publish_data']);
    const userSessionInstance = new UserSession({ appConfig });
    setUserSession(userSessionInstance);

    // Check if user is already signed in
    if (userSessionInstance.isUserSignedIn()) {
      setUserData(userSessionInstance.loadUserData());
    }
  }, []);

  const handleProjectUpdate = () => {
    setRefreshProjects(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, backgroundRepeat: 'repeat'}}></div>
        </div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                DecentralizedFreelance
              </h1>
              <p className="text-sm text-gray-400">
                Trustless freelance marketplace on Stacks
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <WalletConnection 
                userSession={userSession} 
                userData={userData}
                setUserData={setUserData}
              />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!userData ? (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center py-12"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  Welcome to the Future of Freelancing
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Connect your Leather wallet to access our decentralized platform with verified freelancers and secure escrow payments
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl max-w-md mx-auto border border-orange-500/20"
              >
                <WalletConnection 
                  userSession={userSession} 
                  userData={userData}
                  setUserData={setUserData}
                />
              </motion.div>

              {/* Feature highlights */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
              >
                {[
                  { icon: TrendingUp, title: "Secure Escrow", desc: "Payments held safely until work completion" },
                  { icon: Users, title: "Verified Freelancers", desc: "Curated professionals across different stacks" },
                  { icon: DollarSign, title: "Transparent Fees", desc: "Fair pricing with blockchain transparency" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                  >
                    <feature.icon className="w-8 h-8 text-orange-400 mb-4 mx-auto" />
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Dashboard Stats */}
              <DashboardStats userAddress={userData?.profile?.stxAddress?.testnet} />

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Left Column - Project Creator & Freelancers */}
                <div className="xl:col-span-1 space-y-6">
                  <ProjectCreator 
                    onProjectCreated={handleProjectUpdate}
                    isConnected={!!userData}
                  />
                  <FreelancersList />
                </div>

                {/* Right Column - Project List */}
                <div className="xl:col-span-3">
                  <ProjectList 
                    userAddress={userData?.profile?.stxAddress?.testnet}
                    refreshTrigger={refreshProjects}
                    onProjectUpdate={handleProjectUpdate}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
