import React, { useState } from 'react';
import Header from './components/Header';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import FarmerPortalPage from './components/Farmer/FarmerPortalPage';
import FPODashboard from './components/FPODashboard';
import BuyerMarketplace from './components/BuyerMarketplace';
import ConsumerPortalPage from './components/Consumer/ConsumerPortalPage';
import DemandAnalytics from './components/DemandAnalytics';
import RouteOptimizer from './components/RouteOptimizer';
import ONDCInspector from './components/ONDCInspector';
import AdminDashboardPage from './components/Admin/AdminDashboardPage';
import RealizationCalculatorModal from './components/RealizationCalculatorModal';
import { MOCK_FARMER_LISTINGS } from './data/mockData';
import { TRANSLATIONS } from './utils/translations';
import { User, Users, ShoppingBag, LineChart, Route, Network, Building2 } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [currentUser, setCurrentUser] = useState(null); // null = Auth view
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [activeTab, setActiveTab] = useState('farmer'); // 'farmer'|'fpo'|'consumer'|'buyerMarket'|'analytics'|'logistics'|'ondc'|'admin'
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [farmerListings, setFarmerListings] = useState(MOCK_FARMER_LISTINGS);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const handleLogin = (user) => {
    setCurrentUser(user);
    if (user.role === 'farmer') setActiveTab('farmer');
    else if (user.role === 'consumer') setActiveTab('consumer');
    else if (user.role === 'admin') setActiveTab('admin');
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    if (user.role === 'farmer') setActiveTab('farmer');
    else if (user.role === 'consumer') setActiveTab('consumer');
    else if (user.role === 'admin') setActiveTab('admin');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthView('login');
  };

  const handleAddListing = (newListing) => {
    setFarmerListings([newListing, ...farmerListings]);
  };

  const masterTabs = [
    { id: 'farmer', label: t.farmer, icon: User, badge: 'Intake & Profit' },
    { id: 'fpo', label: t.fpo, icon: Users, badge: 'Lot Pooling' },
    { id: 'consumer', label: t.consumer, icon: ShoppingBag, badge: 'Orders & Tracking' },
    { id: 'analytics', label: t.analytics, icon: LineChart, badge: 'Agmarknet AI' },
    { id: 'logistics', label: t.logistics, icon: Route, badge: 'GIS Route Map' },
    { id: 'ondc', label: t.ondc, icon: Network, badge: 'Beckn API' },
    { id: 'admin', label: t.admin, icon: Building2, badge: 'Govt Oversight' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header Navbar */}
      <Header
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenCalc={() => setIsCalcOpen(true)}
      />

      {/* Master Feature Navigation Bar (Visible when logged in to access all PPT engines) */}
      {currentUser && (
        <nav className="bg-slate-900/90 border-b border-slate-800 px-2 py-2 sticky top-[73px] z-40">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {masterTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md shadow-emerald-950/50 border border-emerald-400/40'
                      : 'bg-slate-950/50 text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-medium ${
                    isActive ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-400/30' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Main View Area */}
      <main className="flex-1">
        {!currentUser ? (
          authView === 'login' ? (
            <LoginPage
              currentLang={currentLang}
              onLogin={handleLogin}
              onGoToRegister={() => setAuthView('register')}
            />
          ) : (
            <RegisterPage
              currentLang={currentLang}
              onRegister={handleRegister}
              onGoToLogin={() => setAuthView('login')}
            />
          )
        ) : (
          <>
            {activeTab === 'farmer' && (
              <FarmerPortalPage
                currentLang={currentLang}
                listings={farmerListings}
                onAddListing={handleAddListing}
                onOpenCalc={() => setIsCalcOpen(true)}
              />
            )}
            {activeTab === 'fpo' && (
              <FPODashboard farmerListings={farmerListings} />
            )}
            {activeTab === 'consumer' && (
              <ConsumerPortalPage currentLang={currentLang} />
            )}
            {activeTab === 'analytics' && (
              <DemandAnalytics />
            )}
            {activeTab === 'logistics' && (
              <RouteOptimizer />
            )}
            {activeTab === 'ondc' && (
              <ONDCInspector />
            )}
            {activeTab === 'admin' && (
              <AdminDashboardPage currentLang={currentLang} />
            )}
          </>
        )}
      </main>

      {/* Calculator Modal */}
      <RealizationCalculatorModal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 font-mono text-emerald-400 font-bold">
          <span>KisanFlow Unified Master Application</span>
          <span>•</span>
          <span>SIH 2026 PS-26033</span>
          <span>•</span>
          <span>Team Logic Heist</span>
        </div>
        <p>Department of Consumer Affairs (DoCA) — Agriculture, FoodTech & Rural Development</p>
      </footer>
    </div>
  );
}
