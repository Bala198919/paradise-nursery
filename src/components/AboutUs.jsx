import React from 'react';

/**
 * AboutUs Component — Task 2
 * Details Paradise Nursery's story, mission, the tangible benefits of indoor houseplants,
 * and our unwavering commitment to quality and customer satisfaction.
 */
function AboutUs() {
  const benefits = [
    {
      icon: '🌿',
      title: 'Air Purification',
      desc: 'Plants act as natural bio-filters, absorbing airborne toxins like formaldehyde, benzene, and carbon monoxide while releasing fresh oxygen.',
    },
    {
      icon: '🧘',
      title: 'Stress Relief & Wellness',
      desc: 'Living greenery is scientifically proven to reduce cortisol levels, ease anxiety, and create a calming, restorative sanctuary.',
    },
    {
      icon: '✨',
      title: 'Aesthetic Living',
      desc: 'Elevate your interior decor with lush, sculptural foliage that brings natural architectural beauty and vitality into any modern space.',
    },
    {
      icon: '💡',
      title: 'Focus & Productivity',
      desc: 'Houseplants in your workspace improve concentration, boost creativity, and enhance daily energy levels and cognitive performance.',
    },
  ];

  return (
    <section className="about-us-container" aria-label="About Paradise Nursery">
      <div className="about-us-card">
        <div className="about-badge">🌿 Greenery With Purpose</div>
        <h2 className="about-title">Welcome to Paradise Nursery</h2>
        <p className="about-intro">
          At <strong>Paradise Nursery</strong>, we believe every home deserves to be a thriving, peaceful sanctuary.
          What began as a passionate family greenhouse has blossomed into an online destination for plant enthusiasts,
          first-time green thumbs, and interior design lovers alike.
        </p>

        <div className="about-section">
          <h3 className="section-heading">Our Mission</h3>
          <p className="about-text">
            Our mission is simple: <em>to make living spaces greener, healthier, and more serene</em>. We bridge the gap between
            the natural world and modern indoor environments by curating resilient, hand-selected houseplants that thrive in everyday living spaces.
          </p>
        </div>

        <div className="about-section">
          <h3 className="section-heading">Why Choose Indoor Plants?</h3>
          <div className="benefits-grid">
            {benefits.map((item, index) => (
              <div key={index} className="benefit-card">
                <span className="benefit-icon" role="img" aria-label={item.title}>
                  {item.icon}
                </span>
                <h4 className="benefit-title">{item.title}</h4>
                <p className="benefit-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section commitment-section">
          <h3 className="section-heading">Our Promise to You</h3>
          <p className="about-text">
            Every plant from Paradise Nursery is nurtured under optimal conditions, thoroughly inspected for vibrant health,
            and packaged with custom protective sleeves to ensure it reaches your doorstep in pristine condition. With our expert care
            guides and 100% healthy arrival guarantee, your journey to greener living is always supported.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
