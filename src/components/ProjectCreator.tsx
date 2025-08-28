import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, DollarSign, User, FileText, ChevronDown } from 'lucide-react';
import { createProject, stxToMicroStx } from '../lib/stacks';
import { ProjectFormData } from '../lib/types';

interface ProjectCreatorProps {
  onProjectCreated: () => void;
  isConnected: boolean;
}

export const ProjectCreator: React.FC<ProjectCreatorProps> = ({
  onProjectCreated,
  isConnected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    freelancer: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      const budget = parseFloat(formData.budget);
      const budgetMicroStx = stxToMicroStx(budget);
      const deadlineTimestamp = new Date(formData.deadline).getTime();

      // Mock project creation for demo purposes
      // In production, this would call the actual smart contract
      console.log('Creating project:', {
        title: formData.title,
        description: formData.description,
        budget: budgetMicroStx,
        deadline: deadlineTimestamp,
        freelancer: formData.freelancer
      });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      alert(`Project "${formData.title}" created successfully! \nFreelancer: ${selectedFreelancer}\nBudget: ${formData.budget} STX`);

      // Reset form
      setFormData({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        freelancer: '',
      });
      setSelectedFreelancer('');
      setIsOpen(false);
      onProjectCreated();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [selectedFreelancer, setSelectedFreelancer] = useState<string>('');
  const [showFreelancerDropdown, setShowFreelancerDropdown] = useState(false);

  const availableFreelancers = [
    { id: '1', name: 'Alex Chen', stack: 'Full Stack', address: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG', avatar: '👨‍💻' },
    { id: '2', name: 'Sarah Miller', stack: 'Design', address: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP', avatar: '👩‍🎨' },
    { id: '3', name: 'Marcus Johnson', stack: 'Blockchain', address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', avatar: '👨‍💼' },
    { id: '4', name: 'Emma Davis', stack: 'Mobile', address: 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB', avatar: '👩‍💻' }
  ];

  const handleFreelancerSelect = (freelancer: any) => {
    setSelectedFreelancer(freelancer.name);
    setFormData(prev => ({ ...prev, freelancer: freelancer.address }));
    setShowFreelancerDropdown(false);
  };

  const isFormValid = formData.title && formData.description && formData.budget && formData.deadline && formData.freelancer;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full relative overflow-hidden"
    >
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            disabled={!isConnected}
            className={`w-full relative overflow-hidden group ${
              isConnected ? '' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent backdrop-blur-xl rounded-2xl"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 border-2 border-dashed border-orange-500/30 hover:border-orange-400/50 rounded-2xl backdrop-blur-xl transition-all duration-300">
              <div className="flex items-center justify-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-6 h-6 text-orange-400" />
                </motion.div>
                <span className="text-lg font-semibold text-white">Create New Project</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Start a new project with our verified freelancers</p>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent backdrop-blur-xl rounded-2xl"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 border border-orange-500/20 rounded-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Create New Project</h3>
                  <p className="text-sm text-gray-400">Fill in the details for your project</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                    <FileText className="w-4 h-4 text-orange-400" />
                    <span>Project Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Enter project title..."
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                    <FileText className="w-4 h-4 text-orange-400" />
                    <span>Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-300"
                    placeholder="Describe the project requirements..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                      <DollarSign className="w-4 h-4 text-orange-400" />
                      <span>Budget (STX)</span>
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.000001"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                      <Calendar className="w-4 h-4 text-orange-400" />
                      <span>Deadline</span>
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 text-orange-400" />
                    <span>Select Freelancer</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowFreelancerDropdown(!showFreelancerDropdown)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white transition-all duration-300 flex items-center justify-between"
                    >
                      <span className={selectedFreelancer ? 'text-white' : 'text-gray-400'}>
                        {selectedFreelancer || 'Choose a freelancer...'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        showFreelancerDropdown ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {showFreelancerDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50"
                        >
                          {availableFreelancers.map((freelancer) => (
                            <motion.button
                              key={freelancer.id}
                              type="button"
                              whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                              onClick={() => handleFreelancerSelect(freelancer)}
                              className="w-full p-4 text-left hover:bg-orange-500/10 transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center space-x-3"
                            >
                              <span className="text-2xl">{freelancer.avatar}</span>
                              <div>
                                <div className="text-white font-medium">{freelancer.name}</div>
                                <div className="text-gray-400 text-sm">{freelancer.stack}</div>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: isFormValid && !isSubmitting ? 1.02 : 1 }}
                    whileTap={{ scale: isFormValid && !isSubmitting ? 0.98 : 1 }}
                    disabled={!isFormValid || isSubmitting}
                    className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isFormValid && !isSubmitting
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Project'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
