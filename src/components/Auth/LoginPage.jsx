import React, { useState } from 'react';
import { Sprout, User, Users, ShieldCheck, ArrowRight, KeyRound, Phone, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../../utils/translations';

export default function LoginPage({ currentLang, onLogin, onGoToRegister }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [role, setRole] = useState('farmer'); // 'farmer' | 'consumer' | 'admin'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleQuickDemo = (selectedRole) => {
    let demoUser = {
      role: selectedRole,
      name: selectedRole === 'farmer' ? 'Ramesh Patil' : selectedRole === 'consumer' ? 'Ananya Sharma' : 'Officer V. K. Sharma',
      id: selectedRole === 'farmer' ? 'FARM-101' : selectedRole === 'consumer' ? 'CONS-202' : 'ADMIN-DOCA-01',
      location: selectedRole === 'farmer' ? 'Nashik, Maharashtra' : 'Mumbai, Dadar'
    };
    onLogin(demoUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      role,
      name: identifier || `${role.toUpperCase()} User`,
      id: `${role.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      location: 'India'
    };
    onLogin(user);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-slate-950 text-white">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-900/50">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">{t.loginTitle}</h2>
          <p className="text-xs text-slate-400">{t.loginSub}</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">{t.selectRole}</label>
          <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                role === 'farmer' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t.farmer}</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('consumer')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                role === 'consumer' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.consumer}</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                role === 'admin' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.admin}</span>
            </button>
          </div>
        </div>

        {/* Quick Demo Login Buttons */}
        <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-emerald-500/30 space-y-2 text-center">
          <span className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> {t.demoLogin}
          </span>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => handleQuickDemo('farmer')}
              className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all"
            >
              👨‍🌾 Farmer Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('consumer')}
              className="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-500/40 rounded-xl text-xs font-bold transition-all"
            >
              🛒 Consumer Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="px-3 py-1.5 bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-all"
            >
              🏛️ Admin Demo
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">{t.phone}</label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">{t.password}</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>{t.login}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Link to Register */}
        <div className="text-center pt-2 border-t border-slate-800">
          <button
            onClick={onGoToRegister}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {t.needAccount}
          </button>
        </div>
      </div>
    </div>
  );
}
