import React, { useState, useEffect } from 'react';
import { Cpu, ShoppingCart, Terminal, User, Database, ShieldCheck } from 'lucide-react';
import { UserSession, CartItem } from '../types';

interface HeaderHUDProps {
  activeView: string;
  onNavigate: (view: string) => void;
  session: UserSession;
  cart: CartItem[];
  onLogout: () => void;
}

export default function HeaderHUD({ activeView, onNavigate, session, cart, onLogout }: HeaderHUDProps) {
  const [systemTime, setSystemTime] = useState(new Date().toISOString());
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toISOString());
    }, 1000);
    const pulseTimer = setInterval(() => {
      setPulse(p => !p);
    }, 1500);
    return () => {
      clearInterval(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full pt-6 pb-2 px-4 md:px-8 max-w-7xl mx-auto relative z-50">
      <header className="bg-[#020503]/85 border border-[#10B981]/15 backdrop-blur-md rounded-full px-5 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between transition-all shadow-[0_0_20px_rgba(16,185,129,0.03)] font-sans">
        
        {/* Brand logo & OS identity (from image) */}
        <div 
          onClick={() => onNavigate('landing')} 
          className="flex items-center gap-3.5 cursor-pointer group"
          id="hud-logo-container"
        >
          {/* n8 Circular Emerald-colored icon */}
          <div className="w-10 h-10 rounded-full bg-[#03150F] border border-[#10B981]/25 flex items-center justify-center text-[#10B981] font-mono font-bold text-sm select-none group-hover:border-[#10B981]/50 transition-colors">
            n8
          </div>
          <div className="flex flex-col justify-center text-left">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#10B981] tracking-[0.2em] leading-none select-none lowercase">
              neightn.ai
            </span>
            <span className="font-sans text-[11.5px] font-semibold text-zinc-400 tracking-wide mt-1.5 leading-none select-none group-hover:text-white transition-colors">
              Automation Marketplace
            </span>
          </div>
        </div>
 
        {/* Centered navigation links (from image) */}
        <nav className="hidden md:flex items-center gap-7 text-[12.5px] font-sans font-medium text-[#9B9E9C] tracking-tight">
          <button
            onClick={() => onNavigate('marketplace')}
            className={`hover:text-white transition-colors duration-200 cursor-pointer ${
              activeView === 'marketplace' || activeView === 'detail' ? 'text-white' : ''
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => onNavigate('tracking')}
            className={`hover:text-white transition-colors duration-200 cursor-pointer ${
              activeView === 'tracking' ? 'text-white' : ''
            }`}
          >
            Tracking
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`hover:text-white transition-colors duration-200 cursor-pointer ${
              activeView === 'admin' ? 'text-white' : ''
            }`}
          >
            Upload
          </button>
        </nav>
 
        {/* Operating Utilities */}
        <div className="flex items-center gap-4 text-xs font-mono">
          
          {/* Network Clock */}
          <div className="hidden lg:flex flex-col items-end text-zinc-550 text-[9px] mr-2">
            <span className="text-zinc-650 font-medium tracking-widest uppercase text-[7.5px]">NETWORK CLOCK</span>
            <span className="text-zinc-500 font-mono mt-0.5">{systemTime.replace('T', ' ').substring(11, 19)} UTC</span>
          </div>

          <div className="h-5 w-px bg-white/5 hidden lg:block mr-1"></div>
 
          {/* Cart Icon Link */}
          <button 
            onClick={() => onNavigate('cart')}
            id="hud-cart-btn"
            className={`relative flex items-center justify-center p-2.5 rounded-full border transition-all cursor-pointer ${
              activeView === 'cart' 
                ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]' 
                : 'bg-black/40 border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/12'
            }`}
            title="View Active Cart Pipeline"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#10B981] text-[#000000] text-[9px] font-extrabold font-mono">
                {totalCartCount}
              </span>
            )}
          </button>
 
          {/* Auth status capsule or Sign In button (from image) */}
          {session.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                id="hud-logout-btn"
                onClick={onLogout}
                className="border border-[#10B981]/15 hover:border-red-500/30 text-zinc-300 hover:text-white font-sans text-[12px] px-5 py-2.5 bg-black/40 hover:bg-red-500/5 duration-250 transition-all rounded-full cursor-pointer flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                <span>Disconnect</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              id="hud-login-btn"
              className="border border-white/10 hover:border-[#10B981]/40 text-white font-sans text-[12px] px-5.5 py-2.5 bg-black/40 hover:bg-white/5 duration-250 transition-all rounded-full cursor-pointer font-medium"
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    </div>
  );
}
