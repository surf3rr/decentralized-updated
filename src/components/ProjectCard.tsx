import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, User, Clock, CheckCircle, AlertCircle, XCircle, Shield, Zap } from 'lucide-react';
import { Project } from '../lib/types';
import { formatSTX } from '../lib/stacks';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  
  const isClient = project.client === currentUserAddress;
  const isFreelancer = project.freelancer === currentUserAddress;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-400/30' };
      case 'in-progress':
        return { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-400/30' };
      case 'submitted':
        return { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-400/30' };
      case 'completed':
        return { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-400/30' };
      case 'disputed':
        return { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-400/30' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-300', border: 'border-gray-400/30' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4" />;
      case 'in-progress':
        return <Zap className="w-4 h-4" />;
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
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  const handleAction = async (actionType: string) => {
    setIsProcessing(true);
    try {
      // Simulate network delay for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (actionType) {
        case 'accept':
          alert(`Project "${project.title}" accepted successfully! You can now start working on it.`);
          break;
        case 'submit':
          alert(`Work submitted for "${project.title}"! The client will review and approve payment.`);
          break;
        case 'approve':
          alert(`Work approved and payment of ${formatSTX(project.budget)} released to freelancer!`);
          break;
        case 'dispute':
          alert(`Dispute initiated for "${project.title}". Our team will review and resolve the issue.`);
          break;
      }
      
      onUpdate();
    } catch (error) {
      console.error(`Error ${actionType}ing:`, error);
      alert(`Failed to ${actionType}. Please try again.`);
    } finally {
      setIsProcessing(false);
      setShowPaymentConfirm(false);
    }
  };

  const renderActions = () => {
    if (project.status === 'open' && isFreelancer) {
      return (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction('accept')}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
              <Clock className="w-4 h-4" />
            </motion.div>
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          <span>{isProcessing ? 'Accepting...' : 'Accept Project'}</span>
        </motion.button>
      );
    }

    if (project.status === 'in-progress' && isFreelancer) {
      return (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction('submit')}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
              <Clock className="w-4 h-4" />
            </motion.div>
          ) : (
            <Zap className="w-4 h-4" />
          )}
          <span>{isProcessing ? 'Submitting...' : 'Submit Work'}</span>
        </motion.button>
      );
    }

    if (project.status === 'submitted' && isClient) {
      return (
        <div className="space-y-3">
          {!showPaymentConfirm ? (
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPaymentConfirm(true)}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-green-500/25 flex items-center justify-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Approve & Pay</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction('dispute')}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Dispute</span>
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-4"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="w-5 h-5 text-orange-400" />
                <span className="text-orange-300 font-medium">Escrow Payment Confirmation</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                You're about to release <strong className="text-white">{formatSTX(project.budget)}</strong> from escrow to the freelancer.
                This action cannot be undone.
              </p>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction('approve')}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Clock className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  <span>{isProcessing ? 'Processing...' : 'Confirm Payment'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPaymentConfirm(false)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      );
    }

    return null;
  };

  const statusConfig = getStatusColor(project.status);

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="relative overflow-hidden group cursor-pointer"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent backdrop-blur-xl rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 border border-orange-500/20 hover:border-orange-400/30 rounded-2xl backdrop-blur-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-2 truncate">{project.title}</h3>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
              {getStatusIcon(project.status)}
              <span className="capitalize">{project.status.replace('-', ' ')}</span>
            </div>
          </div>
          <div className="ml-4 text-right">
            <div className="flex items-center justify-end space-x-1 text-xl font-bold text-green-400">
              <DollarSign className="w-5 h-5" />
              <span>{formatSTX(project.budget)}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">In Escrow</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4 line-clamp-2 text-sm leading-relaxed">{project.description}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4 text-orange-400" />
            <span>{formatDate(project.deadline)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <User className="w-4 h-4 text-orange-400" />
            <span>Client: {project.client.slice(0, 6)}...</span>
          </div>
        </div>

        {/* Freelancer Info */}
        {project.freelancer && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <User className="w-4 h-4 text-orange-400" />
              <span>Freelancer: {project.freelancer.slice(0, 6)}...</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="border-t border-white/10 pt-4">
          {renderActions()}
          
          {/* User Role Indicator */}
          {(isClient || isFreelancer) && (
            <div className="mt-3 flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isClient ? 'bg-blue-400' : 'bg-green-400'
              }`}></div>
              <span className="text-xs text-gray-400">
                {isClient && 'You are the client'}
                {isFreelancer && 'You are assigned as freelancer'}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
