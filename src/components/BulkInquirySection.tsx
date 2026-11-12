import React, { useState } from 'react';
import { Building2, MessageCircle, Calculator, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BulkInquirySection: React.FC = () => {
  const { submitBulkInquiry, settings } = useStore();

  // Calculator State
  const [calcVolume, setCalcVolume] = useState<number>(500); // In Liters
  const [packagingType, setPackagingType] = useState<'15L Tin' | '200L Drum' | 'Tanker'>('15L Tin');

  // RFQ Form State
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Dynamic wholesale price calculation
  const getWholesaleRate = (volume: number) => {
    if (volume >= 2000) return { ratePerLiter: 152, discountPct: 22 };
    if (volume >= 1000) return { ratePerLiter: 158, discountPct: 19 };
    if (volume >= 300) return { ratePerLiter: 165, discountPct: 15 };
    return { ratePerLiter: 172, discountPct: 12 };
  };

  const { ratePerLiter, discountPct } = getWholesaleRate(calcVolume);
  const estimatedTotal = calcVolume * ratePerLiter;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !phone || !city) return;

    submitBulkInquiry({
      companyName,
      contactPerson,
      phone,
      email: email || `${phone}@wholesale.arshagro.com`,
      city,
      state: state || 'India',
      requiredVolume: `${calcVolume} Liters / Month`,
      packagingPreference: packagingType,
      notes
    });

    setSubmitted(true);
  };

  const handleWhatsAppInquiry = () => {
    const message = `*ARSH AGRO INDUSTRY - B2B WHOLESALE INQUIRY*%0A` +
      `━━━━━━━━━━━━━━━━━━━━━%0A` +
      `*Company Name:* ${companyName || 'Wholesale Buyer'}%0A` +
      `*Contact Person:* ${contactPerson || 'Purchaser'}%0A` +
      `*Phone:* ${phone || 'N/A'}%0A` +
      `*City/State:* ${city || 'India'}%0A` +
      `*Target Volume:* ${calcVolume} Liters%0A` +
      `*Preferred Packaging:* ${packagingType}%0A` +
      `*Estimated Target Rate:* ₹${ratePerLiter}/Liter (Est: ₹${estimatedTotal})%0A` +
      `━━━━━━━━━━━━━━━━━━━━━%0A` +
      `Please share GST wholesale proforma invoice, lab report, and delivery freight timeline via Shiprocket Heavy B2B.`;

    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <section id="bulk" className="py-16 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-amber-800 tracking-wider uppercase">
            B2B Commercial Procurement
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display mt-1">
            Bulk Orders & Wholesale Inquiries
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Direct mill supply for food manufacturers, sweet marts (Halwais), hotel chains, namkeen industries, and retail distributors across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Bulk Price Estimator */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-stone-900 font-bold mb-4">
                <Calculator className="w-5 h-5 text-amber-700" />
                <h3 className="font-display text-lg">Instant Wholesale Estimator</h3>
              </div>

              <p className="text-xs text-stone-600 mb-6">
                Calculate live tiered factory rates based on your estimated monthly volume.
              </p>

              {/* Slider for Volume */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-semibold text-stone-700">
                    Required Volume (Liters):
                  </label>
                  <span className="text-xl font-bold font-mono-num text-amber-800">
                    {calcVolume.toLocaleString()} L
                  </span>
                </div>

                <input
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={calcVolume}
                  onChange={(e) => setCalcVolume(Number(e.target.value))}
                  className="w-full accent-amber-700 cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>50L (Sample)</span>
                  <span>500L</span>
                  <span>2,000L</span>
                  <span>5,000L+</span>
                </div>
              </div>

              {/* Packaging Preference Buttons */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Packaging Specification:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['15L Tin', '200L Drum', 'Tanker'] as const).map((pkg) => (
                    <button
                      key={pkg}
                      type="button"
                      onClick={() => setPackagingType(pkg)}
                      className={`text-xs py-2 px-2.5 rounded-lg border font-medium transition-colors cursor-pointer text-center ${
                        packagingType === pkg
                          ? 'border-amber-700 bg-amber-50 text-amber-900 font-semibold'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rate Breakdown Card */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Standard Retail Price:</span>
                  <span className="line-through font-mono-num">₹195 / Liter</span>
                </div>
                <div className="flex justify-between text-stone-700 font-medium">
                  <span>Wholesale Factory Rate:</span>
                  <span className="font-bold text-amber-900 font-mono-num text-sm">
                    ₹{ratePerLiter} / Liter
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Tier Volume Savings:</span>
                  <span>{discountPct}% OFF Factory Price</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="font-bold text-stone-900 text-sm">Estimated Total:</span>
                  <span className="text-xl font-bold font-mono-num text-stone-900">
                    ₹{estimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* B2B Assurance strip */}
            <div className="pt-6 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-1.5 text-stone-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>GST Tax Invoices with Full Input Credit (ITC)</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Doorstep dispatch handled via Shiprocket Cargo & dedicated fleet logistics with e-Way bill compliance.
              </p>
            </div>
          </div>

          {/* Right Column: RFQ Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-display">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Our B2B Corporate Desk has received your quotation request for <strong>{calcVolume}L</strong> in <strong>{packagingType}</strong>. An official proforma quotation will be shared on WhatsApp and email shortly.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ping WhatsApp B2B Desk</span>
                  </button>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-stone-600 hover:text-stone-900 text-xs font-medium px-4 py-2 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-amber-700" />
                      <span>Request Commercial B2B Quotation</span>
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Fill in your business details or submit directly to our WhatsApp wholesale team.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Company / Enterprise Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Agarwal Sweets & Caterers"
                        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="e.g. Sunil Agarwal"
                        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        WhatsApp Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Business Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="procurement@company.com"
                        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        City / Industrial Area *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Surat, Jaipur, Lucknow"
                        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g. Gujarat, Rajasthan"
                        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Specific Requirements or Sample Requests
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Need 1L sample bottle first, monthly regular supply of 500L, delivery required at warehouse dock."
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 px-6 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Submit RFQ Quote Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppInquiry}
                      className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 px-5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Instant WhatsApp RFQ</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
