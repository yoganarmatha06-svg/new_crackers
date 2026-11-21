import React, { useState } from 'react';
import { ShoppingCart, Eye, Star, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onQuickView, onCardClick, hideCart = false }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const discountPercent = Math.round(
    ((product.price - product.offerPrice) / product.price) * 100
  );

  const handleIncrement = (e) => {
    e?.stopPropagation();
    setQty((prev) => Math.min(prev + 1, product.availableQty || 99));
  };

  const handleDecrement = (e) => {
    e?.stopPropagation();
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (e) => {
    e?.stopPropagation();
    addToCart(product, qty);
    setQty(1); // reset quantity counter after adding
  };

  const handleCardClick = (e) => {
    // If click originated from interactive buttons or controls, do not navigate
    if (
      e.target.closest('.card-actions') ||
      e.target.closest('.btn-card-view-details') ||
      e.target.closest('.quick-view-btn') ||
      e.target.closest('.qty-btn') ||
      e.target.closest('.add-cart-btn')
    ) {
      return;
    }
    if (onCardClick) {
      onCardClick(product);
    }
  };

  return (
    <div
      className={`product-card ${onCardClick ? 'is-clickable' : ''} ${hideCart ? 'hide-cart' : ''}`}
      onClick={handleCardClick}
    >
      {/* Top Badges */}
      <div className="card-top-badges">
        <span className="badge badge-discount">{discountPercent}% OFF</span>
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
            onClick={(e) => {
              e.stopPropagation();
              onQuickView && onQuickView(product);
            }}
            className="quick-view-btn"
            title="View Details"
            aria-label="Quick View Details"
            type="button"
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
        {!hideCart && (
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
        )}

        {/* View Details / Explore Category Button */}
        <button
          onClick={(e) => {
            if (hideCart && onCardClick) {
              e.stopPropagation();
              onCardClick(product);
            } else if (onQuickView) {
              e.stopPropagation();
              onQuickView(product);
            }
          }}
          className="btn-card-view-details"
          title={hideCart ? 'View Products' : 'View Details'}
          type="button"
        >
          {hideCart ? (
            <>
              <span>View Products</span> <ArrowRight size={14} />
            </>
          ) : (
            <>
              <Eye size={14} /> <span>View Details</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
