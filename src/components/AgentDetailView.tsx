import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Zap, Download, Star, Server, Puzzle, CircleDollarSign, Percent, Copy, Terminal, ShoppingCart, HelpCircle } from 'lucide-react';
import { Agent, CartItem } from '../types';

interface AgentDetailViewProps {
  agent: Agent;
  onNavigate: (view: string, data?: any) => void;
  onAddToCart: (agent: Agent) => void;
}

export default function AgentDetailView({ agent, onNavigate, onAddToCart }: AgentDetailViewProps) {
  // ROI Slider state variables
  const [hoursSaved, setHoursSaved] = useState(agent.roi_estimate.hours_saved);
  const [hourlyRate, setHourlyRate] = useState(45); // default $45/hour cost of staff
  const [copied, setCopied] = useState(false);
  const [notified, setNotified] = useState(false);

  // Compute live calculations
  const monthlyLaborCostSaved = Math.round(hoursSaved * 4.33 * hourlyRate);
  const agentCost = agent.pricing; 
  const monthlySavings = agent.recurring_type === 'monthly' 
    ? Math.max(0, monthlyLaborCostSaved - agentCost) 
    : monthlyLaborCostSaved;
  
  // Payback period
  const totalInvestment = agent.recurring_type === 'monthly' ? agentCost : agentCost;
  const paybackPeriodDays = monthlyLaborCostSaved > 0 
    ? Math.round((totalInvestment / (monthlyLaborCostSaved / 30))) 
    : 0;

  const handleCopySchema = () => {
    if (!agent.code_schema) return;
    navigator.clipboard.writeText(agent.code_schema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCartClick = () => {
    onAddToCart(agent);
    setNotified(true);
    setTimeout(() => setNotified(false), 3000);
  };

  return (
    <div className="bg-transparent min-h-screen text-slate-100 pb-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto pt-10">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('marketplace')}
          id="detail-back-btn"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-550 hover:text-white mb-10 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK_TO_REGISTRY_CATALOG</span>
        </button>

        {/* HERO TITLE & DETAILS BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-wrap items-center gap-3.5 text-xs text-zinc-400">
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                {agent.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                <span>{agent.rating} stability score</span>
              </div>
              <div className="h-3 w-px bg-white/[0.08]"></div>
              <div>
                {agent.downloads} active compilations
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {agent.name}
            </h1>

            <p className="text-zinc-450 font-sans text-sm md:text-base leading-relaxed">
              {agent.description}
            </p>

            {/* Workflow steps displaying status */}
            <div className="border border-white/[0.06] bg-[#151B23]/40 p-6 md:p-8 rounded-2xl relative backdrop-blur-md shadow-lg">
              <h3 className="font-mono text-xs font-bold text-zinc-300 mb-6 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>SPECIFIED SYSTEM WORKFLOW RUNTIMES</span>
              </h3>

              <div className="space-y-6">
                {agent.workflow_steps.map((step, idx) => (
                  <div key={step.id} className="flex gap-4 items-start relative select-text">
                    {idx < agent.workflow_steps.length - 1 && (
                      <div className="absolute left-[9px] top-[18px] bottom-[-22px] w-[1px] bg-white/[0.08]"></div>
                    )}
                    
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] border mt-0.5 shrink-0 ${
                      step.status === 'completed' ? 'bg-emerald-500 text-[#0B0F14] border-emerald-500 font-bold' :
                      step.status === 'in_progress' ? 'bg-[#151B23] border-emerald-500/40 text-emerald-400 animate-pulse' :
                      'bg-black/30 border-white/10 text-zinc-600'
                    }`}>
                      {step.status === 'completed' ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white tracking-tight">{step.title}</span>
                        <span className={`text-[9px] font-mono leading-none tracking-wider uppercase font-semibold ${
                          step.status === 'completed' ? 'text-emerald-450' :
                          step.status === 'in_progress' ? 'text-yellow-500' :
                          'text-zinc-550'
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      <p className="text-zinc-450 text-[11.5px] leading-relaxed mt-1 font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CHECKOUT PRICING CONTAINER SIDEBAR */}
          <div className="border border-white/[0.06] bg-[#151B23]/40 hover:bg-[#151B23]/70 transition-colors backdrop-blur-md rounded-2xl p-6 space-y-6 lg:sticky lg:top-24 shadow-xl">
            <div>
              <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block font-bold">DEPLOYMENT UNIT REGISTRY FEE</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-bold tracking-tight text-white">${agent.pricing}</span>
                <span className="text-xs text-zinc-500 font-medium">/{agent.recurring_type === 'monthly' ? 'monthly' : 'fixed'}</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-3 leading-relaxed">
                Includes compiled package, persistent sync registers, sandbox credentials and dashboard latency diagnostics console access.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/[0.06]">
              <button
                onClick={handleAddToCartClick}
                id="detail-add-to-cart-btn"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-[#0B0F14] font-semibold text-xs tracking-wide uppercase rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md shadow-emerald-500/10"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>DEPLOY TO INSTANCE</span>
              </button>

              {notified && (
                <div className="animate-fade-in p-2.5 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded text-center font-bold">
                  Instance configured inside operational pipelines
                </div>
              )}
            </div>

            <div className="space-y-2.5 text-xs font-sans text-zinc-500 border-t border-white/[0.06] pt-4 leading-normal">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero-trust network layer audited</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span>Standard schema pipeline latency: 15ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTEGERS & FEATURES LIST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Functional Specifications Features */}
          <div className="border border-white/[0.06] bg-[#151B23]/40 p-6 md:p-8 rounded-2xl">
            <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2 tracking-tight">
              <Server className="w-5 h-5 text-emerald-400" />
              <span>Core Functional Capabilities</span>
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400 font-sans">
              {agent.features.map((feature, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="text-emerald-500 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Integration specs index */}
          <div className="border border-white/[0.06] bg-[#151B23]/40 p-6 md:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 tracking-tight">
                <Puzzle className="w-5 h-5 text-emerald-400" />
                <span>Platform System Connectors</span>
              </h3>
              <p className="text-zinc-500 text-xs mb-5 leading-normal">
                Pre-configured credentials structures are validated in the schema registers for instant handshake:
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.integrations.map((item) => (
                  <span key={item} className="text-xs font-mono text-zinc-400 bg-black/30 border border-white/[0.04] px-3 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-black/30 border border-white/[0.04] p-4 rounded-xl font-sans text-xs text-zinc-500 leading-relaxed">
              <span className="text-emerald-450 font-semibold font-mono uppercase block text-[10px] tracking-wider mb-1">AUTOMATED SUPABASE TRIGGERS:</span> Outputs telemetry signals to direct real-time DB states. Zero memory loss on critical events.
            </div>
          </div>
        </div>

        {/* INTERACTIVE ROI ESTIMATOR CALCULATOR */}
        <section className="border border-white/[0.06] bg-[#151B23]/40 p-6 md:p-8 rounded-2xl mb-12 backdrop-blur-md">
          <div className="border-b border-white/[0.06] pb-4 mb-6">
            <h3 className="text-lg font-bold text-white tracking-tight">Dynamic ROI Projection Canvas</h3>
            <p className="text-zinc-500 font-mono text-xs mt-0.5">CALCULATE MONETARY EFFICIENCY BASED ON ADJUSTED WEEKLY VOLUME</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Sliders Input Segment */}
            <div className="space-y-6">
              {/* Slider 1: Average saved hours/week */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-zinc-300 mb-2">
                  <span>WEEKLY TEAM CONSTRUCT SAVINGS</span>
                  <span className="text-emerald-450 font-bold">{hoursSaved} hrs/week</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  id="roi-hours-slider"
                  value={hoursSaved}
                  onChange={(e) => setHoursSaved(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-800/80 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-zinc-550 font-mono mt-1 block">Specify administrative execution hours replaced by operators.</span>
              </div>

              {/* Slider 2: Average Employee Hourly value */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-zinc-300 mb-2">
                  <span>AVERAGE EMPLOYEE RESOURCE RATE</span>
                  <span className="text-emerald-450 font-bold">${hourlyRate}/hour</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="150"
                  id="roi-rate-slider"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-800/80 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-zinc-550 font-mono mt-1 block">Est. loaded hourly wage/labor cost of physical processor.</span>
              </div>
            </div>

            {/* Results Segment representing: "ROI estimate" visual gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-center">
              
              <div className="p-4 bg-black/20 border border-white/[0.04] rounded-xl flex flex-col justify-between min-h-[96px]">
                <div className="text-[8px] text-zinc-500 uppercase tracking-wider font-semibold font-mono">STAFF LABOR VALUE</div>
                <div className="text-xl font-bold text-white mt-1">${monthlyLaborCostSaved}</div>
                <span className="text-[8.5px] text-zinc-550 mt-1 font-mono">/monthly saved</span>
              </div>

              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex flex-col justify-between min-h-[96px]">
                <div className="text-[8px] text-emerald-400 uppercase tracking-wider font-semibold font-mono">ESTIMATED MET SAVINGS</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">${monthlySavings}</div>
                <span className="text-[8.5px] text-emerald-500/60 mt-1 font-mono">/monthly net</span>
              </div>

              <div className="p-4 bg-black/20 border border-white/[0.04] rounded-xl flex flex-col justify-between min-h-[96px]">
                <div className="text-[8px] text-zinc-500 tracking-wider font-semibold font-mono">UNIT BREAK EVEN</div>
                <div className="text-xl font-bold text-white mt-1">{paybackPeriodDays} <span className="text-xs text-zinc-500 font-normal">days</span></div>
                <span className="text-[8.5px] text-zinc-550 mt-1 font-mono">payback period</span>
              </div>

            </div>

          </div>
        </section>

        {/* CODE SCHEMA / RAW WORKFLOW CODE INSPECTOR */}
        {agent.code_schema && (
          <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl overflow-hidden mb-12 shadow-md">
            <div className="bg-black/20 px-6 py-4 border-b border-white/[0.06] flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Schema Blueprint Specs // <b>{agent.id}.json</b></span>
              </div>
              
              <button
                onClick={handleCopySchema}
                id="detail-copy-code-btn"
                className="text-[10.5px] text-zinc-300 hover:text-white cursor-pointer px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'COPIED' : 'COPY SCHEMATIC'}</span>
              </button>
            </div>
            
            <pre className="p-6 text-[11px] leading-relaxed font-mono bg-black/40 text-emerald-400/90 overflow-x-auto h-52 select-text">
              <code>{agent.code_schema}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
