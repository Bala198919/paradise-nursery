import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice';

/**
 * Plant dataset with at least 18 unique houseplants grouped into 3 distinct categories:
 * - Air-Purifying Plants (6 plants)
 * - Succulents (6 plants)
 * - Low-Light Plants (6 plants)
 */
export const plantsData = [
  // 1. Air-Purifying Plants
  {
    id: 1,
    name: 'Snake Plant',
    category: 'Air-Purifying Plants',
    price: 18,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=600&q=80',
    description: 'Produces oxygen even at night and filters airborne toxins like benzene, xylene, and formaldehyde.',
  },
  {
    id: 2,
    name: 'Spider Plant',
    category: 'Air-Purifying Plants',
    price: 14,
    image: 'https://images.unsplash.com/photo-1572688484437-31820e39ec14?auto=format&fit=crop&w=600&q=80',
    description: 'Resilient and fast-growing, perfect for hanging baskets while neutralizing household carbon monoxide.',
  },
  {
    id: 3,
    name: 'Peace Lily',
    category: 'Air-Purifying Plants',
    price: 22,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=600&q=80',
    description: 'Graceful white blooms that break down harmful industrial gases, VOCs, and keep air wonderfully fresh.',
  },
  {
    id: 4,
    name: 'Boston Fern',
    category: 'Air-Purifying Plants',
    price: 19,
    image: 'https://images.unsplash.com/photo-1628172906954-4693a1d95471?auto=format&fit=crop&w=600&q=80',
    description: 'Feathery cascading fronds that naturally humidify dry indoor rooms and eliminate air impurities.',
  },
  {
    id: 5,
    name: 'Rubber Plant',
    category: 'Air-Purifying Plants',
    price: 25,
    image: 'https://images.unsplash.com/photo-1596724855909-5e72d8a4f61c?auto=format&fit=crop&w=600&q=80',
    description: 'Broad, glossy leaves that absorb chemical compounds and trap fine indoor dust particles with ease.',
  },
  {
    id: 6,
    name: 'English Ivy',
    category: 'Air-Purifying Plants',
    price: 16,
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
    description: 'Classic trailing climber celebrated for reducing airborne mold particles and enhancing room freshness.',
  },

  // 2. Succulents
  {
    id: 7,
    name: 'Aloe Vera',
    category: 'Succulents',
    price: 15,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
    description: 'Hardy medicinal succulent packed with cooling, restorative gel that thrives with minimal watering.',
  },
  {
    id: 8,
    name: 'Jade Plant',
    category: 'Succulents',
    price: 20,
    image: 'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=600&q=80',
    description: 'Known as the Money Plant, featuring thick, fleshy jade leaves symbolizing good luck and prosperity.',
  },
  {
    id: 9,
    name: 'Echeveria Elegans',
    category: 'Succulents',
    price: 12,
    image: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=600&q=80',
    description: 'Stunning rosette-shaped succulent with delicate pale-blue foliage that loves bright sunny windowsills.',
  },
  {
    id: 10,
    name: 'Zebra Haworthia',
    category: 'Succulents',
    price: 14,
    image: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?auto=format&fit=crop&w=600&q=80',
    description: 'Compact succulent with distinctive white horizontal zebra stripes across deep forest-green spears.',
  },
  {
    id: 11,
    name: 'String of Pearls',
    category: 'Succulents',
    price: 24,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
    description: 'Whimsical cascading succulent with bead-like foliage resembling a necklace of radiant emerald pearls.',
  },
  {
    id: 12,
    name: "Burro's Tail",
    category: 'Succulents',
    price: 18,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80',
    description: 'Dense, trailing stems packed with silvery-blue leaves, making it an extraordinary hanging statement piece.',
  },

  // 3. Low-Light Plants
  {
    id: 13,
    name: 'ZZ Plant',
    category: 'Low-Light Plants',
    price: 26,
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80',
    description: 'Virtually indestructible plant with mirror-glossy foliage that thrives even in low-lit apartment corners.',
  },
  {
    id: 14,
    name: 'Cast Iron Plant',
    category: 'Low-Light Plants',
    price: 28,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
    description: 'Earned its legendary name from surviving temperature swings, dim light, and neglect with calm grace.',
  },
  {
    id: 15,
    name: 'Golden Pothos',
    category: 'Low-Light Plants',
    price: 16,
    image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80',
    description: 'Vigorous heartleaf vine with golden variegation that grows enthusiastically under fluorescent light.',
  },
  {
    id: 16,
    name: 'Chinese Evergreen',
    category: 'Low-Light Plants',
    price: 22,
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
    description: 'Richly patterned silver-green foliage that tolerates poor natural lighting and irregular watering.',
  },
  {
    id: 17,
    name: 'Parlor Palm',
    category: 'Low-Light Plants',
    price: 24,
    image: 'https://images.unsplash.com/photo-1545241047-41804b4d7f57?auto=format&fit=crop&w=600&q=80',
    description: 'Victorian indoor palm with delicate arching fronds that are completely non-toxic and pet friendly.',
  },
  {
    id: 18,
    name: 'Philodendron Brasil',
    category: 'Low-Light Plants',
    price: 18,
    image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=600&q=80',
    description: 'Striking chartreuse and deep emerald splashes across vibrant heart-shaped leaves.',
  },
];

// Fallback image in case of network issues
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e8f5e9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='26' fill='%232e7d32'%3E%F0%9F%8C%BF Paradise Nursery Plant%3C/text%3E%3C/svg%3E";

function ProductList({ onNavigate, onCartClick, onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Dynamic cart count (sum of all quantities in cart)
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Unique category names
  const categories = ['Air-Purifying Plants', 'Succulents', 'Low-Light Plants'];

  // Add to cart handler
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Check if plant has already been added to the cart
  const isPlantInCart = (plantId) => {
    return cartItems.some((item) => item.id === plantId);
  };

  const handleHomeNavigation = (e) => {
    e?.preventDefault?.();
    if (onHomeClick) onHomeClick();
    else if (onNavigate) onNavigate('home');
  };

  const handleCartNavigation = (e) => {
    e?.preventDefault?.();
    if (onCartClick) onCartClick();
    else if (onNavigate) onNavigate('cart');
  };

  return (
    <div className="product-list-page">
      {/* Navigation Bar */}
      <nav className="navbar" aria-label="Main Navigation">
        <div className="nav-brand" onClick={handleHomeNavigation} role="button" tabIndex={0}>
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
            onClick={handleHomeNavigation}
          >
            Home
          </button>
          <button
            type="button"
            className="nav-link-btn active"
            onClick={() => onNavigate && onNavigate('plants')}
          >
            Plants
          </button>
          <button
            type="button"
            className="nav-link-btn cart-nav-btn"
            onClick={handleCartNavigation}
            aria-label={`Shopping Cart with ${totalCartCount} items`}
          >
            <span className="cart-nav-icon">🛒</span>
            <span className="cart-nav-label">Cart</span>
            {totalCartCount > 0 && (
              <span className="cart-count-badge">{totalCartCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Banner for Catalog */}
      <header className="catalog-header">
        <h1 className="catalog-title">Our Plant Collection</h1>
        <p className="catalog-subtitle">
          Hand-nurtured, healthy houseplants categorized to suit your lifestyle, light levels, and home wellness goals.
        </p>
      </header>

      {/* Categorized Plant Grid */}
      <main className="catalog-content">
        {categories.map((category) => {
          const categoryPlants = plantsData.filter((p) => p.category === category);
          return (
            <section key={category} className="category-section" aria-labelledby={`cat-${category}`}>
              <div className="category-header">
                <h2 id={`cat-${category}`} className="category-title">
                  {category}
                </h2>
                <span className="category-count">{categoryPlants.length} Varieties</span>
              </div>

              <div className="plants-grid">
                {categoryPlants.map((plant) => {
                  const added = isPlantInCart(plant.id);
                  return (
                    <article key={plant.id} className="plant-card">
                      <div className="plant-image-wrapper">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="plant-image"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                        <span className="plant-category-tag">{plant.category}</span>
                      </div>

                      <div className="plant-details">
                        <div className="plant-header-info">
                          <h3 className="plant-name">{plant.name}</h3>
                          <span className="plant-price">${plant.price.toFixed(2)}</span>
                        </div>
                        <p className="plant-description">{plant.description}</p>

                        <button
                          type="button"
                          className={`btn-add-cart ${added ? 'disabled' : ''}`}
                          disabled={added}
                          onClick={() => handleAddToCart(plant)}
                          aria-label={added ? `${plant.name} already in cart` : `Add ${plant.name} to cart`}
                        >
                          {added ? (
                            <>
                              <span className="btn-icon">✓</span> Added to Cart
                            </>
                          ) : (
                            <>
                              <span className="btn-icon">+</span> Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default ProductList;
