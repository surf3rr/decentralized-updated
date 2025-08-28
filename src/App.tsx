import React, { useState, useEffect } from 'react';
import { AppConfig, UserSession } from '@stacks/connect';
import { WalletConnection } from './components/WalletConnection';
import { ProjectCreator } from './components/ProjectCreator';
import { ProjectList } from './components/ProjectList';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                DecentralizedFreelance
              </h1>
              <p className="text-sm text-gray-500">
                Trustless freelance marketplace on Stacks
              </p>
            </div>
            <WalletConnection 
              userSession={userSession} 
              userData={userData}
              setUserData={setUserData}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!userData ? (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to DecentralizedFreelance
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect your Leather wallet to start creating and managing freelance projects
            </p>
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto">
              <WalletConnection 
                userSession={userSession} 
                userData={userData}
                setUserData={setUserData}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Project Creator */}
            <div className="flex justify-center">
              <ProjectCreator 
                onProjectCreated={handleProjectUpdate}
                isConnected={!!userData}
              />
            </div>

            {/* Project List */}
            <ProjectList 
              userAddress={userData?.profile?.stxAddress?.testnet}
              refreshTrigger={refreshProjects}
              onProjectUpdate={handleProjectUpdate}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
