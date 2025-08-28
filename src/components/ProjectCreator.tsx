import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, User, FileText } from 'lucide-react';
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

      await createProject(
        formData.title,
        formData.description,
        budgetMicroStx,
        deadlineTimestamp,
        formData.freelancer,
        null // userSession will be handled by connect
      );

      // Reset form
      setFormData({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        freelancer: '',
      });
      setIsOpen(false);
      onProjectCreated();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title && formData.description && formData.budget && formData.deadline && formData.freelancer;

  return (
    <div className="w-full max-w-2xl">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          disabled={!isConnected}
          className={`w-full flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-dashed transition-colors ${
            isConnected
              ? 'border-blue-300 hover:border-blue-400 text-blue-600 hover:bg-blue-50'
              : 'border-gray-300 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create New Project</span>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Create New Project</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                <span>Project Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project title..."
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                <span>Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the project requirements..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4" />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline</span>
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                <span>Freelancer Address</span>
              </label>
              <input
                type="text"
                name="freelancer"
                value={formData.freelancer}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the Stacks address of the freelancer you want to assign this project to
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`flex-1 px-4 py-2 rounded-md text-white font-medium transition-colors ${
                  isFormValid && !isSubmitting
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
