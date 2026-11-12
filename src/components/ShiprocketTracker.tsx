import React, { useState } from 'react';
import { Search, Truck, CheckCircle2, Clock, MapPin, PackageCheck, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const ShiprocketTracker: React.FC = () => {
  const { orders, trackingQuery, setTrackingQuery } = useStore();
  const [searchInput, setSearchInput] = useState(trackingQuery || '');
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(() => {
    if (trackingQuery) {
      return orders.find(
        (o) =>
          o.id.toLowerCase() === trackingQuery.toLowerCase() ||
          o.shiprocketAWB.toLowerCase() === trackingQuery.toLowerCase()
      ) || null;
    }
    return orders[0] || null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    const match = orders.find(
      (o) =>
        o.id.toLowerCase() === query ||
        o.shiprocketAWB.toLowerCase() === query ||
        o.phone.includes(query)
    );

    setMatchedOrder(match || null);
  };

  const getStepProgress = (status: Order['orderStatus']) => {
    switch (status) {
      case 'confirmed':
        return 1;
      case 'manifested':
        return 2;
      case 'picked_up':
        return 3;
      case 'in_transit':
        return 4;
      case 'out_for_delivery':
        return 5;
      case 'delivered':
        return 6;
      default:
        return 1;
    }
  };

  return (
    <section id="tracking" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-amber-700 tracking-wider uppercase">
            Live Logistics Integration
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display mt-1">
            Shiprocket Real-Time Order Tracking
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Track your cold-pressed mustard oil dispatch across India. Enter your Order ID (e.g. AAG-92841) or Shiprocket AWB number.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6 flex max-w-lg mx-auto gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. AAG-92841) or AWB..."
                className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-amber-600 font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer shrink-0"
            >
              Track Order
            </button>
          </form>

          {/* Quick Click Samples */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-stone-500">
            <span>Try sample order:</span>
            {orders.slice(0, 2).map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setSearchInput(o.id);
                  setMatchedOrder(o);
                }}
                className="font-mono text-amber-800 hover:underline bg-stone-100 px-2 py-0.5 rounded cursor-pointer"
              >
                {o.id} ({o.orderStatus.replace('_', ' ')})
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Result View */}
        {matchedOrder ? (
          <div className="max-w-3xl mx-auto bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            {/* Header info strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold text-stone-900">
                    Order #{matchedOrder.id}
                  </span>
                  <span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded">
                    {matchedOrder.orderStatus.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Placed on {matchedOrder.date} · {matchedOrder.customerName} ({matchedOrder.city}, {matchedOrder.pincode})
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-stone-500">Shiprocket AWB Number:</p>
                <p className="font-mono font-bold text-amber-800 text-sm">{matchedOrder.shiprocketAWB}</p>
                <p className="text-[11px] text-stone-600 mt-0.5">Carrier: {matchedOrder.courierPartner}</p>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="py-8">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {/* Step 1: Placed */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    getStepProgress(matchedOrder.orderStatus) >= 1 ? 'bg-amber-600 text-white font-bold' : 'bg-stone-200 text-stone-500'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-stone-900">Order Confirmed</span>
                  <span className="text-[10px] text-stone-500">Verified</span>
                </div>

                {/* Step 2: Picked Up */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    getStepProgress(matchedOrder.orderStatus) >= 3 ? 'bg-amber-600 text-white font-bold' : 'bg-stone-200 text-stone-500'
                  }`}>
                    <PackageCheck className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-stone-900">Picked Up</span>
                  <span className="text-[10px] text-stone-500">From Oil Mill</span>
                </div>

                {/* Step 3: In Transit */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    getStepProgress(matchedOrder.orderStatus) >= 4 ? 'bg-amber-600 text-white font-bold' : 'bg-stone-200 text-stone-500'
                  }`}>
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-stone-900">In Transit</span>
                  <span className="text-[10px] text-stone-500">Regional Hub</span>
                </div>

                {/* Step 4: Delivered */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    getStepProgress(matchedOrder.orderStatus) >= 6 ? 'bg-emerald-600 text-white font-bold' : 'bg-stone-200 text-stone-500'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-stone-900">Delivered</span>
                  <span className="text-[10px] text-stone-500">Doorstep</span>
                </div>
              </div>
            </div>

            {/* Estimated Delivery Highlight */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-center justify-between mb-6 text-xs">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <p className="font-semibold text-stone-900">Estimated Delivery Date:</p>
                  <p className="text-amber-900 font-bold text-sm">{matchedOrder.estimatedDelivery}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-stone-500">Total Order Value:</span>
                <p className="font-bold font-mono-num text-sm text-stone-900">₹{matchedOrder.totalAmount}</p>
              </div>
            </div>

            {/* Timeline Events */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4">
                Milestone Activity Log
              </h4>

              <div className="space-y-4">
                {matchedOrder.trackingEvents.map((evt, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <strong className="text-stone-900">{evt.status}</strong>
                        <span className="text-[11px] text-stone-400 font-mono">{evt.timestamp}</span>
                      </div>
                      <p className="text-stone-600 mt-0.5">{evt.description}</p>
                      <p className="text-[11px] text-stone-400 mt-0.5 font-medium">{evt.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-stone-50 rounded-xl border border-stone-200 max-w-md mx-auto p-6">
            <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800">No order found</p>
            <p className="text-xs text-stone-500 mt-1">
              Please check the Order ID or AWB and try again.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
