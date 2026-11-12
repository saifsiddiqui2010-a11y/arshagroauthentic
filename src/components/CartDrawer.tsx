import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    settings,
    setIsCheckoutOpen,
    setActiveSection
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const amountNeeded = freeShippingThreshold - cartTotal;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h3 className="font-bold text-lg font-display text-stone-900">Your Shopping Bag</h3>
            <span className="text-xs font-mono-num font-semibold text-stone-500">
              ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-amber-50/70 p-3.5 border-b border-amber-200/80 text-xs text-stone-700">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              {isFreeShipping ? (
                <strong className="text-emerald-700">Free Shiprocket Delivery Unlocked!</strong>
              ) : (
                <span>Add <strong className="text-stone-900 font-mono-num">₹{amountNeeded}</strong> more for Free Delivery</span>
              )}
            </span>
            <span className="font-mono-num text-[11px] text-stone-500 font-semibold">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isFreeShipping ? 'bg-emerald-600' : 'bg-amber-600'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">Your cart is empty</p>
                <p className="text-xs text-stone-500 mt-1">
                  Explore our authentic cold-pressed Kachi Ghani mustard oils
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveSection('shop');
                }}
                className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 pb-4 border-b border-stone-100 last:border-none"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">{item.product.volume}</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-stone-900 font-mono-num min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 disabled:opacity-40 text-xs font-bold transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-stone-900 font-mono-num">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Totals & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono-num font-semibold text-stone-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shiprocket Delivery</span>
                <span className="font-mono-num font-semibold text-stone-900">
                  {isFreeShipping ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    '₹50 (Standard)'
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Estimated Total</span>
                <span className="font-mono-num text-lg text-amber-900">
                  ₹{cartTotal + (isFreeShipping ? 0 : 50)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-3 text-[11px] text-stone-500 pt-1">
              <span>🔒 256-Bit Encrypted</span>
              <span aria-hidden="true">·</span>
              <span>Razorpay UPI/Cards & COD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
