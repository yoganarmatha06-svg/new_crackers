import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Percent,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import Hero from '../components/Hero';
import WelcomeSection from '../components/WelcomeSection';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import StatsStrip from '../components/StatsStrip';
import DiwaliFeatures from '../components/DiwaliFeatures';
import TrustFeaturesBar from '../components/TrustFeaturesBar';
import { GoldStripeRibbon, GoldStripeDivider } from '../components/GoldStripe';
import { categories } from '../data/categories';
import { products, getFeaturedProducts } from '../data/products';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('flower-pots');
  const [activeTab, setActiveTab] = useState('all');

  const handleCategoryCardClick = (product) => {
    let slug = 'flower-pots';
    if (!product) {
      navigate('/quick-shopping');
      return;
    }

    const cat = (product.category || '').toLowerCase();
    const catSlug = (product.categorySlug || '').toLowerCase();
    const prodName = (product.name || '').toLowerCase();

    if (cat.includes('rocket') || catSlug.includes('rocket')) {
      slug = 'rockets';
    } else if (
      cat.includes('bomb') ||
      catSlug.includes('bomb') ||
      prodName.includes('bomb')
    ) {
      slug = 'classic-bombs';
    } else if (
      cat.includes('sky shot') ||
      catSlug === 'sky-shots' ||
      catSlug === 'sky-shot' ||
      catSlug === 'fancy-crackers'
    ) {
      slug = 'sky-shots';
    } else if (cat.includes('sparkler') || catSlug.includes('sparkler')) {
      slug = 'sparklers';
    } else if (cat.includes('chakkar') || catSlug.includes('chakkar')) {
      slug = 'ground-chakkars';
    } else if (product.categorySlug) {
      slug = product.categorySlug;
    }

    navigate(`/quick-shopping?category=${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Exactly 5 Signature Products for "Our Products" Showcase:
  // 1. Flower Pots, 2. Deluxe Giant Golden, 3. Tri-Colour, 4. Rocket, 5. Sky Shot
  const categoryProducts = useMemo(() => {
    const p1 = products.find((p) => p.id === 1);
    const p2 = products.find((p) => p.id === 2);
    const p3 = products.find((p) => p.id === 3);
    const p4 = products.find((p) => p.id === 25 || p.category === 'Rocket' || p.categorySlug === 'rockets');
    const p5 = products.find((p) => p.id === 26 || p.category === 'Sky Shot' || p.categorySlug === 'sky-shots');
    const list = [p1, p2, p3, p4, p5].filter(Boolean);
    return list.length === 5 ? list : products.slice(0, 5);
  }, []);

  const activeCategory = categories.find((c) => c.slug === selectedCategory) || categories[0];

  const featuredList = getFeaturedProducts();

  // Filter products based on selected tab
  const getTabProducts = () => {
    if (activeTab === 'all') return products.slice(0, 8);
    if (activeTab === 'bestsellers') return products.filter((p) => p.isBestseller).slice(0, 8);
    if (activeTab === 'gift-boxes') return products.filter((p) => p.categorySlug === 'gift-boxes');
    if (activeTab === 'sparklers') return products.filter((p) => p.categorySlug === 'sparklers');
    if (activeTab === 'flower-pots') return products.filter((p) => p.categorySlug === 'flower-pots');
    return products.slice(0, 8);
  };

  const currentProducts = getTabProducts();

  return (
    <div className="home-page">
      {/* 1. Hero Banner Section */}
      <Hero />

      {/* Gold Stripe Ribbon under Hero */}
      <GoldStripeRibbon />

      {/* Welcome to NEW CRACKERS Brand Showcase Section with Scroll Reveal Animation */}
      <WelcomeSection />

      {/* 2. Interactive Products Showcase Section (Directly below Banner) */}
      <section className="section home-category-showcase-section" id="categories">
        <div className="container">
          {/* Centered Our Products Header */}
          <div className="section-header our-products-header">
            <span className="section-badge">
              <Sparkles size={14} /> SIVAKASI DIRECT FIREWORKS
            </span>
            <h2 className="section-title">Our Products</h2>
            <p className="section-subtitle">
              Handpicked premium Diwali crackers direct from Sivakasi factories with flat 70% wholesale discount.
            </p>
          </div>

          {/* Exactly 5 Products Grid (Responsive 5-column on desktop, 2-column on mobile) */}
          <div className="category-5-products-grid">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
                onCardClick={handleCategoryCardClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="SIVAKASI DIRECT WHOLESALE ADVANTAGE" />

      {/* 3. Key Stats Strip (Scroll-Triggered Animated Counting) */}
      <StatsStrip />

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="FESTIVAL FAVORITES &amp; BESTSELLERS" />

      {/* 4. Featured Products Section */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <TrendingUp size={14} /> FESTIVAL FAVORITES
            </span>
            <h2 className="section-title">Our Categories</h2>
            <p className="section-subtitle">
              Most loved fireworks of this season. Genuine Sivakasi quality tested for brilliant colors, long burn times, and maximum safety.
            </p>

            {/* Filter Tabs */}
            <div className="product-filter-tabs">
              <button
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Popular
              </button>
              <button
                className={`tab-btn ${activeTab === 'bestsellers' ? 'active' : ''}`}
                onClick={() => setActiveTab('bestsellers')}
              >
                Top Bestsellers
              </button>
              <button
                className={`tab-btn ${activeTab === 'gift-boxes' ? 'active' : ''}`}
                onClick={() => setActiveTab('gift-boxes')}
              >
                Family Gift Boxes
              </button>
              <button
                className={`tab-btn ${activeTab === 'flower-pots' ? 'active' : ''}`}
                onClick={() => setActiveTab('flower-pots')}
              >
                Flower Pots
              </button>
              <button
                className={`tab-btn ${activeTab === 'sparklers' ? 'active' : ''}`}
                onClick={() => setActiveTab('sparklers')}
              >
                Sparklers
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
                onCardClick={handleCategoryCardClick}
              />
            ))}
          </div>

          {/* View All CTA */}
          <div className="featured-bottom-cta">
            <Link to="/quick-shopping" className="btn btn-primary">
              View All 24+ Fireworks <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sivakasi Trust & Guarantee Features Strip */}
      <TrustFeaturesBar />

      {/* 5. Diwali Features / The Sivakasi Promise (Scroll-Animated Center Diwali Layout) */}
      <DiwaliFeatures />

      {/* 8. Safety Tips Quick Box */}
      <section className="safety-preview-section">
        <div className="container">
          <div className="safety-preview-card gold-stripe-top">
            <div className="safety-text">
              <div className="safety-tag">
                <AlertTriangle size={15} /> CELEBRATE RESPONSIBLY
              </div>
              <h3>Safety Guidelines for a Bright &amp; Safe Diwali</h3>
              <p>
                Always light fireworks outdoors, maintain a bucket of water nearby, wear cotton clothing, and supervise young children.
              </p>
            </div>
            <Link to="/about#safety" className="btn btn-secondary">
              Read Complete Safety Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Final Gold Stripe Ribbon */}
      <GoldStripeRibbon />

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

export default Home;
