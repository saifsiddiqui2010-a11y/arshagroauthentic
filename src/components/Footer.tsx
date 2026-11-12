import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, MessageCircle, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveSection, setIsAdminOpen, settings } = useStore();

  const handleWhatsAppHelp = () => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=Hello%20Arsh%20Agro%20Industry,%20I%20have%20an%20inquiry%20regarding%20mustard%20oil%20orders.`;
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 text-xs border-t border-stone-800">
      {/* Upper informative trust row */}
      <div className="border-b border-stone-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">FSSAI & Agmark Grade-1</p>
              <p className="text-stone-400 text-xs mt-0.5">
                License No. 12721055000342 · Unadulterated food safety compliant.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Oil Mill & Processing Facility</p>
              <p className="text-stone-400 text-xs mt-0.5">
                RIICO Industrial Agro Area, Alwar, Rajasthan 301001, India.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Customer Care & B2B Desk</p>
              <p className="text-stone-400 text-xs mt-0.5">
                Support via WhatsApp (+91 98290 11452) · Mon-Sat 9AM-8PM.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand & Bio */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-amber-600 flex items-center justify-center font-bold text-white font-display">
              A
            </div>
            <span className="font-bold text-white text-base font-display">
              Arsh Agro Industry
            </span>
          </div>
          <p className="text-stone-400 leading-relaxed text-xs">
            Manufacturers and wholesale exporters of traditional cold-pressed Kachi Ghani mustard oil, yellow mustard oils, and cattle feed derivatives. Preserving India's authentic culinary heritage.
          </p>
          <div className="pt-2">
            <button
              onClick={handleWhatsAppHelp}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Help</span>
            </button>
          </div>
        </div>

        {/* Col 2: Products */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Product Catalog
          </h4>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button
                onClick={() => {
                  setActiveSection('shop');
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Kachi Ghani 1L Bottle
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection('shop');
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Kachi Ghani 5L Canister
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection('shop');
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Wood-Pressed Lakdi Ghani 2L
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection('shop');
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Yellow Mustard Oil 1L
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection('shop');
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                15L Commercial Tin (Halwai Grade)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Customer Services
          </h4>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button
                onClick={() => {
                  setActiveSection('tracking');
                  const el = document.getElementById('tracking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Track Shiprocket Shipment
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection('bulk');
                  const el = document.getElementById('bulk');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Bulk & Wholesale Quotations
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection('reviews');
                  const el = document.getElementById('reviews');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Customer Reviews
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection('process');
                  const el = document.getElementById('process');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Wooden Kolhu Extraction Story
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-stone-500 hover:text-stone-300 transition-colors text-[11px]"
              >
                Admin Management Portal
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Quality & Trust */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Payment & Logistics Partners
          </h4>
          <p className="text-stone-400 text-xs">
            Secured payments powered by <strong>Razorpay</strong> (UPI, Cards, Net Banking) and Doorstep <strong>Cash on Delivery (COD)</strong>.
          </p>
          <p className="text-stone-400 text-xs">
            Pan-India logistics synchronized via <strong>Shiprocket</strong> automated multi-courier network (Delhivery, Blue Dart, DTDC, Ekart).
          </p>
          <div className="pt-2 text-[11px] text-stone-500">
            <span>Domain: www.arshagroindustry.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800 py-6 text-center text-stone-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Arsh Agro Industry. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with purity for Indian kitchens</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
