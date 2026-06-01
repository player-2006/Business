import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, ShieldAlert, Cpu, Terminal, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { Project, WorkflowStep } from '../types';

interface ProjectTrackingViewProps {
  projects: Project[];
  onTriggerSimulation: (projectId: string) => void;
  onNavigate: (view: string, data?: any) => void;
}

export default function ProjectTrackingView({ projects, onTriggerSimulation, onNavigate }: ProjectTrackingViewProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Simulation speed control
  const [isCompiling, setIsCompiling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'discovery' | 'design' | 'build' | 'testing' | 'live'>('discovery');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects]);

  useEffect(() => {
    const matched = projects.find(p => p.id === selectedProjectId);
    if (matched) {
      setActiveProject(matched);
      setProgress(matched.progress_percentage);
      setPhase(matched.current_phase);
      setConsoleLogs(matched.logs);
    }
  }, [selectedProjectId, projects]);

  // Run the compiling simulation
  const handleRunCompiler = () => {
    if (!activeProject || isCompiling) return;
    setIsCompiling(true);
    setProgress(0);
    setPhase('discovery');
    
    const logsStream = [
      '[DISCOVERY] Accessing agent core workspace blueprint...',
      '[DISCOVERY] Resolving dependencies of metadata catalog...',
      '[DISCOVERY] STAGE OK. Initial state verification: clean.',
      '[DESIGN] Computing Salesforce/Hubspot socket map connections...',
      '[DESIGN] Synthesizing atomic schema models...',
      '[DESIGN] STAGE OK. Class architecture defined.',
      '[BUILD] Initiating Vite pipeline builder compiler...',
      '[BUILD] Injecting secure Supabase database bindings...',
      '[BUILD] STAGE OK. Code boundaries validated.',
      '[TESTING] Launching virtual environment container framework...',
      '[TESTING] Fuzz-testing MEV front-run security rates...',
      '[TESTING] STAGE OK. Mock tests returned: 0 failures.',
      '[LIVE] Syncing nodes with production sandbox clusters...',
      '[LIVE] COMPILATION SEQUENCE COMPLETE. Node fully operational!'
    ];

    let currentLogIndex = 0;
    setConsoleLogs([`[EXEC] Initializing active tracking sequence on: ${activeProject.agent_name}`]);

    const intervalTimer = setInterval(() => {
      setProgress(val => {
        const next = val + 1;
        
        // Output logs sequentially based on progress percentage landmarks
        if (next === 10) {
          setPhase('discovery');
          setConsoleLogs(p => [...p, logsStream[0], logsStream[1]]);
        }
        if (next === 20) {
          setConsoleLogs(p => [...p, logsStream[2]]);
        }
        if (next === 30) {
          setPhase('design');
          setConsoleLogs(p => [...p, logsStream[3]]);
        }
        if (next === 45) {
          setConsoleLogs(p => [...p, logsStream[4], logsStream[5]]);
        }
        if (next === 60) {
          setPhase('build');
          setConsoleLogs(p => [...p, logsStream[6], logsStream[7], logsStream[8]]);
        }
        if (next === 80) {
          setPhase('testing');
          setConsoleLogs(p => [...p, logsStream[9], logsStream[10], logsStream[11]]);
        }
        if (next === 95) {
          setPhase('live');
          setConsoleLogs(p => [...p, logsStream[12]]);
        }

        if (next >= 100) {
          clearInterval(intervalTimer);
          setPhase('live');
          setConsoleLogs(p => [...p, logsStream[13]]);
          setIsCompiling(false);
          
          // Save the completed state back to the store
          activeProject.progress_percentage = 100;
          activeProject.current_phase = 'live';
          activeProject.status = 'synced';
          activeProject.logs = [...activeProject.logs, logsStream[13]];
          return 100;
        }
        return next;
      });
    }, 85); // compiling increments
  };

  const currentPhaseIndex = ['discovery', 'design', 'build', 'testing', 'live'].indexOf(phase);

  return (
    <div className="bg-transparent min-h-screen text-slate-100 pb-28 px-6 md:px-12 select-text">
      <div className="max-w-5xl mx-auto pt-10">
        
        {/* Header summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/[0.06] pb-6 mb-10 gap-5">
          <div>
            <div className="font-mono text-emerald-450 text-[9.5px] flex items-center gap-1.5 uppercase leading-none mb-1.5 font-bold tracking-widest">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
              LIVE MEMPOOL PIPELINE MONITOR
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans">
              Autonomous Tracking Node
            </h1>
            <p className="text-zinc-500 text-xs mt-1 leading-relaxed max-w-sm font-sans">
              Audit the deployment of your purchased agent nodes. Review progress, verify live schema compilations, and fetch real-time state logs.
            </p>
          </div>

          {projects.length > 0 && (
            <div className="w-full md:w-auto font-sans text-xs">
              <label htmlFor="tracker-project-select" className="text-zinc-500 block mb-1.5 uppercase tracking-wide text-[9px] font-bold">CHOOSE_ACTIVE_NODE:</label>
              <select
                id="tracker-project-select"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="bg-[#151B23] text-emerald-450 border border-white/10 rounded-xl px-3.5 py-2 outline-none w-full md:w-56 transition-colors focus:border-emerald-500/30 cursor-pointer"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.agent_name.toUpperCase()}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="border border-white/[0.06] bg-[#151B23]/40 p-12 text-center rounded-2xl max-w-sm mx-auto mt-12 shadow-xl">
            <Cpu className="w-10 h-10 text-zinc-650 mx-auto mb-4 animate-spin" />
            <div className="text-white text-sm font-bold mb-1">NO PIPELINES DETECTED</div>
            <p className="text-zinc-500 text-xs mb-8 leading-relaxed">
              No deployed container indexes found. Acquire pre-designed workflow blueprints inside the marketplace to initiate alignment counters.
            </p>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-450 text-[#0B0F14] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              Configure Node Catalog
            </button>
          </div>
        ) : (
          activeProject && (
            <div className="space-y-8">
              
              {/* PRIMARY PROGRESS SUMMARY HERO CARD */}
              <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl backdrop-blur-md">
                
                <div className="absolute top-0 right-0 p-5 text-[9px] font-mono text-zinc-550 uppercase tracking-widest font-bold">
                  INSTANCE PIN # {activeProject.order_id}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Left: Indicator */}
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-mono text-zinc-550 font-bold tracking-widest">MONITORED OBJECT</span>
                    <h2 className="text-white font-bold text-lg tracking-tight truncate">
                      {activeProject.agent_name}
                    </h2>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>

                      <span className="text-emerald-450 uppercase tracking-wider font-bold">
                        {isCompiling ? 'COMPILING SOURCE BLOCKS...' : `NODE_CONNECTED: [${activeProject.status.toUpperCase()}]`}
                      </span>
                    </div>
                  </div>

                  {/* Center: Estimated completion */}
                  <div className="p-4 bg-black/20 border border-white/[0.04] rounded-xl text-center md:mx-auto min-w-[200px] font-sans">
                    <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-550" />
                      <span>EST PAYBACK TRANSITION</span>
                    </div>
                    <div className="text-base font-bold text-white mt-1.5">
                      {phase === 'live' ? 'ONLINE (ACTIVE)' : `${activeProject.estimated_completion_days} DAYS PENDING`}
                    </div>
                  </div>

                  {/* Right: progress percentage visual gauge */}
                  <div className="text-right space-y-1">
                    <span className="text-[9px] uppercase font-mono text-zinc-550 block font-bold tracking-widest">SYMMETRIC COMPILATION LOAD</span>
                    <div className="text-4xl font-bold text-white tracking-tight font-mono">
                      {progress}%
                    </div>
                    
                    {/* Linear bar tracker */}
                    <div className="w-full bg-[#0B0F14]/50 h-1.5 rounded-full overflow-hidden border border-white/[0.05] mt-2">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-150" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                </div>
              </div>

              {/* STAGES PROGRESS STEPPER CONTROLLER */}
              <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-6.5 backdrop-blur-md shadow-lg">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                  <span className="font-sans text-xs text-zinc-300 font-bold uppercase tracking-wide">Sync Pipeline Runtime Framework</span>
                  <div className="text-[10px] font-mono text-zinc-500">STAGES COMPLETED: {currentPhaseIndex + 1}/5</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 select-none">
                  {[
                    { key: 'discovery', label: '1. Discovery', desc: 'Requirements metrics mapped' },
                    { key: 'design', label: '2. Alignment', desc: 'Symmetric token specifications matching' },
                    { key: 'build', label: '3. Build Component', desc: 'Optimizing DB schema parameters' },
                    { key: 'testing', label: '4. Simulation', desc: 'Virtual handshake and sandbox checks' },
                    { key: 'live', label: '5. Run live', desc: 'Continuous operator active hot-swap' }
                  ].map((stage, idx) => {
                    const isPassed = idx < currentPhaseIndex;
                    const isActive = phase === stage.key;
                    const isPending = idx > currentPhaseIndex;

                    return (
                      <div 
                        key={stage.key}
                        className={`p-4 border rounded-xl relative transition-all text-xs font-sans ${
                          isActive 
                            ? 'bg-emerald-550/5 border-emerald-500/45 text-white shadow-md' 
                            : isPassed 
                            ? 'bg-black/20 border-white/[0.04] text-zinc-400' 
                            : 'bg-black/5 border-white/[0.02] text-zinc-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold tracking-tight">{stage.label}</span>
                          <span className={`inline-block w-2 h-2 rounded-full ${
                            isActive ? 'bg-emerald-500 animate-pulse' :
                            isPassed ? 'bg-zinc-600 animate-none' : 'bg-transparent'
                          }`}></span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-tight">
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COMPILER CONSOLE & ACTIONS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Live Compiler logs */}
                <div className="lg:col-span-2 border border-white/[0.06] bg-black/40 rounded-2xl overflow-hidden flex flex-col justify-between h-96">
                  
                  {/* Console utility top bar */}
                  <div className="bg-black/20 border-b border-white/[0.06] px-4 py-3 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span>TERMINAL CONSOLE // STD_ERR_LOGS</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                      <span>FREQ_HZ: STABLE</span>
                    </div>
                  </div>

                  {/* Terminal Log outputs */}
                  <pre className="p-4 flex-1 overflow-y-auto font-mono text-[10.5px] text-zinc-400 space-y-1.5 bg-black/10 text-left leading-relaxed">
                    {consoleLogs.map((log, index) => (
                      <div key={index} className="truncate">
                        <span className="text-emerald-450 font-bold select-none">{`&gt;_ `}</span>
                        {log}
                      </div>
                    ))}
                    {isCompiling && (
                      <div className="text-emerald-400 animate-pulse font-bold mt-2">
                        &gt; DECONSTRUCTING BLUEPRINT PARAMETERS... STAND BY 
                      </div>
                    )}
                  </pre>

                  {/* Interactive Status Indicator footer within console */}
                  <div className="bg-black/20 font-mono text-[9.5px] text-zinc-550 px-4 py-2.5 border-t border-white/[0.06] flex justify-between items-center">
                    <span>DATABASE CLUSTER: SUPABASE [CONNECTED]</span>
                    <span>VPC INGRESS PORT: 3000</span>
                  </div>
                </div>

                {/* Tracking Action triggers */}
                <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-5 md:p-6 space-y-4 font-sans text-xs">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/[0.06] pb-3 font-mono">
                    Node Simulation
                  </h3>
                  
                  <p className="text-zinc-500 text-[10px] leading-relaxed font-sans">
                    Execute compile simulation cycles inside the compiler virtual matrix to verify your workspace integrity.
                  </p>

                  <div className="space-y-2.5 pt-2 select-none">
                    <button
                      onClick={handleRunCompiler}
                      disabled={isCompiling}
                      id="tracker-compile-simulation-btn"
                      className={`w-full py-3 text-[#0B0F14] font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isCompiling 
                          ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed' 
                          : 'bg-emerald-500 hover:bg-emerald-450 shadow-md shadow-emerald-500/10'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      {isCompiling ? 'Compiling' : 'Launch Simulation'}
                    </button>

                    <button
                      onClick={() => {
                        if (isCompiling) return;
                        setProgress(0);
                        setPhase('discovery');
                        setConsoleLogs([`[EXEC] Terminal logs flushed. Ready for compiler activation.`]);
                      }}
                      id="tracker-flush-logs-btn"
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>FLUSH_LOGS</span>
                    </button>
                  </div>

                  <div className="border-t border-white/[0.06] pt-4 text-[10px] leading-relaxed text-zinc-500 space-y-1">
                    <div className="text-zinc-400 font-semibold uppercase font-mono text-[9px] tracking-wider mb-2">RUNTIMES HEALTH</div>
                    <div>RAM ALLOCATION: 412 MB</div>
                    <div>SLA UPTIME TARGET: 99.98%</div>
                  </div>
                </div>

              </div>

            </div>
          )
        )}
      </div>
    </div>
  );
}
