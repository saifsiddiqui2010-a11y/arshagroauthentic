import React from 'react';
import { ArrowRight, ShieldCheck, Flame, Truck, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setActiveSection } = useStore();

  return (
    <div className="relative bg-stone-100 overflow-hidden border-b border-stone-200">
      {/* Background subtle textured ambient lighting */}
      <div className="absolute inset-0 bg-radial from-amber-100/40 via-transparent to-stone-200/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Story & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-md">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Arsh Agro Industry · Rajasthan Cold-Pressed Heritage</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-display leading-[1.15] text-balance">
              Pure Kachi Ghani Mustard Oil. Straight From The Kolhu.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Slow-crushed below 40°C using traditional wooden expellers to lock in authentic pungency (natural jhaanjh), golden amber clarity, and potent Omega-3 fatty acids. Zero chemical solvents, zero palm oil blending.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection('shop');
                }}
                className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer text-sm"
              >
                <span>Shop Pure Oils</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('bulk');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection('bulk');
                }}
                className="bg-white hover:bg-stone-50 text-stone-800 font-semibold px-5 py-3.5 rounded-lg border border-stone-300 transition-colors text-sm cursor-pointer"
              >
                Bulk & Wholesale B2B
              </button>
            </div>

            {/* Quick Proof Metrics adjacent to claim */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-stone-900 font-mono-num">100%</p>
                <p className="text-xs text-stone-500 font-medium">Unrefined Cold-Pressed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-amber-700 font-mono-num">250°C</p>
                <p className="text-xs text-stone-500 font-medium">Deep-Fry Smoke Point</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-stone-900 font-mono-num">12,500+</p>
                <p className="text-xs text-stone-500 font-medium">Families Trust Arsh Agro</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Hero Visual Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-300/80 bg-stone-200 aspect-[4/3] lg:aspect-square group">
              <img
                src="/src/assets/images/hero_mustard_oil_1794482168629.jpg"
                alt="Pure Golden Kachi Ghani Mustard Oil extraction by Arsh Agro Industry"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Scrim overlay for natural contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber-500 text-stone-950 font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                    First Cold Press
                  </span>
                  <span className="text-xs text-stone-200">Alwar Seeds Selection</span>
                </div>
                <h3 className="text-lg font-bold font-display">Wood-Pressed Authentic Mustard Oil</h3>
                <p className="text-xs text-stone-300 mt-0.5">
                  High natural pungency tested with 0.32% Allyl Isothiocyanate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Credibility Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Natural Jhaanjh</h4>
              <p className="text-xs text-stone-500 leading-normal">
                Authentic tear-in-the-eye aroma from pure black mustard seeds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-800">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Lab Purity Tested</h4>
              <p className="text-xs text-stone-500 leading-normal">
                FSSAI & Agmark Grade-1. Zero mineral oil, zero argemone.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-blue-800">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Shiprocket Express</h4>
              <p className="text-xs text-stone-500 leading-normal">
                Automated multi-courier dispatch with live AWB milestone tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-200 flex items-center justify-center shrink-0 text-stone-800">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Razorpay & COD</h4>
              <p className="text-xs text-stone-500 leading-normal">
                Pay online via UPI/Cards or pay cash upon doorstep arrival.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
