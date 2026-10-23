import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './pages/CartItem';
import './App.css';

/**
 * App Component — Task 4 & App Integration
 * Orchestrates views (Landing / Plants / Cart) with dynamic Redux-backed cart state,
 * responsive navigation, plant-themed hero background, and clean transitions.
 */
function App() {
  // Navigation view state: 'landing' | 'plants' | 'cart'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'plants') return 'plants';
      if (hash === 'cart') return 'cart';
    }
    return 'landing';
  });

  // Global cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Sync hash with current view for back/forward navigation support
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'plants') setCurrentView('plants');
      else if (hash === 'cart') setCurrentView('cart');
      else setCurrentView('landing');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      window.location.hash = view === 'landing' ? '' : view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* 1. Landing Page View */}
      {currentView === 'landing' && (
        <div className="landing-page">
          {/* Main Navigation Bar */}
          <nav className="navbar landing-navbar" aria-label="Landing Navigation">
            <div
              className="nav-brand"
              onClick={() => navigateTo('landing')}
              role="button"
              tabIndex={0}
            >
              <span className="brand-icon">🌿</span>
              <div className="brand-text">
                <span className="brand-name">Paradise Nursery</span>
                <span className="brand-tagline">Where Greenery Flourishes</span>
              </div>
            </div>

            <div className="nav-links">
              <button
                type="button"
                className="nav-link-btn active"
                onClick={() => navigateTo('landing')}
              >
                Home
              </button>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => navigateTo('plants')}
              >
                Plants
              </button>
              <button
                type="button"
                className="nav-link-btn cart-nav-btn"
                onClick={() => navigateTo('cart')}
                aria-label={`Cart with ${totalCartCount} items`}
              >
                <span className="cart-nav-icon">🛒</span>
                <span className="cart-nav-label">Cart</span>
                {totalCartCount > 0 && (
                  <span className="cart-count-badge">{totalCartCount}</span>
                )}
              </button>
            </div>
          </nav>

          {/* Plant-Themed Hero Container */}
          <header className="landing-hero-container">
            <div className="hero-overlay">
              <div className="hero-content">
                <span className="hero-pill">🌱 Welcome to Botanical Serenity</span>
                <h1 className="hero-title">Paradise Nursery</h1>
                <p className="hero-tagline">
                  Where Greenery Meets Peace, Fresh Air & Mindful Living
                </p>
                <p className="hero-description">
                  Discover carefully cultivated houseplants designed to purify your atmosphere,
                  soothe everyday stress, and transform your home or office into a flourishing botanical sanctuary.
                </p>
                <div className="hero-actions">
                  <button
                    type="button"
                    className="btn-get-started"
                    onClick={() => navigateTo('plants')}
                    aria-label="Get Started and browse plants"
                  >
                    <span>Get Started</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* About Us Component — Task 2 */}
          <main className="landing-main">
            <AboutUs />
          </main>

          {/* Nursery Footer */}
          <footer className="app-footer">
            <div className="footer-content">
              <div className="footer-brand">
                <span className="brand-icon">🌿</span>
                <span className="footer-title">Paradise Nursery</span>
              </div>
              <p className="footer-copy">
                &copy; {new Date().getFullYear()} Paradise Nursery. Handcrafted for plant lovers everywhere.
              </p>
            </div>
          </footer>
        </div>
      )}

      {/* 2. Product Catalog View — Task 6 */}
      {currentView === 'plants' && (
        <ProductList
          onNavigate={navigateTo}
          onHomeClick={() => navigateTo('landing')}
          onCartClick={() => navigateTo('cart')}
        />
      )}

      {/* 3. Shopping Cart View — Task 7 */}
      {currentView === 'cart' && (
        <CartItem
          onNavigate={navigateTo}
          onHomeClick={() => navigateTo('landing')}
          onContinueShopping={() => navigateTo('plants')}
        />
      )}
    </div>
  );
}

export default App;
