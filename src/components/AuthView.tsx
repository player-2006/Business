import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Terminal, AlertCircle, Info, Landmark, Compass, KeyRound } from 'lucide-react';
import { UserSession } from '../types';

interface AuthViewProps {
  onLoginSuccess: (email: string, name: string) => void;
  onNavigate: (view: string) => void;
}

export default function AuthView({ onLoginSuccess, onNavigate }: AuthViewProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegistering && !fullName)) {
      setErrorMessage('Verification keys cannot be empty.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate Supabase response timeline
    setTimeout(() => {
      setIsSubmitting(false);
      const outputName = isRegistering ? fullName : email.split('@')[0];
      onLoginSuccess(email, outputName);
      onNavigate('marketplace');
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setErrorMessage('');
    // Simulate OAuth pop-up flow
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess('operator.corp@gmail.com', 'Enterprise Dev');
      onNavigate('marketplace');
    }, 1000);
  };

  return (
    <div className="bg-transparent min-h-screen text-slate-100 flex items-center justify-center px-6 py-16">
      
      <div className="w-full max-w-md bg-[#151B23]/40 border border-white/[0.06] rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative backdrop-blur-md select-text">
        
        {/* Supabase security badge */}
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-emerald-450">
            <KeyRound className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-emerald-450 tracking-widest font-bold uppercase block">SUPABASE_AUTH_INDEX</span>
            <h1 className="text-xl font-bold text-white tracking-tight font-sans">Identity Normalization</h1>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-red-950/20 border border-red-900/40 rounded-xl text-xs text-red-400 font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} id="auth-cred-form" className="space-y-4 font-sans text-xs">
          
          {isRegistering && (
            <div className="space-y-2">
              <label htmlFor="auth-fullname" className="font-mono text-[9px] text-zinc-500 uppercase block font-bold tracking-widest">OPERATOR FULL NAME</label>
              <input
                type="text"
                id="auth-fullname"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Arc Developer"
                className="w-full bg-black/40 text-xs text-white border border-white/10 rounded-xl p-3 focus:border-emerald-500/40 focus:outline-none transition-colors font-mono"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="auth-email" className="font-mono text-[9px] text-zinc-500 uppercase block font-bold tracking-widest">CREDENTIAL EMAIL</label>
            <input
              type="email"
              id="auth-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@neightn.ai"
              className="w-full bg-black/40 text-xs text-white border border-white/10 rounded-xl p-3 focus:border-emerald-500/40 focus:outline-none transition-colors font-mono"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="auth-pass" className="font-mono text-[9px] text-zinc-500 uppercase block font-bold tracking-widest">CIPHER KEY SECRETS (Password)</label>
            <input
              type="password"
              id="auth-pass"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/40 text-xs text-white border border-white/10 rounded-xl p-3 focus:border-emerald-500/40 focus:outline-none transition-colors font-mono"
            />
          </div>

          {/* Action trigger button */}
          <button
            type="submit"
            disabled={isSubmitting}
            id="auth-submit-btn"
            className={`w-full py-3 bg-emerald-500 text-[#0B0F14] font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer ${
              isSubmitting ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed' : 'hover:bg-emerald-400'
            }`}
          >
            {isSubmitting ? 'VERIFYING_IDENTITY_STREAMS...' : isRegistering ? 'INITIALIZE_OPERATOR_SIGNUP' : 'VALIDATE_IDENTITY'}
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-white/[0.06]"></div>
          <span className="flex-shrink mx-4 text-[9px] text-zinc-550 font-mono font-bold uppercase tracking-widest">OR THIRD_PARTY</span>
          <div className="flex-grow border-t border-white/[0.06]"></div>
        </div>

        {/* Google Authentication */}
        <button
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          id="auth-google-btn"
          className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-sans text-xs uppercase rounded-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 text-emerald-450" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C18.155 2.296 15.46 1 12.24 1 5.48 1 0 6.48 0 13s5.48 12 12.24 12c7.054 0 11.751-4.964 11.751-11.964 0-.802-.087-1.416-.193-2.036L12.24 10.285z"/>
          </svg>
          <span className="font-semibold tracking-wide text-xs">Verify with Google workspace</span>
        </button>

        {/* Switch Register/Login text link */}
        <div className="text-center text-xs text-zinc-500 pt-3 border-t border-white/[0.06]">
          {isRegistering ? (
            <span>
              Registered already?{' '}
              <button 
                id="auth-toggle-login-btn"
                onClick={() => setIsRegistering(false)} 
                className="text-emerald-450 hover:text-emerald-300 font-semibold cursor-pointer ml-1 transition-colors"
              >
                Access Matrix Login
              </button>
            </span>
          ) : (
            <span>
              New deployment operator?{' '}
              <button 
                id="auth-toggle-register-btn"
                onClick={() => setIsRegistering(true)} 
                className="text-emerald-450 hover:text-emerald-300 font-semibold cursor-pointer ml-1 transition-colors"
              >
                Create Security Credential
              </button>
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
