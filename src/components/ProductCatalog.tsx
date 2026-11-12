import React from 'react';
import { ShoppingBag, Star, MessageCircle, Eye, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    addToCart,
    setSelectedProduct,
    quickBuyWhatsApp
  } = useStore();

  const categories = [
    { id: 'all', label: 'All Agro Products' },
    { id: 'kachi_ghani', label: 'Kachi Ghani (Black Mustard)' },
    { id: 'yellow_mustard', label: 'Yellow Mustard (Pili Sarson)' },
    { id: 'bulk_commercial', label: 'Bulk & Commercial Tins' },
    { id: 'agro_derivatives', label: 'Seeds & Oil Cake (Khal)' }
  ];

  // Filtering
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.volume.toLowerCase().includes(q) ||
      (product.hindiName && product.hindiName.includes(q)) ||
      product.tagline.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="shop" className="py-14 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-amber-800 tracking-wider uppercase mb-1">
              Farm-Fresh Cold Extraction
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
              Pure Mustard Oils & Agro Catalog
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              100% natural cold pressed oils from the harvest of Rajasthan mustard farms. Unrefined, lab certified, and packaged in food-safe containers.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-mono-num flex items-center gap-1">
            <span>Showing</span>
            <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong>
            <span>of {products.length} products</span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Functional Category Filter Segmented Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-700 text-white shadow-xs font-semibold'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Query Active Notification */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-lg text-xs">
            <span>
              Search results for "<strong>{searchQuery}</strong>"
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-800 hover:underline font-semibold cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <p className="text-stone-500 text-sm mb-3">No products match your search or filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={() => addToCart(product, 1)}
                onOpenDetails={() => setSelectedProduct(product)}
                onWhatsAppBuy={() => quickBuyWhatsApp(product, 1)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  onQuickAdd: () => void;
  onOpenDetails: () => void;
  onWhatsAppBuy: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onOpenDetails,
  onWhatsAppBuy
}) => {
  return (
    <div className="group bg-white rounded-xl border border-stone-200 hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      <div>
        {/* Visual Slot */}
        <div
          onClick={onOpenDetails}
          className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs">
              {product.badge}
            </div>
          )}

          {/* Volume tag */}
          <div className="absolute top-3 right-3 bg-amber-600 text-white text-[11px] font-mono-num font-semibold px-2 py-0.5 rounded shadow-xs">
            {product.volume}
          </div>

          {/* Quick inspect overlay button */}
          <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-stone-900 text-xs font-medium px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Specifications</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Metadata clean unboxed line */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="uppercase tracking-wider font-semibold text-[10px] text-amber-700">
                {product.category.replace('_', ' ')}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">{product.sku}</span>
            </div>

            {/* Pungency Indicator */}
            <div className="flex items-center gap-1" title={`Pungency rating: ${product.pungencyLevel}/5`}>
              <span className="text-[11px] text-stone-500 font-medium">Jhaanjh:</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={`w-1.5 h-2.5 rounded-xs ${
                      lvl <= product.pungencyLevel ? 'bg-amber-600' : 'bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={onOpenDetails}
            className="text-base font-bold text-stone-900 hover:text-amber-800 transition-colors cursor-pointer line-clamp-1 font-display"
          >
            {product.name}
          </h3>

          {product.hindiName && (
            <p className="text-xs text-stone-500 mb-2 font-medium">{product.hindiName}</p>
          )}

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
            {product.tagline}
          </p>

          {/* Key bullets */}
          <div className="space-y-1 mb-4 pt-2 border-t border-stone-100">
            {product.features.slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <span className="font-semibold text-stone-800 font-mono-num">{product.rating}</span>
            <span aria-hidden="true">·</span>
            <span>({product.reviewsCount} verified reviews)</span>
          </div>
        </div>
      </div>

      {/* Footer / Buy Bar */}
      <div className="px-5 pb-5 pt-3 border-t border-stone-100 bg-stone-50/50 flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xl font-bold text-stone-900 font-mono-num">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="ml-2 text-xs text-stone-400 line-through font-mono-num">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <span className={`text-[11px] font-medium ${product.stock > 10 ? 'text-emerald-700' : product.stock > 0 ? 'text-amber-700' : 'text-red-700'}`}>
            {product.stock > 10 ? 'In Stock (Ready to dispatch)' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onQuickAdd}
            disabled={product.stock <= 0}
            className="flex items-center justify-center gap-1.5 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={onWhatsAppBuy}
            className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            title="Order instantly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
