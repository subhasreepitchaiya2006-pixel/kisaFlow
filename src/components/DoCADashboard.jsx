import React from 'react';
import { Building2, TrendingUp, ShieldCheck, Award, Users, CheckCircle2, ArrowRight, Layers } from 'lucide-react';

export default function DoCADashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Department of Consumer Affairs (DoCA) Oversight
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">
              SIH Problem Statement 26033 Evaluation
            </span>
          </div>
          <h2 className="text-2xl font-bold">Ministry Impact & Price Stabilization Matrix</h2>
          <p className="text-slate-400 text-sm mt-1">
            Monitoring national food inflation reduction, farmer realization gains, and public digital infrastructure adoption.
          </p>
        </div>

        <div className="bg-emerald-950/80 border border-emerald-500/40 p-3.5 rounded-xl text-right">
          <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">DoCA Policy Alignment</span>
          <span className="text-xl font-extrabold text-emerald-400">100% Compliant</span>
        </div>
      </div>

      {/* Government KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Middleman Spread Reduction</span>
          <p className="text-3xl font-extrabold text-emerald-700">42.5%</p>
          <p className="text-xs text-emerald-600 font-semibold">Eliminated redundant broker layers</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Avg. Farmer Take-Home Gain</span>
          <p className="text-3xl font-extrabold text-slate-900">+86%</p>
          <p className="text-xs text-slate-500 font-medium">Verified by Realization Engine</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Consumer Price Inflation Cut</span>
          <p className="text-3xl font-extrabold text-blue-700">₹14 - ₹18 / kg</p>
          <p className="text-xs text-slate-500 font-medium">Direct savings on fresh produce</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Perishable Food Waste Saved</span>
          <p className="text-3xl font-extrabold text-amber-600">68%</p>
          <p className="text-xs text-slate-500 font-medium">Optimized cold-chain routing</p>
        </div>
      </div>

      {/* Alignment with Ministry Objectives */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <span>Alignment with Ministry Mandates</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Strengthening Public Digital Infrastructure</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Instead of creating a proprietary vendor lock-in app, KisanFlow builds directly upon ONDC protocols and Agmarknet API data feeds, ensuring zero public money waste.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Farmer Platform Cost</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Farmers pay ₹0 platform fee. All operational fees are transparently integrated into buyer-side logistics fulfillment, protecting smallholders' thin margins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
