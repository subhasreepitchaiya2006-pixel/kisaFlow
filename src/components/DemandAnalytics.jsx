import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { LineChart, AlertTriangle, TrendingUp, Sparkles, CheckCircle, BrainCircuit } from 'lucide-react';
import { MOCK_DEMAND_FORECAST_DATA } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DemandAnalytics() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const cropData = MOCK_DEMAND_FORECAST_DATA.crops[selectedCrop] || MOCK_DEMAND_FORECAST_DATA.crops.Tomato;

  const chartData = {
    labels: MOCK_DEMAND_FORECAST_DATA.labels,
    datasets: [
      {
        label: 'Historical Agmarknet Mandi Price (₹/kg)',
        data: cropData.historicalMandi,
        borderColor: '#94a3b8',
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
        borderDash: [5, 5],
        tension: 0.3,
        fill: true,
      },
      {
        label: 'AI Forecasted Farmer Realization (KisanFlow Net ₹/kg)',
        data: cropData.predictedFarmgateRealization,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        borderWidth: 3,
        pointBackgroundColor: '#10b981',
        pointRadius: 5,
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: { size: 12, weight: '600' }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        borderWidth: 1,
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
      }
    },
    scales: {
      x: {
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' },
        title: {
          display: true,
          text: 'Price (₹ / kg)',
          color: '#cbd5e1'
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Machine Learning Intelligence Engine
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">
              Real-time Agmarknet & data.gov.in Intake
            </span>
          </div>
          <h2 className="text-2xl font-bold">AI Demand Forecasting & Price Dip Detector</h2>
          <p className="text-slate-400 text-sm mt-1">
            Predicting regional supply shortages and demand surges to pool crops BEFORE prices crash.
          </p>
        </div>

        {/* Crop Selector */}
        <div className="bg-slate-800/90 p-2 rounded-xl border border-slate-700">
          <label className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Select Crop Intelligence</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white font-bold text-xs px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="Tomato">Tomato (Hybrid Red)</option>
            <option value="Onion">Onion (Nashik Red)</option>
          </select>
        </div>
      </div>

      {/* AI Alert Warning Box */}
      {cropData.supplyDipAlert ? (
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-500/50 rounded-2xl p-5 text-amber-200 shadow-lg flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">Regional Supply Shortage Dip Alert Flagged</h3>
              <span className="bg-amber-500/30 text-amber-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-amber-400/40">
                XGBoost ML Confidence 94.2%
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{cropData.alertMessage}</p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 text-emerald-200 shadow-lg flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Stable Market Condition</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{cropData.alertMessage}</p>
          </div>
        </div>
      )}

      {/* Chart Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <BrainCircuit className="w-5 h-5 text-emerald-400" />
            <span>{selectedCrop} Price Forecast & Realization Curve (7-Day Projection)</span>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            Updated via Agmarknet API
          </span>
        </div>

        <div className="h-80 w-full pt-2">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Predicted Wholesale Demand</span>
          <p className="text-2xl font-extrabold text-slate-900">31,000 kg / day</p>
          <p className="text-xs text-emerald-600 font-semibold">+35% Surge in Metro Markets</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Optimal Harvest Window</span>
          <p className="text-2xl font-extrabold text-emerald-700">Next 48 Hours</p>
          <p className="text-xs text-slate-500 font-medium">To capture peak net realization rate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-semibold block">Intermediary Spread Prevented</span>
          <p className="text-2xl font-extrabold text-slate-900">₹18.50 / kg</p>
          <p className="text-xs text-emerald-600 font-semibold">Redirected directly to farmer accounts</p>
        </div>
      </div>
    </div>
  );
}
