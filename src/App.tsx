/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ExtractionStory } from './components/ExtractionStory';
import { BulkInquirySection } from './components/BulkInquirySection';
import { ShiprocketTracker } from './components/ShiprocketTracker';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminDashboard } from './components/AdminDashboard';
import { UserOrdersModal } from './components/UserOrdersModal';
import { ToastContainer } from './components/ToastContainer';

const MainLayout: React.FC = () => {
  const { settings } = useStore();

  const handleFloatingWhatsApp = () => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=Hello%20Arsh%20Agro%20Industry,%20I%20would%20like%20to%20inquire%20about%20pure%20mustard%20oil%20orders.`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
        <ExtractionStory />
        <BulkInquirySection />
        <ShiprocketTracker />
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AdminDashboard />
      <UserOrdersModal />
      <ToastContainer />

      {/* Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={handleFloatingWhatsApp}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          title="Chat with Arsh Agro on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="text-xs font-semibold hidden sm:inline-block">Order on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
