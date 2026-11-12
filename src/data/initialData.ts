import { Product, Review, Order, BulkInquiry } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'aag-p01',
    name: '100% Pure Kachi Ghani Mustard Oil (1L Glass Bottle)',
    hindiName: 'शुद्ध कच्ची घानी सरसों का तेल',
    tagline: 'Traditional Cold-Pressed with Intense Natural Pungency (Jhaanjh)',
    category: 'kachi_ghani',
    volume: '1 Liter',
    price: 195,
    originalPrice: 240,
    stock: 248,
    sku: 'AAG-KG-1000',
    image: '/src/assets/images/oil_bottle_1l_1794482168892.jpg',
    badge: 'Bestseller',
    pungencyLevel: 5,
    description: 'Extracted slowly from the finest hand-selected Rajasthan black mustard seeds using traditional wooden press technique. Retains natural allyl isothiocyanate (jhaanjh), rich aroma, natural antioxidants, and essential Omega-3 fatty acids with zero heat degradation.',
    process: 'Cold-Pressed below 40°C in wooden Kolhu, single press virgin oil, naturally micro-filtered without chemical solvents.',
    smokePoint: '250°C (Ideal for Indian deep frying & tadka)',
    shelfLife: '12 Months from packaging date',
    nutrition: {
      energy: '884 kcal',
      fat: '100 g',
      mufa: '65 g',
      pufa: '25 g',
      saturatedFat: '10 g',
      cholesterol: '0 mg',
      omega3: '1.2 g'
    },
    features: [
      'Authentic High Pungency (Kachi Ghani Jhaanjh)',
      'Rich in Natural Antioxidants & Vitamin E',
      'Unrefined, Unbleached & Non-Deodorized',
      'Zero Argemone & Zero Palm Oil Adulteration'
    ],
    certifications: ['FSSAI Certified', 'Agmark Grade 1', '100% Vegan', 'Cold Pressed'],
    rating: 4.9,
    reviewsCount: 342
  },
  {
    id: 'aag-p02',
    name: 'Pure Kachi Ghani Mustard Oil Family Pack (5L Canister)',
    hindiName: 'कच्ची घानी सरसों तेल 5 लीटर कैन',
    tagline: 'Economical Family Pack for Daily Indian Cooking & Pickling',
    category: 'kachi_ghani',
    volume: '5 Liters',
    price: 940,
    originalPrice: 1150,
    stock: 135,
    sku: 'AAG-KG-5000',
    image: '/src/assets/images/oil_can_5l_1794482170082.jpg',
    badge: 'Popular Family Pack',
    pungencyLevel: 5,
    description: 'Our signature 5-liter food-grade sturdy canister ensures long-lasting kitchen freshness. Ideal for traditional Indian pickles (Achaar), authentic curries, fish fry, and winter body massage.',
    process: 'First-press Kachi Ghani extraction, preserved in virgin food-grade virgin HDPE canisters with tamper-evident leakproof seal.',
    smokePoint: '250°C (High smoke point for crispy puries and parathas)',
    shelfLife: '12 Months from packaging date',
    nutrition: {
      energy: '884 kcal',
      fat: '100 g',
      mufa: '65 g',
      pufa: '25 g',
      saturatedFat: '10 g',
      cholesterol: '0 mg',
      omega3: '1.2 g'
    },
    features: [
      'Ergonomic Handle & Precision Pour Spout',
      'Food Grade UV-Safe Container',
      'Natural Preservative for Homemade Achaar',
      'Heart-Friendly Ratio of MUFA to PUFA'
    ],
    certifications: ['FSSAI Certified', 'Agmark Grade 1', 'ISO 22000 Standard', 'Lab Tested'],
    rating: 4.8,
    reviewsCount: 189
  },
  {
    id: 'aag-p03',
    name: 'Heritage Wood-Pressed Mustard Oil (Lakdi Ghani / Kolhu 2L)',
    hindiName: 'लकड़ी घानी शुद्ध कच्ची सरसों तेल 2L',
    tagline: 'Slow-Crushed in Vaagai Wood Mortar for Ultimate Purity',
    category: 'kachi_ghani',
    volume: '2 Liters',
    price: 410,
    originalPrice: 490,
    stock: 84,
    sku: 'AAG-WG-2000',
    image: '/src/assets/images/traditional_kolhu_1794482169895.jpg',
    badge: 'Wood Pressed',
    pungencyLevel: 5,
    description: 'Extracted at ultra-low speeds (under 14 RPM) in solid wooden pestle and mortar. This age-old Ayurvedic technique prevents temperature rise, guaranteeing 100% live enzymes and authentic pungency.',
    process: 'Traditional Vaagai wood kolhu crushed, sun-settled, cotton cloth filtered.',
    smokePoint: '245°C',
    shelfLife: '12 Months',
    nutrition: {
      energy: '884 kcal',
      fat: '100 g',
      mufa: '66 g',
      pufa: '24 g',
      saturatedFat: '9.8 g',
      cholesterol: '0 mg',
      omega3: '1.4 g'
    },
    features: [
      'Strictly No Machine Heat During Crushing',
      'Intense Traditional Aroma & Amber Lustre',
      'Excellent for Muscle Massage & Newborn Care',
      'Zero Chemical Additives or Synthetic Foaming Agents'
    ],
    certifications: ['FSSAI Certified', 'Wood Cold Pressed', 'Ayurvedic Grade', '100% Pure'],
    rating: 4.95,
    reviewsCount: 112
  },
  {
    id: 'aag-p04',
    name: 'Yellow Mustard Cold-Pressed Oil (Pili Sarson 1L)',
    hindiName: 'पीली सरसों का तेल (कोल्ड प्रेस्ड) 1L',
    tagline: 'Delicate Golden Color with Milder, Sweet-Nutty Flavor',
    category: 'yellow_mustard',
    volume: '1 Liter',
    price: 225,
    originalPrice: 275,
    stock: 96,
    sku: 'AAG-YM-1000',
    image: '/src/assets/images/hero_mustard_oil_1794482168629.jpg',
    badge: 'Mild & Sweet',
    pungencyLevel: 3,
    description: 'Crafted exclusively from select sweet yellow mustard seeds (Pili Sarson). Delivers a smoother, milder fragrance suitable for salad dressings, delicate gravies, baking, and sensitive palates who prefer gentle pungency.',
    process: 'Cold-pressed cold extraction from sun-dried ripe yellow seeds.',
    smokePoint: '240°C',
    shelfLife: '12 Months',
    nutrition: {
      energy: '884 kcal',
      fat: '100 g',
      mufa: '68 g',
      pufa: '22 g',
      saturatedFat: '9.5 g',
      cholesterol: '0 mg',
      omega3: '1.1 g'
    },
    features: [
      'Golden Clarity with Gentle Aroma',
      'Popular in Bengali & Kashmiri Cuisine',
      'Smooth Texture with Low Acridity',
      'High in Monounsaturated Fatty Acids'
    ],
    certifications: ['FSSAI Certified', 'Agmark Grade 1', 'Pure Yellow Mustard'],
    rating: 4.75,
    reviewsCount: 78
  },
  {
    id: 'aag-p05',
    name: 'Commercial Wholesale Mustard Oil Tin (15 Liters Commercial Tin)',
    hindiName: 'थोक सरसों तेल 15L टीन (होटल और हलवाई ग्रेड)',
    tagline: 'Heavy-Duty Sealed Tin for Caterers, Sweet Makers & Cloud Kitchens',
    category: 'bulk_commercial',
    volume: '15 Liters Tin',
    price: 2650,
    originalPrice: 3100,
    stock: 62,
    sku: 'AAG-BULK-15L',
    image: '/src/assets/images/oil_can_5l_1794482170082.jpg',
    badge: 'Wholesale / Horeca',
    pungencyLevel: 5,
    description: 'Built for industrial kitchens, sweet marts, namkeen manufacturers, and banquet caterers. Sealed in heavy tinplate steel with security seal to safeguard against oxygenation and damage during transit.',
    process: 'Continuous cold-extraction high-grade filtration, batch test certified for consistent color and smoke resistance.',
    smokePoint: '252°C',
    shelfLife: '12 Months',
    nutrition: {
      energy: '884 kcal',
      fat: '100 g',
      mufa: '65 g',
      pufa: '25 g',
      saturatedFat: '10 g',
      cholesterol: '0 mg',
      omega3: '1.2 g'
    },
    features: [
      'Heavy Tinplate Food Container with Carry Grip',
      'GST Tax Invoice Provided for Input Credit',
      'Economical Bulk Price per Liter (₹176/L)',
      'Shiprocket B2B Surface Heavy Logistics Supported'
    ],
    certifications: ['FSSAI Certified', 'Agmark Grade 1', 'GST Compliant', 'Commercial Tested'],
    rating: 4.88,
    reviewsCount: 64
  },
  {
    id: 'aag-p06',
    name: 'Selected Grade-A Whole Black Mustard Seeds (1 kg Pouch)',
    hindiName: 'साबुत काली राई / सरसों दाना 1kg',
    tagline: 'Hand-Cleaned, High-Oil Yield Seeds from Rajasthan Farms',
    category: 'agro_derivatives',
    volume: '1 kg Pouch',
    price: 140,
    originalPrice: 175,
    stock: 190,
    sku: 'AAG-SEED-1K',
    image: '/src/assets/images/traditional_kolhu_1794482169895.jpg',
    badge: 'Farm Direct',
    pungencyLevel: 5,
    description: 'Uniformly graded, stone-free whole mustard seeds directly harvested from our partner farmer cooperatives. Exceptional for tempering (tadka), homemade pickles, and grinding fresh mustard paste (kasundi).',
    process: 'Multi-stage air-cleaned, gravity separated, moisture controlled under 6%.',
    smokePoint: 'N/A',
    shelfLife: '18 Months',
    nutrition: {
      energy: '508 kcal',
      fat: '36 g',
      mufa: '22 g',
      pufa: '9 g',
      saturatedFat: '2 g',
      cholesterol: '0 mg',
      omega3: '0.8 g'
    },
    features: [
      '38%+ Natural Oil Yield Capacity',
      'Zero Dirt, Sand or Weed Contamination',
      'Intense Crackling Performance on Tempering',
      'Packed in Moisture-Barrier Nitrogen Flushed Pouch'
    ],
    certifications: ['FSSAI Certified', '100% Natural Agro Produce'],
    rating: 4.85,
    reviewsCount: 53
  },
  {
    id: 'aag-p07',
    name: 'Pure Cold-Pressed Mustard Oil Cake (Sarson Ki Khal 25 kg)',
    hindiName: 'शुद्ध सरसों की खली (पशु आहार एवं जैविक खाद 25kg)',
    tagline: 'Nutrient-Dense Livestock Feed & High-Nitrogen Organic Fertilizer',
    category: 'agro_derivatives',
    volume: '25 kg Sack',
    price: 850,
    originalPrice: 1050,
    stock: 45,
    sku: 'AAG-KHAL-25K',
    image: '/src/assets/images/oil_bottle_1l_1794482168892.jpg',
    badge: 'Organic Farm',
    pungencyLevel: 4,
    description: 'Fresh byproduct from our cold press extraction. Contains ~8% residual virgin oil and 36%+ crude protein. Ideal for high-yielding dairy cattle milk enhancement and as an organic garden soil conditioner.',
    process: 'Slow pressed, zero chemical extraction, sun dried and bagged in laminated woven sacks.',
    smokePoint: 'N/A',
    shelfLife: '6 Months',
    nutrition: {
      energy: 'Protein 36%',
      fat: 'Residual Oil 8%',
      mufa: 'N/A',
      pufa: 'N/A',
      saturatedFat: 'N/A',
      cholesterol: '0 mg',
      omega3: 'N/A'
    },
    features: [
      'High Protein (36%) for Cattle Milk Yield',
      'Rich in Nitrogen (N), Phosphorus (P) & Potassium (K)',
      '100% Free From Urea & Solvent Residues',
      'Direct Factory Bag with Moisture Seal'
    ],
    certifications: ['Agro Cooperative Approved', 'Natural Bio-Fertilizer'],
    rating: 4.9,
    reviewsCount: 39
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productName: '100% Pure Kachi Ghani Mustard Oil (1L Glass Bottle)',
    author: 'Rajeshwar Sharma',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    date: '3 days ago',
    comment: 'The authentic jhaanjh (pungency) brought back childhood memories of our village oil mill. Cooked aloo gobi and mutton curry with it, the aroma filled the entire home. Will never buy supermarket refined oils again!',
    verifiedBuyer: true,
    highlight: 'Real traditional pungency'
  },
  {
    id: 'rev-02',
    productName: 'Pure Kachi Ghani Mustard Oil Family Pack (5L Canister)',
    author: 'Sunita Mukherjee',
    location: 'Kolkata, West Bengal',
    rating: 5,
    date: '1 week ago',
    comment: 'In Bengali cooking, mustard oil is everything for fish curry (Macher Jhol). Arsh Agro mustard oil has the exact golden colour, sharpness, and clean taste. The 5L container arrived intact via Shiprocket in 3 days!',
    verifiedBuyer: true,
    highlight: 'Perfect for Macher Jhol'
  },
  {
    id: 'rev-03',
    productName: 'Heritage Wood-Pressed Mustard Oil (Lakdi Ghani 2L)',
    author: 'Dr. Virendra Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    date: '2 weeks ago',
    comment: 'We did the home purity test: kept a sample in the refrigerator and it did not freeze like adulterated oils with palm oil do. Lab-grade purity and smooth wood-press texture. Excellent customer care on WhatsApp too.',
    verifiedBuyer: true,
    highlight: 'Passed refrigerator purity test'
  },
  {
    id: 'rev-04',
    productName: 'Yellow Mustard Cold-Pressed Oil (Pili Sarson 1L)',
    author: 'Meenakshi Kaul',
    location: 'Srinagar / Delhi',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Yellow mustard oil has such a pleasant, sweet nutty flavor without overwhelming bitterness. Ideal for traditional Kashmiri Rogan Josh and everyday salads. Razorpay checkout was seamless.',
    verifiedBuyer: true,
    highlight: 'Subtle sweet aroma'
  },
  {
    id: 'rev-05',
    productName: 'Commercial Wholesale Mustard Oil Tin (15L Tin)',
    author: 'Haji Mohammed Enterprises',
    location: 'Lucknow, Uttar Pradesh',
    rating: 5,
    date: '1 month ago',
    comment: 'We run a commercial catering business and ordered 6 tins of 15L. Best wholesale rate and prompt GST invoice provided. The oil does not foam during heavy frying and gives deep golden glaze to savouries.',
    verifiedBuyer: true,
    highlight: 'Great wholesale B2B pricing'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'AAG-92841',
    date: '2026-11-10 14:22',
    customerName: 'Anand Verma',
    phone: '+91 98290 11452',
    email: 'anand.verma@gmail.com',
    address: 'Flat 402, Shanti Residency, Mansarovar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302020',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 2
      },
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1
      }
    ],
    subtotal: 615,
    shippingFee: 0,
    discount: 50,
    totalAmount: 565,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    razorpayPaymentId: 'pay_Nzkq99w18h9Lmx',
    orderStatus: 'in_transit',
    shiprocketAWB: 'SR-DEL-98471923',
    courierPartner: 'Delhivery Surface',
    estimatedDelivery: 'Nov 14, 2026',
    trackingEvents: [
      {
        status: 'Order Confirmed',
        location: 'Arsh Agro Facility, Alwar Hub',
        timestamp: 'Nov 10, 14:22',
        description: 'Order placed via Razorpay (Payment ID: pay_Nzkq99w18h9Lmx)'
      },
      {
        status: 'Manifest Generated',
        location: 'Shiprocket Logistics Hub',
        timestamp: 'Nov 10, 17:45',
        description: 'AWB SR-DEL-98471923 assigned with Delhivery Surface'
      },
      {
        status: 'Picked Up by Courier',
        location: 'Alwar Industrial Sorting Facility',
        timestamp: 'Nov 11, 10:15',
        description: 'Shipment handed over to Delhivery logistics partner'
      },
      {
        status: 'In Transit',
        location: 'Jaipur Main Gateway Hub',
        timestamp: 'Nov 12, 06:30',
        description: 'Package in transit to delivery destination branch'
      }
    ]
  },
  {
    id: 'AAG-92812',
    date: '2026-11-09 11:05',
    customerName: 'Priya Sengupta',
    phone: '+91 98300 44521',
    email: 'priya.sengupta@outlook.com',
    address: '24/B Lake Road, Southern Avenue',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700029',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1
      }
    ],
    subtotal: 940,
    shippingFee: 0,
    discount: 0,
    totalAmount: 940,
    paymentMethod: 'cod',
    paymentStatus: 'cod_pending',
    orderStatus: 'out_for_delivery',
    shiprocketAWB: 'SR-BD-44810294',
    courierPartner: 'Blue Dart Express',
    estimatedDelivery: 'Today by 6:00 PM',
    trackingEvents: [
      {
        status: 'Order Confirmed',
        location: 'Arsh Agro Facility',
        timestamp: 'Nov 09, 11:05',
        description: 'Cash on Delivery order confirmed by customer'
      },
      {
        status: 'Picked Up',
        location: 'Central Warehousing, Delhi NCR',
        timestamp: 'Nov 09, 16:20',
        description: 'Collected by Blue Dart courier'
      },
      {
        status: 'In Transit',
        location: 'Kolkata Air Logistics Hub',
        timestamp: 'Nov 11, 04:10',
        description: 'Processed at regional sorting center'
      },
      {
        status: 'Out for Delivery',
        location: 'South Kolkata Delivery Center',
        timestamp: 'Nov 12, 08:30',
        description: 'Courier agent Rahul Kumar is out for delivery. Collect ₹940 cash.'
      }
    ]
  }
];

export const INITIAL_BULK_INQUIRIES: BulkInquiry[] = [
  {
    id: 'BI-101',
    companyName: 'Royal Bengal Spices & Mills',
    contactPerson: 'Debabrata Ghosh',
    phone: '+91 97482 99120',
    email: 'procurement@royalbengal.com',
    city: 'Siliguri',
    state: 'West Bengal',
    requiredVolume: '1,500 Liters / Month',
    packagingPreference: '15L Sealed Metal Tins',
    status: 'quote_sent',
    date: 'Nov 08, 2026',
    notes: 'Requested laboratory certificate of non-adulteration and CIF delivery quotation.'
  },
  {
    id: 'BI-102',
    companyName: 'Bikaner Sweet & Namkeen Udyog',
    contactPerson: 'Mohanlal Agarwal',
    phone: '+91 94140 33819',
    email: 'mohan.bikaner@rediffmail.com',
    city: 'Bikaner',
    state: 'Rajasthan',
    requiredVolume: '5,000 Liters / Quarter',
    packagingPreference: '200L Food Grade Stainless/HDPE Barrels',
    status: 'contacted',
    date: 'Nov 11, 2026',
    notes: 'Needs sample test bottle for moisture level under 0.25%.'
  }
];

// Indian Pin Code Courier Matrix Simulation (Shiprocket engine)
export const PIN_SERVICE_DATA: Record<string, { city: string; state: string; days: number; partners: string[]; standardCost: number; expressCost: number }> = {
  '110001': { city: 'New Delhi', state: 'Delhi', days: 2, partners: ['Blue Dart', 'Delhivery', 'DTDC'], standardCost: 0, expressCost: 90 },
  '400001': { city: 'Mumbai', state: 'Maharashtra', days: 3, partners: ['Delhivery', 'Blue Dart', 'Ekart'], standardCost: 0, expressCost: 110 },
  '560001': { city: 'Bengaluru', state: 'Karnataka', days: 3, partners: ['Blue Dart', 'Delhivery', 'Shadowfax'], standardCost: 0, expressCost: 120 },
  '700001': { city: 'Kolkata', state: 'West Bengal', days: 3, partners: ['Delhivery', 'Blue Dart', 'DTDC'], standardCost: 0, expressCost: 100 },
  '302001': { city: 'Jaipur', state: 'Rajasthan', days: 1, partners: ['Delhivery', 'Blue Dart'], standardCost: 0, expressCost: 60 },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh', days: 2, partners: ['Delhivery', 'DTDC', 'Blue Dart'], standardCost: 0, expressCost: 80 },
  '800001': { city: 'Patna', state: 'Bihar', days: 3, partners: ['Delhivery', 'DTDC'], standardCost: 0, expressCost: 95 },
  '160017': { city: 'Chandigarh', state: 'Punjab', days: 2, partners: ['Blue Dart', 'Delhivery'], standardCost: 0, expressCost: 75 },
  '500001': { city: 'Hyderabad', state: 'Telangana', days: 3, partners: ['Delhivery', 'Blue Dart'], standardCost: 0, expressCost: 110 },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', days: 4, partners: ['Delhivery', 'Blue Dart'], standardCost: 0, expressCost: 130 }
};
