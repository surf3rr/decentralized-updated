import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <button
            disabled
            className="flex items-center space-x-2 bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
          >
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-4 h-4" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Be the first to create a project!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              currentUserAddress={userAddress}
              onUpdate={onProjectUpdate}
            />
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {projects.filter(p => p.status === 'open').length}
            </div>
            <div className="text-sm text-gray-500">Open</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-500">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {projects.filter(p => p.status === 'submitted').length}
            </div>
            <div className="text-sm text-gray-500">Submitted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {projects.filter(p => p.status === 'disputed').length}
            </div>
            <div className="text-sm text-gray-500">Disputed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
