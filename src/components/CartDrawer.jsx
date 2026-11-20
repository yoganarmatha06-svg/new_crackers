import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/CartDrawer.css';

const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartCount,
    subtotal,
    total,
    savings,
    discountPercentage,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  if (!isCartOpen) return null;

  // Format cart items into WhatsApp order message
  const handleWhatsAppCheckout = () => {
    let orderText = `🪔 *DIWALI CRACKERS PRE-BOOKING ORDER*\n`;
    orderText += `*Shop:* New Crackers Sivakasi\n`;
    orderText += `-------------------------------------\n`;
    cartItems.forEach((item, index) => {
      orderText += `${index + 1}. *${item.name}*\n   Qty: ${item.quantity} × ₹${item.offerPrice} = ₹${item.quantity * item.offerPrice}\n`;
    });
    orderText += `-------------------------------------\n`;
    orderText += `*Total Items:* ${cartCount}\n`;
    orderText += `*Original MRP:* ₹${subtotal}\n`;
    orderText += `*Festive Savings:* ₹${savings} (${discountPercentage}% OFF)\n`;
    orderText += `*Final Payable Amount:* ₹${total}\n\n`;
    orderText += `Please confirm my order booking and share payment & dispatch details. Thank you!`;

    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/919842112345?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} className="header-bag-icon" />
            <h3>Your Shopping Cart</h3>
            <span className="cart-count-pill">{cartCount} items</span>
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body: Empty or List */}
        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <div className="empty-icon-circle">
              <ShoppingBag size={48} className="empty-icon" />
            </div>
            <h4>Your cart is empty!</h4>
            <p>Add some vibrant Sivakasi crackers to celebrate this Diwali with joy and happiness.</p>
            <Link to="/quick-shopping" onClick={closeCart} className="btn btn-primary">
              Start Shopping Now <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-img-box">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cart-remove-btn"
                        title="Remove item"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-item-meta">
                      <span className="item-unit">{item.unit}</span>
                      <span className="item-price">₹{item.offerPrice} each</span>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="drawer-qty-selector">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="drawer-qty-btn"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="drawer-qty-val">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="drawer-qty-btn"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="item-total-price">
                        ₹{item.offerPrice * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer with Calculation & Actions */}
            <div className="cart-drawer-footer">
              <div className="price-breakdown">
                <div className="breakdown-row">
                  <span>Total MRP Value</span>
                  <span className="strike">₹{subtotal}</span>
                </div>
                <div className="breakdown-row discount">
                  <span>Festive Discount ({discountPercentage}%)</span>
                  <span>- ₹{savings}</span>
                </div>
                <div className="breakdown-row grand-total">
                  <span>Estimated Total</span>
                  <span className="total-val">₹{total}</span>
                </div>
              </div>

              <div className="cart-savings-banner">
                <Sparkles size={14} /> Congratulations! You saved <strong>₹{savings}</strong> on this order.
              </div>

              <div className="cart-actions-column">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="btn btn-primary drawer-checkout-btn"
                >
                  <MessageSquare size={18} /> Book Order via WhatsApp
                </button>

                <div className="drawer-sub-actions">
                  <Link
                    to="/quick-shopping"
                    onClick={closeCart}
                    className="btn btn-secondary btn-sm"
                  >
                    Add More Items
                  </Link>
                  <button onClick={clearCart} className="btn-clear-cart">
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
