import {
  AnchorMode,
  standardPrincipalCV,
  uintCV,
  stringUtf8CV,
} from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
import { openContractCall } from '@stacks/connect';
import { ProjectStatus } from './types';

// Network configuration
const NETWORK = new StacksTestnet();

// Contract configuration - UPDATE THESE AFTER DEPLOYMENT
const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'; // Update with your deployed contract address
const CONTRACT_NAME = 'freelance-escrow';

export const createProject = async (
  title: string,
  description: string,
  budget: number,
  deadline: number,
  freelancerAddress: string,
  _userSession: any
) => {
  const functionArgs = [
    stringUtf8CV(title),
    stringUtf8CV(description),
    uintCV(budget),
    uintCV(deadline),
    standardPrincipalCV(freelancerAddress),
  ];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'create-project',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Transaction submitted:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

export const acceptProject = async (projectId: number, _userSession: any) => {
  const functionArgs = [uintCV(projectId)];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'accept-project',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Project accepted:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

export const submitWork = async (projectId: number, _userSession: any) => {
  const functionArgs = [uintCV(projectId)];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'submit-work',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Work submitted:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

export const approveWork = async (projectId: number, _userSession: any) => {
  const functionArgs = [uintCV(projectId)];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'approve-work',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Work approved:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

export const disputeProject = async (projectId: number, _userSession: any) => {
  const functionArgs = [uintCV(projectId)];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'dispute-project',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Project disputed:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

// Helper function to get project status string
export const getProjectStatusString = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.OPEN:
      return 'open';
    case ProjectStatus.IN_PROGRESS:
      return 'in-progress';
    case ProjectStatus.SUBMITTED:
      return 'submitted';
    case ProjectStatus.COMPLETED:
      return 'completed';
    case ProjectStatus.DISPUTED:
      return 'disputed';
    default:
      return 'unknown';
  }
};

// Helper function to format STX amount
export const formatSTX = (amount: number): string => {
  return (amount / 1000000).toFixed(6) + ' STX';
};

// Helper function to convert STX to microSTX
export const stxToMicroStx = (stx: number): number => {
  return Math.floor(stx * 1000000);
};

export { NETWORK, CONTRACT_ADDRESS, CONTRACT_NAME };
