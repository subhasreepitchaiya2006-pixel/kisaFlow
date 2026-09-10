import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, Check, ArrowRight, Info, Building, UserCheck, RefreshCw, Zap } from 'lucide-react';
import { MOCK_BUYER_ORDERS, MOCK_CLUSTERED_LOTS } from '../data/mockData';

export default function BuyerMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItem, setCartItem] = useState(null);

  const handlePlaceOrder = (lot) => {
    setCartItem(lot);
    alert(`🎉 Order placed successfully for ${lot.totalQuantityKg} kg of ${lot.crop}! Dispatching via KisanFlow ONDC Logistics.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Direct Consumer & Bulk Buyer Hub
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">
              Zero Intermediary Markups
            </span>
          </div>
          <h2 className="text-2xl font-bold">Verified FPO Produce Marketplace</h2>
          <p className="text-slate-400 text-sm mt-1">
            Buy direct from aggregated FPOs. Full price transparency with up to 30% savings for buyers & consumers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-xl text-right">
            <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">Consumer Savings</span>
            <span className="text-xl font-extrabold text-emerald-400">₹14 - ₹18 / kg Saved</span>
          </div>
        </div>
      </div>

      {/* Available Consolidated Lots */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            <span>Available Consolidated FPO Lots</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Updated live from FPO Clusters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_CLUSTERED_LOTS.map((lot, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 hover:border-emerald-400 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {lot.lotId}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mt-1">{lot.crop}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-emerald-600" /> {lot.fpoName}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-slate-900">₹{lot.kisanFlowPricePerKg}</span>
                  <span className="text-xs text-slate-500 font-semibold"> / kg</span>
                  <p className="text-[10px] line-through text-slate-400 font-semibold">Mandi Retail ₹{lot.mandiPricePerKg + 18} / kg</p>
                </div>
              </div>

              {/* Price Transparency Breakdown Widget */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700 font-bold border-b border-slate-200 pb-2">
                  <span>Transparent Price Breakdown:</span>
                  <span className="text-emerald-700">86% to Farmer!</span>
                </div>
                
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>👨‍🌾 Direct Farmer Payout (75%):</span>
                    <span className="font-semibold text-slate-900">₹{(lot.kisanFlowPricePerKg * 0.86).toFixed(2)} / kg</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>🚚 Shared Optimized Transport (15%):</span>
                    <span className="font-semibold text-slate-900">₹{(lot.kisanFlowPricePerKg * 0.11).toFixed(2)} / kg</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>🛡️ Spoilage Insurance & Platform Fee (3%):</span>
                    <span className="font-semibold text-slate-900">₹{(lot.kisanFlowPricePerKg * 0.03).toFixed(2)} / kg</span>
                  </div>
                </div>

                <div className="bg-emerald-100/80 p-2 rounded-lg text-emerald-900 font-semibold flex items-center justify-between mt-2">
                  <span>Buyer Consumer Net Savings:</span>
                  <span className="font-extrabold">₹18.00 / kg Cheaper!</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">Available Lot Size:</span>
                  <span className="font-bold text-slate-900 text-sm">{lot.totalQuantityKg} kg</span>
                </div>
                <button
                  onClick={() => handlePlaceOrder(lot)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  <span>Direct Purchase Lot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Buyer Orders Log */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recent Direct Buyer Orders & Savings Delivered</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_BUYER_ORDERS.map(order => (
            <div key={order.orderId} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    {order.orderId}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{order.buyerName}</h4>
                  <p className="text-xs text-slate-500">{order.buyerType}</p>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  {order.status}
                </span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-800">{order.crop} ({order.quantityKg} kg)</span>
                  <span className="text-emerald-700 font-bold">₹{order.offeredPriceKg} / kg</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Target: {order.deliveryTarget}</span>
                  <span className="text-emerald-600 font-bold">Saved ₹{order.savingsForConsumer} / kg!</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
