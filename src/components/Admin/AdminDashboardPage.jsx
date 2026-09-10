import React, { useState } from 'react';
import { ShieldCheck, Truck, Users, HelpCircle, LineChart, CheckCircle2, XCircle, AlertTriangle, Layers, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { MOCK_BUYER_ORDERS, MOCK_ROUTE_DATA, MOCK_FARMER_LISTINGS } from '../../data/mockData';
import { TRANSLATIONS } from '../../utils/translations';

export default function AdminDashboardPage({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'users' | 'support' | 'analytics'

  // User Verifications State
  const [pendingUsers, setPendingUsers] = useState([
    { id: 'usr-101', name: 'Gurpreet Singh', role: 'Farmer', location: 'Ludhiana, Punjab', status: 'Pending Verification' },
    { id: 'usr-102', name: 'FreshSupermart Pvt Ltd', role: 'Consumer', location: 'Dadar, Mumbai', status: 'Pending Verification' },
    { id: 'usr-103', name: 'Kavita Reddy', role: 'Farmer', location: 'Kolar, Karnataka', status: 'Pending Verification' }
  ]);

  // Disputes State
  const [disputes, setDisputes] = useState([
    { id: 'DSP-901', title: 'Grade A Quality Discrepancy', reporter: 'BigBasket Wholesale', subject: 'Tomato Batch #101-A', status: 'Open' },
    { id: 'DSP-902', title: '30-Min Delivery Delay', reporter: 'Dadar Consumer Club', subject: 'Route #MH-NSK-MUM-04', status: 'In Review' }
  ]);

  const handleApproveUser = (id) => {
    setPendingUsers(pendingUsers.filter(u => u.id !== id));
    alert('✅ User Profile Verified & Approved Successfully!');
  };

  const handleRejectUser = (id) => {
    setPendingUsers(pendingUsers.filter(u => u.id !== id));
    alert('❌ User Profile Rejected.');
  };

  const handleResolveDispute = (id) => {
    setDisputes(disputes.map(d => d.id === id ? { ...d, status: 'Resolved' } : d));
    alert('✅ Dispute Marked as Resolved.');
  };

  const polylinePositions = MOCK_ROUTE_DATA.stops.map(stop => [stop.lat, stop.lng]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 text-white">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/30">
            Admin Oversight Center
          </span>
          <h2 className="text-2xl font-bold mt-1">{t.adminTitle}</h2>
          <p className="text-slate-400 text-sm">{t.adminSub}</p>
        </div>

        <div className="bg-amber-950/80 border border-amber-500/40 p-3 rounded-2xl text-right">
          <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider block font-mono">Platform Health</span>
          <span className="text-xl font-extrabold text-amber-400">100% Operational</span>
        </div>
      </div>

      {/* 4 Task Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'orders' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>{t.tabOrderTracking}</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'users' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.tabUserMgmt}</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'support' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{t.tabSupportDispute}</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'analytics' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <LineChart className="w-4 h-4" />
          <span>{t.tabAnalyticsOps}</span>
        </button>
      </div>

      {/* Tab 1: Order & Delivery Tracking */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-400" />
              <span>{t.liveMapOverview}</span>
            </h3>

            <div className="h-80 w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
              <MapContainer center={[19.8, 73.4]} zoom={8} scrollWheelZoom={false} className="w-full h-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={polylinePositions} pathOptions={{ color: '#f59e0b', weight: 4 }} />
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

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Active Order Monitoring List</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Buyer Name</th>
                    <th className="p-3">Produce & Qty</th>
                    <th className="p-3">Target Destination</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {MOCK_BUYER_ORDERS.map((ord, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50">
                      <td className="p-3 font-mono font-bold text-amber-400">{ord.orderId}</td>
                      <td className="p-3 font-medium text-white">{ord.buyerName}</td>
                      <td className="p-3 font-semibold text-slate-200">{ord.crop} ({ord.quantityKg} kg)</td>
                      <td className="p-3 text-slate-400">{ord.deliveryTarget}</td>
                      <td className="p-3">
                        <span className="bg-amber-950 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Account Verification & App Maintenance */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span>{t.pendingVerification}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pendingUsers.map(usr => (
                <div key={usr.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                        {usr.role}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-1">{usr.name}</h4>
                      <p className="text-slate-400 text-[11px]">{usr.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-900">
                    <button
                      onClick={() => handleApproveUser(usr.id)}
                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.approveBtn}</span>
                    </button>
                    <button
                      onClick={() => handleRejectUser(usr.id)}
                      className="py-1.5 px-3 bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-white font-semibold rounded-lg transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Support & Dispute Handling */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>{t.disputeHeader}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {disputes.map(dsp => (
                <div key={dsp.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-amber-400 font-bold">{dsp.id}</span>
                      <h4 className="font-bold text-white text-sm mt-0.5">{dsp.title}</h4>
                      <p className="text-slate-400 text-[11px]">Reported by: {dsp.reporter} ({dsp.subject})</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      dsp.status === 'Resolved' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                    }`}>
                      {dsp.status}
                    </span>
                  </div>

                  {dsp.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolveDispute(dsp.id)}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.resolveBtn}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Operations & Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Total Daily Platform Sales</span>
              <p className="text-3xl font-extrabold text-amber-400">₹4,85,000</p>
              <p className="text-xs text-emerald-400 font-semibold">+24% vs Last Week</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">Verified Farmers & Consumers</span>
              <p className="text-3xl font-extrabold text-white">1,010 Active</p>
              <p className="text-xs text-slate-400 font-medium">Across 12 Agricultural Corridors</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">System Commission / Payout Status</span>
              <p className="text-3xl font-extrabold text-emerald-400">100% Settled</p>
              <p className="text-xs text-emerald-300 font-semibold">Zero delayed payouts</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
