export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'scheduled';
}

export interface ROIInfo {
  hours_saved: number;
  monthly_savings: number;
  payback_period_days: number;
}

export interface Agent {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  pricing: number;
  recurring_type: 'monthly' | 'fixed' | 'per_use';
  rating: number;
  downloads: number;
  features: string[];
  integrations: string[];
  workflow_steps: WorkflowStep[];
  roi_estimate: ROIInfo;
  code_schema?: string; // JSON Workflow string shown/customizable
  thumbnail: string; // Icon identifier from lucide-react (e.g. "Cpu", "Globe")
}

export interface CartItem {
  agent: Agent;
  quantity: number;
}

export interface Project {
  id: string;
  agent_id: string;
  agent_name: string;
  order_id: string;
  progress_percentage: number;
  current_phase: 'discovery' | 'design' | 'build' | 'testing' | 'live';
  estimated_completion_days: number;
  logs: string[];
  status: 'idle' | 'running' | 'completed' | 'synced';
  started_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  items: CartItem[];
  total_amount: number;
  email: string;
  name: string;
  created_at: string;
  status: 'pending' | 'processing' | 'completed';
}

export interface UserSession {
  id: string | null;
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
}

export type Category = 'CRM & Sales' | 'Content AI' | 'Operations' | 'Finance' | 'Support' | 'Data & Scraping';

export const MARKETPLACE_CATEGORIES: Category[] = [
  'CRM & Sales',
  'Content AI',
  'Operations',
  'Finance',
  'Support',
  'Data & Scraping'
];
