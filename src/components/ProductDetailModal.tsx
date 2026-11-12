import React, { useState } from 'react';
import { X, Check, Star, ShieldCheck, MapPin, ShoppingBag, MessageCircle, Truck, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    setIsCartOpen,
    quickBuyWhatsApp,
    checkPinService,
    showToast
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pinResult, setPinResult] = useState<{
    serviceable: boolean;
    city: string;
    state: string;
    days: number;
    partners: string[];
  } | null>(null);

  if (!selectedProduct) return null;

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim()) return;
    const res = checkPinService(pincode);
    setPinResult(res);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 relative">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 p-2 rounded-full shadow-xs border border-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Product Visual & Authenticity Seals */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-xl overflow-hidden bg-stone-100 border border-stone-200 aspect-[4/3] relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 bg-stone-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Quality & Lab Purity Guarantees */}
            <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Arsh Agro Quality Purity Guarantee</span>
              </div>
              <ul className="space-y-1.5 text-stone-700">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Argemone Test:</strong> Passes standard nitric acid purity test without orange discoloration.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Refrigeration Stability:</strong> Does not freeze or deposit palm stearin wax at 5°C.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cold Extracted:</strong> Max temperature recorded below 38°C in slow wooden expeller.</span>
                </li>
              </ul>
            </div>

            {/* Certifications row */}
            <div className="flex flex-wrap gap-1.5">
              {selectedProduct.certifications.map((cert, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md border border-stone-200"
                >
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Specifications, Price, Delivery & Actions */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span className="uppercase tracking-wider font-semibold text-amber-700">
                  {selectedProduct.category.replace('_', ' ')}
                </span>
                <span aria-hidden="true">·</span>
                <span>SKU: {selectedProduct.sku}</span>
              </div>

              <h2 className="text-2xl font-bold text-stone-900 font-display">
                {selectedProduct.name}
              </h2>

              {selectedProduct.hindiName && (
                <p className="text-sm font-medium text-stone-600 mt-0.5">
                  {selectedProduct.hindiName}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs text-stone-600">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="font-semibold text-stone-900 font-mono-num">{selectedProduct.rating}</span>
                <span>({selectedProduct.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Pricing block */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500">Net Quantity: {selectedProduct.volume}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-stone-900 font-mono-num">
                    ₹{selectedProduct.price}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-sm text-stone-400 line-through font-mono-num">
                      ₹{selectedProduct.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Save ₹{selectedProduct.originalPrice - selectedProduct.price}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${selectedProduct.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock})` : 'Out of Stock'}
                </span>
                <p className="text-[11px] text-stone-500 mt-1">Inclusive of all taxes</p>
              </div>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Process description */}
            <div className="text-xs text-stone-600 bg-white p-3.5 rounded-lg border border-stone-200 space-y-1">
              <p className="font-semibold text-stone-900">Extraction Method:</p>
              <p>{selectedProduct.process}</p>
              <div className="flex items-center gap-4 text-stone-500 pt-1">
                <span>Smoke Point: <strong>{selectedProduct.smokePoint}</strong></span>
                <span>Shelf Life: <strong>{selectedProduct.shelfLife}</strong></span>
              </div>
            </div>

            {/* Nutrition quick highlights */}
            <div>
              <p className="text-xs font-semibold text-stone-900 mb-2">Nutritional Values (per 100g):</p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-stone-100 p-2 rounded-lg">
                  <p className="text-stone-500 text-[10px]">Energy</p>
                  <p className="font-bold font-mono-num text-stone-800">{selectedProduct.nutrition.energy}</p>
                </div>
                <div className="bg-stone-100 p-2 rounded-lg">
                  <p className="text-stone-500 text-[10px]">MUFA</p>
                  <p className="font-bold font-mono-num text-stone-800">{selectedProduct.nutrition.mufa}</p>
                </div>
                <div className="bg-stone-100 p-2 rounded-lg">
                  <p className="text-stone-500 text-[10px]">Omega-3</p>
                  <p className="font-bold font-mono-num text-stone-800">{selectedProduct.nutrition.omega3}</p>
                </div>
                <div className="bg-stone-100 p-2 rounded-lg">
                  <p className="text-stone-500 text-[10px]">Cholesterol</p>
                  <p className="font-bold font-mono-num text-stone-800">{selectedProduct.nutrition.cholesterol}</p>
                </div>
              </div>
            </div>

            {/* Shiprocket Delivery Check */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>Shiprocket Delivery Estimate</span>
              </div>

              <form onSubmit={handlePinCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-mono w-44 focus:outline-none focus:border-amber-600"
                />
                <button
                  type="submit"
                  className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Check ETA
                </button>
              </form>

              {pinResult && (
                <div className="text-xs pt-1">
                  {pinResult.serviceable ? (
                    <p className="text-emerald-700 font-medium">
                      ✓ Delivery available in {pinResult.days}-{pinResult.days + 1} days to {pinResult.city} via {pinResult.partners[0] || 'Shiprocket Courier'}. Free shipping on orders above ₹999.
                    </p>
                  ) : (
                    <p className="text-red-600">Please enter a valid 6-digit Indian PIN code.</p>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Stepper & Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shrink-0 self-start">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold text-stone-900 font-mono-num min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(selectedProduct.stock, q + 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => {
                  addToCart(selectedProduct, quantity);
                  setSelectedProduct(null);
                }}
                disabled={selectedProduct.stock <= 0}
                className="flex-1 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-white font-semibold py-2.5 px-4 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (₹{selectedProduct.price * quantity})</span>
              </button>

              {/* Quick WhatsApp order */}
              <button
                onClick={() => {
                  quickBuyWhatsApp(selectedProduct, quantity);
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 px-4 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
