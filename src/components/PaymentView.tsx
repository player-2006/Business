import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Lock, Activity, ArrowRight, HelpCircle, AlertCircle, Info } from 'lucide-react';
import { CartItem, UserSession } from '../types';

interface PaymentViewProps {
  cart: CartItem[];
  session: UserSession;
  onNavigate: (view: string) => void;
  onCheckoutComplete: (email: string, name: string) => void;
}

export default function PaymentView({ cart, session, onNavigate, onCheckoutComplete }: PaymentViewProps) {
  // Input fields
  const [email, setEmail] = useState(session.email || '');
  const [fullName, setFullName] = useState(session.name || '');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242'); // prefilled test card
  const [expiry, setExpiry] = useState('12/29');
  const [cvv, setCvv] = useState('142');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'Secure SSL handshake established. AES-256',
    'Ready for credit token initialization.'
  ]);

  const totalAmount = cart.reduce((acc, item) => acc + (item.agent.pricing * item.quantity), 0);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) {
      setErrorMessage('Billing credentials mismatched. Enter Email and Account Name.');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setLogs(prev => [...prev, '[STRIPE] TOKENIZING ACCOUNT SECRETS...', '[STRIPE] EXECUTING ATOMIC PAYMENT ACTION ON CLOUD...']);

    // Simulate multi-step compilation process
    setTimeout(() => {
      setLogs(prev => [...prev, '[STRIPE] AUTHORIZATION COMPLETED: TOKEN_REC_981Xf']);
      setTimeout(() => {
        setLogs(prev => [...prev, '[SUPABASE] CREATING PERSISTENT RECORD INSTANCES...', '[SUPABASE] SCHEMAS SUCCESSFUL. REGISTERING DISCOVERY TRACKER NODE...']);
        setTimeout(() => {
          setIsProcessing(false);
          // Complete payment and redirect to success state
          onCheckoutComplete(email, fullName);
        }, 1200);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="bg-transparent min-h-screen text-slate-100 pb-28 px-6 md:px-12">
      <div className="max-w-4xl mx-auto pt-10">

        {/* Stepper HUD Step 2 */}
        <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-5 font-sans text-xs backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-emerald-450 font-bold font-mono tracking-wider uppercase">PIPELINE STEPPER:</span>
            <span className="text-zinc-300 font-sans font-medium">Checkout authorization sequence</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 font-mono text-[9px]">
            <div className="flex items-center gap-1.5 text-zinc-500 bg-black/20 border border-white/[0.04] px-2.5 py-1 rounded-md">
              <span>01.</span>
              <span className="uppercase tracking-tight">Staging</span>
            </div>
            <span className="text-zinc-600 font-sans">/</span>
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-1 rounded-md font-bold text-[10px]">
              <span>02.</span>
              <span className="uppercase tracking-tight font-semibold">Authorization</span>
            </div>
            <span className="text-zinc-600 font-sans">/</span>
            <div className="flex items-center gap-1.5 text-zinc-500 bg-black/20 border border-white/[0.04] px-2.5 py-1 rounded-md font-medium">
              <span>03.</span>
              <span className="uppercase tracking-tight">Activate</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">
          Authorization Socket [Checkout]
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start select-text">
          
          {/* STRIPE SECURE FORM CONTAINER */}
          <form 
            onSubmit={handleProcessPayment}
            id="stripe-secure-form"
            className="lg:col-span-3 border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">STRIPE TRANSACTION NODE</span>
              </div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/10 uppercase tracking-tight font-semibold">TEST_MODE_ACTIVE</span>
            </div>

            {/* Simulated stripe card test instructions */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[11.5px] text-zinc-400 leading-relaxed font-sans flex gap-3">
              <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                SANDBOX CREDIT VALUE LOADED. Feel free to use checkout directly to verify actual orders simulation. No real money required.
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-xl text-xs text-red-400 font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="stripe-email" className="font-mono text-[9px] text-zinc-500 uppercase block font-bold tracking-widest">BILLING EMAIL ADDRESS</label>
              <input
                type="email"
                id="stripe-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@company.ai"
                className="w-full bg-black/40 font-mono text-xs text-white border border-white/10 rounded-xl p-3 focus:border-emerald-500/40 focus:outline-none transition-all"
              />
            </div>

            {/* Full Name field */}
            <div className="space-y-2">
              <label htmlFor="stripe-name" className="font-mono text-[9px] text-zinc-500 uppercase block font-bold tracking-widest">CREDIT HOLDER NAME</label>
              <input
                type="text"
                id="stripe-name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Operator Enterprise"
                className="w-full bg-black/40 font-mono text-xs text-white border border-white/10 rounded-xl p-3 focus:border-emerald-500/40 focus:outline-none transition-all"
              />
            </div>

            {/* Card grid parameters */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-zinc-500 uppercase block font-bold tracking-widest">CARD SEQUENCE TOKEN</label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-black/40 font-mono text-xs text-white border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:border-emerald-500/40 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-zinc-500 uppercase block font-bold tracking-widest">EXP DATE</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-black/40 font-mono text-xs text-white border border-white/10 rounded-xl p-3 focus:border-emerald-500/40 focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-zinc-500 uppercase block font-bold tracking-widest">CVV CODE</label>
                  <input
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full bg-black/40 font-mono text-xs text-white border border-white/10 rounded-xl p-3 focus:border-emerald-500/40 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Stripe Invoicing Trigger button */}
            <button
              type="submit"
              disabled={isProcessing}
              id="stripe-pay-btn"
              className={`w-full py-3.5 bg-emerald-500 text-[#0B0F14] font-semibold font-mono text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer ${
                isProcessing ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed' : 'hover:bg-emerald-400'
              }`}
            >
              {isProcessing ? 'PROCESSING_PAYMENT_NODE...' : `DEPOSIT_DOCK_INVOICE ($${totalAmount})`}
            </button>

            {/* Encryption and safety items */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-550 pt-3 border-t border-white/[0.06]">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-500" /> AES-256 SECURE CONNECTION</span>
              <span>TOKEN_SYMMETRIC: ACTIVE</span>
            </div>

            {/* Active compiler logs during submission */}
            {isProcessing && (
              <div className="bg-black/40 border border-white/[0.04] p-4 rounded-xl text-[10px] font-mono text-zinc-400 space-y-1.5 animate-pulse">
                <div className="text-emerald-450 uppercase font-bold border-b border-white/[0.06] pb-1 mb-1">STRIPE COMPILATION MONITOR</div>
                {logs.map((log, index) => (
                  <div key={index}><span className="text-emerald-450">{">> "}</span>{log}</div>
                ))}
              </div>
            )}
          </form>

          {/* RIGHT SIDEBAR ORDER SUMMARY */}
          <div className="lg:col-span-2 space-y-4">
            <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-5 text-xs font-sans space-y-4">
              <h3 className="text-xs font-bold text-zinc-350 uppercase tracking-wider pb-2 border-b border-white/[0.06]">
                STAGED BLUEPRINTS
              </h3>

              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.agent.id} className="flex justify-between items-start">
                    <div>
                      <div className="text-white font-semibold font-sans">{item.agent.name}</div>
                      <div className="text-[10px] text-zinc-555 mt-0.5 uppercase font-mono font-bold">QTY: {item.quantity}  ▪ {item.agent.category}</div>
                    </div>
                    <span className="text-emerald-450 font-mono font-medium">${item.agent.pricing * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-4.5 flex justify-between items-baseline text-sm font-bold text-white">
                <span>TOTAL ALLOCATION</span>
                <span className="text-emerald-400 font-mono text-base">${totalAmount}</span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-zinc-550 p-3 text-center uppercase tracking-normal border border-dashed border-white/5 rounded-xl w-full max-w-sm mx-auto leading-normal">
              Deployment metrics automatically synch into your private dashboard instantly on success validation.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
