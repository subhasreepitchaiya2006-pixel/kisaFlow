import React, { useState } from 'react';
import { Network, Code, ShieldCheck, Check, Copy, ArrowRight, Layers, HelpCircle } from 'lucide-react';
import { MOCK_ONDC_PAYLOAD } from '../data/mockData';

export default function ONDCInspector() {
  const [activeAction, setActiveAction] = useState('on_search');
  const [copied, setCopied] = useState(false);

  const payloadString = JSON.stringify(MOCK_ONDC_PAYLOAD, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(payloadString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Open Public Digital Infrastructure Layer
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">
              Beckn Protocol v1.2.0 Compliant
            </span>
          </div>
          <h2 className="text-2xl font-bold">ONDC & eNAM Network Gateway Inspector</h2>
          <p className="text-slate-400 text-sm mt-1">
            KisanFlow does NOT compete with ONDC — it functions as the intelligence & aggregation gateway that feeds clean FPO lots into ONDC buyers.
          </p>
        </div>

        <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-xs flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="font-bold text-white block">Government interoperability</span>
            <span className="text-slate-400 text-[11px]">Agmarknet + ONDC Beckn APIs</span>
          </div>
        </div>
      </div>

      {/* Unique Value Proposition Callout Card: Answering "Isn't this ONDC?" */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-6 text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <HelpCircle className="w-5 h-5" />
          <span>Judges Q&A Positioning: "Isn't this just ONDC?"</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-emerald-300">Answer:</strong> ONDC provides the open discovery network, but individual smallholders cannot list 50 kg of tomatoes directly on ONDC due to logistics fragmentation. <strong>KisanFlow acts as the FPO Aggregation & Realization Intelligence Engine</strong> that collects small harvests, clusters them into bulk lots, calculates real take-home margins, and pushes verified lots directly onto ONDC gateways!
        </p>
      </div>

      {/* Protocol Payload Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Code className="w-5 h-5 text-emerald-400" />
            <span>Live Beckn Protocol JSON Payload Inspector</span>
          </div>

          <div className="flex items-center gap-2">
            {['search', 'on_search', 'select', 'confirm'].map(act => (
              <button
                key={act}
                onClick={() => setActiveAction(act)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeAction === act
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                /{act}
              </button>
            ))}

            <button
              onClick={handleCopy}
              className="ml-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition-colors border border-slate-700 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[450px]">
          <pre>{payloadString}</pre>
        </div>
      </div>
    </div>
  );
}
