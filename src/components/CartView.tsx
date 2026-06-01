import React from 'react';
import { ShoppingCart, ArrowRight, Trash2, Cpu, FileText, LayoutList } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onNavigate: (view: string, data?: any) => void;
  onUpdateQuantity: (agentId: string, quantity: number) => void;
  onRemoveItem: (agentId: string) => void;
}

export default function CartView({ cart, onNavigate, onUpdateQuantity, onRemoveItem }: CartViewProps) {
  const totalAmount = cart.reduce((acc, item) => acc + (item.agent.pricing * item.quantity), 0);

  return (
    <div className="bg-transparent min-h-screen text-slate-100 pb-28 px-6 md:px-12">
      <div className="max-w-4xl mx-auto pt-10">
        
        {/* Terminal/Flow Stepper HUD */}
        <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-5 font-sans text-xs backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-emerald-450 font-bold font-mono uppercase tracking-wider">PIPELINE STEPPER:</span>
            <span className="text-zinc-300 font-medium font-sans">Deployment staging sequence</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 font-mono text-[9px]">
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-1 rounded-md font-bold text-[10px]">
              <span>01.</span>
              <span className="uppercase tracking-tight">Staging</span>
            </div>
            <span className="text-zinc-600 font-sans">/</span>
            <div className="flex items-center gap-1.5 text-zinc-500 bg-black/20 border border-white/[0.04] px-2.5 py-1 rounded-md">
              <span>02.</span>
              <span className="uppercase tracking-tight">Authorize</span>
            </div>
            <span className="text-zinc-600 font-sans">/</span>
            <div className="flex items-center gap-1.5 text-zinc-500 bg-black/20 border border-white/[0.04] px-2.5 py-1 rounded-md">
              <span>03.</span>
              <span className="uppercase tracking-tight">Activate</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">
          Pipeline Staging Hub [Cart]
        </h1>

        {cart.length === 0 ? (
          <div className="border border-white/[0.06] bg-[#151B23]/40 p-12 md:p-16 text-center rounded-2xl max-w-sm mx-auto shadow-xl backdrop-blur-md">
            <ShoppingCart className="w-10 h-10 text-zinc-600 mx-auto mb-5" />
            <div className="text-white text-sm font-semibold mb-2">No active staged nodes</div>
            <p className="text-zinc-500 text-xs mb-8 leading-relaxed">
              You haven't queued any autonomous agent nodes for compiling into your active cloud runtime workspace yet.
            </p>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#0B0F14] font-semibold rounded-lg text-xs tracking-wider uppercase transition-colors shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              Browse Registry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* CART ITEMS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.agent.id}
                  id={`cart-item-${item.agent.id}`}
                  className="border border-white/[0.06] bg-[#151B23]/30 hover:bg-[#151B23]/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-colors duration-350 shadow-sm"
                >
                  <div className="flex items-start gap-4 select-text">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-450 mt-1 shrink-0">
                      <Cpu className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm hover:text-emerald-400 cursor-pointer transition-colors" onClick={() => onNavigate('detail', item.agent)}>
                        {item.agent.name}
                      </h3>
                      <div className="text-[10px] text-emerald-450 font-mono mt-0.5 tracking-wide">{item.agent.category}</div>
                      <div className="font-sans text-xs text-zinc-550 mt-2.5">
                        Unit allocation fee: ${item.agent.pricing}/{item.agent.recurring_type === 'monthly' ? 'mo' : 'fixed'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:self-center">
                    {/* Quantity selectors */}
                    <div className="flex items-center gap-2 text-xs text-white">
                      <button 
                        id={`cart-qty-dec-${item.agent.id}`}
                        onClick={() => onUpdateQuantity(item.agent.id, item.quantity - 1)}
                        className="w-6 h-6 bg-[#0B0F14] border border-white/10 rounded-md hover:border-white/20 flex items-center justify-center text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono">{item.quantity}</span>
                      <button 
                        id={`cart-qty-inc-${item.agent.id}`}
                        onClick={() => onUpdateQuantity(item.agent.id, item.quantity + 1)}
                        className="w-6 h-6 bg-[#0B0F14] border border-white/10 rounded-md hover:border-white/20 flex items-center justify-center text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Trash Delete button */}
                    <button
                      id={`cart-remove-${item.agent.id}`}
                      onClick={() => onRemoveItem(item.agent.id)}
                      className="p-1.5 bg-black/20 border border-white/[0.04] hover:bg-neutral-900/30 hover:border-red-500/20 text-zinc-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Deallocate staged node"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CHECKOUT PRICING SUMMARY PANEL */}
            <div className="border border-white/[0.06] bg-[#151B23]/40 rounded-2xl p-6 space-y-6 shadow-xl backdrop-blur-md">
              <h3 className="text-xs font-bold text-zinc-350 uppercase tracking-wider border-b border-white/[0.06] pb-3">
                FINANCIAL SUMMARY
              </h3>

              <div className="space-y-3 font-sans text-xs text-zinc-400">
                <div className="flex justify-between items-center">
                  <span>Queued allocations</span>
                  <span className="text-white font-mono font-semibold">${totalAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Stripe tax estimates</span>
                  <span className="text-white font-mono">$0.00 (Sandbox)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Secure handshake SSL</span>
                  <span className="text-emerald-450 uppercase font-mono font-bold">FREE</span>
                </div>
                <div className="border-t border-white/[0.06] pt-4 flex justify-between items-center font-bold text-sm text-white">
                  <span>NET INVESTMENT</span>
                  <span className="text-emerald-400 font-mono text-base">${totalAmount}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('payment')}
                  id="cart-checkout-btn"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-[#0B0F14] font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                >
                  <span>Authorize Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-zinc-550 block text-center mt-3.5 leading-normal">
                  Secure cryptographic sandbox channel guaranteed. Unofficial stripe test integration enabled.
                </span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
