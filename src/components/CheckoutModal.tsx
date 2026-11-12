import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Banknote, Truck, CheckCircle2, MessageCircle, ArrowRight, Printer } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    settings,
    createOrder,
    checkPinService,
    sendOrderToWhatsApp,
    user
  } = useStore();

  const [step, setStep] = useState<'form' | 'payment' | 'confirmed'>('form');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedCourier, setSelectedCourier] = useState('Delhivery Surface');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Pin check status
  const [pinServiceInfo, setPinServiceInfo] = useState<{
    serviceable: boolean;
    city: string;
    state: string;
    days: number;
    partners: string[];
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const isFreeShipping = cartTotal >= settings.freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 50;
  const totalAmount = cartTotal + shippingFee;

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setPincode(val);

    if (val.length === 6) {
      const res = checkPinService(val);
      setPinServiceInfo(res);
      if (res.serviceable && res.city !== 'Verified Delivery Zone') {
        setCity(res.city);
        setState(res.state);
        if (res.partners.length > 0) {
          setSelectedCourier(`${res.partners[0]} Express`);
        }
      }
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || pincode.length !== 6) {
      return;
    }
    setStep('payment');
  };

  const handleCompleteOrder = async () => {
    setIsProcessingPayment(true);

    const razorpayPaymentId =
      paymentMethod === 'razorpay'
        ? `pay_${Math.random().toString(36).substring(2, 12)}`
        : undefined;

    try {
      const newOrder = await createOrder(
        {
          userId: user?.uid || 'guest',
          customerName,
          phone,
          email: email || `${phone}@customer.arshagro.com`,
          address,
          city: city || 'Destination City',
          state: state || 'State',
          pincode,
          items: cart,
          subtotal: cartTotal,
          shippingFee,
          discount: 0,
          totalAmount,
          paymentMethod,
          paymentStatus: paymentMethod === 'razorpay' ? 'paid' : 'cod_pending',
          razorpayPaymentId
        } as any,
        selectedCourier
      );

      setCreatedOrder(newOrder);
      setStep('confirmed');
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 p-6 sm:p-8 relative">
        {/* Modal Close */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setStep('form');
          }}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Shipping Address & Details */}
        {step === 'form' && (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-semibold text-amber-700 tracking-wider uppercase">
                Step 1 of 2 · Delivery & Courier
              </span>
              <h2 className="text-2xl font-bold text-stone-900 font-display">
                Checkout Details
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Provide your delivery address for automated Shiprocket courier generation.
              </p>
            </div>

            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number (for WhatsApp Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@gmail.com"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Street Address & House / Flat No. *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Apartment number, Landmark, Street"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={handlePincodeChange}
                    placeholder="6-digit PIN"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Shiprocket partner selection */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center justify-between">
                  <span>Shiprocket Courier Partner</span>
                  <span className="text-[11px] text-emerald-700 font-normal">
                    {isFreeShipping ? '✓ Free Shipping Active' : '₹50 Flat Courier Charge'}
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 transition-colors ${selectedCourier.includes('Delhivery') ? 'border-amber-600 bg-amber-50/50' : 'border-stone-200 hover:bg-stone-50'}`}>
                    <input
                      type="radio"
                      name="courier"
                      checked={selectedCourier.includes('Delhivery')}
                      onChange={() => setSelectedCourier('Delhivery Surface Express')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <p className="font-semibold text-stone-900">Delhivery Express</p>
                      <p className="text-[11px] text-stone-500">Est: 2-3 Business Days</p>
                    </div>
                  </label>

                  <label className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 transition-colors ${selectedCourier.includes('Blue Dart') ? 'border-amber-600 bg-amber-50/50' : 'border-stone-200 hover:bg-stone-50'}`}>
                    <input
                      type="radio"
                      name="courier"
                      checked={selectedCourier.includes('Blue Dart')}
                      onChange={() => setSelectedCourier('Blue Dart Air Priority')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <p className="font-semibold text-stone-900">Blue Dart Priority</p>
                      <p className="text-[11px] text-stone-500">Est: 1-2 Business Days</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order total preview */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex justify-between items-center text-sm">
                <div>
                  <p className="text-stone-500 text-xs">Payable Amount ({cart.length} items):</p>
                  <p className="text-xl font-bold text-stone-900 font-mono-num">₹{totalAmount}</p>
                </div>

                <button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Select Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Payment Gateway Selection (Razorpay / COD) */}
        {step === 'payment' && (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-semibold text-amber-700 tracking-wider uppercase">
                Step 2 of 2 · Secure Payment Gateway
              </span>
              <h2 className="text-2xl font-bold text-stone-900 font-display">
                Choose Payment Option
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                All transactions protected by 256-bit SSL encryption.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {/* Option 1: Razorpay */}
              <div
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-amber-600 bg-amber-50/40 shadow-xs' : 'border-stone-200 hover:border-stone-300 bg-white'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-700" />
                      <span className="font-bold text-sm text-stone-900">
                        Razorpay Secure Checkout
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Instant & Zero Fee
                  </span>
                </div>
                <p className="text-xs text-stone-600 ml-6">
                  Pay securely using Google Pay, PhonePe, Paytm, UPI QR, Credit/Debit Cards (Visa, MasterCard, RuPay), or Net Banking.
                </p>
                <div className="ml-6 mt-3 flex items-center gap-3 text-[11px] text-stone-500">
                  <span className="font-mono">Razorpay Gateway ID: {settings.razorpayKeyId}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">PCI-DSS Compliant</span>
                </div>
              </div>

              {/* Option 2: Cash on Delivery (COD) */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-amber-600 bg-amber-50/40 shadow-xs' : 'border-stone-200 hover:border-stone-300 bg-white'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-stone-700" />
                      <span className="font-bold text-sm text-stone-900">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                    Pay at Doorstep
                  </span>
                </div>
                <p className="text-xs text-stone-600 ml-6">
                  Hand over cash or UPI to the delivery executive when the package arrives at your home.
                </p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs mb-6">
              <div className="flex justify-between text-stone-600">
                <span>Shipping to:</span>
                <span className="text-stone-900 font-medium">{customerName}, {city} ({pincode})</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Courier:</span>
                <span className="text-stone-900 font-medium">{selectedCourier}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cart.length} items):</span>
                <span className="font-mono-num font-semibold text-stone-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping:</span>
                <span className="font-mono-num font-semibold text-stone-900">
                  {isFreeShipping ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Payable:</span>
                <span className="font-mono-num text-lg text-amber-900">₹{totalAmount}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-2 cursor-pointer"
              >
                Back to Address
              </button>

              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={isProcessingPayment}
                className="bg-amber-700 hover:bg-amber-800 disabled:bg-stone-400 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                {isProcessingPayment ? (
                  <span>Securing & Authorizing...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'razorpay'
                        ? `Pay ₹${totalAmount} via Razorpay`
                        : `Confirm COD Order (₹${totalAmount})`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Confirmed Screen with WhatsApp & Shiprocket AWB */}
        {step === 'confirmed' && createdOrder && (
          <div className="text-center py-2 space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Order Successfully Placed!
              </span>
              <h2 className="text-2xl font-bold text-stone-900 font-display mt-0.5">
                Thank You, {createdOrder.customerName}!
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Your cold-pressed mustard oil is scheduled for dispatch from Arsh Agro Mill.
              </p>
            </div>

            {/* Logistics & Order Identifiers */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-mono font-bold text-stone-900 text-sm">{createdOrder.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Shiprocket AWB:</span>
                <span className="font-mono font-bold text-amber-700">{createdOrder.shiprocketAWB}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Courier Partner:</span>
                <span className="text-stone-900 font-medium">{createdOrder.courierPartner}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="text-emerald-700 font-semibold">{createdOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Payment Mode:</span>
                <span className="text-stone-900 font-semibold uppercase">
                  {createdOrder.paymentMethod} ({createdOrder.paymentStatus})
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-sm font-bold">
                <span className="text-stone-900">Amount:</span>
                <span className="font-mono-num text-amber-900">₹{createdOrder.totalAmount}</span>
              </div>
            </div>

            {/* Key Action 1: WhatsApp Notification Dispatch */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp Order Confirmation</span>
                </h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Send your automated receipt to our WhatsApp support team for expedited packing.
                </p>
              </div>

              <button
                type="button"
                onClick={() => sendOrderToWhatsApp(createdOrder)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep('form');
                }}
                className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
