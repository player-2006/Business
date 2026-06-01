import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import { Agent, Category, MARKETPLACE_CATEGORIES, Project } from '../types';

interface MarketplaceViewProps {
  onNavigate: (view: string, data?: any) => void;
  agents: Agent[];
  projects?: Project[];
}

export default function MarketplaceView({ onNavigate, agents, projects = [] }: MarketplaceViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeUicategory, setActiveUicategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'downloads' | 'pricing' | 'rating'>('downloads');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Filter agents matching search & the chosen UI categories from the screenshot
  const filteredAgents = agents
    .filter((agent) => {
      let categoryMatch = true;
      if (activeUicategory !== 'All') {
        categoryMatch = agent.category === activeUicategory;
      }

      const matchQuery = 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.integrations.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
        agent.category.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'pricing') return b.pricing - a.pricing;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  // Render correct Lucide icon dynamically based on catalog record thumbnail
  const renderThumbnailIcon = (name: string) => {
    const IconComponent = (Lucide as any)[name] || Lucide.Cpu;
    return <IconComponent className="w-5 h-5 text-[#10B981] group-hover:scale-110 duration-200 transition-transform" />;
  };

  return (
    <div className="bg-transparent text-slate-100 pb-32 px-4 md:px-8 relative z-10 font-sans select-text">
      <div className="max-w-7xl mx-auto pt-6 lg:pt-10">
        
        {/* UPPER BROWSE HEADER CONTAINER (Exact layout Match to reference image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Block: Green label, big H1 subtitle, search */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <div>
              <span className="font-mono text-[#10B981] text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase block mb-3 leading-none">
                MARKETPLACE // GLOBAL REGISTRY
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-extrabold tracking-tight text-white leading-[1.05] font-sans">
                Browse automation agents
              </h1>
            </div>
            
            {/* Elegant Search Container with Custom Inner input border */}
            <div className="bg-[#030704]/45 border border-[#10B981]/20 rounded-2xl p-2.5 focus-within:border-[#10B981]/45 transition-all shadow-[0_0_20px_rgba(16,185,129,0.01)] relative">
              <Lucide.Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500" />
              <input
                type="text"
                id="mkt-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search automation agents"
                className="w-full bg-transparent text-zinc-200 placeholder-zinc-600 rounded-xl py-3 pl-11 pr-4 focus:outline-none font-sans text-sm tracking-tight"
              />
            </div>
          </div>

          {/* Right Block: Descriptive paragraph & 3x2 Category Pill Buttons */}
          <div className="lg:col-span-5 space-y-7">
            <p className="text-[#9B9E9C] text-[13.5px] sm:text-sm leading-relaxed font-sans text-left font-normal max-w-lg">
              Discover premium agent workflows built for enterprise, operations, revenue, security, and analytics teams.
            </p>

            {/* Custom grid arrangement matching the visual pills */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'All', label: 'All' },
                { id: 'CRM & Sales', label: 'CRM & Sales' },
                { id: 'Content AI', label: 'Content AI' },
                { id: 'Operations', label: 'Operations' },
                { id: 'Finance', label: 'Finance' },
                { id: 'Support', label: 'Support' },
                { id: 'Data & Scraping', label: 'Data & Scraping' }
              ].map((cat) => {
                const isSelected = activeUicategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`mkt-ui-cat-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => {
                      setActiveUicategory(cat.id);
                    }}
                    className={`py-3 px-1 rounded-2xl border font-sans text-[12px] sm:text-xs font-semibold tracking-tight transition-all text-center cursor-pointer duration-200 ${
                      isSelected
                        ? 'border-[#10B981] text-[#10B981] bg-[#10B981]/5 shadow-[0_0_15px_rgba(16,185,129,0.06)]'
                        : 'border-[#14231E]/80 text-[#8B938F] hover:text-white hover:border-[#1F332B] bg-[#020503]/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CONTROLS BAR: SORTING & ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-5 mb-10 gap-4">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>FOUND {filteredAgents.length} COMPILED SCHEMAS</span>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2.5">
              <span className="text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-wider">ORDER_BY:</span>
              <div className="bg-black/35 border border-[#10B981]/15 p-0.5 rounded-full flex gap-0.5">
                {[
                  { id: 'downloads', label: 'RUNS' },
                  { id: 'pricing', label: 'PRICE' },
                  { id: 'rating', label: 'ROI' }
                ].map((sortItem) => (
                  <button
                    key={sortItem.id}
                    id={`mkt-sort-by-${sortItem.id}`}
                    onClick={() => setSortBy(sortItem.id as any)}
                    className={`px-3.5 py-1 text-[9.5px] font-mono tracking-wider font-bold rounded-full transition-all cursor-pointer ${
                      sortBy === sortItem.id 
                        ? 'bg-[#10B981] text-black shadow-sm' 
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {sortItem.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onNavigate('admin')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-white font-sans text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer"
            >
              Upload Schematic
            </button>
          </div>
        </div>

        {/* TWO-COLUMN LOWER INTEGRATION: LEFT PROD CARDS, RIGHT METRIC MONITOR */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Main List of agent blue-prints (taking up wide space) */}
          <div className="xl:col-span-8">
            {filteredAgents.length === 0 ? (
              <div className="border border-[#10B981]/10 bg-[#020503]/50 p-16 text-center rounded-3xl max-w-md mx-auto mt-10 shadow-lg">
                <Lucide.SlidersHorizontal className="w-8 h-8 text-[#10B981]/40 mx-auto mb-4 animate-pulse" />
                <div className="text-white text-base font-bold mb-1.5 font-sans uppercase tracking-tight">No Blueprints Met Filter Bounds</div>
                <p className="text-zinc-500 text-xs mb-6 max-w-xs mx-auto leading-relaxed">
                  Refine the input search query or select another category filter to resolve agent nodes.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveUicategory('All'); }}
                  className="px-5 py-2.5 bg-transparent border border-white/15 hover:border-white/30 text-white text-xs font-semibold rounded-full uppercase transition-all cursor-pointer"
                >
                  Clear all parameters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAgents.map((agent) => {
                  const isHovered = hoveredCardId === agent.id;
                  return (
                    <div
                      key={agent.id}
                      id={`agent-card-${agent.id}`}
                      onClick={() => onNavigate('detail', agent)}
                      onMouseEnter={() => setHoveredCardId(agent.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      className="bg-[#020503]/75 border border-[#10B981]/10 rounded-2xl p-6.5 flex flex-col justify-between hover:bg-[#030906]/90 hover:border-[#10B981]/25 hover:shadow-[0_0_25px_rgba(16,185,129,0.03)] hover:-translate-y-0.5 transition-all duration-300 min-h-[320px] relative group cursor-pointer text-left"
                    >
                      {/* Top bar rating badge / payback period */}
                      <div className="absolute top-0 right-0 p-5 font-mono text-[9px]">
                        <span className="bg-[#10B981]/10 text-[#10B981] font-bold px-2 py-0.5 rounded border border-[#10B981]/15 leading-none">
                          {agent.roi_estimate.payback_period_days}D PAYBACK
                        </span>
                      </div>

                      <div className="space-y-4">
                        {/* Beautiful custom-rendered Icon Badge */}
                        <div className="w-11 h-11 bg-[#03150F] rounded-xl border border-[#10B981]/15 flex items-center justify-center group-hover:border-[#10B981]/40 transition-colors">
                          {renderThumbnailIcon(agent.thumbnail)}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#10B981] transition-colors font-sans">
                            {agent.name}
                          </h3>
                          <span className="text-[9.5px] font-mono text-[#10B981]/80 font-bold uppercase tracking-wider block mt-1">
                            {agent.category}
                          </span>
                        </div>

                        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                          {agent.description || agent.tagline}
                        </p>

                        {/* Interactive schema indicator logs inside the card */}
                        <div className="bg-black/40 border border-white/[0.03] rounded-xl p-3 text-[9.5px] font-mono text-zinc-500 space-y-1">
                          <div className="flex justify-between items-center text-zinc-400 font-bold uppercase text-[8px] tracking-wider mb-1">
                            <span>COMPILER TRIGGERS</span>
                            <span className="text-[#10B981]">OK</span>
                          </div>
                          <div className="truncate text-[9px] text-[#10B981]/60">
                            &gt;_ {agent.integrations.join(' • ')}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center justify-between">
                        {/* Rating block */}
                        <div className="flex items-center gap-1">
                          <Lucide.Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-[11px] font-mono font-bold text-zinc-300">{agent.rating.toFixed(2)}</span>
                          <span className="text-[10px] text-zinc-550">({agent.downloads} runs)</span>
                        </div>

                        <span className="text-base font-extrabold text-[#10B981] font-mono tracking-tight">
                          ${agent.pricing}
                          <span className="text-[10px] text-zinc-550 ml-1 font-normal uppercase tracking-wider">
                            /{agent.recurring_type === 'monthly' ? 'mo' : 'fixed'}
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column sidebar: Monitoredd active pipelines (Apple Widget style) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Active tracking panel */}
            <div className="bg-[#020503]/50 border border-[#10B981]/10 p-6 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">ACTIVE PIPELINES</h3>
                <span className="text-[9.5px] font-mono text-[#10B981] animate-pulse font-bold">// SECURED BY SUPABASE</span>
              </div>

              <div className="space-y-4">
                {projects && projects.length > 0 ? (
                  projects.slice(0, 3).map((proj) => (
                    <div key={proj.id} className="bg-black/30 rounded-xl border border-white/[0.03] p-4 text-left">
                      <div className="flex justify-between items-start mb-2.5">
                        <div>
                          <p className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-0.5">OPERATOR ID</p>
                          <h4 className="text-xs font-bold text-white truncate max-w-[155px] font-sans">{proj.agent_name}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold font-mono text-[#10B981]">{proj.progress_percentage}%</span>
                        </div>
                      </div>

                      {/* Smooth progress bar loader */}
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2 mb-3">
                        <div className="h-full bg-[#10B981]" style={{ width: `${proj.progress_percentage}%` }}></div>
                      </div>

                      <div className="flex justify-between items-center text-[9.5px] font-mono">
                        <span className="text-zinc-500 uppercase tracking-wide">STATUS:</span>
                        <span className="text-[#10B981] font-bold uppercase">{proj.status}</span>
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-white/[0.03]">
                        <button
                          onClick={() => onNavigate('tracking')}
                          className="w-full text-center py-2 bg-white/5 hover:bg-[#10B981]/5 hover:text-white border border-white/[0.04] hover:border-[#10B981]/20 text-[9.5px] text-zinc-400 uppercase font-mono font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Audit status stream
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-black/30 rounded-xl border border-white/[0.03] p-6 text-center">
                    <p className="text-xs text-zinc-450 uppercase font-semibold mb-1">No active workers loaded</p>
                    <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">
                      Purchase and deploy blueprints inside the marketplace to initiate alignment live threads.
                    </p>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-[#10B981]"></div>
                    </div>
                  </div>
                )}

                {/* Micro operational latency metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#020503]/60 border border-[#10B981]/15 rounded-xl p-3.5 text-left">
                    <p className="text-[8px] text-zinc-500 uppercase font-mono font-bold tracking-wider">Active Uptime</p>
                    <p className="text-xs font-extrabold text-white mt-1">99.98%</p>
                  </div>
                  <div className="bg-[#020503]/60 border border-[#10B981]/15 rounded-xl p-3.5 text-left">
                    <p className="text-[8px] text-zinc-500 uppercase font-mono font-bold tracking-wider">Mempool ping</p>
                    <p className="text-xs font-extrabold text-white mt-1">112ms</p>
                  </div>
                </div>

                {/* Core logging dashboard simulation */}
                <div className="bg-black/50 rounded-xl p-4 font-mono text-[9px] border border-white/[0.04] leading-relaxed text-left space-y-1 text-zinc-500">
                  <p className="text-[#10B981] font-bold">[SYS] Matrix connection established</p>
                  <p>Database synchronization online.</p>
                  <p className="text-zinc-400">Memory index allocation 412 MB</p>
                  <p className="text-zinc-600">// Watching for transaction triggers...</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
