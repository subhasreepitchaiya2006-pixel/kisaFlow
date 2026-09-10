import React, { useState } from 'react';
import { Layers, Calendar, MapPin, Calculator, TrendingUp, Sparkles, AlertTriangle, Route, Compass, CheckCircle2, ArrowRight, Package } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { MOCK_CROPS, MOCK_FARMER_LISTINGS, MOCK_DEMAND_FORECAST_DATA, MOCK_ROUTE_DATA } from '../../data/mockData';
import { calculateRealization } from '../../utils/realizationEngine';
import { TRANSLATIONS } from '../../utils/translations';

export default function FarmerPortalPage({ currentLang, listings, onAddListing, onOpenCalc }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Form State
  const [cropName, setCropName] = useState('Tomato (Hybrid Red)');
  const [quantityKg, setQuantityKg] = useState(100);
  const [producingMonths, setProducingMonths] = useState('May to August');
  const [location, setLocation] = useState('Punjab (Ludhiana Farms)');

  // Calculation
  const cropObj = MOCK_CROPS.find(c => c.name === cropName) || MOCK_CROPS[0];
  const calc = calculateRealization({
    grossPrice: cropObj.baselineMandiPrice,
    quantityKg: Number(quantityKg) || 100,
    distanceKm: 140,
    isRefrigerated: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `lst-${Date.now()}`,
      farmerName: 'Ramesh Patil (Farmer)',
      crop: cropName,
      quantityKg: Number(quantityKg),
      grade: 'Grade A Harvest',
      producingMonths: producingMonths,
      farmLocation: location,
      lat: 20.2011,
      lng: 73.8321,
      expectedGrossPrice: cropObj.baselineMandiPrice,
      logisticsCostKg: calc.logisticsCostPerKg,
      spoilageBufferKg: calc.spoilageCostPerKg,
      netTakeHome: calc.netTakeHomePerKg,
      status: 'Pooled in Cluster',
      listedAt: 'Just now'
    };
    onAddListing(newEntry);
    alert(`✅ Produce Entry Added: ${quantityKg} kg of ${cropName} produced in ${location} (${producingMonths})!`);
  };

  const polylinePositions = MOCK_ROUTE_DATA.stops.map(stop => [stop.lat, stop.lng]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 text-white">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Farmer Direct Dashboard
            </span>
            <h2 className="text-2xl font-bold mt-1">{t.farmerPortalTitle}</h2>
            <p className="text-slate-400 text-sm">{t.farmerPortalSub}</p>
          </div>
          <div className="bg-emerald-950/80 border border-emerald-500/40 p-3 rounded-2xl text-right">
            <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">Net Take-Home Rate</span>
            <span className="text-2xl font-extrabold text-emerald-400">₹{calc.netTakeHomePerKg} / kg</span>
          </div>
        </div>
      </div>

      {/* Produce Entry Form & Live Profit Realization Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>{t.produceEntryHeader}</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">{t.cropNameLabel}</label>
                <select
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {MOCK_CROPS.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">{t.quantityLabel}</label>
                <input
                  type="number"
                  required
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">{t.producingMonthsLabel}</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={producingMonths}
                    onChange={(e) => setProducingMonths(e.target.value)}
                    placeholder="e.g. May to August"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <Calendar className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">{t.producingLocationLabel}</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Punjab or Nashik"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.submitProduceBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Net Profit Calculator Preview */}
        <div className="lg:col-span-5 bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Calculator className="w-5 h-5" />
              <span>{t.profitRouteTitle}</span>
            </div>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
              Live Margin
            </span>
          </div>

          <div className="bg-gradient-to-br from-emerald-950 to-slate-950 p-5 rounded-2xl border border-emerald-500/50 space-y-2">
            <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">{t.netProfitLabel}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">₹{calc.netTakeHomePerKg}</span>
              <span className="text-slate-400 text-sm font-semibold">/ kg</span>
            </div>
            <p className="text-xs text-emerald-200">
              Total In-Hand Profit for {quantityKg} kg = <strong className="text-white">₹{calc.totalNetPayout.toLocaleString('en-IN')}</strong>
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">{t.grossMandiLabel}:</span>
              <span className="font-bold text-white">₹{calc.grossPrice.toFixed(2)} / kg</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">{t.logisticsLabel}:</span>
              <span className="font-semibold text-rose-400">- ₹{calc.logisticsCostPerKg.toFixed(2)} / kg</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">{t.spoilageLabel}:</span>
              <span className="font-semibold text-amber-400">- ₹{calc.spoilageCostPerKg.toFixed(2)} / kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Demand Forecasting Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
          <Sparkles className="w-5 h-5" />
          <span>{t.demandForecastTitle}</span>
        </div>
        <p className="text-xs text-slate-400">{t.demandForecastSub}</p>

        <div className="bg-gradient-to-r from-amber-950 via-slate-950 to-slate-950 border border-amber-500/40 rounded-2xl p-5 space-y-2">
          <p className="text-xs text-amber-200 leading-relaxed font-semibold">{t.tomatoAlert}</p>
          <p className="text-xs text-slate-300 leading-relaxed">{t.onionAlert}</p>
        </div>
      </div>

      {/* Farm Route Optimization Map Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Route className="w-5 h-5 text-emerald-400" />
            <span>{t.farmToHubRouteLabel}</span>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
            53% Transport Cost Saved via FPO Pooling
          </span>
        </div>

        <div className="h-72 w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
          <MapContainer center={[20.0, 73.5]} zoom={8} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={polylinePositions} pathOptions={{ color: '#10b981', weight: 4 }} />
            {MOCK_ROUTE_DATA.stops.map((stop, idx) => (
              <Marker key={idx} position={[stop.lat, stop.lng]}>
                <Popup>
                  <div className="p-1">
                    <h5 className="font-bold text-xs">{stop.name}</h5>
                    <p className="text-[11px] text-slate-600">{stop.qty}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
