import React, { useState } from 'react';
import { ShoppingBag, Search, ShieldCheck, MapPin, X, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    activeSection,
    setActiveSection,
    setIsAdminOpen,
    checkPinService,
    showToast,
    user,
    userProfile,
    isAdmin,
    signInWithGoogle,
    signOutUser,
    setIsUserOrdersOpen
  } = useStore();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinResult, setPinResult] = useState<{
    serviceable: boolean;
    city: string;
    state: string;
    days: number;
    partners: string[];
  } | null>(null);

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    const res = checkPinService(pinInput);
    setPinResult(res);
    if (res.serviceable) {
      showToast(`Shiprocket delivers to ${pinInput} (${res.city}) in ${res.days} days!`);
    } else {
      showToast(`Please enter a valid 6-digit Indian PIN code`, 'warning');
    }
  };

  const navItems = [
    { id: 'shop', label: 'Mustard Oils' },
    { id: 'process', label: 'Kolhu Extraction' },
    { id: 'bulk', label: 'Bulk Orders' },
    { id: 'tracking', label: 'Track Order' },
    { id: 'reviews', label: 'Reviews' }
  ] as const;

  return (
    <>
      {/* Top micro-announcement banner */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-semibold">100% Traditional Kachi Ghani</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-300">Cold-Pressed Below 40°C</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400 hidden sm:inline">Lab Tested Zero Adulteration</span>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <button
              onClick={() => setShowPinModal(true)}
              className="hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Check Delivery Pincode</span>
            </button>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-stone-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3 h-3 text-stone-400" />
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly obeying Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => {
              setActiveSection('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left group cursor-pointer shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-white shadow-sm group-hover:bg-amber-700 transition-colors">
                <span className="font-bold text-lg font-display">A</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-display block leading-none">
                  Arsh Agro Industry
                </span>
                <span className="text-[11px] font-medium text-amber-700 tracking-wider uppercase block mt-1">
                  Pure Kachi Ghani Mustard Oil
                </span>
              </div>
            </div>
          </button>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`whitespace-nowrap shrink-0 transition-colors hover:text-stone-900 cursor-pointer py-1 relative ${
                  activeSection === item.id ? 'text-amber-800 font-semibold' : ''
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + search trigger + Auth */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input inline or expandable */}
            <div className="relative hidden sm:block w-36 md:w-52">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search oils..."
                className="w-full bg-stone-100 hover:bg-stone-50 focus:bg-white text-stone-900 text-xs rounded-lg pl-9 pr-7 py-2 border border-stone-200 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile search trigger */}
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              aria-label="Toggle search"
              className="sm:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Firebase Auth Google Sign In / User Profile */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsUserOrdersOpen(true)}
                  className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-semibold text-stone-800 transition-colors cursor-pointer"
                  title="View your orders"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px] font-bold">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hidden md:inline max-w-[100px] truncate">
                    {user.displayName?.split(' ')[0] || 'Account'}
                  </span>
                  {isAdmin && (
                    <span className="bg-amber-600 text-white text-[9px] font-mono px-1 py-0.2 rounded font-bold uppercase">
                      Admin
                    </span>
                  )}
                </button>

                <button
                  onClick={signOutUser}
                  className="text-stone-400 hover:text-stone-700 text-[11px] font-medium hidden sm:inline-block cursor-pointer px-1"
                  title="Sign out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-1.5 bg-white hover:bg-stone-50 text-stone-800 px-3 py-2 rounded-lg text-xs font-semibold border border-stone-300 shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Primary Action: Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-3.5 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-amber-900/60 text-amber-100 text-xs font-mono font-medium px-2 py-0.5 rounded-md min-w-[20px] text-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expandable */}
        {isSearchActive && (
          <div className="sm:hidden px-4 pb-3 pt-1 border-t border-stone-100 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 1L bottle, 5L jar, yellow mustard..."
                autoFocus
                className="w-full bg-stone-100 text-stone-900 text-sm rounded-lg pl-9 pr-8 py-2.5 border border-stone-200 focus:outline-none focus:border-amber-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-stone-100 bg-stone-50/80 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-xs px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 transition-colors ${
                activeSection === item.id
                  ? 'bg-amber-700 text-white font-medium'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Pincode & Shiprocket Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-stone-900">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-lg font-display">Shiprocket Delivery Check</h3>
              </div>
              <button
                onClick={() => setShowPinModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-4">
              Enter your 6-digit delivery pincode to check instant courier serviceability, COD availability, and estimated transit days.
            </p>

            <form onSubmit={handlePinCheck} className="flex gap-2 mb-4">
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 110001, 700001, 302001"
                className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 font-mono"
              />
              <button
                type="submit"
                className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                Check
              </button>
            </form>

            {pinResult && (
              <div className={`p-4 rounded-lg text-xs border ${pinResult.serviceable ? 'bg-amber-50/60 border-amber-200 text-stone-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                {pinResult.serviceable ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-sm">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Serviceable by Shiprocket Express</span>
                    </div>
                    <p className="text-stone-700">
                      Destination: <strong className="text-stone-900">{pinResult.city}, {pinResult.state}</strong>
                    </p>
                    <p className="text-stone-700">
                      Estimated Delivery: <strong className="text-stone-900">{pinResult.days} - {pinResult.days + 1} Business Days</strong>
                    </p>
                    <p className="text-stone-700">
                      Available Couriers: <span className="text-stone-900 font-medium">{pinResult.partners.join(' · ')}</span>
                    </p>
                    <p className="text-emerald-700 font-medium pt-1">
                      ✓ Cash on Delivery (COD) & Razorpay Online Payments Supported
                    </p>
                  </div>
                ) : (
                  <p>Invalid pincode. Please enter a 6-digit postal code.</p>
                )}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Powered by Shiprocket Multi-Courier API</span>
              <button
                type="button"
                onClick={() => setShowPinModal(false)}
                className="text-amber-700 hover:underline font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
