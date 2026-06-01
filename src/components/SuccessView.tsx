import React, { useState } from 'react';
import { CheckCircle2, MessageSquareCode, Mail, ArrowRight, ShieldCheck, Copy, Terminal, Github } from 'lucide-react';
import { Order } from '../types';

interface SuccessViewProps {
  latestOrder: Order | null;
  onNavigate: (view: string, data?: any) => void;
}

export default function SuccessView({ latestOrder, onNavigate }: SuccessViewProps) {
  const [copied, setCopied] = useState(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const orderNo = latestOrder?.order_number || '#N8N-9810X-E4';
  const mailTo = latestOrder?.email || 'admin@enterprise.ai';
  const nameTo = latestOrder?.name || 'Authorized Operator';
  const mockTxHash = '0xfa39981aef912309e44bc6b99de02cf88aa828fbfb3901bce2b8a01fdef7';

  const handleCopyTx = () => {
    navigator.clipboard.writeText(mockTxHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-transparent min-h-screen text-slate-100 pb-28 px-6 md:px-12 relative z-10 select-text">
      <div className="max-w-xl mx-auto pt-16">
        
        {/* Giant Glowing Success Mark */}
        <div className="text-center space-y-6">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            <div className="absolute inset-0 rounded-full bg-emerald-500/5 filter blur-lg"></div>
          </div>

          <div className="space-y-2">
            <div className="font-mono text-[9px] uppercase text-emerald-450 tracking-widest font-bold">TRANSACTION_CONFIRMED_OK</div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans">Deployment Socket Engaged</h1>
            <p className="text-zinc-500 text-xs font-sans max-w-sm mx-auto leading-relaxed">
              Invoice payment resolved. Staged micro-nodes successfully compiled and loaded to your active workspace.
            </p>
          </div>
        </div>

        {/* ORDER RECEIPT STRUCTURE */}
        <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-6 mt-10 space-y-4 font-mono text-xs shadow-xl relative backdrop-blur-md">
          <div className="absolute top-0 right-0 p-5 text-[9px] text-zinc-550 font-bold uppercase tracking-widest">
            SECURE STRIPE RECEIPT
          </div>

          <div className="border-b border-white/[0.06] pb-3 flex justify-between items-center">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">ORDER ID //</span>
            <span className="text-white font-bold tracking-wide">{orderNo}</span>
          </div>

          <div className="border-b border-white/[0.06] pb-3 flex justify-between items-center">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">OPERATOR ACCOUNT //</span>
            <span className="text-zinc-300 font-sans font-semibold truncate max-w-[200px]">{nameTo}</span>
          </div>

          <div className="border-b border-white/[0.06] pb-3 flex justify-between items-center">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">INGRESS INBOUND //</span>
            <span className="text-zinc-300 font-sans font-medium">VPC_NODE_3000</span>
          </div>

          <div className="border-b border-white/[0.06] pb-3 flex flex-col gap-1.5 justify-start text-left">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">VERIFIABLE LEDGER HASH //</span>
            <div className="flex items-center justify-between gap-3 p-2 bg-black/40 rounded-xl border border-white/[0.06]">
              <span className="text-emerald-400 text-[9.5px] select-all truncate font-mono">{mockTxHash}</span>
              <button
                onClick={handleCopyTx}
                id="success-copy-tx-btn"
                className="text-[10px] text-zinc-400 hover:text-white cursor-pointer px-2 py-1 hover:bg-white/5 rounded-md transition-colors"
                title="Copy Transaction Hash"
              >
                {copied ? 'COPIED' : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2.5 text-sm font-bold text-white">
            <span className="uppercase text-zinc-450 tracking-wider text-[10px] font-bold">TOTAL CAPITAL DEPLOYED //</span>
            <span className="text-emerald-400 text-base font-semibold font-mono">${latestOrder?.total_amount || 1750}</span>
          </div>
        </div>

        {/* INTERACTIVE NOTIFICATION BADGES FOR WHATSAPP + EMAIL */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* WhatsApp SMS preference toggler */}
          <div 
            onClick={() => setWhatsappEnabled(!whatsappEnabled)}
            id="success-whatsapp-toggle"
            className={`border cursor-pointer p-4 rounded-xl transition-all font-mono text-[10px] flex flex-col justify-between h-20 ${
              whatsappEnabled 
                ? 'bg-emerald-500/5 border-emerald-500/20 text-zinc-300' 
                : 'bg-black/10 border-white/[0.04] text-zinc-650'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <MessageSquareCode className={`w-4 text-emerald-400 h-4 transition-transform duration-250 ${whatsappEnabled ? 'scale-105' : 'opacity-40'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${whatsappEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-transparent'}`}></div>
            </div>
            
            <div className="text-left font-sans">
              <span className="font-bold text-zinc-200 block text-[10px] tracking-wide uppercase font-mono">WHATSAPP_UPDATES</span>
              <span className="text-[9.5px] text-zinc-500 font-normal">
                {whatsappEnabled ? 'Synced to SMS Gateway' : 'Alert stream locked'}
              </span>
            </div>
          </div>

          {/* Email preference toggler */}
          <div 
            onClick={() => setEmailEnabled(!emailEnabled)}
            id="success-email-toggle"
            className={`border cursor-pointer p-4 rounded-xl transition-all font-mono text-[10px] flex flex-col justify-between h-20 ${
              emailEnabled 
                ? 'bg-emerald-500/5 border-emerald-500/20 text-zinc-300' 
                : 'bg-black/10 border-white/[0.04] text-zinc-650'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <Mail className={`w-4 text-emerald-400 h-4 transition-transform duration-250 ${emailEnabled ? 'scale-105' : 'opacity-40'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${emailEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-transparent'}`}></div>
            </div>

            <div className="text-left font-sans">
              <span className="font-bold text-zinc-200 block text-[10px] tracking-wide uppercase font-mono">EMAIL_DISCOVERY</span>
              <span className="text-[9.5px] text-zinc-550 truncate font-normal block">
                {emailEnabled ? `Forwarded: ${mailTo}` : 'Quiet delivery mode'}
              </span>
            </div>
          </div>
        </div>

        {/* TRACK PROJECT PIPELINE DEVELOPMENT CTA */}
        <div className="mt-8">
          <button
            onClick={() => onNavigate('tracking')}
            id="success-track-btn"
            className="w-full py-4.5 bg-emerald-500 hover:bg-emerald-400 text-[#0B0F14] font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
          >
            <span>TRACK AUTONOMOUS PIPELINE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-550 font-mono mt-6">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>CRYPTO SYMMETRIC KEYS SAFEGUARDED BY SUPABASE</span>
        </div>
      </div>
    </div>
  );
}
