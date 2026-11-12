export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  category: 'kachi_ghani' | 'yellow_mustard' | 'bulk_commercial' | 'agro_derivatives';
  volume: string;
  price: number;
  originalPrice: number;
  stock: number;
  sku: string;
  image: string;
  badge?: string;
  pungencyLevel: number; // 1 to 5 (Jhaanjh / Sharpness)
  description: string;
  process: string;
  smokePoint: string;
  shelfLife: string;
  nutrition: {
    energy: string;
    fat: string;
    mufa: string;
    pufa: string;
    saturatedFat: string;
    cholesterol: string;
    omega3: string;
  };
  features: string[];
  certifications: string[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'razorpay' | 'cod';

export type OrderStatus = 'confirmed' | 'manifested' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'cod_pending';
  razorpayPaymentId?: string;
  orderStatus: OrderStatus;
  shiprocketAWB: string;
  courierPartner: string;
  estimatedDelivery: string;
  trackingEvents: TrackingEvent[];
}

export interface Review {
  id: string;
  productId?: string;
  productName: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  highlight?: string;
}

export interface BulkInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  requiredVolume: string; // e.g., "500 Liters / Month"
  packagingPreference: string; // e.g., "15L Tin", "200L Drum", "Tanker"
  status: 'new' | 'contacted' | 'sample_sent' | 'quote_sent' | 'converted';
  date: string;
  notes?: string;
}

export interface ShiprocketCourierRate {
  courierName: string;
  estimatedDays: string;
  shippingCharge: number;
  codAvailable: boolean;
  mode: 'Surface' | 'Air';
  rating: number;
}
