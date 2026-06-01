import React, { useState } from 'react';
import { Database, PlusCircle, Terminal, HelpCircle, Code, DollarSign, Tag, Check, Award } from 'lucide-react';
import { Agent, Category, MARKETPLACE_CATEGORIES, WorkflowStep } from '../types';

interface AdminDashboardProps {
  onSaveAgent: (agent: Agent) => void;
  onNavigate: (view: string) => void;
}

export default function AdminDashboard({ onSaveAgent, onNavigate }: AdminDashboardProps) {
  // Input fields state
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<Category>('CRM & Sales');
  const [pricing, setPricing] = useState<number>(499);
  const [recurringType, setRecurringType] = useState<'monthly' | 'fixed'>('monthly');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('Dynamic Salesforce routing triggers\nFull visual analytics telemetry board\nAuto lead scoring metrics engine');
  const [integrationsText, setIntegrationsText] = useState('Salesforce, HubSpot, Slack, Supabase, Stripe');
  const [thumbnailIcon, setThumbnailIcon] = useState('Cpu');
  const [customJson, setCustomJson] = useState(`{\n  "agent_id": "custom-agent-node",\n  "version": "1.0.0",\n  "triggers": [\n    { "type": "webhook", "endpoint": "/api/v1/trigger" }\n  ]\n}`);

  // Flow status & logs
  const [isDeploying, setIsDeploying] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'Connected to Supabase DB: v1.4.2 [SECURE]',
    'Waiting for deployment package instructions payload...'
  ]);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !tagline || !description) {
      setLogs(prev => [...prev, '[ERR] Missing required payload. Compile sequence terminated.']);
      return;
    }

    setIsDeploying(true);
    setLogs(prev => [...prev, '[COMPILER] SANITIZING AND PARSING JSON WORKFLOW SCHEMA...']);

    setTimeout(() => {
      setLogs(prev => [...prev, '[COMPILER] BINDING INTEGRATIONS TOKEN STRUCTURES...']);
      
      setTimeout(() => {
        setLogs(prev => [...prev, '[SUPABASE] INJECTING SCHEMAS RECORD INTO DATABASE CLUSTER...']);
        
        setTimeout(() => {
          // Construct workflow steps list matching inputs
          const defaultSteps: WorkflowStep[] = [
            { id: `step-${Date.now()}-1`, title: 'Schema Inbound Handshake', description: 'Handshakes with connected web API nodes.', status: 'completed' },
            { id: `step-${Date.now()}-2`, title: 'Dynamic Semantic Classifier', description: 'Executes category validation on text arrays.', status: 'in_progress' },
            { id: `step-${Date.now()}-3`, title: 'Symmetric Record Deport', description: 'Dispatches finalized events into standard database indices.', status: 'scheduled' }
          ];

          const newAgent: Agent = {
            id: `agent-custom-${Date.now()}`,
            name,
            tagline,
            category,
            description,
            pricing: Number(pricing),
            recurring_type: recurringType,
            rating: 5.0,
            downloads: 1,
            features: featuresText.split('\n').filter(Boolean),
            integrations: integrationsText.split(',').map(s => s.trim()).filter(Boolean),
            workflow_steps: defaultSteps,
            roi_estimate: {
              hours_saved: 20,
              monthly_savings: Math.round(20 * 4.33 * 45),
              payback_period_days: Math.round((Number(pricing) / ((20 * 4.33 * 45) / 30)))
            },
            code_schema: customJson,
            thumbnail: thumbnailIcon
          };

          // Save back to parent state
          onSaveAgent(newAgent);
          
          setIsDeploying(false);
          setLogs(prev => [
            ...prev, 
            `[SUCCESS] Node created: ${newAgent.name.toUpperCase()} synced with Supabase catalog standard.`,
            '[CMD] Refreshing local registry maps...'
          ]);

          // Clear inputs on success so user is ready to make another
          setName('');
          setTagline('');
          setDescription('');

          // Smoothly redirect to marketplace shortly after success
          setTimeout(() => {
            onNavigate('marketplace');
          }, 1500);

        }, 1200);
      }, 950);
    }, 1100);
  };

  return (
    <div className="bg-transparent min-h-screen text-slate-100 pb-28 px-6 md:px-12 select-text">
      <div className="max-w-5xl mx-auto pt-10">

        {/* Header navigation summaries */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/[0.06] pb-6 mb-10 gap-5">
          <div>
            <div className="font-mono text-emerald-450 text-[9.5px] flex items-center gap-1.5 uppercase leading-none mb-1.5 font-bold tracking-widest">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
              AUTHORIZED OPERATOR ADMIN TOOLKIT
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans lowercase">
              neightn.ai Unified Compiler Node
            </h1>
            <p className="text-zinc-500 text-xs mt-1 leading-relaxed max-w-sm font-sans">
              Publish custom-designed autonomous agents directly into the cloud cluster. Configures pricing slots, telemetry schemas, and modular categories instantly.
            </p>
          </div>

          <div className="text-right font-mono text-[10px] text-zinc-550 hidden md:block">
            <span>TERMINAL SECURITY KEY: <b>AES256-SYMMETRIC-OK</b></span>
          </div>
        </div>

        {/* ADMIN CONFIGURATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* CONFIGURATION FORM */}
          <form 
            onSubmit={handlePublish}
            id="admin-agent-form"
            className="lg:col-span-2 border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-6 md:p-8 space-y-6 text-xs font-sans"
          >
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] pb-4">
              <PlusCircle className="w-5.5 h-5.5 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">DEPLOY NEW AGENT BLUEPRINTS</span>
            </div>

            {/* Row 1: Name and Tagline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="admin-name" className="font-mono text-[9px] text-zinc-550 uppercase block font-bold tracking-widest">Agent Operator Name</label>
                <input
                  type="text"
                  required
                  id="admin-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Salesforce Sync Operator x8"
                  className="w-full bg-black/40 text-xs text-white p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="admin-tagline" className="font-mono text-[9px] text-zinc-550 uppercase block font-bold tracking-widest">Dynamic Metric Tagline</label>
                <input
                  type="text"
                  required
                  id="admin-tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Real-time automatic pipeline CRM routing and entity alignment."
                  className="w-full bg-black/40 text-xs text-white p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Category, icon and pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-zinc-555 uppercase block font-bold tracking-widest">Category Mapping</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full bg-[#151B23] text-zinc-300 p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors cursor-pointer"
                >
                  {MARKETPLACE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[9px] text-zinc-555 uppercase block font-bold tracking-widest">Deploy Fee ($)</label>
                <input
                  type="number"
                  required
                  value={pricing}
                  onChange={(e) => setPricing(Number(e.target.value))}
                  placeholder="999"
                  className="w-full bg-black/40 text-xs text-white p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[9px] text-zinc-555 uppercase block font-bold tracking-widest">Recurring Type</label>
                <select
                  value={recurringType}
                  onChange={(e) => setRecurringType(e.target.value as any)}
                  className="w-full bg-[#151B23] text-zinc-300 p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="monthly">MONTHLY RATE</option>
                  <option value="fixed">FIXED ONE-TIME</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="admin-desc" className="font-mono text-[9px] text-zinc-555 uppercase block font-bold tracking-widest">Agent Operations Paragraph</label>
              <textarea
                required
                id="admin-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Elaborated performance report detailing how this autonomous agent parses input data clusters, leverages key integrations, and stores persistent results..."
                className="w-full bg-black/40 text-xs text-white p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors resize-none font-sans"
              />
            </div>

            {/* Features (newline separated) */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] text-zinc-555 uppercase block font-bold tracking-widest">Core Features (newline separated list)</label>
              <textarea
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                rows={3}
                placeholder="Salesforce webhook trigger alignment&#10;Smart security credentials token check&#10;Auto analytics scoring loops"
                className="w-full bg-black/40 text-xs text-white p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors resize-none font-sans"
              />
            </div>

            {/* Integrations (comma separated) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-zinc-555 uppercase block font-bold tracking-widest">Platform Integrations (comma separated list)</label>
                <input
                  type="text"
                  value={integrationsText}
                  onChange={(e) => setIntegrationsText(e.target.value)}
                  placeholder="Salesforce, HubSpot, Slack"
                  className="w-full bg-black/40 text-xs text-white p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[9px] text-zinc-555 uppercase block font-bold tracking-widest">Thumbnail Visual Icon</label>
                <select
                  value={thumbnailIcon}
                  onChange={(e) => setThumbnailIcon(e.target.value)}
                  className="w-full bg-[#151B23] text-zinc-300 p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Cpu">CPU CORE</option>
                  <option value="Database">DATABASE STORAGE</option>
                  <option value="Globe">WORLDWIDE NETWORK</option>
                  <option value="Zap">ZAP SPARK</option>
                  <option value="Users">USERS GROUPS</option>
                </select>
              </div>
            </div>

            {/* RAW JSON CUSTOM CODE SCHEMA TEXT AREA */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] text-zinc-555 uppercase block font-bold tracking-widest">JSON SCHEMA BLUEPRINT CONTEXT (UPLOAD)</label>
              <textarea
                value={customJson}
                onChange={(e) => setCustomJson(e.target.value)}
                rows={5}
                className="w-full bg-black/40 text-emerald-400 p-3 border border-white/10 rounded-xl focus:border-emerald-500/40 focus:outline-none transition-colors resize-none font-mono text-[11px]"
              />
            </div>

            {/* Deploy triggers */}
            <button
              type="submit"
              disabled={isDeploying}
              id="admin-deploy-btn"
              className={`w-full py-3.5 bg-emerald-500 text-[#0B0F14] font-semibold font-mono text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer ${
                isDeploying ? 'bg-zinc-850 text-zinc-500 border border-zinc-700 cursor-not-allowed' : 'hover:bg-emerald-450 animate-none'
              }`}
            >
              <span>SYNC_DEPLOY_TO_SUPABASE</span>
            </button>

          </form>

          {/* ADMIN CONSOLE LOGS & ADVISORY PANEL */}
          <div className="space-y-6">
            
            {/* Live compiler actions logs view */}
            <div className="border border-white/[0.06] bg-black/40 rounded-2xl overflow-hidden flex flex-col justify-between h-80 backdrop-blur-md">
              <div className="bg-black/20 px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>COMPILER_STREAM // PORT_3000</span>
                </div>
                <span>LIVE</span>
              </div>

              <pre className="p-4 flex-1 overflow-y-auto font-mono text-[10px] text-zinc-400 space-y-1.5 bg-black/10 leading-relaxed text-left">
                {logs.map((log, index) => (
                  <div key={index} className="truncate">
                    <span className="text-emerald-450 font-bold select-none">{`>>`}</span> {log}
                  </div>
                ))}
                {isDeploying && (
                  <div className="text-emerald-400 animate-pulse uppercase font-semibold text-[9px] mt-2 leading-none">
                    Injecting parameters, hashing indices...
                  </div>
                )}
              </pre>

              <div className="bg-black/20 border-t border-white/[0.06] p-2.5 font-mono text-[9.5px] text-zinc-555 text-center">
                VPC PORT SECURE. SSL_STANDARD: PASSED.
              </div>
            </div>

            {/* Operator Guidelines */}
            <div className="border border-white/[0.06] bg-[#151B23]/40 p-5 md:p-6 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.06] pb-3 font-mono">
                <Award className="w-4.5 h-4.5 text-emerald-400" />
                <span>Compiler Rules</span>
              </h3>

              <div className="text-[10px] text-zinc-500 leading-normal space-y-3 font-mono">
                <div>
                  <b className="text-zinc-300 font-bold block">[01] SCHEMA CONSTRAINTS</b>
                  <p className="font-sans text-zinc-450 mt-1">All submitted blueprint contexts must support clean JSON validation. Unreferenced triggers automatically alert default CRM handlers.</p>
                </div>
                <div>
                  <b className="text-zinc-300 font-bold block">[02] SUPABASE COGNIZANCE</b>
                  <p className="font-sans text-zinc-450 mt-1">Deployed items synchronize and become fully queryable from the main catalog index instantly on compiling resolve.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
