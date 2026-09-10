import React, { useState } from 'react';
import { Users, Layers, Package, TrendingUp, CheckCircle, Truck, AlertCircle, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { MOCK_CLUSTERED_LOTS, MOCK_FPOS } from '../data/mockData';
import { clusterFarmingLots } from '../utils/realizationEngine';

export default function FPODashboard({ farmerListings }) {
  const [selectedFpo, setSelectedFpo] = useState('fpo-101');
  const activeFpo = MOCK_FPOS.find(f => f.id === selectedFpo) || MOCK_FPOS[0];

  // Run clustering engine on current listings
  const clusteredGroups = clusterFarmingLots(farmerListings);

  // Aggregated Stats
  const totalVolumeKg = farmerListings.reduce((sum, item) => sum + item.quantityKg, 0);
  const totalMemberPayout = farmerListings.reduce((sum, item) => sum + (item.quantityKg * item.netTakeHome), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              FPO-First Go-To-Market Strategy
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">
              500+ Existing FPOs Instant Liquidity
            </span>
          </div>
          <h2 className="text-2xl font-bold">Algorithmic FPO Aggregation & Clustering Hub</h2>
          <p className="text-slate-400 text-sm mt-1">
            Consolidating smallholder harvests into bulk buyer lots to eliminate solo logistics & broker fees.
          </p>
        </div>

        {/* FPO Selector */}
        <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700">
          <label className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Active FPO Network</label>
          <select
            value={selectedFpo}
            onChange={(e) => setSelectedFpo(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {MOCK_FPOS.map(fpo => (
              <option key={fpo.id} value={fpo.id}>
                {fpo.name} ({fpo.district}, {fpo.state})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Aggregated Smallholders</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{activeFpo.totalFarmers}</p>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Zero acquisition cost via co-op
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Aggregated Volume</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{totalVolumeKg.toLocaleString('en-IN')} <span className="text-sm font-semibold text-slate-500">kg</span></p>
          <p className="text-xs text-slate-500 font-medium">Pooled across {farmerListings.length} farmer batches</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Net Member Realization</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-700">₹{Math.round(totalMemberPayout).toLocaleString('en-IN')}</p>
          <p className="text-xs text-emerald-600 font-semibold">+86% vs Mandi broker payout</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Spoilage Avoided</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600">68%</p>
          <p className="text-xs text-slate-500 font-medium">Via cold chain route optimization</p>
        </div>
      </div>

      {/* Algorithmic Clustering Live Engine */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Algorithmic Harvest Clustering Engine</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automatically groups nearby smallholder harvests into standard 1-ton to 5-ton lots for bulk buyers
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
            AI Auto-Clustering Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clusteredGroups.map((group, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 hover:border-emerald-400 transition-colors relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Cluster Lot #{idx + 101}
                  </span>
                  <h4 className="font-bold text-slate-900 text-base mt-1">{group.crop}</h4>
                  <p className="text-xs text-slate-500">{group.grade}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-emerald-700">{group.totalQuantityKg} kg</span>
                  <p className="text-[10px] text-slate-500 font-semibold">{group.farmersCount} Farmers Pooled</p>
                </div>
              </div>

              {/* Pooled Farmers List */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                <span className="font-semibold text-slate-700 block">Pooled Farmers in this Lot:</span>
                <div className="flex flex-wrap gap-1.5">
                  {group.farmers.map((farmer, fIdx) => (
                    <span key={fIdx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                      👨‍🌾 {farmer}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lot Metrics & ONDC Handoff */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Ready for ONDC/eNAM Injection</span>
                <button
                  onClick={() => alert(`🚀 Lot #${idx + 101} pushed onto ONDC network successfully!`)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Dispatch Lot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Matched & Dispatched Bulk Lots Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Active Bulk Lots & Buyer Matched Orders</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Lot ID</th>
                <th className="p-3">FPO Hub</th>
                <th className="p-3">Crop & Volume</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Farmer Share %</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CLUSTERED_LOTS.map((lot, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="p-3 font-mono font-bold text-emerald-700">{lot.lotId}</td>
                  <td className="p-3 font-medium text-slate-800">{lot.fpoName}</td>
                  <td className="p-3 font-semibold text-slate-900">{lot.crop} ({lot.totalQuantityKg} kg)</td>
                  <td className="p-3 text-slate-600">{lot.destinationMarket}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                      {lot.kisanFlowFarmerSharePercent}% (vs {lot.traditionalFarmerSharePercent}% Mandi)
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                      {lot.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
