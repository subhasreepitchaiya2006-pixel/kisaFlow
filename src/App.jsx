import React, { useState } from 'react';
import Header from './components/Header';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import FarmerPortalPage from './components/Farmer/FarmerPortalPage';
import ConsumerPortalPage from './components/Consumer/ConsumerPortalPage';
import AdminDashboardPage from './components/Admin/AdminDashboardPage';
import RealizationCalculatorModal from './components/RealizationCalculatorModal';
import { MOCK_FARMER_LISTINGS } from './data/mockData';
import { TRANSLATIONS } from './utils/translations';
import { User, Users, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [currentUser, setCurrentUser] = useState(null); // null = Auth view
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [farmerListings, setFarmerListings] = useState(MOCK_FARMER_LISTINGS);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthView('login');
  };

  const handleAddListing = (newListing) => {
    setFarmerListings([newListing, ...farmerListings]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar Header */}
      <Header
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenCalc={() => setIsCalcOpen(true)}
      />

      {/* Role Switcher Bar (Visible when logged in to switch perspectives during testing) */}
      {currentUser && (
        <nav className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 sticky top-[73px] z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-slate-400">Active View:</span>
              <button
                onClick={() => setCurrentUser({ ...currentUser, role: 'farmer' })}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentUser.role === 'farmer' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.farmer}</span>
              </button>

              <button
                onClick={() => setCurrentUser({ ...currentUser, role: 'consumer' })}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentUser.role === 'consumer' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{t.consumer}</span>
              </button>

              <button
                onClick={() => setCurrentUser({ ...currentUser, role: 'admin' })}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentUser.role === 'admin' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.admin}</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 hidden sm:block">
              SIH 2026 Problem Statement ID: <strong className="text-white">26033</strong>
            </div>
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
            {currentUser.role === 'farmer' && (
              <FarmerPortalPage
                currentLang={currentLang}
                listings={farmerListings}
                onAddListing={handleAddListing}
                onOpenCalc={() => setIsCalcOpen(true)}
              />
            )}
            {currentUser.role === 'consumer' && (
              <ConsumerPortalPage currentLang={currentLang} />
            )}
            {currentUser.role === 'admin' && (
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
          <span>KisanFlow Platform</span>
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
