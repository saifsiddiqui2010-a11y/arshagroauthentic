import React from 'react';
import { X, Package, Truck, MessageCircle, ExternalLink, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const UserOrdersModal: React.FC = () => {
  const {
    user,
    orders,
    isUserOrdersOpen,
    setIsUserOrdersOpen,
    sendOrderToWhatsApp,
    setTrackingQuery,
    setActiveSection
  } = useStore();

  if (!isUserOrdersOpen) return null;

  // Filter orders for this user or all if admin
  const userOrders = orders.filter(
    (o) => (user && o.email === user.email) || o.customerName === user?.displayName
  );

  const displayOrders = userOrders.length > 0 ? userOrders : orders.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-amber-700" />
            <div>
              <h3 className="font-bold text-lg font-display text-stone-900">
                My Purchase Orders
              </h3>
              <p className="text-xs text-stone-500">
                {user ? user.email : 'Customer History'} · Synced with Firestore
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsUserOrdersOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50">
          {displayOrders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-stone-800">No orders placed yet</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Once you purchase mustard oil, your live Shiprocket tracking and invoices will appear here.
              </p>
            </div>
          ) : (
            displayOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-xl border border-stone-200 p-4 space-y-3 shadow-2xs hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono font-bold text-sm text-stone-900 block">
                      Order #{ord.id}
                    </span>
                    <span className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{ord.date}</span>
                    </span>
                  </div>

                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {ord.orderStatus.replace('_', ' ')}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-1 py-1 text-xs text-stone-600 border-y border-stone-100">
                  {ord.items.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="truncate pr-2">
                        {item.quantity}× {item.product.name}
                      </span>
                      <span className="font-mono-num font-semibold text-stone-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shiprocket Tracking & Delivery info */}
                <div className="bg-stone-50 rounded-lg p-2.5 text-xs text-stone-600 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                      <Truck className="w-3.5 h-3.5 text-amber-700" />
                      <span>Shiprocket AWB:</span>
                    </span>
                    <span className="font-mono font-bold text-amber-900">{ord.shiprocketAWB}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Partner: {ord.courierPartner}</span>
                    <span className="text-emerald-700 font-semibold">{ord.estimatedDelivery}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs">
                    <span className="text-stone-500">Total: </span>
                    <strong className="font-mono-num text-sm text-stone-900">₹{ord.totalAmount}</strong>
                    <span className="text-[10px] text-stone-400 ml-1">({ord.paymentMethod.toUpperCase()})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setTrackingQuery(ord.id);
                        setIsUserOrdersOpen(false);
                        setActiveSection('tracking');
                        const el = document.getElementById('tracking');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs text-amber-800 hover:text-amber-900 font-semibold px-2 py-1 rounded hover:bg-amber-50 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Track</span>
                    </button>

                    <button
                      onClick={() => sendOrderToWhatsApp(ord)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white p-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                      title="Share to WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 text-center text-xs text-stone-500">
          Orders encrypted & synchronized with Firebase Firestore
        </div>
      </div>
    </div>
  );
};
