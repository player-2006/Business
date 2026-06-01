import React, { useState, useEffect } from 'react';
import HeaderHUD from './components/HeaderHUD';
import LandingView from './components/LandingView';
import MarketplaceView from './components/MarketplaceView';
import AgentDetailView from './components/AgentDetailView';
import CartView from './components/CartView';
import PaymentView from './components/PaymentView';
import SuccessView from './components/SuccessView';
import ProjectTrackingView from './components/ProjectTrackingView';
import AuthView from './components/AuthView';
import AdminDashboard from './components/AdminDashboard';

import { Agent, CartItem, Order, Project, UserSession } from './types';
import { 
  getStoredAgents, 
  saveStoredAgent, 
  getCart, 
  saveCart, 
  getOrders, 
  saveOrder, 
  getProjects, 
  saveProject 
} from './data';

export default function App() {
  // Navigation active route state
  const [activeView, setActiveView] = useState<string>('landing');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Database collections synced to local storage
  const [agents, setAgents] = useState<Agent[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Authenticated user state (Default signed in on first load for better UX, but supports logout/login triggers)
  const [session, setSession] = useState<UserSession>({
    id: 'usr-neightn-7f',
    email: 'operator@enterprise.ai',
    name: 'Authorized Operator',
    isLoggedIn: true
  });

  // Pull initial collections from localStorage databases
  useEffect(() => {
    setAgents(getStoredAgents());
    setCart(getCart());
    setOrders(getOrders());
    setProjects(getProjects());

    // Pull active session if stored
    const savedSess = localStorage.getItem('neightn_session');
    if (savedSess) {
      try {
        setSession(JSON.parse(savedSess));
      } catch (e) {
        // Fallback to default
      }
    }
  }, []);

  // Sync session state changes
  const handleLogin = (email: string, name: string) => {
    const updatedSess: UserSession = {
      id: `usr-${Math.floor(Math.random() * 9999)}`,
      email,
      name,
      isLoggedIn: true
    };
    setSession(updatedSess);
    localStorage.setItem('neightn_session', JSON.stringify(updatedSess));
  };

  const handleLogout = () => {
    const cleared: UserSession = {
      id: null,
      email: null,
      name: null,
      isLoggedIn: false
    };
    setSession(cleared);
    localStorage.removeItem('neightn_session');
    setActiveView('landing');
  };

  // Switch tabs & remember secondary states
  const handleNavigate = (view: string, data?: any) => {
    setActiveView(view);
    if (view === 'detail' && data) {
      setSelectedAgent(data);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Add agent node to dynamic cart
  const handleAddToCart = (agent: Agent) => {
    const existingIndex = cart.findIndex(item => item.agent.id === agent.id);
    let updatedCart: CartItem[] = [];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { agent, quantity: 1 }];
    }
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  // Modify quantities inside pipeline cart
  const handleUpdateCartQuantity = (agentId: string, quantity: number) => {
    let updatedCart: CartItem[] = [];
    if (quantity <= 0) {
      updatedCart = cart.filter(item => item.agent.id !== agentId);
    } else {
      updatedCart = cart.map(item => {
        if (item.agent.id === agentId) {
          return { ...item, quantity };
        }
        return item;
      });
    }
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const handleRemoveCartItem = (agentId: string) => {
    const updatedCart = cart.filter(item => item.agent.id !== agentId);
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  // Resolve Cart to Completed Order and generate corresponding tracking nodes
  const handleCheckoutComplete = (email: string, name: string) => {
    const totalAmount = cart.reduce((acc, item) => acc + (item.agent.pricing * item.quantity), 0);
    const orderNo = `#N8N-${Math.floor(10000 + Math.random() * 90000)}-E${Math.floor(1 + Math.random() * 9)}`;
    
    // Create actual Order object
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      order_number: orderNo,
      items: [...cart],
      total_amount: totalAmount,
      email,
      name,
      created_at: new Date().toISOString(),
      status: 'completed'
    };

    // Update global states
    saveOrder(newOrder);
    setOrders(prev => [newOrder, ...prev]);
    setLatestOrder(newOrder);

    // Automatically provision dynamic active tracking projects for each agent in checkout!
    const newlyCreatedProjects: Project[] = cart.map(item => {
      return {
        id: `proj-${Date.now()}-${item.agent.id}`,
        agent_id: item.agent.id,
        agent_name: item.agent.name,
        order_id: orderNo,
        progress_percentage: 12, // start progress at 12% Discovery
        current_phase: 'discovery',
        estimated_completion_days: item.agent.roi_estimate.payback_period_days,
        logs: [
          'Handshake connection established.',
          'Checking Supabase active schemas registry token...',
          'VPC Subnet allocated. Handshake successful.',
          'Waiting for operator command to trigger live schema compilation compilation...'
        ],
        status: 'idle',
        started_at: new Date().toISOString()
      };
    });

    // Save and commit tracking nodes
    newlyCreatedProjects.forEach(proj => saveProject(proj));
    setProjects(prev => [...newlyCreatedProjects, ...prev]);

    // Wipe cart
    setCart([]);
    saveCart([]);

    // Clear detail selection
    setSelectedAgent(null);

    // Redirect to Success
    setActiveView('success');
  };

  // Admin Publish blueprint
  const handleSaveAgent = (newAgent: Agent) => {
    const updatedAgentsList = saveStoredAgent(newAgent);
    setAgents(updatedAgentsList);
  };

  // Fallback default agent for detail page to avoid crashes if refreshing directly
  const getSelectedOrFallbackAgent = (): Agent | null => {
    if (selectedAgent) return selectedAgent;
    if (agents.length > 0) return agents[0];
    return null;
  };

  return (
    <div className="bg-[#0B0F14] min-h-screen text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-400 select-none relative overflow-x-hidden">
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(#10B981 0.5px, transparent 0.5px)', 
          backgroundSize: '24px 24px' 
        }}
      ></div>

      {/* Heads-Up Display Header persistent */}
      <HeaderHUD 
        activeView={activeView}
        onNavigate={handleNavigate}
        session={session}
        cart={cart}
        onLogout={handleLogout}
      />

      {/* Primary view routers */}
      <main className="relative min-h-[calc(100vh-64px)] z-10">
        {activeView === 'landing' && (
          <LandingView 
            onNavigate={handleNavigate}
            featuredAgents={agents}
          />
        )}

        {activeView === 'marketplace' && (
          <MarketplaceView
            onNavigate={handleNavigate}
            agents={agents}
            projects={projects}
          />
        )}

        {activeView === 'detail' && (
          <AgentDetailView
            agent={getSelectedOrFallbackAgent()!}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeView === 'cart' && (
          <CartView
            cart={cart}
            onNavigate={handleNavigate}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
          />
        )}

        {activeView === 'payment' && (
          <PaymentView
            cart={cart}
            session={session}
            onNavigate={handleNavigate}
            onCheckoutComplete={handleCheckoutComplete}
          />
        )}

        {activeView === 'success' && (
          <SuccessView
            latestOrder={latestOrder}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'tracking' && (
          <ProjectTrackingView
            projects={projects}
            onTriggerSimulation={() => {}} // simulated directly in view tracking with beautiful progress steps
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'login' && (
          <AuthView
            onLoginSuccess={handleLogin}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboard
            onSaveAgent={handleSaveAgent}
            onNavigate={handleNavigate}
          />
        )}
      </main>
    </div>
  );
}
