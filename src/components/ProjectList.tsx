import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, RefreshCw, Grid, List } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { Project } from '../lib/types';

interface ProjectListProps {
  userAddress: string;
  refreshTrigger: number;
  onProjectUpdate: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  userAddress,
  refreshTrigger,
  onProjectUpdate,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for demonstration - in a real app, this would come from the blockchain
  const mockProjects: Project[] = [
    {
      id: 1,
      title: 'Build a React Dashboard',
      description: 'Create a modern, responsive dashboard using React and Tailwind CSS. Should include charts, tables, and user management features.',
      budget: 5000000, // 5 STX in microSTX
      deadline: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
      client: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      freelancer: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
      status: 'in-progress',
      createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    },
    {
      id: 2,
      title: 'Smart Contract Development',
      description: 'Develop and deploy a Clarity smart contract for a DeFi application on Stacks blockchain.',
      budget: 10000000, // 10 STX in microSTX
      deadline: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days from now
      client: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
      freelancer: userAddress,
      status: 'open',
      createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    },
    {
      id: 3,
      title: 'Mobile App UI Design',
      description: 'Design a modern mobile application interface with Figma. Include wireframes, mockups, and a design system.',
      budget: 3000000, // 3 STX in microSTX
      deadline: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days from now
      client: userAddress,
      status: 'submitted',
      createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    },
  ];

  useEffect(() => {
    // Simulate loading projects from blockchain
    const loadProjects = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProjects(mockProjects);
      setLoading(false);
    };

    loadProjects();
  }, [refreshTrigger, userAddress]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    onProjectUpdate();
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Active Projects</h2>
            <p className="text-gray-400">Loading your project portfolio...</p>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
            <span className="text-sm text-gray-300">Loading...</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent backdrop-blur-xl rounded-2xl"></div>
              <div className="relative z-10 p-6 border border-orange-500/20 rounded-2xl backdrop-blur-xl animate-pulse">
                <div className="h-6 bg-white/10 rounded-xl mb-4"></div>
                <div className="h-4 bg-white/10 rounded-xl mb-2"></div>
                <div className="h-4 bg-white/10 rounded-xl mb-4 w-3/4"></div>
                <div className="h-10 bg-white/10 rounded-xl"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Active Projects</h2>
          <p className="text-gray-400">Manage and track your project portfolio</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="flex items-center space-x-2 bg-orange-500/20 hover:bg-orange-500/30 backdrop-blur-lg px-4 py-2 rounded-xl border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-orange-300">Refresh</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent backdrop-blur-xl rounded-2xl"></div>
        <div className="relative z-10 p-4 border border-orange-500/20 rounded-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Filter className="text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="completed">Completed</option>
                <option value="disputed">Disputed</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Grid */}
      <AnimatePresence>
        {filteredProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent backdrop-blur-xl rounded-2xl"></div>
            <div className="relative z-10 p-8 border border-orange-500/20 rounded-2xl backdrop-blur-xl">
              <div className="text-gray-400 mb-6">
                <Search className="w-16 h-16 mx-auto mb-4 text-orange-400/50" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No projects found</h3>
              <p className="text-gray-400">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first project to get started!'}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  currentUserAddress={userAddress}
                  onUpdate={onProjectUpdate}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent backdrop-blur-xl rounded-2xl"></div>
        <div className="relative z-10 p-6 border border-orange-500/20 rounded-2xl backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Portfolio Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {[
              { status: 'open', label: 'Open', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
              { status: 'in-progress', label: 'In Progress', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
              { status: 'submitted', label: 'Submitted', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
              { status: 'completed', label: 'Completed', color: 'text-green-400', bgColor: 'bg-green-500/20' },
              { status: 'disputed', label: 'Disputed', color: 'text-red-400', bgColor: 'bg-red-500/20' }
            ].map((item, index) => (
              <motion.div 
                key={item.status}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className={`text-center p-4 rounded-xl border border-white/10 ${item.bgColor}`}
              >
                <div className={`text-2xl font-bold ${item.color} mb-2`}>
                  {projects.filter(p => p.status === item.status).length}
                </div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
