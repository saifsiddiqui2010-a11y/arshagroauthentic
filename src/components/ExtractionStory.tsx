import React from 'react';
import { ShieldCheck, Sparkles, ThermometerSnowflake, Droplets } from 'lucide-react';

export const ExtractionStory: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Hand-Selected Rajasthan Mustard Seeds',
      desc: 'Sourced directly from certified farmer cooperatives in Alwar & Bharatpur. Only mature, bold black and golden seeds with over 38% natural oil yield are accepted.'
    },
    {
      num: '02',
      title: 'Traditional Wooden Kolhu Crushing',
      desc: 'Extracted in slow-rotating Vaagai wood mortar & pestle under 14 RPM. Friction temperatures are strictly kept below 40°C to preserve natural volatile allyl isothiocyanate.'
    },
    {
      num: '03',
      title: 'Zero Chemical Solvents & Settling',
      desc: 'Commercial refined oils use hexane solvents and 200°C steam bleaching. We use ancient cotton cloth micro-filtering and natural sun-settling to keep natural antioxidants alive.'
    },
    {
      num: '04',
      title: 'Sealed Food-Grade Bottling',
      desc: 'Bottled immediately in UV-safe dark glass, leakproof canisters, and commercial tinplate containers to prevent oxidation and seal in authentic freshness.'
    }
  ];

  return (
    <section id="process" className="py-16 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Traditional Kolhu Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-xl bg-stone-900 aspect-[4/3] group">
              <img
                src="/src/assets/images/traditional_kolhu_1794482169895.jpg"
                alt="Traditional Wooden Cold Press Kolhu extraction at Arsh Agro Industry"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <ThermometerSnowflake className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Cold Pressed Below 40°C
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display">Vaagai Wood Kolhu (Lakdi Ghani)</h3>
                <p className="text-xs text-stone-300 mt-1">
                  Gentle crushing ensures live enzymes and natural mustard jhaanjh are preserved without acrid burns.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step Craftsmanship Process */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold text-amber-800 tracking-wider uppercase">
                The Heritage Difference
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display mt-1">
                Why Traditional Kachi Ghani Mustard Oil Outperforms Refined Oils
              </h2>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Most modern supermarket cooking oils are extracted with chemical solvents and bleached at blistering heat, removing the natural nutrition and flavor. Arsh Agro Industry revives timeless cold extraction for genuine culinary and medicinal purity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-amber-700">
                      STEP {step.num}
                    </span>
                    <Droplets className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-normal">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Test Callout */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-stone-700">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Arsh Agro Purity Test at Home:</strong> Keep 50ml of our mustard oil in the deep freezer for 2 hours. Pure mustard oil will remain completely liquid with an amber glow, while oils adulterated with cheap palm oil or argemone will freeze cloudy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
