import React from 'react';
import { User, Users, ShoppingBag, LineChart, Route, Network, Building2 } from 'lucide-react';

export default function RoleSwitcher({ activeRole, setActiveRole }) {
  const roles = [
    { id: 'farmer', label: 'Farmer Voice Portal', icon: User, badge: 'Zero-Cost Intake' },
    { id: 'fpo', label: 'FPO Clustering Hub', icon: Users, badge: 'Bulk Pooling' },
    { id: 'buyer', label: 'Buyer Marketplace', icon: ShoppingBag, badge: 'Consumer & Bulk' },
    { id: 'analytics', label: 'AI Demand & Pricing', icon: LineChart, badge: 'Agmarknet AI' },
    { id: 'logistics', label: 'Route & Spoilage Map', icon: Route, badge: 'GIS Optimized' },
    { id: 'ondc', label: 'ONDC Network Inspector', icon: Network, badge: 'Open API' },
    { id: 'doca', label: 'DoCA Ministry View', icon: Building2, badge: 'Govt Impact' },
  ];

  return (
    <nav className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/60 sticky top-[73px] z-40 px-2 py-2">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {roles.map(role => {
          const Icon = role.icon;
          const isActive = activeRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md shadow-emerald-950/50 border border-emerald-400/40'
                  : 'bg-slate-900/50 text-slate-300 hover:text-white hover:bg-slate-700/60 border border-slate-700/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`} />
              <span>{role.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-medium ${
                  isActive
                    ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-400/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {role.badge}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
