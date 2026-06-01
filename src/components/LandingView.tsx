import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Zap, CircleDot, Play, Cpu, ArrowUpRight, CheckCircle2, ChevronRight, Activity, Code } from 'lucide-react';
import { Agent, MARKETPLACE_CATEGORIES, Category } from '../types';

interface LandingViewProps {
  onNavigate: (view: string, data?: any) => void;
  featuredAgents: Agent[];
}

export default function LandingView({ onNavigate, featuredAgents }: LandingViewProps) {
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category>('CRM & Sales');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Kernel initialization: success (v2.1)',
    'Database clusters synchronized with client instance.',
    'System standby. Awaiting execution instruction stream...',
  ]);
  const [compilerCode, setCompilerCode] = useState<string>('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);

  // Live compilation simulation code snippets
  const schemasToCompile: Record<string, string> = {
    'CRM & Sales': `{\n  "schema": "CRM-Sync",\n  "targets": ["Salesforce", "HubSpot"],\n  "rules": [\n    { "lead_weight": 0.9, "mql_flag": true }\n  ]\n}`,
    'Finance': `{\n  "schema": "Expense-Audit",\n  "ledger": "general",\n  "safety": {\n    "variance_limit": 100.0\n  }\n}`,
    'Content AI': `{\n  "schema": "Social-Post-Writer",\n  "weights": { "trend_match": 0.8 },\n  "channels": ["X", "LinkedIn"]\n}`,
    'Data & Scraping': `{\n  "schema": "Lead-Scraper",\n  "sequence": [\n    { "action": "scrape", "provider": "B2B-List" },\n    { "action": "export", "destination": "CRM" }\n  ]\n}`,
    'Operations': `{\n  "schema": "File-Ingestion",\n  "chunking": "standard",\n  "vector_db": "local-cache"\n}`,
    'Support': `{\n  "schema": "Support-Responder",\n  "rules": [\n    { "priority_escalation": true,\n    "language_detection": "auto" }\n  ]\n}`
  };

  useEffect(() => {
    setCompilerCode(schemasToCompile[selectedCategory] || schemasToCompile['CRM & Sales']);
  }, [selectedCategory]);

  // Terminal telemetry log rotation
  useEffect(() => {
    const interval = setInterval(() => {
      const liveLogPhrases = [
        `Sync packet routed to partition_${Math.floor(Math.random() * 9)}...`,
        `Core compute standard: ${(35 + Math.random() * 20).toFixed(1)}%`,
        `Verification loop complete. Handshake standard latency: ${(8 + Math.random() * 8).toFixed(2)}ms`,
        `Access tokens verified via zero-trust handshake.`,
        `Indexing matched active instances catalog.`
      ];
      const randomLine = liveLogPhrases[Math.floor(Math.random() * liveLogPhrases.length)];
      setTerminalLogs(prev => [...prev.slice(-6), `[${new Date().toLocaleTimeString()}] ${randomLine}`]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStartCompiling = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setCompileProgress(0);
    setTerminalLogs(prev => [...prev, `[STDOUT] Initiating operator cluster deployment sequence...`]);

    const interval = setInterval(() => {
      setCompileProgress(val => {
        if (val >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            setTerminalLogs(prev => [
              ...prev, 
              `[SUCCESS] System schema finalized. Instance [${selectedCategory}] registered to workspace.`,
              `[SUCCESS] Integration pipelines: ONLINE.`
            ]);
          }, 400);
          return 100;
        }
        return val + 10;
      });
    }, 120);
  };

  return (
    <div className="bg-transparent text-slate-105 min-h-screen relative pb-28">
      {/* Light glow elements to mimic Stripe/Linear dashboards */}
      <div className="absolute top-[-20%] left-[25%] w-[45%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none"></div>

      {/* HERO SECTION - Spacious, Minimal, Confident */}
      <section className="relative pt-20 md:pt-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Sleek Minimal Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full text-xs text-emerald-400 font-sans tracking-wide mb-8 backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-medium">RELIABLE WORKFLOW OPERATOR SPECIFICATIONS</span>
        </div>

        {/* Confident, Minimal Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Deploy structured <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">AI agent microarchitectures</span> inside your platform.
        </h1>

        {/* Sophisticated Description */}
        <p className="text-zinc-400 font-sans max-w-2xl text-sm md:text-base mb-12 leading-relaxed md:px-6">
          Accelerate your operational velocity using stateful, pre-configured AI operators. Fully synchronized database schemas paired with Stripe payment pipelines, tracked in real-time.
        </p>

        {/* Premium Button Suite */}
        <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-center w-full max-w-xs sm:max-w-md mb-20">
          <button
            onClick={() => onNavigate('marketplace')}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#0B0F14] font-medium rounded-lg text-xs tracking-wide uppercase transition-all duration-300 shadow-md shadow-emerald-500/10 cursor-pointer"
          >
            Explore Marketplace
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('sandbox-simulation');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg text-xs tracking-wide uppercase transition-colors"
          >
            Interactive Sandbox
          </button>
        </div>

        {/* Vercel-style clean Stats Grid */}
        <div className="w-full border border-[#10B981]/10 bg-[#020503]/75 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-xl max-w-5xl text-left mb-24 relative overflow-hidden">
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 font-sans">
            <div className="border-l border-white/[0.06] pl-4">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Active Workers</div>
              <div className="text-xl md:text-2xl font-bold text-white mt-1.5">84,192 <span className="text-emerald-400 text-xs font-normal">nodes</span></div>
            </div>
            
            <div className="border-l border-white/[0.06] pl-4">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Database Syncs</div>
              <div className="text-xl md:text-2xl font-bold text-white mt-1.5">4,812 <span className="text-emerald-400 text-xs font-normal">records</span></div>
            </div>

            <div className="border-l border-white/[0.06] pl-4">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">SaaS Transacted</div>
              <div className="text-xl md:text-2xl font-bold text-white mt-1.5">$8.42M <span className="text-zinc-500 text-xs font-normal">stripe</span></div>
            </div>

            <div className="border-l border-white/[0.06] pl-4">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Avg. Payback Period</div>
              <div className="text-xl md:text-2xl font-bold text-emerald-450 mt-1.5">17.2 <span className="text-zinc-500 text-xs font-normal">days</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUE PILLARS */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[#10B981]/10 bg-[#020503]/75 p-6 md:p-8 rounded-2xl relative group hover:border-[#10B981]/25 hover:bg-[#030906]/90 transition-all duration-300">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/5 border border-emerald-500/20 mb-5 text-emerald-450">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 tracking-tight">Immediate Operational Scale</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Incorporate pre-verified autonomous workflow microarchitectures to eliminate developer bottleneck and integrate directly into Stripe payment sequences.
            </p>
          </div>

          <div className="border border-[#10B981]/10 bg-[#020503]/75 p-6 md:p-8 rounded-2xl relative group hover:border-[#10B981]/25 hover:bg-[#030906]/90 transition-all duration-300">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/5 border border-emerald-500/20 mb-5 text-emerald-450">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 tracking-tight">Structured State Control</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Maintain dynamic record persistence inside your isolated Supabase cluster. Complete workflow tracing with zero data leaks or volatile memory drops.
            </p>
          </div>

          <div className="border border-[#10B981]/10 bg-[#020503]/75 p-6 md:p-8 rounded-2xl relative group hover:border-[#10B981]/25 hover:bg-[#030906]/90 transition-all duration-300">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/5 border border-emerald-500/20 mb-5 text-emerald-450">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 tracking-tight">SaaS Ready Integration</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Build clean client-side dashboards, handle user-aligned logins, manage developer parameters, and verify workflow steps within an intuitive interface.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED AGENTS SHOWCASE */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-28">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Curated Digital Assets</h2>
            <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wider font-mono">Verified agent frameworks ready for rapid deployment</p>
          </div>
          
          <button
            onClick={() => onNavigate('marketplace')}
            className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 group cursor-pointer"
          >
            <span>CATALOG_ALL_WORKSPACE</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Elegant modern agent cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAgents.slice(0, 3).map((agent) => (
            <div 
              key={agent.id}
              onClick={() => onNavigate('detail', agent)}
              className="border border-[#10B981]/10 bg-[#020503]/75 hover:bg-[#030906]/90 rounded-2xl p-6 cursor-pointer hover:border-[#10B981]/25 transition-all duration-300 group flex flex-col justify-between hover:shadow-xl hover:shadow-black/20 text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                    {agent.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    <span>{agent.downloads} deploys</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2.5">
                  {agent.name}
                </h3>
                
                <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed mb-6 font-sans">
                  {agent.tagline}
                </p>
              </div>

              <div>
                {/* Integration Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {agent.integrations.slice(0, 3).map((integration) => (
                    <span key={integration} className="text-[9px] font-mono text-zinc-400 bg-black/40 border border-white/[0.04] px-2 py-0.5 rounded">
                      {integration}
                    </span>
                  ))}
                  {agent.integrations.length > 3 && (
                    <span className="text-[9px] font-mono text-zinc-500 bg-black/40 border border-white/[0.04] px-1.5 py-0.5 rounded">
                      +{agent.integrations.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="font-sans text-sm font-bold text-white">
                    ${agent.pricing} <span className="text-xs text-zinc-550 font-normal">/{agent.recurring_type === 'monthly' ? 'mo' : 'fixed'}</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-450 group-hover:text-white flex items-center gap-1 transition-colors">
                    COMPILE <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CODE SANDBOX SECTION - Redesigned to look professional */}
      <section id="sandbox-simulation" className="px-6 md:px-12 max-w-7xl mx-auto mb-16 scroll-mt-24">
        <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl overflow-hidden shadow-2xl relative backdrop-blur-md">
          <div className="absolute top-0 right-0 p-4 text-[10px] text-zinc-500 font-mono hidden md:block">
            ACTIVE GATE: GEMINI_GEN_SDK_v3_SECURE
          </div>
          
          {/* Terminal control bar */}
          <div className="bg-black/30 px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-zinc-850 border border-white/10"></span>
                <span className="w-3 h-3 rounded-full bg-zinc-850 border border-white/10"></span>
                <span className="w-3 h-3 rounded-full bg-zinc-850 border border-white/10"></span>
              </div>
              <span className="font-mono text-xs text-zinc-400 pl-3">Workspace operator configuration platform</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Category tags Inside Terminal */}
              <select
                id="landing-category-select"
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
                value={selectedCategory}
                className="bg-black/80 hover:bg-black font-sans text-xs text-zinc-300 border border-white/10 rounded-lg px-2.5 py-1 outline-none transition-colors cursor-pointer"
              >
                {MARKETPLACE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Editor Input Code Structure */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/[0.06] font-mono text-xs">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.06]">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">JSON SCHEMATIC ENGINE</span>
                <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-tight">Synced</span>
              </div>
              <textarea
                value={compilerCode}
                onChange={(e) => setCompilerCode(e.target.value)}
                id="sandbox-schema-area"
                className="w-full h-56 bg-black/40 text-emerald-400/90 border-0 outline-none resize-none font-mono text-[11px] leading-relaxed p-3 rounded-lg focus:ring-1 focus:ring-emerald-500/20"
              />
              <div className="pt-4 flex items-center justify-between border-t border-white/[0.06]">
                <div className="text-[11px] text-zinc-500 max-w-[200px] leading-snug">
                  Edit fields to update parameters then execute local compile.
                </div>
                <button
                  onClick={handleStartCompiling}
                  disabled={isCompiling}
                  id="sandbox-compile-btn"
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all uppercase cursor-pointer ${
                    isCompiling 
                      ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed' 
                      : 'bg-emerald-500 text-[#0B0F14] hover:bg-emerald-450'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isCompiling ? 'Compiling node' : 'Deploy node'}
                </button>
              </div>
            </div>

            {/* Terminal Live Telemetry output log */}
            <div className="p-6 bg-black/50 font-mono text-[11px] flex flex-col justify-between min-h-[320px]">
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.06] text-zinc-500">
                  <span className="text-[10px] uppercase tracking-wider font-semibold">Standard IO Monitor</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse"></span>
                    <span className="text-[9px] text-zinc-400">active_stream</span>
                  </div>
                </div>

                <div className="space-y-2 h-44 overflow-y-auto">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="text-zinc-400 leading-relaxed text-[11px] truncate">
                      <span className="text-emerald-400 inline-block mr-2">&gt;_</span> {log}
                    </div>
                  ))}
                  {isCompiling && (
                    <div className="text-emerald-400 mt-4 leading-loose">
                      <span className="font-bold">COMPILING_SOCKET: [{compileProgress}%]</span>
                      <div className="w-full bg-zinc-900 h-1 rounded overflow-hidden mt-1.5 max-w-xs">
                        <div className="bg-emerald-500 h-full transition-all duration-150" style={{ width: `${compileProgress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-[10px] text-zinc-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>WORKSPACE INSTANCES SAVED SECURELY IN <span className="text-[#10B981] font-bold">SUPABASE_DB</span></div>
                <div className="uppercase">Platform nominal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER ENTERPRISE LEVEL - Clean, Muted slate gray references */}
      <footer className="border-t border-white/[0.06] bg-[#0E131A]/80 py-16 px-6 md:px-12 max-w-7xl mx-auto rounded-3xl mt-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="font-bold text-white text-xs tracking-wider lowercase mb-5">neightn.ai</div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs font-sans">
              Dynamic system integration structures and operator asset directory tools built for enterprise pipelines.
            </p>
          </div>
          <div>
            <div className="font-mono text-zinc-400 text-[10px] uppercase tracking-widest mb-5 font-semibold">DEPLOY_OPERATOR</div>
            <ul className="space-y-2.5 text-xs font-sans text-zinc-500">
              <li><span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('marketplace')}>Enterprise Catalog</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('admin')}>Register Workspace Node</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('tracking')}>Active Pipeline Trackers</span></li>
              <li><a href="#" className="hover:text-white transition-colors">Gemini Cognitive API</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-zinc-400 text-[10px] uppercase tracking-widest mb-5 font-semibold">SECURITY_CORE</div>
            <ul className="space-y-2.5 text-xs font-sans text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Stripe Dev Sandbox</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Supabase Realtime Tables</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Zero-Trust Key HSM</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Workspace OAuth Rules</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-zinc-400 text-[10px] uppercase tracking-widest mb-5 font-semibold">PLATFORM_NOTES</div>
            <p className="text-zinc-500 text-xs leading-relaxed font-sans">
              Operator Address: 3000 Ingress Node, Sandbox VPC. Redesigned frontend layer with React and Tailwind CSS.
            </p>
            <div className="mt-5 text-[10px] text-zinc-650 font-mono">
              © {new Date().getFullYear()} neightn.ai Corp. All privileges validated.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
