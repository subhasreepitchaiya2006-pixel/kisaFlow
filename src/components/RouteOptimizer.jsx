import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Route, Truck, ShieldCheck, MapPin, Zap, ArrowRight, Compass } from 'lucide-react';
import { MOCK_ROUTE_DATA } from '../data/mockData';

// Fix standard Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function RouteOptimizer() {
  const route = MOCK_ROUTE_DATA;

  // Extract coordinates for Polyline
  const polylinePositions = route.stops.map(stop => [stop.lat, stop.lng]);
  const centerLat = 19.8;
  const centerLng = 73.4;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Perishability-Aware Logistics Engine
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">
              Shared Cold-Chain Dispatch
            </span>
          </div>
          <h2 className="text-2xl font-bold">GIS Multi-Stop Shared Route Optimizer</h2>
          <p className="text-slate-400 text-sm mt-1">
            Minimizing solo transit trips and spoilage waste through pooled farm pickups across Nashik-Mumbai corridor.
          </p>
        </div>

        <div className="bg-emerald-950/80 border border-emerald-500/40 p-3 rounded-xl text-right">
          <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">Transport Cost Cut</span>
          <span className="text-2xl font-extrabold text-emerald-400">53% Saved</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Leaflet Map */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span>Live Multi-Stop Pickup Route (Nashik to Mumbai)</span>
            </div>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/30">
              Vehicle: {route.vehicle}
            </span>
          </div>

          <div className="h-[420px] w-full rounded-xl overflow-hidden border border-slate-800 relative z-0">
            <MapContainer
              center={[centerLat, centerLng]}
              zoom={8}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Draw Route Polyline */}
              <Polyline
                positions={polylinePositions}
                pathOptions={{ color: '#10b981', weight: 4, opacity: 0.85, dashArray: '8, 8' }}
              />

              {/* Draw Markers for Stops */}
              {route.stops.map((stop, idx) => (
                <Marker key={idx} position={[stop.lat, stop.lng]}>
                  <Popup>
                    <div className="p-1 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Stop #{idx + 1}: {stop.type}
                      </span>
                      <h5 className="font-bold text-slate-900 text-xs">{stop.name}</h5>
                      <p className="text-[11px] text-slate-600 font-semibold">{stop.qty}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Right Column: Route Details & Logistics Math */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-5">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-slate-800 pb-3">
              <Truck className="w-5 h-5 text-emerald-400" />
              <span>Route Diagnostics</span>
            </h3>

            {/* Stops Timeline */}
            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
              {route.stops.map((stop, idx) => (
                <div key={idx} className="flex items-start gap-3 relative z-10 pl-1">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 border-2 border-slate-900">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">{stop.type}</span>
                    <h5 className="text-xs font-bold text-white">{stop.name}</h5>
                    <p className="text-[11px] text-slate-400 font-mono">{stop.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics Breakdown */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Distance:</span>
                <span className="font-bold text-white">{route.totalDistanceKm} km</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Optimized Fuel Saved:</span>
                <span className="font-bold text-emerald-400">{route.optimizedFuelSavedLiters} Liters</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Spoilage Risk Score:</span>
                <span className="font-bold text-emerald-300">{route.spoilageRiskScore}</span>
              </div>
            </div>

            {/* Cost Comparison */}
            <div className="bg-gradient-to-br from-emerald-950 to-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-2 text-xs">
              <span className="text-emerald-300 font-bold uppercase text-[10px] tracking-wider block">Logistics Cost Comparison:</span>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Solo Farm Transport:</span>
                <span className="line-through text-slate-500 font-semibold">{route.traditionalSoloCost}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-emerald-400 font-semibold">KisanFlow Pooled Shared Route:</span>
                <span className="text-xl font-extrabold text-white">{route.kisanFlowPooledCost}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
