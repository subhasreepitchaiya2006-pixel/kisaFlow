import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, MapPin, Calculator, ShieldCheck, ArrowRight, Layers, RefreshCw } from 'lucide-react';
import { MOCK_CROPS, MOCK_FARMER_LISTINGS, MOCK_FPOS } from '../data/mockData';
import { calculateRealization } from '../utils/realizationEngine';

export default function FarmerPortal({ listings, onAddListing, onOpenCalc }) {
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  
  // Form State
  const [selectedCrop, setSelectedCrop] = useState(MOCK_CROPS[0].name);
  const [quantityKg, setQuantityKg] = useState(1200);
  const [selectedGrade, setSelectedGrade] = useState('Grade A (Export/Bulk)');
  const [farmLocation, setFarmLocation] = useState('Nashik Rural, MH (20.0059, 73.7898)');
  const [selectedFpo, setSelectedFpo] = useState(MOCK_FPOS[0].id);

  // Selected crop details
  const cropObj = MOCK_CROPS.find(c => c.name === selectedCrop) || MOCK_CROPS[0];
  
  // Realization Calculation
  const calc = calculateRealization({
    grossPrice: cropObj.baselineMandiPrice,
    quantityKg: Number(quantityKg) || 1000,
    distanceKm: 160,
    isRefrigerated: true
  });

  const handleSimulateVoice = () => {
    setIsListening(true);
    setVoiceText('');
    setTimeout(() => {
      setVoiceText('I have 1,200 kg of Grade A Tomato ready for harvest in 2 days from Nashik farm.');
      setIsListening(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      id: `lst-${Date.now()}`,
      farmerName: 'Ramesh Patil (You)',
      voiceNoteText: voiceText || `${quantityKg} kg ${selectedCrop} ready for harvest.`,
      fpoId: selectedFpo,
      crop: selectedCrop,
      quantityKg: Number(quantityKg),
      grade: selectedGrade,
      harvestDate: new Date().toISOString().split('T')[0],
      farmLocation: farmLocation,
      lat: 20.0059,
      lng: 73.7898,
      expectedGrossPrice: cropObj.baselineMandiPrice,
      logisticsCostKg: calc.logisticsCostPerKg,
      spoilageBufferKg: calc.spoilageCostPerKg,
      netTakeHome: calc.netTakeHomePerKg,
      status: 'Pooled in Cluster #101-A',
      listedAt: 'Just now'
    };
    onAddListing(newListing);
    alert('✅ Listing Created & Pooled into FPO Cluster successfully!');
  };

  const labels = {
    title: "Farmer Zero-Cost Voice & Assisted Portal",
    subtitle: "List produce via voice or simple digital form — zero app installation required.",
    voiceBtn: isListening ? "Listening (Speak Now...)" : "Tap & Speak to List Harvest",
    voiceSub: "AI Speech-to-Text Vernacular Assistant",
    realizationTitle: "Your Net Take-Home Realization",
    grossLabel: "Mandi Listed Gross Price",
    logisticsLabel: "Shared Route Logistics",
    spoilageLabel: "Spoilage Risk Buffer",
    fpoFeeLabel: "FPO Admin Fee (1%)",
    netLabel: "NET IN-HAND EARNING",
    compareMiddleman: "vs Traditional Middleman Broker Payout",
    gainBadge: `+${calc.additionalFarmerGainPct}% Higher Net Earnings!`,
    submitBtn: "List Produce & Connect to FPO Cluster"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Zero-Cost Farmer Intake
              </span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">
                No App Download Required
              </span>
            </div>
            <h2 className="text-2xl font-bold">{labels.title}</h2>
            <p className="text-slate-400 text-sm mt-1">{labels.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-emerald-300 font-semibold">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>Language: English</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Voice Intake & Listing Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Voice Input Module */}
          <div className="bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI Voice Assistant</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{labels.voiceSub}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-4">
              <button
                type="button"
                onClick={handleSimulateVoice}
                className={`relative group w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/40 hover:scale-105'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 animate-spin" />
                ) : (
                  <Mic className="w-8 h-8 group-hover:scale-110 transition-transform" />
                )}
                {isListening && (
                  <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75" />
                )}
              </button>

              <div>
                <p className="text-white font-semibold text-base">{labels.voiceBtn}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Example: "1,500 kg Tomato Grade A ready in Nashik farm"
                </p>
              </div>

              {voiceText && (
                <div className="w-full bg-slate-900/90 border border-emerald-500/40 p-3 rounded-lg text-left text-xs text-emerald-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-300">Voice Recognized Speech:</span>
                    <p className="mt-0.5 text-white font-mono">"{voiceText}"</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Listing Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>Listing Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Crop Name</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {MOCK_CROPS.map(crop => (
                    <option key={crop.id} value={crop.name}>
                      {crop.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Harvest Quantity (in Kilograms)</label>
                <input
                  type="number"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(e.target.value)}
                  min="100"
                  step="50"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Quality Grade</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Grade A (Export/Bulk)">Grade A (Export / Bulk Chain)</option>
                  <option value="Grade B (Local Retail)">Grade B (Local Retail)</option>
                  <option value="Grade C (Processing)">Grade C (Processing / Sauce)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">FPO Aggregator Co-op</label>
                <select
                  value={selectedFpo}
                  onChange={(e) => setSelectedFpo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {MOCK_FPOS.map(fpo => (
                    <option key={fpo.id} value={fpo.id}>
                      {fpo.name} ({fpo.district})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Farm Location & Coordinates</label>
              <div className="relative">
                <input
                  type="text"
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{labels.submitBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Realization Engine Breakdown Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 text-white shadow-xl space-y-6 sticky top-[140px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Calculator className="w-5 h-5" />
                <span>{labels.realizationTitle}</span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                UVP Algorithm
              </span>
            </div>

            {/* In-Hand Take-Home Display */}
            <div className="bg-gradient-to-br from-emerald-950 to-slate-950 p-5 rounded-xl border border-emerald-500/50 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                <span>{labels.netLabel}</span>
                <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                  {labels.gainBadge}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">₹{calc.netTakeHomePerKg}</span>
                <span className="text-slate-400 text-sm font-semibold">/ kg in hand</span>
              </div>
              <p className="text-xs text-emerald-200/80">
                Total Net Payout for {quantityKg} kg harvest = <strong className="text-white text-sm">₹{calc.totalNetPayout.toLocaleString('en-IN')}</strong>
              </p>
            </div>

            {/* Formula Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                <span className="text-slate-400">{labels.grossLabel}:</span>
                <span className="font-bold text-white">₹{calc.grossPrice.toFixed(2)} / kg</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                <span className="text-slate-400">{labels.logisticsLabel}:</span>
                <span className="font-semibold text-rose-400">- ₹{calc.logisticsCostPerKg.toFixed(2)} / kg</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                <span className="text-slate-400">{labels.spoilageLabel}:</span>
                <span className="font-semibold text-amber-400">- ₹{calc.spoilageCostPerKg.toFixed(2)} / kg</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                <span className="text-slate-400">{labels.fpoFeeLabel}:</span>
                <span className="font-semibold text-blue-400">- ₹{calc.fpoFeePerKg.toFixed(2)} / kg</span>
              </div>
            </div>

            {/* Middleman Comparison Callout */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 block">{labels.compareMiddleman}:</span>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Traditional Broker Rate:</span>
                <span className="line-through text-slate-500 font-semibold">₹{calc.traditionalFarmerPrice.toFixed(2)} / kg</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold">KisanFlow Extra Earnings:</span>
                <span className="text-emerald-300 font-bold text-sm">+₹{(calc.netTakeHomePerKg - calc.traditionalFarmerPrice).toFixed(2)} / kg</span>
              </div>
            </div>

            <button
              onClick={onOpenCalc}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open Interactive Realization Calculator Modal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Active Farmer Harvest Listings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Farmer Harvest Listings</h3>
            <p className="text-xs text-slate-500">Live smallholder listings connected to nearby FPO clusters</p>
          </div>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            {listings.length} Active Batches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map(item => (
            <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 hover:border-emerald-400 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.farmerName}</h4>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" /> {item.farmLocation}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {item.status}
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 text-xs space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">{item.crop}</span>
                  <span className="text-emerald-700 font-bold">{item.quantityKg} kg</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Grade: {item.grade}</span>
                  <span>Listed: {item.listedAt}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-xs">
                <span className="text-slate-500">Net Realization:</span>
                <span className="font-extrabold text-emerald-700 text-sm">₹{item.netTakeHome} / kg</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
