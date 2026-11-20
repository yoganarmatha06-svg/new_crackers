import React, { useState } from 'react';
import { ShoppingCart, Eye, Star, Plus, Minus, ShieldCheck, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onQuickView }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

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
    setQty(1); // reset quantity counter after adding
  };

  return (
    <div className="product-card">
      {/* Top Badges */}
      <div className="card-top-badges">
        <span className="badge badge-discount">{discountPercent}% OFF</span>
        {product.isGreenCracker && (
          <span className="badge badge-green" title="CSIR-NEERI Approved Green Cracker">
            <ShieldCheck size={12} /> Green
          </span>
        )}
      </div>

      {/* Product Image Box */}
      <div className="card-img-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
        <div className="card-quick-actions">
          <button
            onClick={() => onQuickView && onQuickView(product)}
            className="quick-view-btn"
            title="View Details"
            aria-label="Quick View Details"
          >
            <Eye size={16} /> View Details
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="card-body">
        <div className="card-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <Star size={13} className="star-icon" />
            <span>{product.rating}</span>
            <span className="review-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>

        <div className="product-unit">
          <span>Packing:</span> <strong>{product.unit}</strong>
        </div>

        <div className="product-pricing">
          <div className="price-box">
            <span className="offer-price">₹{product.offerPrice}</span>
            <span className="mrp-price">₹{product.price}</span>
          </div>
          <span className="savings-pill">Save ₹{product.price - product.offerPrice}</span>
        </div>

        {/* Quantity Selector & Add To Cart Button */}
        <div className="card-actions">
          <div className="qty-selector">
            <button
              onClick={handleDecrement}
              className="qty-btn"
              aria-label="Decrease quantity"
              disabled={qty <= 1}
              type="button"
            >
              <Minus size={13} />
            </button>
            <span className="qty-value">{qty}</span>
            <button
              onClick={handleIncrement}
              className="qty-btn"
              aria-label="Increase quantity"
              disabled={qty >= product.availableQty}
              type="button"
            >
              <Plus size={13} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn btn-primary add-cart-btn"
            disabled={!product.inStock}
            type="button"
          >
            <ShoppingCart size={14} className="cart-btn-icon" />
            <span className="add-cart-text">{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onQuickView && onQuickView(product)}
          className="btn-card-view-details"
          title="View Details"
          type="button"
        >
          <Eye size={14} /> <span>View Details</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
