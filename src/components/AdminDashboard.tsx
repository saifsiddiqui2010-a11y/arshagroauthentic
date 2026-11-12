import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Building2,
  Settings,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Plus,
  MessageCircle,
  Truck,
  CheckCircle,
  Clock,
  Edit2,
  Save,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    orders,
    products,
    bulkInquiries,
    settings,
    updateSettings,
    updateProductStock,
    updateProductPrice,
    addNewProduct,
    updateOrderStatus,
    updateInquiryStatus,
    sendOrderToWhatsApp,
    user,
    isAdmin
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'inventory' | 'inquiries' | 'settings'>('analytics');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // Add Product Form State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'kachi_ghani' | 'yellow_mustard' | 'bulk_commercial' | 'agro_derivatives'>('kachi_ghani');
  const [newProdVolume, setNewProdVolume] = useState('1 Liter');
  const [newProdPrice, setNewProdPrice] = useState(195);
  const [newProdStock, setNewProdStock] = useState(100);
  const [newProdSku, setNewProdSku] = useState('AAG-KG-NEW');
  const [newProdDesc, setNewProdDesc] = useState('');

  if (!isAdminOpen) return null;

  // Analytics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const razorpayOrders = orders.filter((o) => o.paymentMethod === 'razorpay');
  const codOrders = orders.filter((o) => o.paymentMethod === 'cod');
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const lowStockCount = products.filter((p) => p.stock < 50).length;

  const handleSavePrice = (productId: string) => {
    if (tempPrice > 0) {
      updateProductPrice(productId, tempPrice);
    }
    setEditingPriceId(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    addNewProduct({
      name: newProdName,
      tagline: 'Farm-fresh cold-pressed mustard oil',
      category: newProdCategory,
      volume: newProdVolume,
      price: Number(newProdPrice),
      originalPrice: Number(newProdPrice) * 1.2,
      stock: Number(newProdStock),
      sku: newProdSku || `AAG-${Date.now().toString().slice(-4)}`,
      image: '/src/assets/images/oil_bottle_1l_1794482168892.jpg',
      pungencyLevel: 5,
      description: newProdDesc || 'Pure authentic cold-pressed mustard oil.',
      process: 'Traditional wooden kolhu extracted below 40°C.',
      smokePoint: '250°C',
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
      features: ['100% Cold-Pressed', 'Zero Argemone Adulteration'],
      certifications: ['FSSAI Certified', 'Agmark Grade 1']
    });

    setShowAddProduct(false);
    setNewProdName('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden border border-stone-200">
        {/* Top Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-white">
              A
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg font-display leading-tight">
                Arsh Agro Industry · Admin Command Console
              </h2>
              <p className="text-[11px] text-stone-400">
                Inventory Control · Shiprocket Logistics Engine · Razorpay & WhatsApp Dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
              Firestore DB Connected · {user?.email || 'saiftech15@gmail.com'}
            </span>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-stone-100 px-6 py-2.5 border-b border-stone-200 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
            <span>Sales Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-blue-700" />
            <span>Orders & Shiprocket ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-emerald-700" />
            <span>Inventory ({products.length})</span>
            {lowStockCount > 0 && (
              <span className="bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full text-[10px] font-mono">
                {lowStockCount} low
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-purple-700" />
            <span>Bulk RFQs ({bulkInquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-stone-700" />
            <span>Gateway & WhatsApp Config</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-50">
          {/* TAB 1: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-medium">Total Gross Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold font-mono-num text-stone-900">
                    ₹{totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                    +18.4% from last week
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-medium">Total Orders Fulfilled</span>
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold font-mono-num text-stone-900">
                    {totalOrdersCount}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {razorpayOrders.length} Prepaid Razorpay · {codOrders.length} COD
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-medium">Average Order Value (AOV)</span>
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-2xl font-bold font-mono-num text-stone-900">
                    ₹{avgOrderValue}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Family Pack & 15L Tins driving ticket size
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-medium">Low Stock Alerts</span>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-2xl font-bold font-mono-num text-amber-700">
                    {lowStockCount} SKUs
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Threshold &lt; 50 units remaining
                  </p>
                </div>
              </div>

              {/* Payment Split & Shiprocket Courier Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-stone-200">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4">
                    Payment Gateway Distribution
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Razorpay Online (UPI, Netbanking, Cards)</span>
                        <span className="font-mono-num font-bold">
                          {totalOrdersCount > 0 ? Math.round((razorpayOrders.length / totalOrdersCount) * 100) : 50}%
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-600 h-full"
                          style={{
                            width: `${totalOrdersCount > 0 ? (razorpayOrders.length / totalOrdersCount) * 100 : 50}%`
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span>Cash on Delivery (COD)</span>
                        <span className="font-mono-num font-bold">
                          {totalOrdersCount > 0 ? Math.round((codOrders.length / totalOrdersCount) * 100) : 50}%
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-stone-800 h-full"
                          style={{
                            width: `${totalOrdersCount > 0 ? (codOrders.length / totalOrdersCount) * 100 : 50}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4">
                    Shiprocket Integrated Couriers
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-stone-900">Delhivery Surface Express</p>
                        <p className="text-[11px] text-stone-500">Active · 99.2% On-time Rate</p>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Preferred Partner
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-stone-900">Blue Dart Priority Air</p>
                        <p className="text-[11px] text-stone-500">Active · Metro 24-48h Delivery</p>
                      </div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                        Fastest ETA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base font-display text-stone-900">
                    Live Shiprocket Order Registry
                  </h3>
                  <p className="text-xs text-stone-500">
                    Update logistics milestones and trigger automated WhatsApp dispatch notifications.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                      <tr>
                        <th className="p-3.5">Order ID & Date</th>
                        <th className="p-3.5">Customer & City</th>
                        <th className="p-3.5">Items</th>
                        <th className="p-3.5">Total & Mode</th>
                        <th className="p-3.5">Shiprocket AWB</th>
                        <th className="p-3.5">Logistics Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-50/70">
                          <td className="p-3.5">
                            <span className="font-mono font-bold text-stone-900 block">
                              {ord.id}
                            </span>
                            <span className="text-[11px] text-stone-400 font-mono">{ord.date}</span>
                          </td>

                          <td className="p-3.5">
                            <span className="font-semibold text-stone-900 block">{ord.customerName}</span>
                            <span className="text-[11px] text-stone-500">
                              {ord.city}, {ord.pincode}
                            </span>
                            <span className="text-[11px] text-stone-500 block font-mono">
                              {ord.phone}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <span className="font-medium text-stone-800">
                              {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                            </span>
                            <p className="text-[10px] text-stone-500 max-w-xs truncate">
                              {ord.items.map((i) => `${i.quantity}x ${i.product.volume}`).join(', ')}
                            </p>
                          </td>

                          <td className="p-3.5">
                            <span className="font-bold text-stone-900 font-mono-num text-sm block">
                              ₹{ord.totalAmount}
                            </span>
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${ord.paymentMethod === 'razorpay' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'}`}>
                              {ord.paymentMethod} ({ord.paymentStatus})
                            </span>
                          </td>

                          <td className="p-3.5">
                            <span className="font-mono font-bold text-amber-800 block text-[11px]">
                              {ord.shiprocketAWB}
                            </span>
                            <span className="text-[10px] text-stone-500">{ord.courierPartner}</span>
                          </td>

                          <td className="p-3.5">
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="border border-stone-300 rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:border-amber-600 bg-white"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="manifested">Manifested</option>
                              <option value="picked_up">Picked Up</option>
                              <option value="in_transit">In Transit</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => sendOrderToWhatsApp(ord)}
                              className="bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1.5 rounded-md text-[11px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                              title="Send WhatsApp update to customer"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base font-display text-stone-900">
                    Product Catalog & Stock Management
                  </h3>
                  <p className="text-xs text-stone-500">
                    Adjust available inventory, edit prices, or publish new agro items.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Add Product Inline Modal */}
              {showAddProduct && (
                <div className="bg-white p-5 rounded-xl border-2 border-amber-500 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-stone-900">Add New Product to Catalog</h4>
                    <button onClick={() => setShowAddProduct(false)} className="text-stone-400 hover:text-stone-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="e.g. Organic Kachi Ghani Mustard Oil 500ml"
                        className="w-full border rounded p-2"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Category</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as any)}
                        className="w-full border rounded p-2"
                      >
                        <option value="kachi_ghani">Kachi Ghani</option>
                        <option value="yellow_mustard">Yellow Mustard</option>
                        <option value="bulk_commercial">Bulk Commercial</option>
                        <option value="agro_derivatives">Agro Derivatives</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Volume/Weight</label>
                      <input
                        type="text"
                        value={newProdVolume}
                        onChange={(e) => setNewProdVolume(e.target.value)}
                        placeholder="1 Liter, 5 Liters"
                        className="w-full border rounded p-2"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Selling Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(Number(e.target.value))}
                        className="w-full border rounded p-2"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Initial Stock Units</label>
                      <input
                        type="number"
                        required
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(Number(e.target.value))}
                        className="w-full border rounded p-2"
                      />
                    </div>

                    <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddProduct(false)}
                        className="px-3 py-1.5 border rounded font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-1.5 rounded font-semibold"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                      <tr>
                        <th className="p-3.5">Product</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Volume</th>
                        <th className="p-3.5">Price (₹)</th>
                        <th className="p-3.5">Stock Level</th>
                        <th className="p-3.5">Pungency</th>
                        <th className="p-3.5 text-right">Quick Stock Adjust</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-stone-50/70">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-cover rounded-md border border-stone-200 shrink-0"
                              />
                              <div>
                                <span className="font-bold text-stone-900 block">{prod.name}</span>
                                <span className="text-[11px] text-stone-400 font-mono">{prod.sku}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5 uppercase font-medium text-stone-500 text-[10px]">
                            {prod.category.replace('_', ' ')}
                          </td>

                          <td className="p-3.5 font-medium text-stone-700">{prod.volume}</td>

                          <td className="p-3.5">
                            {editingPriceId === prod.id ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(Number(e.target.value))}
                                  className="w-16 border rounded px-1.5 py-0.5 font-mono text-xs"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSavePrice(prod.id)}
                                  className="p-1 text-emerald-700 hover:bg-emerald-50 rounded"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold font-mono-num text-sm text-stone-900">
                                  ₹{prod.price}
                                </span>
                                <button
                                  onClick={() => {
                                    setEditingPriceId(prod.id);
                                    setTempPrice(prod.price);
                                  }}
                                  className="text-stone-400 hover:text-stone-700 p-0.5"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>

                          <td className="p-3.5">
                            <span className={`font-mono-num font-bold text-sm ${prod.stock < 50 ? 'text-amber-700' : 'text-emerald-700'}`}>
                              {prod.stock} units
                            </span>
                            {prod.stock < 50 && (
                              <span className="block text-[10px] text-amber-700">Low stock alert</span>
                            )}
                          </td>

                          <td className="p-3.5">
                            <span className="font-mono text-stone-700">{prod.pungencyLevel}/5 Jhaanjh</span>
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="inline-flex items-center border border-stone-300 rounded bg-stone-50">
                              <button
                                onClick={() => updateProductStock(prod.id, prod.stock - 5)}
                                className="px-2 py-0.5 hover:bg-stone-200 font-bold"
                              >
                                -5
                              </button>
                              <button
                                onClick={() => updateProductStock(prod.id, prod.stock + 10)}
                                className="px-2 py-0.5 hover:bg-stone-200 font-bold border-l border-stone-200 text-emerald-700"
                              >
                                +10
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BULK INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base font-display text-stone-900">
                  Wholesale & B2B Inquiry Inbox
                </h3>
                <p className="text-xs text-stone-500">
                  Direct inquiries received from commercial food processors, caterers, and oil distributors.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                      <tr>
                        <th className="p-3.5">Inquiry ID & Date</th>
                        <th className="p-3.5">Company & Contact</th>
                        <th className="p-3.5">Volume & Packaging</th>
                        <th className="p-3.5">Location</th>
                        <th className="p-3.5">Requirement Notes</th>
                        <th className="p-3.5">Lead Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {bulkInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-stone-50/70">
                          <td className="p-3.5">
                            <span className="font-mono font-bold text-stone-900 block">{inq.id}</span>
                            <span className="text-[11px] text-stone-400 font-mono">{inq.date}</span>
                          </td>

                          <td className="p-3.5">
                            <span className="font-bold text-stone-900 block">{inq.companyName}</span>
                            <span className="text-stone-600">{inq.contactPerson}</span>
                            <span className="text-[11px] text-stone-500 block font-mono">{inq.phone}</span>
                          </td>

                          <td className="p-3.5">
                            <span className="font-bold text-amber-800 block">{inq.requiredVolume}</span>
                            <span className="text-[11px] text-stone-500">{inq.packagingPreference}</span>
                          </td>

                          <td className="p-3.5">
                            <span className="text-stone-800">{inq.city}, {inq.state}</span>
                          </td>

                          <td className="p-3.5 max-w-xs text-stone-600 line-clamp-2">
                            {inq.notes || 'Standard wholesale inquiry'}
                          </td>

                          <td className="p-3.5">
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                              className="border border-stone-300 rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:border-amber-600 bg-white"
                            >
                              <option value="new">New Lead</option>
                              <option value="contacted">Contacted</option>
                              <option value="sample_sent">Sample Sent</option>
                              <option value="quote_sent">Quote Sent</option>
                              <option value="converted">Converted</option>
                            </select>
                          </td>

                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => {
                                const clean = inq.phone.replace(/[^0-9]/g, '');
                                const text = encodeURIComponent(
                                  `Hello ${inq.contactPerson}, this is Arsh Agro Industry following up on your bulk mustard oil RFQ #${inq.id} for ${inq.requiredVolume}. We are ready to share our official laboratory certificate and wholesale pricing.`
                                );
                                window.open(`https://wa.me/${clean}?text=${text}`, '_blank');
                              }}
                              className="bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1.5 rounded text-[11px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GATEWAY & INTEGRATION SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white p-6 rounded-xl border border-stone-200 space-y-6">
              <div>
                <h3 className="font-bold text-base font-display text-stone-900">
                  Integration & API Credentials
                </h3>
                <p className="text-xs text-stone-500">
                  Manage Razorpay payment gateway credentials, Shiprocket logistics mode, and automated WhatsApp alert triggers.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Razorpay Gateway */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                      <span>Razorpay Payment Gateway</span>
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      End-to-End Encrypted
                    </span>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Razorpay Key ID
                    </label>
                    <input
                      type="text"
                      value={settings.razorpayKeyId}
                      onChange={(e) => updateSettings({ razorpayKeyId: e.target.value })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 font-mono text-xs bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rzp_mode"
                        checked={settings.razorpayMode === 'test'}
                        onChange={() => updateSettings({ razorpayMode: 'test' })}
                        className="text-amber-600"
                      />
                      <span>Sandbox / Test Mode</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rzp_mode"
                        checked={settings.razorpayMode === 'live'}
                        onChange={() => updateSettings({ razorpayMode: 'live' })}
                        className="text-amber-600"
                      />
                      <span>Live Production Mode</span>
                    </label>
                  </div>
                </div>

                {/* WhatsApp Order Notification Number */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>WhatsApp Business Notification Dispatch</span>
                  </span>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Business WhatsApp Number (with country code, no + or spaces)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                      placeholder="919829011452"
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 font-mono text-xs bg-white"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      When users place orders or click WhatsApp Buy, pre-formatted order invoices and RFQs are routed to this number.
                    </p>
                  </div>
                </div>

                {/* Shiprocket Delivery Engine */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <span className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-700" />
                    <span>Shiprocket Logistics API</span>
                  </span>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Free Shipping Cart Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => updateSettings({ freeShippingThreshold: Number(e.target.value) })}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 font-mono text-xs bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
