import React from 'react';
import { Globe } from 'lucide-react';
import { LANGUAGES } from '../../utils/translations';

export default function LanguageSelector({ currentLang, onChangeLang }) {
  return (
    <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold text-white">
      <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="hidden sm:inline text-slate-400">Language:</span>
      <select
        value={currentLang}
        onChange={(e) => onChangeLang(e.target.value)}
        className="bg-slate-900 text-emerald-300 font-bold border border-slate-700 rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.native} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
}
