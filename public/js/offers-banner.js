// Public Offer Banner & Countdown Controller
// Balkrishna Driving School, Solapur

import { supabase } from './admin-auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  await initOffersBanner();
});

async function initOffersBanner() {
  if (!supabase) return;

  try {
    const nowIso = new Date().toISOString();
    
    // Query for the single active, enabled offer
    const { data: offers, error } = await supabase
      .from('offers')
      .select('*')
      .eq('is_enabled', true)
      .lte('start_at', nowIso)
      .gte('end_at', nowIso)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    if (!offers || offers.length === 0) {
      console.log('No active offers found.');
      return;
    }

    const offer = offers[0];
    const endTime = new Date(offer.end_at).getTime();

    // 1. Inject Styles dynamically to keep it modular
    injectOfferStyles();

    // 2. Render Hero Countdown (Above the fold)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      const countdownWrapper = document.createElement('div');
      countdownWrapper.id = 'hero-countdown-slot';
      countdownWrapper.className = 'hero-countdown-container';
      countdownWrapper.innerHTML = `
        <span class="countdown-tagline">LIMITED TIME COMPLEMENTARY OFFER</span>
        <div class="countdown-clock">
          <div class="clock-unit"><span id="cd-days">00</span><label>Days</label></div>
          <div class="clock-sep">:</div>
          <div class="clock-unit"><span id="cd-hours">00</span><label>Hours</label></div>
          <div class="clock-sep">:</div>
          <div class="clock-unit"><span id="cd-minutes">00</span><label>Mins</label></div>
          <div class="clock-sep">:</div>
          <div class="clock-unit"><span id="cd-seconds">00</span><label>Secs</label></div>
        </div>
      `;
      // Insert above the main H1 heading
      const h1 = heroContent.querySelector('h1');
      if (h1) {
        heroContent.insertBefore(countdownWrapper, h1);
      }
    }

    // 3. Render OFFER_BANNER_SLOT (Below the hero)
    const bannerSlot = document.getElementById('offer-banner-slot');
    if (bannerSlot) {
      let imageHtml = '';
      if (offer.banner_image_url) {
        imageHtml = `
          <div class="offer-banner-image">
            <img src="${offer.banner_image_url}" alt="${offer.title}">
          </div>
        `;
      }

      bannerSlot.innerHTML = `
        <div class="offer-banner-card reveal-on-scroll">
          <div class="offer-banner-content-grid ${offer.banner_image_url ? 'has-image' : ''}">
            ${imageHtml}
            <div class="offer-banner-body">
              <div class="offer-banner-badge-row">
                <span class="offer-discount-badge">${offer.discount_text}</span>
                <span class="offer-deadline-text">Offer ends on ${new Date(offer.end_at).toLocaleDateString('en-IN', {day:'numeric', month:'short'})} at ${new Date(offer.end_at).toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit'})}</span>
              </div>
              <h2 class="offer-banner-title">${offer.title}</h2>
              <p class="offer-banner-desc">${offer.description}</p>
              ${offer.urgency_text ? `<p class="offer-banner-urgency">${offer.urgency_text}</p>` : ''}
              <a href="contact.html?offer=${offer.id}" class="btn btn-primary offer-banner-cta">${offer.cta_text}</a>
            </div>
          </div>
        </div>
      `;
    }

    // 4. Update all navigation and trial CTA links on home page to attach the offer code
    document.querySelectorAll('a[href^="contact.html"]').forEach(link => {
      const href = link.getAttribute('href');
      // Append offer parameter preserving existing parameters
      if (href.includes('?')) {
        link.setAttribute('href', `${href}&offer=${offer.id}`);
      } else {
        link.setAttribute('href', `${href}?offer=${offer.id}`);
      }
    });

    // 5. Start Countdown clock interval (1 second)
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdSeconds = document.getElementById('cd-seconds');
    const clockContainer = document.querySelector('.countdown-clock');
    const bannerCard = document.querySelector('.offer-banner-card');

    const updateTimer = () => {
      const distance = endTime - new Date().getTime();

      if (distance < 0) {
        // Offer expired, clean up elements
        clearInterval(timerInterval);
        document.getElementById('hero-countdown-slot')?.remove();
        if (bannerSlot) bannerSlot.innerHTML = '';
        console.log('Offer has expired. Banner removed.');
        return;
      }

      // Calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Render double digits
      if (cdDays) cdDays.innerText = days.toString().padStart(2, '0');
      if (cdHours) cdHours.innerText = hours.toString().padStart(2, '0');
      if (cdMinutes) cdMinutes.innerText = minutes.toString().padStart(2, '0');
      if (cdSeconds) cdSeconds.innerText = seconds.toString().padStart(2, '0');

      // Urgency High: under 24 hours remaining
      if (distance < 1000 * 60 * 60 * 24) {
        clockContainer?.classList.add('urgency-high');
        bannerCard?.classList.add('urgency-high-banner');
      }
    };

    updateTimer(); // Initial call
    const timerInterval = setInterval(updateTimer, 1000);

  } catch (err) {
    console.error('Failed to initialize offers banner:', err);
  }
}

// Injected styles for public offers countdowns
function injectOfferStyles() {
  if (document.getElementById('offer-injected-styles')) return;

  const style = document.createElement('style');
  style.id = 'offer-injected-styles';
  style.innerHTML = `
    /* Hero Countdown Styles */
    .hero-countdown-container {
      margin-bottom: 24px;
      animation: fadeInDown 0.8s ease;
    }
    
    .countdown-tagline {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--color-gold);
      display: block;
      margin-bottom: 8px;
    }
    
    .countdown-clock {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background-color: var(--color-navy-dark);
      padding: 10px 20px;
      border-radius: 8px;
      border: 1px solid var(--color-border-dark);
      transition: var(--transition-smooth);
    }
    
    .clock-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 42px;
    }
    
    .clock-unit span {
      font-family: var(--font-serif);
      font-weight: 800;
      font-size: 1.6rem;
      color: var(--color-text-white);
      line-height: 1;
    }
    
    .clock-unit label {
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-text-light);
      margin-top: 4px;
    }
    
    .clock-sep {
      color: var(--color-gold);
      font-size: 1.25rem;
      font-weight: bold;
      margin-top: -15px;
    }
    
    /* Urgency High pulse styling (<24h left) */
    .countdown-clock.urgency-high {
      border-color: #EF4444;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
      background-color: #1A0D15;
    }
    .countdown-clock.urgency-high .clock-unit span {
      color: #FCA5A5;
      animation: text-pulse 1s infinite alternate;
    }
    
    @keyframes text-pulse {
      0% { text-shadow: 0 0 2px rgba(239,68,68,0.5); }
      100% { text-shadow: 0 0 10px rgba(239,68,68,0.8); }
    }
    
    /* Below-the-hero full banner style */
    .offer-banner-card {
      background-color: var(--color-cream);
      border: 1px solid var(--color-cream-dark);
      border-radius: 12px;
      padding: 40px;
      margin-top: -30px;
      margin-bottom: 50px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.03);
      position: relative;
      z-index: 10;
      overflow: hidden;
      transition: var(--transition-smooth);
    }
    
    .offer-banner-content-grid {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    
    .offer-banner-content-grid.has-image {
      display: grid;
      grid-template-columns: 0.8fr 1.2fr;
      align-items: center;
    }
    
    .offer-banner-image {
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--color-border);
      aspect-ratio: 4/3;
    }
    .offer-banner-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .offer-banner-badge-row {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
      flex-wrap: wrap;
    }
    
    .offer-discount-badge {
      background-color: var(--color-gold);
      color: var(--color-ink-navy);
      font-weight: 800;
      font-size: 0.85rem;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .offer-deadline-text {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text-medium);
    }
    
    .offer-banner-title {
      font-size: 1.85rem;
      margin-bottom: 12px;
      color: var(--color-ink-navy);
    }
    
    .offer-banner-desc {
      color: var(--color-text-medium);
      font-size: 1.05rem;
      margin-bottom: 15px;
      line-height: 1.6;
    }
    
    .offer-banner-urgency {
      color: #B91C1C;
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 25px;
    }
    
    .offer-banner-cta {
      display: inline-block;
      text-align: center;
    }
    
    /* Urgency High banner override */
    .offer-banner-card.urgency-high-banner {
      background-color: #FFF5F5;
      border-color: #FECACA;
      box-shadow: 0 10px 30px rgba(239, 68, 68, 0.05);
      animation: card-pulse 3s infinite ease-in-out;
    }
    
    @keyframes card-pulse {
      0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
      50% { box-shadow: 0 10px 30px rgba(239, 68, 68, 0.1); border-color: #FCA5A5; }
    }
    
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .offer-banner-content-grid.has-image {
        grid-template-columns: 1fr;
      }
      .offer-banner-card {
        padding: 30px 20px;
        margin-top: 0;
      }
      .offer-banner-title {
        font-size: 1.5rem;
      }
    }
  `;
  document.head.appendChild(style);
}
