import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, products } = useStore();
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || '100% Pure Kachi Ghani Mustard Oil');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [highlight, setHighlight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    addReview({
      author,
      location: location || 'India',
      productName: selectedProduct,
      rating,
      comment,
      highlight: highlight || undefined
    });

    // Reset and close
    setAuthor('');
    setLocation('');
    setComment('');
    setHighlight('');
    setShowReviewModal(false);
  };

  return (
    <section id="reviews" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with aggregate score */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold text-amber-800 tracking-wider uppercase">
              Real Customer Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display mt-1">
              Verified Buyer Reviews & Testimonials
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Authentic stories from home chefs, traditional Bengali & Rajasthani households, Ayurvedic practitioners, and commercial kitchens.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 p-4 rounded-xl shrink-0">
            <div className="text-right">
              <div className="flex items-center justify-end text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                <strong className="text-stone-900 font-bold font-mono-num">4.9 / 5.0</strong> based on 800+ orders
              </p>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-50 rounded-xl border border-stone-200 p-5 flex flex-col justify-between hover:shadow-xs transition-shadow"
            >
              <div>
                {/* Rating & Highlight */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-500' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono-num">{rev.date}</span>
                </div>

                {rev.highlight && (
                  <p className="text-xs font-bold text-amber-900 mb-1.5 font-display">
                    "{rev.highlight}"
                  </p>
                )}

                <p className="text-xs text-stone-700 leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-3 border-t border-stone-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{rev.author}</h4>
                    <p className="text-[11px] text-stone-500">{rev.location}</p>
                  </div>

                  {rev.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-medium bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-stone-400 mt-1 truncate">
                  Purchased: {rev.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 border border-stone-200 relative">
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <h3 className="font-bold text-lg font-display text-stone-900">
                  Share Your Experience
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Your feedback helps other households discover pure cold-pressed purity.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Select Purchased Product
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Meera Joshi"
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      City, State
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Jaipur, RJ"
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                {/* Rating Stars Selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Your Rating: {rating} / 5 Stars
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Summary Headline
                  </label>
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    placeholder="e.g. Authentic pungency and aroma for pickling!"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Review Details *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was the flavor, pungency, cooking performance, or delivery?"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-4 py-2 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs px-5 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
