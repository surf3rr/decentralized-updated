import React from 'react';
import { Calendar, DollarSign, User, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Project } from '../lib/types';
import { formatSTX, acceptProject, submitWork, approveWork, disputeProject } from '../lib/stacks';

interface ProjectCardProps {
  project: Project;
  currentUserAddress: string;
  onUpdate: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  currentUserAddress,
  onUpdate,
}) => {
  const isClient = project.client === currentUserAddress;
  const isFreelancer = project.freelancer === currentUserAddress;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'submitted':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'disputed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'submitted':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'disputed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const handleAcceptProject = async () => {
    try {
      await acceptProject(project.id, null);
      onUpdate();
    } catch (error) {
      console.error('Error accepting project:', error);
      alert('Failed to accept project');
    }
  };

  const handleSubmitWork = async () => {
    try {
      await submitWork(project.id, null);
      onUpdate();
    } catch (error) {
      console.error('Error submitting work:', error);
      alert('Failed to submit work');
    }
  };

  const handleApproveWork = async () => {
    try {
      await approveWork(project.id, null);
      onUpdate();
    } catch (error) {
      console.error('Error approving work:', error);
      alert('Failed to approve work');
    }
  };

  const handleDisputeProject = async () => {
    if (window.confirm('Are you sure you want to dispute this project? This action cannot be undone.')) {
      try {
        await disputeProject(project.id, null);
        onUpdate();
      } catch (error) {
        console.error('Error disputing project:', error);
        alert('Failed to dispute project');
      }
    }
  };

  const renderActions = () => {
    if (project.status === 'open' && isFreelancer) {
      return (
        <button
          onClick={handleAcceptProject}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Accept Project
        </button>
      );
    }

    if (project.status === 'in-progress' && isFreelancer) {
      return (
        <button
          onClick={handleSubmitWork}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Submit Work
        </button>
      );
    }

    if (project.status === 'submitted' && isClient) {
      return (
        <div className="flex space-x-2">
          <button
            onClick={handleApproveWork}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Approve & Pay
          </button>
          <button
            onClick={handleDisputeProject}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Dispute
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            {getStatusIcon(project.status)}
            <span className="capitalize">{project.status}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-lg font-bold text-green-600">
            <DollarSign className="w-5 h-5" />
            <span>{formatSTX(project.budget)}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Due: {formatDate(project.deadline)}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <User className="w-4 h-4" />
          <span>Client: {project.client.slice(0, 8)}...</span>
        </div>
      </div>

      {project.freelancer && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <User className="w-4 h-4" />
            <span>Freelancer: {project.freelancer.slice(0, 8)}...</span>
          </div>
        </div>
      )}

      <div className="border-t pt-4">
        {renderActions()}
        
        {(isClient || isFreelancer) && (
          <div className="mt-2 text-xs text-gray-500">
            {isClient && <span className="block">You are the client for this project</span>}
            {isFreelancer && <span className="block">You are the freelancer for this project</span>}
          </div>
        )}
      </div>
    </div>
  );
};
