import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingCart, Star, ShieldCheck, Volume2, Plus, Minus, CheckCircle, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { addToCart, openCart } = useCart();

  const handleCategoryExplore = () => {
    let slug = 'flower-pots';
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
    if (onClose) onClose();
  };

  const discountPercent = Math.round(
    ((product.price - product.offerPrice) / product.price) * 100
  );

  const handleIncrement = () => {
    setQty((prev) => Math.min(prev + 1, product.availableQty || 99));
  };

  const handleDecrement = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    if (openCart) openCart();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Left: Image */}
          <div className="modal-image-box">
            <img src={product.image} alt={product.name} className="modal-product-img" />
            <div className="modal-image-badges">
              <span className="badge badge-discount">{discountPercent}% OFF</span>
              {product.isGreenCracker && (
                <span className="badge badge-green">
                  <ShieldCheck size={13} /> CSIR Green Cracker
                </span>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="modal-details">
            <div
              className="modal-category"
              onClick={handleCategoryExplore}
              style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              title={`Explore all ${product.category} in Quick Shopping`}
            >
              <span>{product.category}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.85, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                • Explore in Quick Shopping <ArrowRight size={12} />
              </span>
            </div>
            <h2 className="modal-title">{product.name}</h2>

            {/* Ratings & Stock */}
            <div className="modal-rating-row">
              <div className="rating-box">
                <Star size={15} className="star-icon" />
                <span className="rating-num">{product.rating}</span>
                <span className="rating-count">({product.reviewsCount} customer reviews)</span>
              </div>
              <div className="stock-pill in-stock">
                <CheckCircle size={14} /> Available ({product.availableQty} units)
              </div>
            </div>

            {/* Pricing Box */}
            <div className="modal-pricing-box">
              <div className="modal-prices">
                <span className="modal-offer-price">₹{product.offerPrice}</span>
                <span className="modal-mrp">₹{product.price}</span>
              </div>
              <div className="modal-savings">
                You Save: ₹{product.price - product.offerPrice} ({discountPercent}%)
              </div>
              <div className="modal-unit">
                Packing Unit: <strong>{product.unit}</strong>
              </div>
            </div>

            {/* Description */}
            <div className="modal-section">
              <h4 className="modal-section-title">Product Details</h4>
              <p className="modal-desc">{product.description}</p>
            </div>

            {/* Specs & Safety */}
            <div className="modal-specs">
              <div className="spec-badge">
                <Volume2 size={16} className="spec-icon" />
                <div>
                  <span className="spec-label">Sound Level:</span>
                  <strong>{product.soundLevel || 'Permissible Green Norms'}</strong>
                </div>
              </div>
              <div className="spec-badge">
                <ShieldCheck size={16} className="spec-icon green" />
                <div>
                  <span className="spec-label">Quality Check:</span>
                  <strong>100% Sivakasi Factory Direct</strong>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            {product.safetyTips && (
              <div className="modal-safety-box">
                <AlertTriangle size={16} className="safety-icon" />
                <span><strong>Safety Guide:</strong> {product.safetyTips}</span>
              </div>
            )}

            {/* Action Row */}
            <div className="modal-actions-row">
              <div className="modal-qty-box">
                <button
                  onClick={handleDecrement}
                  className="modal-qty-btn"
                  disabled={qty <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="modal-qty-val">{qty}</span>
                <button
                  onClick={handleIncrement}
                  className="modal-qty-btn"
                  disabled={qty >= product.availableQty}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary modal-add-btn" type="button">
                <ShoppingCart size={18} /> Add {qty} to Cart • ₹{product.offerPrice * qty}
              </button>

              <button onClick={handleBuyNow} className="btn modal-buy-now-btn" type="button">
                <Zap size={18} /> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
