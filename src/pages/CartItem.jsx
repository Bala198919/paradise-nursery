import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/CartSlice';

// Fallback image if plant photo fails to load
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23e8f5e9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='24' fill='%232e7d32'%3E%F0%9F%8C%BF%3C/text%3E%3C/svg%3E";

/**
 * CartItem Component — Task 7 (Shopping Cart Page)
 * Displays shopping cart contents, item counts, unit & line prices, overall total,
 * quantity adjustments (+/- strictly >= 1), plant deletion, Checkout alert, and Continue Shopping.
 */
function CartItem({ onNavigate, onContinueShopping, onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  // Total quantity of plants in cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Overall cart total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Increase item quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease item quantity (preventing 0 or negative quantities)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  // Remove plant from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // Continue shopping button click
  const handleContinueShopping = (e) => {
    e?.preventDefault?.();
    if (onContinueShopping) {
      onContinueShopping();
    } else if (onNavigate) {
      onNavigate('plants');
    }
  };

  // Home navigation
  const handleHomeClick = (e) => {
    e?.preventDefault?.();
    if (onHomeClick) {
      onHomeClick();
    } else if (onNavigate) {
      onNavigate('home');
    }
  };

  // Checkout button click handler
  const handleCheckout = () => {
    setCheckoutMessage(
      '🌱 Checkout Coming Soon! Thank you for choosing Paradise Nursery. We are preparing our secure payment gateway.'
    );
  };

  return (
    <div className="cart-page-container">
      {/* Navigation Bar */}
      <nav className="navbar" aria-label="Cart Navigation">
        <div className="nav-brand" onClick={handleHomeClick} role="button" tabIndex={0}>
          <span className="brand-icon">🌿</span>
          <div className="brand-text">
            <span className="brand-name">Paradise Nursery</span>
            <span className="brand-tagline">Where Greenery Flourishes</span>
          </div>
        </div>

        <div className="nav-links">
          <button
            type="button"
            className="nav-link-btn"
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={handleContinueShopping}
          >
            Plants
          </button>
          <button
            type="button"
            className="nav-link-btn cart-nav-btn active"
            aria-label={`Shopping Cart with ${totalQuantity} items`}
          >
            <span className="cart-nav-icon">🛒</span>
            <span className="cart-nav-label">Cart</span>
            {totalQuantity > 0 && (
              <span className="cart-count-badge">{totalQuantity}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Main Cart Content Area */}
      <main className="cart-main-content">
        <header className="cart-header">
          <h1 className="cart-title">Your Shopping Cart</h1>
          <p className="cart-subtitle">
            Review your selected houseplants, adjust quantities, and proceed to checkout.
          </p>
        </header>

        {/* Checkout Modal / Notification */}
        {checkoutMessage && (
          <aside className="checkout-alert" role="status" aria-live="polite">
            <span className="alert-text">{checkoutMessage}</span>
            <button
              type="button"
              className="alert-close-btn"
              onClick={() => setCheckoutMessage('')}
              aria-label="Dismiss alert"
            >
              ✕
            </button>
          </aside>
        )}

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="empty-cart-card">
            <div className="empty-cart-icon">🪴</div>
            <h2 className="empty-cart-title">Your Cart is Currently Empty</h2>
            <p className="empty-cart-text">
              Looks like you haven't added any green companions to your sanctuary yet.
              Browse our air-purifying, succulent, and low-light plants to get started!
            </p>
            <button
              type="button"
              className="btn-continue-shopping primary"
              onClick={handleContinueShopping}
            >
              ← Explore Plants
            </button>
          </div>
        ) : (
          /* Cart With Items */
          <div className="cart-layout">
            {/* List of Cart Items */}
            <section className="cart-items-section" aria-label="Cart Items List">
              {cartItems.map((item) => {
                const itemTotal = (item.price * item.quantity).toFixed(2);
                return (
                  <article key={item.id} className="cart-item-card">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-thumbnail"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />

                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <span className="cart-item-category">{item.category}</span>
                      </div>
                      <div className="cart-item-unit-price">
                        Unit Price: <strong>${item.price.toFixed(2)}</strong>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="cart-item-controls">
                      <div className="quantity-controller" aria-label={`Quantity for ${item.name}`}>
                        <button
                          type="button"
                          className="qty-btn minus"
                          onClick={() => handleDecrement(item)}
                          disabled={item.quantity <= 1}
                          aria-label={`Decrease quantity of ${item.name}`}
                          title={item.quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
                        >
                          −
                        </button>
                        <span className="qty-value" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="qty-btn plus"
                          onClick={() => handleIncrement(item)}
                          aria-label={`Increase quantity of ${item.name}`}
                          title="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal for this plant */}
                      <div className="cart-item-subtotal">
                        <span className="subtotal-label">Subtotal:</span>
                        <span className="subtotal-amount">${itemTotal}</span>
                      </div>

                      {/* Delete Item Button */}
                      <button
                        type="button"
                        className="btn-delete-item"
                        onClick={() => handleRemove(item)}
                        aria-label={`Remove ${item.name} from cart`}
                        title="Remove item from cart"
                      >
                        <span className="trash-icon">🗑</span>
                        <span className="delete-text">Delete</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Cart Summary Card */}
            <aside className="cart-summary-card" aria-label="Order Summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-row">
                <span className="summary-label">Total Plants:</span>
                <span className="summary-value highlight">{totalQuantity}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Estimated Shipping:</span>
                <span className="summary-value free">FREE</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-row grand-total">
                <span className="summary-label">Total Amount:</span>
                <span className="summary-value total-price">${totalAmount.toFixed(2)}</span>
              </div>

              <div className="cart-actions">
                <button
                  type="button"
                  className="btn-checkout"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>

                <button
                  type="button"
                  className="btn-continue-shopping secondary"
                  onClick={handleContinueShopping}
                >
                  ← Continue Shopping
                </button>
              </div>

              <div className="guarantee-box">
                <span className="guarantee-icon">🛡️</span>
                <p className="guarantee-text">
                  30-day Healthy Plant Guarantee. All plants packaged in thermal-insulated, recyclable boxing.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartItem;
