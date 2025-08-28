export interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  deadline: number;
  client: string;
  freelancer?: string;
  status: 'open' | 'in-progress' | 'submitted' | 'completed' | 'disputed';
  createdAt: number;
}

export interface ProjectFormData {
  title: string;
  description: string;
  budget: string;
  deadline: string;
  freelancer: string;
}

export enum ProjectStatus {
  OPEN = 0,
  IN_PROGRESS = 1,
  SUBMITTED = 2,
  COMPLETED = 3,
  DISPUTED = 4
}

export interface UserData {
  profile: {
    stxAddress: {
      testnet: string;
      mainnet: string;
    };
  };
}
