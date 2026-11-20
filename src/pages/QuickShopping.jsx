import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  ShoppingBag,
  Sparkles,
  X,
  SlidersHorizontal,
  Flame,
  Check
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { GoldStripeRibbon, GoldStripeDivider } from '../components/GoldStripe';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';
import '../styles/QuickShopping.css';

const QuickShopping = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { cartCount, total, savings, openCart } = useCart();

  // Sync category and search query state with URL search params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('search');
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' || product.categorySlug === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description &&
            product.description.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.offerPrice - b.offerPrice;
        if (sortBy === 'price-high') return b.offerPrice - a.offerPrice;
        if (sortBy === 'discount') {
          const discA = (a.price - a.offerPrice) / a.price;
          const discB = (b.price - b.offerPrice) / b.price;
          return discB - discA;
        }
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        // Default: featured/bestseller first
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="shopping-page">
      {/* Page Header */}
      <section className="shopping-hero">
        <div className="container">
          <div className="shopping-hero-badge">
            <Flame size={14} className="hero-flame-icon" /> 2026 SIVAKASI FESTIVE CATALOG
          </div>
          <h1 className="shopping-hero-title">Quick Shopping Store</h1>
          <p className="shopping-hero-subtitle">
            Order authentic Sivakasi crackers directly from the factory at wholesale prices. Flat 70% discount applied to all items.
          </p>

          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search crackers by name (e.g. Anar, Sparklers, 1000 Wala, Gift Box)..."
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gold Stripe Ribbon under Header */}
      <GoldStripeRibbon />

      {/* Main Shopping Section */}
      <section className="section shopping-main-section">
        <div className="container">
          {/* Filter & Sort Bar */}
          <div className="controls-bar gold-stripe-top">
            {/* Category Filter Pills */}
            <div className="category-pills-row">
              <button
                className={`cat-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                All Categories ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-pill ${selectedCategory === cat.slug ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.slug)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-box">
              <ArrowUpDown size={16} className="sort-icon" />
              <span className="sort-label">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount %</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Active Search / Filter Status */}
          <div className="results-status">
            <span>
              Showing <strong>{filteredProducts.length}</strong> cracker items
              {selectedCategory !== 'all' && (
                <> in <em>{categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</em></>
              )}
              {searchTerm && <> matching "<strong>{searchTerm}</strong>"</>}
            </span>

            {(selectedCategory !== 'all' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                }}
                className="reset-filters-btn"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="shopping-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="no-products-state gold-stripe-top">
              <ShoppingBag size={56} className="no-prod-icon" />
              <h3>No crackers found</h3>
              <p>We could not find any products matching your search criteria. Try a different keyword or reset filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="btn btn-primary"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Gold Stripe Ribbon before Footer */}
      <GoldStripeRibbon />

      {/* Floating Bottom Cart Bar */}
      {cartCount > 0 && (
        <div className="floating-cart-bar no-print">
          <div className="container floating-cart-container">
            <div className="floating-cart-info">
              <span className="floating-count">{cartCount} items in cart</span>
              <span className="floating-divider">•</span>
              <span className="floating-price">Total: ₹{total}</span>
              <span className="floating-savings">(You Save ₹{savings})</span>
            </div>
            <button onClick={openCart} className="btn btn-primary btn-sm floating-cart-btn">
              <ShoppingBag size={16} /> View Cart &amp; Checkout
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default QuickShopping;
