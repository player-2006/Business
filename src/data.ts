import { Agent } from './types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-nexus-crm',
    name: 'CRM Database Synchronizer',
    tagline: 'Real-time database synchronization for Salesforce & HubSpot customer directories.',
    category: 'CRM & Sales',
    description: 'A background automation tool that extracts, normalizes, and keeps contact lists fully aligned in real time between your Salesforce and HubSpot instances. Saves manual entry, removes duplicates and filters incorrect entries automatically.',
    pricing: 1499,
    recurring_type: 'monthly',
    rating: 4.9,
    downloads: 342,
    features: [
      'Automatic property mapping and database column alignment',
      'Cognitive conflict resolution with smart safety rollbacks',
      'Lead rating indicators based on customer profiles',
      'Real-time automated notifications on Slack or email',
      'Multi-source duplicate checking across active databases'
    ],
    integrations: ['Salesforce', 'HubSpot', 'Slack', 'Gmail', 'Microsoft Dynamics'],
    workflow_steps: [
      { id: 'ws-1', title: 'Webhook Lead Trigger', description: 'Triggers on incoming lead hooks or raw form submissions.', status: 'completed' },
      { id: 'ws-2', title: 'Data Cleaning & Mapping', description: 'Maps dirty text keys to standard company business parameters.', status: 'completed' },
      { id: 'ws-3', title: 'Database Contact Search', description: 'Searches database systems via exact and fuzzy matching.', status: 'in_progress' },
      { id: 'ws-4', title: 'System Logs Update', description: 'Outputs precise lead alignment details in logs.', status: 'scheduled' }
    ],
    roi_estimate: {
      hours_saved: 45,
      monthly_savings: 2400,
      payback_period_days: 18
    },
    code_schema: `{
  "agent_id": "crm-database-synchronizer",
  "version": "1.0.8",
  "triggers": [
    { "type": "webhook", "endpoint": "/api/v1/inbound-leads" }
  ],
  "steps": {
    "normalization": {
      "temperature": 0.1,
      "format": "JSON"
    },
    "routing": {
      "strategy": "exact-match",
      "threshold": 0.85
    }
  }
}`,
    thumbnail: 'Database'
  },
  {
    id: 'agent-aether-defi',
    name: 'Expense Audit & Ledger Tracker',
    tagline: 'Automated auditing and transaction processing across financial ledgers.',
    category: 'Finance',
    description: 'An independent service designed to monitor ledger transactions. It extracts line items from payment histories, builds accurate balance sheets, flags out-of-bounds expenses, and automatically exports clean CSV logs directly to bookkeeping systems.',
    pricing: 2899,
    recurring_type: 'fixed',
    rating: 4.85,
    downloads: 189,
    features: [
      'Real-time expense stream monitoring from integrated accounts',
      'Smart itemization and categorization of individual line assets',
      'Automatic warning triggers for out-of-policy transaction items',
      'Secure file interface for corporate account export',
      'Audit metrics dashboard for monthly bookkeeping reconciliation'
    ],
    integrations: ['Stripe', 'Plaid', 'QuickBooks', 'Xero', 'SendGrid'],
    workflow_steps: [
      { id: 'ws-1', title: 'Account History Extraction', description: 'Polls payment API for pending transactions.', status: 'completed' },
      { id: 'ws-2', title: 'Expense Classification', description: 'Solves itemization of charges based on rules.', status: 'completed' },
      { id: 'ws-3', title: 'Policy Violation Check', description: 'Checks lines against standard auditing budgets.', status: 'in_progress' },
      { id: 'ws-4', title: 'Automated Account Sync', description: 'Submits finalized accounting reports to active ledger.', status: 'scheduled' }
    ],
    roi_estimate: {
      hours_saved: 12,
      monthly_savings: 4100,
      payback_period_days: 22
    },
    code_schema: `{
  "agent_id": "expense-ledger-tracker",
  "accounts": [
    { "gateway": "stripe", "sync_ms": 1200 }
  ],
  "safety": {
    "max_charge_variance": 0.05,
    "warning_limit_usd": 500
  }
}`,
    thumbnail: 'Zap'
  },
  {
    id: 'agent-inbound-catalyst',
    name: 'B2B Lead Scraper & Outreach',
    tagline: 'Automated contact details extraction and scheduling for outreach workflows.',
    category: 'Data & Scraping',
    description: 'An outbound lead helper that scrapes professional indices based on your target company profiles, cleans domain names and checks address records, drafts tailored introduction materials, and updates client spreadsheets automatically.',
    pricing: 899,
    recurring_type: 'monthly',
    rating: 4.78,
    downloads: 512,
    features: [
      'Structured profile data collection from target directories',
      'Verification check of domain names and active email records',
      'Dynamic message template output with variable company fields',
      'Direct scheduling engine integrations for calendar booking',
      'Interactive tables mapping active prospect states and replies'
    ],
    integrations: ['LinkedIn API', 'Apollo.io', 'Instantly.ai', 'Google Sheets', 'Calendly'],
    workflow_steps: [
      { id: 'ws-1', title: 'Profile Extraction & Sorting', description: 'Extracts prospect criteria from directory lists.', status: 'completed' },
      { id: 'ws-2', title: 'Template Material Customization', description: 'Fills target attributes to draft introductory lines.', status: 'completed' },
      { id: 'ws-3', title: 'Email Address Validation', description: 'Checks SPF and MX records across target email domains.', status: 'in_progress' },
      { id: 'ws-4', title: 'Spreadsheet Integration', description: 'Coordinates directly with the spreadsheet to append rows.', status: 'scheduled' }
    ],
    roi_estimate: {
      hours_saved: 30,
      monthly_savings: 1500,
      payback_period_days: 15
    },
    code_schema: `{
  "campaign_id": "outreach-campaign",
  "enrichment": {
    "sources": ["apollo", "public-directories"],
    "scraping_depth": "standard"
  },
  "sequence": {
    "step_1_wait_days": 1,
    "limit_per_day": 45
  }
}`,
    thumbnail: 'Users'
  },
  {
    id: 'agent-omni-social',
    name: 'Automated Social Post Writer',
    tagline: 'Brand message and content generator utilizing modern SEO trends.',
    category: 'Content AI',
    description: 'Creates optimized drafts and scheduled articles for your business media feeds. Parses google keywords and search trends, crafts updates corresponding to your company guidelines, and schedules publication times.',
    pricing: 650,
    recurring_type: 'monthly',
    rating: 4.95,
    downloads: 271,
    features: [
      'Keyword and search phrase monitoring parameters',
      'Tone of voice draft writer conforming to instructions',
      'Editorial review checks before queuing live publications',
      'Fuzzy comment routing with status flags',
      'Asset selection and output formatting parameters'
    ],
    integrations: ['Twitter/X Developer API', 'LinkedIn API', 'Discord SDK', 'Pinecone Vector DB'],
    workflow_steps: [
      { id: 'ws-1', title: 'Search Parameter Scan', description: 'Scans Google Trends for search volume terms.', status: 'completed' },
      { id: 'ws-2', title: 'Content Outline Drafting', description: 'Fills brand instruction guidelines and avoid blocks.', status: 'completed' },
      { id: 'ws-3', title: 'Layout Setup & Review', description: 'Prepares social templates or code blocks via assets.', status: 'in_progress' },
      { id: 'ws-4', title: 'Publication Queue Sync', description: 'Checks schedule slots to push postings to channels.', status: 'scheduled' }
    ],
    roi_estimate: {
      hours_saved: 20,
      monthly_savings: 950,
      payback_period_days: 21
    },
    code_schema: `{
  "company_voice": "professional-direct",
  "channels": ["X", "LinkedIn"],
  "filters": {
    "avoid_political": true,
    "prefer_technical": true
  }
}`,
    thumbnail: 'Cpu'
  },
  {
    id: 'agent-aura-sync',
    name: 'Document Parser & Ingestion Pipeline',
    tagline: 'Extract values from raw files and map them to clean database entries.',
    category: 'Operations',
    description: 'An automated operations utility. Whenever a contract PDF, spreadsheet CSV, or transaction sheet is delivered to your folder, this pipeline parses text rows, extracts semantic properties, and records structured tables.',
    pricing: 1750,
    recurring_type: 'fixed',
    rating: 4.74,
    downloads: 154,
    features: [
      'Intelligent document text parsing with row separators',
      'Custom regex key extraction keeping file data intact',
      'Hot-swappable database and cloud output structures',
      'Duplicate row filtering and value checks',
      'Test run simulation sandbox for pipeline developers'
    ],
    integrations: ['AWS S3', 'Pinecone', 'OpenAI Embedding v3', 'Qdrant', 'Langchain Core'],
    workflow_steps: [
      { id: 'ws-1', title: 'Folder File Tracker', description: 'Registers triggers for file insertion in folders.', status: 'completed' },
      { id: 'ws-2', title: 'Text & Values Extraction', description: 'Processes uploaded documents, extracting rows.', status: 'completed' },
      { id: 'ws-3', title: 'Schema Fields Checking', description: 'Applies data type and range rules before mapping.', status: 'in_progress' },
      { id: 'ws-4', title: 'Database Table Insert', description: 'Deports data points and values to final directory tables.', status: 'scheduled' }
    ],
    roi_estimate: {
      hours_saved: 35,
      monthly_savings: 3200,
      payback_period_days: 16
    },
    code_schema: `{
  "pipeline_id": "document-ingest-pipeline",
  "ingestion": {
    "format": "csv-pdf",
    "encoding": "utf-8"
  },
  "destination": {
    "provider": "sql-database",
    "table": "parsed_documents"
  }
}`,
    thumbnail: 'Globe'
  },
  {
    id: 'agent-customer-support',
    name: 'Customer Support Auto-Responder',
    tagline: 'Draft automated support replies based on customer email contents.',
    category: 'Support',
    description: 'Speeds up your response cycles. Securely filters support tickets, references your common business knowledge bases, and compiles tailored draft replies for support teams to review and send with a single click.',
    pricing: 450,
    recurring_type: 'monthly',
    rating: 4.80,
    downloads: 120,
    features: [
      'Inbound ticket semantic evaluation parameters',
      'Knowledge database lookup and relevant info retrieval',
      'Draft creation with clickable manual validation flags',
      'Priority ticket flagging for direct escalation routing',
      'Automated standard statistics logging system'
    ],
    integrations: ['Zendesk', 'Gmail', 'Slack', 'Intercom'],
    workflow_steps: [
      { id: 'ws-1', title: 'Ticket Extraction', description: 'Checks support mailbox for new customer incidents.', status: 'completed' },
      { id: 'ws-2', title: 'Knowledge Base Query', description: 'Queries reference documents for answers.', status: 'completed' },
      { id: 'ws-3', title: 'Template Answer Writing', description: 'Writes conversational responses with guidelines.', status: 'in_progress' },
      { id: 'ws-4', title: 'Draft Queue Save', description: 'Saves drafted response to the workspace agent desk.', status: 'scheduled' }
    ],
    roi_estimate: {
      hours_saved: 40,
      monthly_savings: 1800,
      payback_period_days: 10
    },
    code_schema: `{
  "agent_id": "support-auto-responder",
  "inbox": {
    "provider": "gmail"
  },
  "safety": {
    "approve_manually": true,
    "priority_escalation": true
  }
}`,
    thumbnail: 'Sliders'
  }
];

// Helper functions for mock Supabase db loaded via localStorage
export const getStoredAgents = (): Agent[] => {
  const data = localStorage.getItem('neightn_agents');
  if (!data) {
    localStorage.setItem('neightn_agents', JSON.stringify(INITIAL_AGENTS));
    return INITIAL_AGENTS;
  }
  try {
    const parsed = JSON.parse(data) as Agent[];
    // If it contains any old categories, reset to match new clean business-friendly names
    const hasOldCategories = parsed.some(agent => 
      agent.category === 'Enterprise AI' || 
      agent.category === 'Crypto & DeFi' || 
      agent.category === 'Social Automation' ||
      agent.category === 'Growth Hacking' ||
      agent.category === 'Data Pipeline' ||
      agent.category === 'AI Agents'
    );
    if (hasOldCategories) {
      localStorage.setItem('neightn_agents', JSON.stringify(INITIAL_AGENTS));
      return INITIAL_AGENTS;
    }
    return parsed;
  } catch (e) {
    localStorage.setItem('neightn_agents', JSON.stringify(INITIAL_AGENTS));
    return INITIAL_AGENTS;
  }
};

export const saveStoredAgent = (newAgent: Agent) => {
  const current = getStoredAgents();
  // Filter out any existing with same ID
  const filtered = current.filter(a => a.id !== newAgent.id);
  const updated = [newAgent, ...filtered];
  localStorage.setItem('neightn_agents', JSON.stringify(updated));
  return updated;
};

export const getCart = (): any[] => {
  const data = localStorage.getItem('neightn_cart');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveCart = (cart: any[]) => {
  localStorage.setItem('neightn_cart', JSON.stringify(cart));
};

export const getOrders = (): any[] => {
  const data = localStorage.getItem('neightn_orders');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveOrder = (order: any) => {
  const current = getOrders();
  const updated = [order, ...current];
  localStorage.setItem('neightn_orders', JSON.stringify(updated));
  return updated;
};

export const getProjects = (): any[] => {
  const data = localStorage.getItem('neightn_projects');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveProject = (project: any) => {
  const current = getProjects();
  const filtered = current.filter(p => p.id !== project.id);
  const updated = [project, ...filtered];
  localStorage.setItem('neightn_projects', JSON.stringify(updated));
  return updated;
};
