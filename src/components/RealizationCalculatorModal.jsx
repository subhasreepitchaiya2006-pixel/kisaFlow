import React, { useState } from 'react';
import { X, Calculator, RefreshCw, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { calculateRealization } from '../utils/realizationEngine';

export default function RealizationCalculatorModal({ isOpen, onClose }) {
  const [grossPrice, setGrossPrice] = useState(40);
  const [quantityKg, setQuantityKg] = useState(2000);
  const [distanceKm, setDistanceKm] = useState(150);
  const [isRefrigerated, setIsRefrigerated] = useState(true);

  if (!isOpen) return null;

  const result = calculateRealization({
    grossPrice: Number(grossPrice) || 30,
    quantityKg: Number(quantityKg) || 1000,
    distanceKm: Number(distanceKm) || 100,
    isRefrigerated
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl space-y-6 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          <Calculator className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="text-lg font-bold">Farmer Realization Engine Simulator</h3>
            <p className="text-xs text-slate-400">Test exact net margin math under different harvest & distance conditions</p>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Mandi Listed Gross Price (₹/kg)</label>
            <input
              type="number"
              value={grossPrice}
              onChange={(e) => setGrossPrice(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-extrabold focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Harvest Quantity (kg)</label>
            <input
              type="number"
              value={quantityKg}
              onChange={(e) => setQuantityKg(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-extrabold focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Transport Distance (km)</label>
            <input
              type="number"
              value={distanceKm}
              onChange={(e) => setDistanceKm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-extrabold focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Logistics Cold-Chain Type</label>
            <button
              type="button"
              onClick={() => setIsRefrigerated(!isRefrigerated)}
              className={`w-full py-2 px-3 rounded-xl font-bold transition-colors border ${
                isRefrigerated
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {isRefrigerated ? '❄️ Refrigerated Cold-Van (Optimized)' : '🚚 Standard Truck (Higher Spoilage)'}
            </button>
          </div>
        </div>

        {/* Live Calculated Output */}
        <div className="bg-gradient-to-br from-emerald-950 to-slate-950 p-5 rounded-xl border border-emerald-500/50 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-emerald-300 uppercase tracking-wider">
            <span>Net Farmer Realization Result:</span>
            <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">
              +{result.additionalFarmerGainPct}% Higher Net Earnings!
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white">₹{result.netTakeHomePerKg}</span>
            <span className="text-slate-400 text-sm font-semibold">/ kg net in hand</span>
          </div>

          <div className="pt-2 border-t border-emerald-900/60 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Total Net Payout:</span>
              <span className="font-bold text-emerald-300 text-sm">₹{result.totalNetPayout.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Extra Cash vs Mandi Middleman:</span>
              <span className="font-bold text-white text-sm">+₹{result.savedMoneyForFarmer.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
