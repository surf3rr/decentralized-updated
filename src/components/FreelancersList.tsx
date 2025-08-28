import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Star, Code, Palette, Database, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';

interface Freelancer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  skills: string[];
  hourlyRate: number;
  completed: number;
  stack: string;
  address: string;
  status: 'available' | 'busy';
  specialties: string[];
}

export const FreelancersList: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const freelancers: Freelancer[] = [
    {
      id: '1',
      name: 'Alex Chen',
      avatar: '👨‍💻',
      rating: 4.9,
      skills: ['React', 'TypeScript', 'Node.js'],
      hourlyRate: 85,
      completed: 127,
      stack: 'Full Stack',
      address: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
      status: 'available',
      specialties: ['Web3 Integration', 'DeFi Applications', 'Smart Contracts']
    },
    {
      id: '2',
      name: 'Sarah Miller',
      avatar: '👩‍🎨',
      rating: 4.8,
      skills: ['Figma', 'UI/UX', 'Prototyping'],
      hourlyRate: 75,
      completed: 89,
      stack: 'Design',
      address: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP',
      status: 'available',
      specialties: ['Mobile Design', 'Design Systems', 'User Research']
    },
    {
      id: '3',
      name: 'Marcus Johnson',
      avatar: '👨‍💼',
      rating: 4.7,
      skills: ['Solidity', 'Clarity', 'Rust'],
      hourlyRate: 120,
      completed: 45,
      stack: 'Blockchain',
      address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      status: 'busy',
      specialties: ['Smart Contract Auditing', 'DeFi Protocols', 'Security']
    },
    {
      id: '4',
      name: 'Emma Davis',
      avatar: '👩‍💻',
      rating: 4.9,
      skills: ['React Native', 'Swift', 'Kotlin'],
      hourlyRate: 95,
      completed: 73,
      stack: 'Mobile',
      address: 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB',
      status: 'available',
      specialties: ['iOS Development', 'Cross-platform Apps', 'App Store Optimization']
    }
  ];

  const getStackIcon = (stack: string) => {
    switch (stack) {
      case 'Full Stack': return Code;
      case 'Design': return Palette;
      case 'Blockchain': return Database;
      case 'Mobile': return Smartphone;
      default: return User;
    }
  };

  const displayedFreelancers = isExpanded ? freelancers : freelancers.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent backdrop-blur-xl rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 border border-orange-500/20 rounded-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Verified Freelancers</h3>
            <p className="text-sm text-gray-400">Choose from our curated professionals</p>
          </div>
          <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
            {freelancers.filter(f => f.status === 'available').length} Available
          </div>
        </div>

        <div className="space-y-4">
          {displayedFreelancers.map((freelancer, index) => {
            const StackIcon = getStackIcon(freelancer.stack);
            
            return (
              <motion.div
                key={freelancer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-orange-500/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-xl">
                      {freelancer.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                      freelancer.status === 'available' ? 'bg-green-400' : 'bg-yellow-400'
                    }`} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-white truncate">{freelancer.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-300">{freelancer.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <StackIcon className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-300">{freelancer.stack}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">{freelancer.completed} projects</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {freelancer.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        ${freelancer.hourlyRate}/hr
                      </span>
                      <button className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expand/Collapse Button */}
        {freelancers.length > 3 && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4 flex items-center justify-center space-x-2 py-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>View All ({freelancers.length})</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
