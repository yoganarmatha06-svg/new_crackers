import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Percent,
  CheckCircle,
  AlertTriangle,
  Star,
  ArrowRight,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import Hero from '../components/Hero';
import WelcomeSection from '../components/WelcomeSection';
import SkyShotFireworks from '../components/SkyShotFireworks';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import FestivalBanner from '../components/FestivalBanner';
import { GoldStripeRibbon, GoldStripeDivider } from '../components/GoldStripe';
import { categories } from '../data/categories';
import { products, getFeaturedProducts } from '../data/products';
import '../styles/Home.css';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('flower-pots');
  const [activeTab, setActiveTab] = useState('all');

  // Filter exactly 5 products for the selected category (no mixing)
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.categorySlug === selectedCategory).slice(0, 5);
  }, [selectedCategory]);

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

  const testimonials = [
    {
      id: 1,
      name: 'Ramesh Sundaram',
      city: 'Chennai',
      rating: 5,
      comment:
        'Outstanding quality crackers! Ordered the 50-item Mega Anandam Gift Box. Everything arrived in waterproof secure packaging well before Diwali. The flower pots and peacock fountains were stunning.',
      verified: 'Verified Sivakasi Buyer'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      city: 'Bengaluru',
      rating: 5,
      comment:
        'The green sparklers and kids pop-pops were safe and produced very low smoke. The factory direct prices are genuinely half of Bangalore street prices. New Crackers has become our family Diwali tradition!',
      verified: 'Verified Sivakasi Buyer'
    },
    {
      id: 3,
      name: 'Karthik Raja',
      city: 'Coimbatore',
      rating: 5,
      comment:
        'The 30-shot sky symphony repeater was the highlight of our apartment complex celebration! Amazing colors and synchronized firing. The WhatsApp order confirmation and tracking was super smooth.',
      verified: 'Verified Sivakasi Buyer'
    }
  ];

  return (
    <div className="home-page">
      {/* Infinite SkyShot Fireworks Blast Animation (every 3 seconds) */}
      <SkyShotFireworks />

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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="SIVAKASI DIRECT WHOLESALE ADVANTAGE" />

      {/* 3. Key Stats Strip */}
      <section className="stats-strip">
        <div className="container stats-container">
          <div className="stat-card">
            <span className="stat-num">30+</span>
            <span className="stat-label">Years Sivakasi Heritage</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">100+</span>
            <span className="stat-label">Green Cracker Varieties</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">50k+</span>
            <span className="stat-label">Delighted Indian Families</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">70%</span>
            <span className="stat-label">Factory Direct Savings</span>
          </div>
        </div>
      </section>

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="FESTIVAL FAVORITES &amp; BESTSELLERS" />

      {/* 4. Featured Products Section */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <TrendingUp size={14} /> FESTIVAL FAVORITES
            </span>
            <h2 className="section-title">Featured Diwali Crackers</h2>
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

      {/* Gold Stripe Ribbon before Festival Banner */}
      <GoldStripeRibbon />

      {/* 5. Festival Banner */}
      <FestivalBanner />

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="THE SIVAKASI PROMISE" />

      {/* 6. Why Choose Us Section */}
      <section className="section why-choose-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <Award size={14} /> THE SIVAKASI PROMISE
            </span>
            <h2 className="section-title">Why Choose New Crackers?</h2>
            <p className="section-subtitle">
              When you celebrate Diwali with your loved ones, you deserve genuine quality, tested safety, and honest factory pricing.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card gold-stripe-top">
              <div className="why-icon-box">
                <Award size={32} />
              </div>
              <h3>Best Quality Products</h3>
              <p>
                Direct from licensed Sivakasi manufacturers. Pure chemical formulations ensuring vibrant hues, steady burns, and zero misfires.
              </p>
            </div>

            <div className="why-card gold-stripe-top">
              <div className="why-icon-box">
                <Percent size={32} />
              </div>
              <h3>Affordable Factory Prices</h3>
              <p>
                Eliminating middlemen and retail markups. Enjoy direct wholesale factory pricing with pre-booking discounts of up to 70% off MRP.
              </p>
            </div>

            <div className="why-card gold-stripe-top">
              <div className="why-icon-box">
                <PackageCheck size={32} />
              </div>
              <h3>Safe Fireproof Packaging</h3>
              <p>
                Every order is hand-inspected, packed in moisture-resistant bubble wraps, and sealed inside heavy-duty corrugated safety cartons.
              </p>
            </div>

            <div className="why-card gold-stripe-top">
              <div className="why-icon-box">
                <Truck size={32} />
              </div>
              <h3>Fast &amp; Tracked Delivery</h3>
              <p>
                Partnered with dedicated road transport networks across India with live consignment tracking and timely pre-Diwali delivery.
              </p>
            </div>

            <div className="why-card gold-stripe-top">
              <div className="why-icon-box">
                <ShieldCheck size={32} />
              </div>
              <h3>100% Green Certified</h3>
              <p>
                Complies strictly with Supreme Court and CSIR-NEERI green cracker standards with QR code verification and 30% reduced emissions.
              </p>
            </div>

            <div className="why-card gold-stripe-top">
              <div className="why-icon-box">
                <HeartHandshake size={32} />
              </div>
              <h3>Customer Satisfaction</h3>
              <p>
                Over 50,000 delighted families across 30 years. Dedicated WhatsApp and phone support team ready to assist you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Stripe Divider */}
      <GoldStripeDivider label="HAPPY CUSTOMER REVIEWS" />

      {/* 7. Customer Reviews */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <Star size={14} /> CELEBRATION STORIES
            </span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Read how thousands of families made their Diwali celebrations grander and safer with New Crackers Sivakasi.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card gold-stripe-top">
                <div className="test-rating">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-fill" />
                  ))}
                </div>
                <p className="test-comment">"{t.comment}"</p>
                <div className="test-author">
                  <div className="author-avatar">{t.name[0]}</div>
                  <div>
                    <h4 className="author-name">{t.name}</h4>
                    <span className="author-city">{t.city} • <span className="verified-text">{t.verified}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
