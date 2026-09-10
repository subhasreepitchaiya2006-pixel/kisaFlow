import React, { useState } from 'react';
import { Sprout, User, Users, ShieldCheck, ArrowRight, MapPin, Phone, Building } from 'lucide-react';
import { TRANSLATIONS } from '../../utils/translations';

export default function RegisterPage({ currentLang, onRegister, onGoToLogin }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [role, setRole] = useState('farmer'); // 'farmer' | 'consumer' | 'admin'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [extraField, setExtraField] = useState(''); // FPO name or Buyer type or Admin ID

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      role,
      name: name || `${role.toUpperCase()} User`,
      phone,
      location: location || 'India',
      extra: extraField,
      id: `${role.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
    };
    onRegister(newUser);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-slate-950 text-white">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-900/50">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">{t.registerTitle}</h2>
          <p className="text-xs text-slate-400">{t.registerSub}</p>
        </div>

        {/* Role Selection Tabs */}
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

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">{t.name}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Patil"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">{t.phone}</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">{t.location}</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Nashik, Maharashtra or Dadar, Mumbai"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Role specific extra field */}
          {role === 'farmer' && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">{t.fpoName}</label>
              <input
                type="text"
                value={extraField}
                onChange={(e) => setExtraField(e.target.value)}
                placeholder="e.g. Sahyadri Farmers Producer Co."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          )}

          {role === 'consumer' && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">{t.buyerType}</label>
              <select
                value={extraField}
                onChange={(e) => setExtraField(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Individual Consumer">Individual Household Consumer</option>
                <option value="Consumer Apartment Collective">Consumer Apartment Collective</option>
                <option value="Bulk Retail Enterprise">Bulk Retail Enterprise (Supermarket / Hotel)</option>
              </select>
            </div>
          )}

          {role === 'admin' && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">{t.adminId}</label>
              <input
                type="text"
                value={extraField}
                onChange={(e) => setExtraField(e.target.value)}
                placeholder="e.g. DOCA-GOVT-2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>{t.submitRegister}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <button
            onClick={onGoToLogin}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {t.alreadyAccount}
          </button>
        </div>
      </div>
    </div>
  );
}
