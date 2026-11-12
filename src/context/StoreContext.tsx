import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { auth, db, googleProvider, testFirestoreConnection, handleFirestoreError, OperationType } from '../lib/firebase';
import { Product, CartItem, Order, Review, BulkInquiry, OrderStatus, PaymentMethod } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS, INITIAL_BULK_INQUIRIES, PIN_SERVICE_DATA } from '../data/initialData';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

interface IntegrationSettings {
  whatsappNumber: string;
  razorpayKeyId: string;
  razorpayMode: 'test' | 'live';
  shiprocketMode: 'active' | 'sandbox';
  freeShippingThreshold: number;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  // Auth
  user: User | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;

  // Products
  products: Product[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'orderStatus' | 'shiprocketAWB' | 'trackingEvents' | 'courierPartner' | 'estimatedDelivery'>, courierName?: string) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  generateAWB: (orderId: string, courierName: string) => string;

  // Pin Code & Delivery
  checkPinService: (pincode: string) => {
    serviceable: boolean;
    city: string;
    state: string;
    days: number;
    partners: string[];
    cost: number;
  };

  // WhatsApp Helpers
  sendOrderToWhatsApp: (order: Order) => void;
  quickBuyWhatsApp: (product: Product, qty?: number) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'verifiedBuyer'>) => Promise<void>;

  // Bulk RFQ
  bulkInquiries: BulkInquiry[];
  submitBulkInquiry: (inquiry: Omit<BulkInquiry, 'id' | 'date' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: BulkInquiry['status']) => Promise<void>;

  // Admin & Settings
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  settings: IntegrationSettings;
  updateSettings: (newSettings: Partial<IntegrationSettings>) => void;
  updateProductStock: (productId: string, newStock: number) => Promise<void>;
  updateProductPrice: (productId: string, newPrice: number) => Promise<void>;
  addNewProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => Promise<void>;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Navigation
  activeSection: 'shop' | 'process' | 'bulk' | 'reviews' | 'tracking';
  setActiveSection: (sec: 'shop' | 'process' | 'bulk' | 'reviews' | 'tracking') => void;
  trackingQuery: string;
  setTrackingQuery: (q: string) => void;

  // User Orders Drawer
  isUserOrdersOpen: boolean;
  setIsUserOrdersOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const ADMIN_EMAIL = 'saiftech15@gmail.com';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Products from Firestore (seeded with initial)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('arsh_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isUserOrdersOpen, setIsUserOrdersOpen] = useState(false);

  // Orders, Reviews, Bulk RFQs
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [bulkInquiries, setBulkInquiries] = useState<BulkInquiry[]>(INITIAL_BULK_INQUIRIES);

  // Admin & View State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'shop' | 'process' | 'bulk' | 'reviews' | 'tracking'>('shop');
  const [trackingQuery, setTrackingQuery] = useState<string>('');

  const [settings, setSettings] = useState<IntegrationSettings>(() => {
    const saved = localStorage.getItem('arsh_settings');
    return saved
      ? JSON.parse(saved)
      : {
          whatsappNumber: '919829011452',
          razorpayKeyId: 'rzp_test_ArshAgro7849',
          razorpayMode: 'test',
          shiprocketMode: 'active',
          freeShippingThreshold: 999
        };
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Check admin
  const isAdmin = Boolean(
    user && (user.email === ADMIN_EMAIL || userProfile?.role === 'admin')
  );

  // Toast handler
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Initialize Firebase connection and Auth Listener
  useEffect(() => {
    testFirestoreConnection();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create profile
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            const isUserAdmin = currentUser.email === ADMIN_EMAIL;
            const newProfile: UserProfile = {
              userId: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Customer',
              photoURL: currentUser.photoURL || undefined,
              role: isUserAdmin ? 'admin' : 'customer',
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (err) {
          console.warn('Could not sync user profile to Firestore:', err);
        }
      } else {
        setUserProfile(null);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Sync Products from Firestore
  useEffect(() => {
    const productsRef = collection(db, 'products');

    const unsubscribe = onSnapshot(
      productsRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Product[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Product);
          });
          setProducts(list);
        } else {
          // Seed initial products to Firestore
          INITIAL_PRODUCTS.forEach(async (p) => {
            try {
              await setDoc(doc(db, 'products', p.id), p);
            } catch (err) {
              console.warn('Could not seed product:', p.name, err);
            }
          });
          setProducts(INITIAL_PRODUCTS);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'products');
      }
    );

    return () => unsubscribe();
  }, []);

  // 3. Sync Reviews from Firestore
  useEffect(() => {
    const reviewsRef = collection(db, 'reviews');
    const unsubscribe = onSnapshot(
      reviewsRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Review[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Review);
          });
          setReviews(list);
        } else {
          INITIAL_REVIEWS.forEach(async (r) => {
            try {
              await setDoc(doc(db, 'reviews', r.id), r);
            } catch (err) {
              console.warn('Could not seed review:', err);
            }
          });
          setReviews(INITIAL_REVIEWS);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'reviews');
      }
    );

    return () => unsubscribe();
  }, []);

  // 4. Sync Orders from Firestore
  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Order[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Order);
          });
          // Sort newest first
          setOrders(list.sort((a, b) => (b.date > a.date ? 1 : -1)));
        } else {
          INITIAL_ORDERS.forEach(async (o) => {
            try {
              await setDoc(doc(db, 'orders', o.id), o);
            } catch (err) {
              console.warn('Could not seed order:', err);
            }
          });
          setOrders(INITIAL_ORDERS);
        }
      },
      (error) => {
        // Orders list permission might be restricted to user or admin
        console.warn('Orders listener:', error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 5. Sync Bulk Inquiries from Firestore
  useEffect(() => {
    const inqRef = collection(db, 'bulk_inquiries');
    const unsubscribe = onSnapshot(
      inqRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: BulkInquiry[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as BulkInquiry);
          });
          setBulkInquiries(list);
        }
      },
      (error) => {
        // May be restricted to admin in firestore.rules
        console.warn('Bulk inquiries listener:', error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('arsh_cart', JSON.stringify(cart));
  }, [cart]);

  // Auth Functions
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isUserAdmin = result.user.email === ADMIN_EMAIL;
      showToast(
        `Welcome ${result.user.displayName || 'Customer'}! ${isUserAdmin ? '(Admin Mode Active)' : ''}`,
        'success'
      );
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user') {
        showToast('Google Sign-In failed. Please try again.', 'warning');
      }
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    showToast('Signed out successfully.');
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      showToast(`${product.name} is currently out of stock`, 'warning');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });

    showToast(`Added ${quantity} × ${product.volume} ${product.name.split('(')[0]} to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const clamped = Math.min(quantity, item.product.stock);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Pin Code validation
  const checkPinService = (pincode: string) => {
    const cleaned = pincode.trim();
    if (PIN_SERVICE_DATA[cleaned]) {
      const data = PIN_SERVICE_DATA[cleaned];
      return {
        serviceable: true,
        city: data.city,
        state: data.state,
        days: data.days,
        partners: data.partners,
        cost: data.standardCost
      };
    }
    if (/^[1-9][0-9]{5}$/.test(cleaned)) {
      return {
        serviceable: true,
        city: 'Verified Delivery Zone',
        state: 'India',
        days: 3,
        partners: ['Delhivery Surface', 'Blue Dart Express', 'Ekart'],
        cost: 0
      };
    }
    return {
      serviceable: false,
      city: '',
      state: '',
      days: 0,
      partners: [],
      cost: 0
    };
  };

  const generateAWB = (orderId: string, courierName: string) => {
    const prefix = courierName.includes('Blue Dart') ? 'SR-BD-' : courierName.includes('Delhivery') ? 'SR-DEL-' : 'SR-EXP-';
    const num = Math.floor(10000000 + Math.random() * 90000000);
    return `${prefix}${num}`;
  };

  // Create Order and persist to Firestore
  const createOrder = async (
    orderData: Omit<Order, 'id' | 'date' | 'orderStatus' | 'shiprocketAWB' | 'trackingEvents' | 'courierPartner' | 'estimatedDelivery'>,
    courierName = 'Delhivery Express'
  ): Promise<Order> => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `AAG-${randomSuffix}`;
    const awb = generateAWB(orderId, courierName);
    const now = new Date();
    const estDate = new Date();
    estDate.setDate(now.getDate() + 3);

    const formattedDate = now.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const formattedEst = estDate.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      date: formattedDate,
      orderStatus: 'confirmed',
      shiprocketAWB: awb,
      courierPartner: courierName,
      estimatedDelivery: formattedEst,
      trackingEvents: [
        {
          status: 'Order Confirmed',
          location: 'Arsh Agro Extraction Mill, Rajasthan',
          timestamp: formattedDate,
          description: orderData.paymentMethod === 'razorpay'
            ? `Paid securely via Razorpay (Ref: ${orderData.razorpayPaymentId || 'ONLINE_RZP'})`
            : `Cash on Delivery order booked. Amount to collect: ₹${orderData.totalAmount}`
        },
        {
          status: 'Shiprocket Manifest Generated',
          location: 'Arsh Agro Central Warehouse',
          timestamp: 'Automated Shiprocket sync',
          description: `AWB ${awb} assigned to ${courierName}. Packaging in progress.`
        }
      ]
    };

    // Save to Firestore
    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `orders/${orderId}`);
    }

    // Deduct stock in Firestore
    for (const item of orderData.items) {
      try {
        const prodRef = doc(db, 'products', item.product.id);
        const newStock = Math.max(0, item.product.stock - item.quantity);
        await updateDoc(prodRef, { stock: newStock });
      } catch (err) {
        console.warn('Could not deduct stock in Firestore:', err);
      }
    }

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const ord = orders.find((o) => o.id === orderId);
    if (!ord) return;

    const nowStr = new Date().toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const newEvents = [...ord.trackingEvents];
    let desc = `Status updated to ${status}`;
    if (status === 'picked_up') desc = `Courier partner ${ord.courierPartner} has collected the shipment from the oil mill.`;
    if (status === 'in_transit') desc = `Package departed from regional hub. Heading towards ${ord.city}.`;
    if (status === 'out_for_delivery') desc = `Delivery executive assigned. Out for delivery to ${ord.address}.`;
    if (status === 'delivered') desc = `Shipment safely delivered to ${ord.customerName}. Enjoy the pure cold-pressed mustard oil!`;
    if (status === 'cancelled') desc = `Order cancelled.`;

    newEvents.push({
      status: status.replace('_', ' ').toUpperCase(),
      location: ord.city || 'In Transit',
      timestamp: nowStr,
      description: desc
    });

    const updatedData = {
      orderStatus: status,
      paymentStatus: status === 'delivered' && ord.paymentMethod === 'cod' ? 'paid' : ord.paymentStatus,
      trackingEvents: newEvents
    };

    try {
      await updateDoc(doc(db, 'orders', orderId), updatedData);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, ...updatedData } : o))
    );

    showToast(`Order #${orderId} status updated to ${status}`);
  };

  // WhatsApp helpers
  const sendOrderToWhatsApp = (order: Order) => {
    const itemsList = order.items
      .map((item, idx) => `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - ₹${item.product.price * item.quantity}`)
      .join('%0A');

    const message = `*ARSH AGRO INDUSTRY - ORDER RECEIPT*%0A` +
      `━━━━━━━━━━━━━━━━━━━━━%0A` +
      `*Order ID:* ${order.id}%0A` +
      `*Customer:* ${order.customerName}%0A` +
      `*Phone:* ${order.phone}%0A` +
      `*Email:* ${order.email}%0A` +
      `*Address:* ${order.address}, ${order.city}, ${order.state} - ${order.pincode}%0A` +
      `━━━━━━━━━━━━━━━━━━━━━%0A` +
      `*ITEMS ORDERED:*%0A${itemsList}%0A` +
      `━━━━━━━━━━━━━━━━━━━━━%0A` +
      `*Subtotal:* ₹${order.subtotal}%0A` +
      `*Shipping:* ${order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}%0A` +
      `*Total Amount:* ₹${order.totalAmount}%0A` +
      `*Payment:* ${order.paymentMethod.toUpperCase()} (${order.paymentStatus})%0A` +
      `*Shiprocket AWB:* ${order.shiprocketAWB} (${order.courierPartner})%0A` +
      `*Est. Delivery:* ${order.estimatedDelivery}%0A%0A` +
      `_Thank you for supporting pure cold-pressed Indian agriculture!_`;

    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  const quickBuyWhatsApp = (product: Product, qty = 1) => {
    const total = product.price * qty;
    const message = `*ARSH AGRO INDUSTRY - QUICK ORDER*%0A` +
      `━━━━━━━━━━━━━━━━━━━━━%0A` +
      `Hello! I would like to order directly:%0A` +
      `*Product:* ${product.name}%0A` +
      `*Volume:* ${product.volume}%0A` +
      `*Quantity:* ${qty}%0A` +
      `*Price:* ₹${product.price}%0A` +
      `*Total:* ₹${total}%0A` +
      `━━━━━━━━━━━━━━━━━━━━━%0A` +
      `Please confirm dispatch via Shiprocket.`;

    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  // Reviews
  const addReview = async (reviewData: Omit<Review, 'id' | 'date' | 'verifiedBuyer'>) => {
    const reviewId = `rev-${Date.now()}`;
    const newReview: Review = {
      ...reviewData,
      id: reviewId,
      date: 'Just now',
      verifiedBuyer: true
    };

    try {
      await setDoc(doc(db, 'reviews', reviewId), newReview);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `reviews/${reviewId}`);
    }

    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your review has been saved to the database.', 'success');
  };

  // Bulk RFQ
  const submitBulkInquiry = async (inquiryData: Omit<BulkInquiry, 'id' | 'date' | 'status'>) => {
    const inqId = `BI-${Math.floor(100 + Math.random() * 900)}`;
    const newInquiry: BulkInquiry = {
      ...inquiryData,
      id: inqId,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'new'
    };

    try {
      await setDoc(doc(db, 'bulk_inquiries', inqId), newInquiry);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `bulk_inquiries/${inqId}`);
    }

    setBulkInquiries((prev) => [newInquiry, ...prev]);
    showToast('Bulk inquiry submitted & stored in Firestore database.', 'success');
  };

  const updateInquiryStatus = async (id: string, status: BulkInquiry['status']) => {
    try {
      await updateDoc(doc(db, 'bulk_inquiries', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bulk_inquiries/${id}`);
    }

    setBulkInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Bulk inquiry #${id} status updated`);
  };

  // Settings & Product Updates
  const updateSettings = (newSettings: Partial<IntegrationSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Integration settings updated');
  };

  const updateProductStock = async (productId: string, newStock: number) => {
    const clamped = Math.max(0, newStock);
    try {
      await updateDoc(doc(db, 'products', productId), { stock: clamped });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${productId}`);
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: clamped } : p))
    );
    showToast('Inventory stock updated in database');
  };

  const updateProductPrice = async (productId: string, newPrice: number) => {
    try {
      await updateDoc(doc(db, 'products', productId), { price: newPrice });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${productId}`);
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
    showToast('Product pricing updated in database');
  };

  const addNewProduct = async (prodData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newId = `aag-p${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...prodData,
      id: newId,
      rating: 5.0,
      reviewsCount: 1
    };

    try {
      await setDoc(doc(db, 'products', newId), newProduct);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `products/${newId}`);
    }

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" created and synced to Firestore!`);
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        userProfile,
        isAdmin,
        isAuthLoading,
        signInWithGoogle,
        signOutUser,
        products,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        currentOrder,
        setCurrentOrder,
        createOrder,
        updateOrderStatus,
        generateAWB,
        checkPinService,
        sendOrderToWhatsApp,
        quickBuyWhatsApp,
        reviews,
        addReview,
        bulkInquiries,
        submitBulkInquiry,
        updateInquiryStatus,
        isAdminOpen,
        setIsAdminOpen,
        settings,
        updateSettings,
        updateProductStock,
        updateProductPrice,
        addNewProduct,
        toasts,
        showToast,
        removeToast,
        activeSection,
        setActiveSection,
        trackingQuery,
        setTrackingQuery,
        isUserOrdersOpen,
        setIsUserOrdersOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
