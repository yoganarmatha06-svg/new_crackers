import React, { useState, useMemo } from 'react';
import {
  Printer,
  Download,
  Search,
  Filter,
  ShoppingCart,
  CheckCircle,
  FileText,
  Flame,
  ArrowUpDown,
  Sparkles,
  Info
} from 'lucide-react';
import { GoldStripeRibbon, GoldStripeDivider } from '../components/GoldStripe';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';
import '../styles/PriceList.css';

const PriceList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // PDF Download simulation / Print to PDF
  const handleDownloadPDF = () => {
    window.print();
  };

  const handleQtyChange = (productId, val) => {
    const num = Math.max(1, parseInt(val) || 1);
    setQuantities((prev) => ({
      ...prev,
      [productId]: num
    }));
  };

  const handleAdd = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Overall Statistics
  const totalProducts = products.length;
  const avgDiscount = Math.round(
    products.reduce((acc, p) => acc + ((p.price - p.offerPrice) / p.price) * 100, 0) /
      products.length
  );

  return (
    <div className="pricelist-page">
      {/* Printable Header - Visible during Print */}
      <div className="print-only-header">
        <div className="print-brand-row">
          <h1>NEW CRACKERS SIVAKASI</h1>
          <p>Direct Factory Wholesale Price List 2026 • 100% CSIR-NEERI Green Crackers</p>
          <p>Factory: 142/3, Factory Road, Sivakasi West, Tamil Nadu | Phone: +91 98421 12345</p>
        </div>
        <div className="print-date">Generated on: {new Date().toLocaleDateString('en-IN')}</div>
      </div>

      {/* Screen Page Header */}
      <section className="pricelist-hero no-print">
        <div className="container">
          <div className="pricelist-badge">
            <Flame size={14} /> SIVAKASI DIRECT WHOLESALE RATE CARD
          </div>
          <h1 className="pricelist-title">Official Crackers Price List 2026</h1>
          <p className="pricelist-subtitle">
            Compare our direct Sivakasi factory wholesale rates with standard retail prices. Save up to {avgDiscount}% on pre-bookings!
          </p>

          {/* Action Buttons: Print & Download */}
          <div className="pricelist-actions-row">
            <button onClick={handlePrint} className="btn btn-gold btn-sm">
              <Printer size={16} /> Print Price List
            </button>
            <button onClick={handleDownloadPDF} className="btn btn-secondary btn-sm btn-download">
              <Download size={16} /> Download Price List (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Gold Stripe Ribbon under Header */}
      <GoldStripeRibbon />

      {/* Main Table Section */}
      <section className="section pricelist-main-section">
        <div className="container">
          {/* Controls Bar */}
          <div className="pricelist-controls no-print">
            <div className="controls-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by cracker name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="controls-search-input"
              />
            </div>

            <div className="controls-filter-box">
              <Filter size={16} className="filter-icon" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                <option value="all">All Categories ({totalProducts})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary Banner with Gold Stripes Accent */}
          <div className="pricelist-summary-bar gold-stripe-top no-print">
            <div className="summary-col">
              <span className="summary-label">Available Items:</span>
              <strong className="summary-val">{filteredProducts.length} Cracker Varieties</strong>
            </div>
            <div className="summary-col">
              <span className="summary-label">Average Discount:</span>
              <strong className="summary-val green">{avgDiscount}% Factory OFF</strong>
            </div>
            <div className="summary-col">
              <span className="summary-label">Certification:</span>
              <strong className="summary-val gold">100% CSIR Green Crackers</strong>
            </div>
          </div>

          {/* Clean Price List Table with Top Gold Stripe Accent */}
          <div className="table-responsive-wrapper gold-stripe-top">
            <table className="pricelist-table">
              <thead>
                <tr>
                  <th className="th-sno">S.No</th>
                  <th className="th-img">Image</th>
                  <th className="th-name">Product Name</th>
                  <th className="th-cat">Category</th>
                  <th className="th-unit">Packing Unit</th>
                  <th className="th-mrp">MRP (₹)</th>
                  <th className="th-offer">Offer Price (₹)</th>
                  <th className="th-savings">Savings</th>
                  <th className="th-action no-print">Order Now</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p, index) => {
                  const discountPercent = Math.round(
                    ((p.price - p.offerPrice) / p.price) * 100
                  );
                  const currentQty = quantities[p.id] || 1;

                  return (
                    <tr key={p.id} className="table-row">
                      <td className="td-sno">{index + 1}</td>
                      <td className="td-img">
                        <img src={p.image} alt={p.name} className="table-thumb" />
                      </td>
                      <td className="td-name">
                        <span className="product-table-title">{p.name}</span>
                        {p.isGreenCracker && (
                          <span className="table-green-tag">Green Cracker</span>
                        )}
                      </td>
                      <td className="td-cat">
                        <span className="table-cat-badge">{p.category}</span>
                      </td>
                      <td className="td-unit">{p.unit}</td>
                      <td className="td-mrp">
                        <span className="strikethrough">₹{p.price}</span>
                      </td>
                      <td className="td-offer">
                        <strong className="highlight-price">₹{p.offerPrice}</strong>
                      </td>
                      <td className="td-savings">
                        <span className="savings-tag">
                          Save ₹{p.price - p.offerPrice} ({discountPercent}%)
                        </span>
                      </td>
                      <td className="td-action no-print">
                        <div className="table-action-box">
                          <input
                            type="number"
                            min="1"
                            max={p.availableQty || 50}
                            value={currentQty}
                            onChange={(e) => handleQtyChange(p.id, e.target.value)}
                            className="table-qty-input"
                          />
                          <button
                            onClick={() => handleAdd(p)}
                            className="btn btn-primary btn-sm table-add-btn"
                            title="Add to Cart"
                          >
                            <ShoppingCart size={14} /> Add
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Printable Terms & Footnotes */}
          <div className="print-footer-notes gold-stripe-top">
            <h4>Important Purchase &amp; Booking Terms:</h4>
            <ul>
              <li>All prices quoted above are wholesale factory rates directly from Sivakasi manufacturing units.</li>
              <li>GST and standard transport freight charges apply at actuals based on delivery destination.</li>
              <li>Crackers will be securely packed in fireproof corrugated cartons and dispatched via certified carriers.</li>
              <li>Minimum order value for nationwide doorstep delivery: ₹3,000.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gold Stripe Ribbon */}
      <GoldStripeRibbon />
    </div>
  );
};

export default PriceList;
