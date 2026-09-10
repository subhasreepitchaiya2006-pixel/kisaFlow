import React from 'react';
import { Sprout, ShieldCheck, TrendingUp, Layers, LogOut, UserCheck } from 'lucide-react';
import LanguageSelector from './Common/LanguageSelector';
import { TRANSLATIONS } from '../utils/translations';

export default function Header({ currentLang, onChangeLang, currentUser, onLogout, onOpenCalc }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-xl">
      {/* Top Banner: SIH & DoCA Context */}
      <div className="bg-gradient-to-r from-emerald-700 via-green-700 to-teal-800 px-4 py-1.5 text-xs text-emerald-50 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-600/30">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-emerald-950/60 px-2 py-0.5 rounded font-mono text-emerald-300 font-bold border border-emerald-500/40">
            SIH 2026 PS-26033
          </span>
          <span className="hidden sm:inline text-emerald-100">
            Ministry of Consumer Affairs, Food & Public Distribution (DoCA)
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1 text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            +86% Net Realization Gain
          </span>
          <span className="hidden md:flex items-center gap-1 text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ONDC & eNAM Compliant
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                {t.appName}
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Prototype
              </span>
            </div>
            <p className="text-xs text-slate-400">{t.tagline}</p>
          </div>
        </div>

        {/* User Badge, Language Selector & Calculator */}
        <div className="flex items-center gap-3 flex-wrap">
          <LanguageSelector currentLang={currentLang} onChangeLang={onChangeLang} />

          {currentUser && (
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-white block">{currentUser.name}</span>
                <span className="text-[10px] text-emerald-400 uppercase font-semibold">{currentUser.role}</span>
              </div>
              <button
                onClick={onLogout}
                title={t.logout}
                className="ml-2 p-1 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={onOpenCalc}
            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/30 hover:scale-[1.02] border border-emerald-400/30"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Profit Calculator</span>
          </button>
        </div>
      </div>
    </header>
  );
}
