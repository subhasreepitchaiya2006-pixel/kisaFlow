import React, { useState } from 'react';
import { ShoppingBag, Calendar, Clock, MapPin, Calculator, ShieldCheck, Truck, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { MOCK_BUYER_ORDERS, MOCK_ROUTE_DATA, MOCK_CROPS } from '../../data/mockData';
import { TRANSLATIONS } from '../../utils/translations';

export default function ConsumerPortalPage({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [orders, setOrders] = useState(MOCK_BUYER_ORDERS);
  const [productRequired, setProductRequired] = useState('Tomato (Hybrid Red)');
  const [quantity, setQuantity] = useState(50);
  const [deliveryDate, setDeliveryDate] = useState('2026-09-12');
  const [deliveryTime, setDeliveryTime] = useState('10:00 AM');

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      orderId: `ORD-${Math.floor(8000 + Math.random() * 1000)}`,
      buyerName: 'Consumer Household (You)',
      buyerType: 'Direct Consumer',
      crop: productRequired,
      quantityKg: Number(quantity),
      offeredPriceKg: 35.0,
      middlemanComparisonPrice: 52.0,
      savingsForConsumer: 17.0,
      status: 'Confirmed & Scheduled',
      deliveryTarget: `${deliveryDate} at ${deliveryTime}`
    };
    setOrders([newOrder, ...orders]);
    alert(`🎉 Requirement Submitted: ${quantity} kg of ${productRequired} required on ${deliveryDate} at ${deliveryTime}!`);
  };

  const polylinePositions = MOCK_ROUTE_DATA.stops.map(stop => [stop.lat, stop.lng]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 text-white">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Consumer Direct Hub
            </span>
            <h2 className="text-2xl font-bold mt-1">{t.consumerPortalTitle}</h2>
            <p className="text-slate-400 text-sm">{t.consumerPortalSub}</p>
          </div>

          <div className="bg-emerald-950/80 border border-emerald-500/40 p-3 rounded-2xl text-right">
            <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">Consumer Net Savings</span>
            <span className="text-2xl font-extrabold text-emerald-400">₹14 - ₹18 / kg Saved</span>
          </div>
        </div>
      </div>

      {/* Consumer Requirement Form & Active Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Intake Form */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <span>{t.consumerOrderHeader}</span>
          </h3>

          <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">{t.productRequiredLabel}</label>
              <select
                value={productRequired}
                onChange={(e) => setProductRequired(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {MOCK_CROPS.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">{t.productQtyLabel}</label>
              <input
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 50"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">{t.deliveryDateTimeLabel} (Date)</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <Calendar className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Time</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    placeholder="e.g. 10:00 AM"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <Clock className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.submitOrderBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Active Orders Display */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{t.activeOrdersHeader}</span>
          </h3>

          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {orders.map(ord => (
              <div key={ord.orderId} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      {ord.orderId}
                    </span>
                    <h5 className="font-bold text-white text-sm mt-1">{ord.crop}</h5>
                  </div>
                  <span className="bg-blue-950 text-blue-300 font-bold px-2.5 py-0.5 rounded-full text-[11px] border border-blue-500/30">
                    {ord.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-400 pt-1 border-t border-slate-900">
                  <div>
                    <span>Quantity Needed:</span>
                    <span className="font-bold text-white block">{ord.quantityKg} kg</span>
                  </div>
                  <div>
                    <span>Delivery Time/Date:</span>
                    <span className="font-bold text-white block">{ord.deliveryTarget}</span>
                  </div>
                </div>

                <div className="bg-emerald-950/60 p-2 rounded-xl text-emerald-300 font-semibold flex justify-between">
                  <span>Net Money Saved:</span>
                  <span className="font-extrabold text-white">₹{(ord.savingsForConsumer * ord.quantityKg).toLocaleString('en-IN')} (₹{ord.savingsForConsumer}/kg)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consumer Savings Calculator & Live Shipment Tracking Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Savings Calculator Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 border border-emerald-500/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <Calculator className="w-5 h-5" />
            <span>{t.consumerSavingsTitle}</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <span className="text-slate-400 block font-semibold">{t.savedVSMiddleman}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400">30% Cheaper</span>
              <span className="text-slate-400 text-xs">vs Mandi Retail Broker Markups</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between p-2 bg-slate-900/80 rounded-xl">
              <span>Direct Farmgate FPO Price:</span>
              <span className="font-bold text-white">₹34.00 / kg</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-900/80 rounded-xl">
              <span>Shared Optimized Logistics:</span>
              <span className="font-bold text-white">₹4.50 / kg</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-900/80 rounded-xl">
              <span>Traditional Middleman Price:</span>
              <span className="line-through text-slate-500 font-bold">₹58.00 / kg</span>
            </div>
          </div>
        </div>

        {/* Live Shipment Tracking Map */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Truck className="w-5 h-5 text-emerald-400" />
              <span>{t.liveShipmentLabel}</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono">ETA: 1.8 Hours</span>
          </div>

          <div className="h-60 w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
            <MapContainer center={[19.8, 73.4]} zoom={8} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Polyline positions={polylinePositions} pathOptions={{ color: '#3b82f6', weight: 4 }} />
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
    </div>
  );
}
