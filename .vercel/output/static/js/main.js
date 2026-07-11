/* ==========================================================================
   Balkrishna Driving School - Global Client Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initStatsCounter();
  initFaqAccordion();
  highlightActiveLink();
  initProgressBars();
});

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (menuToggle && navMenu) {
    // Check if we need to inject the mobile CTA links into the drawer
    const navCta = document.querySelector('.nav-cta');
    const existingCtaGroup = navMenu.querySelector('.nav-menu-cta-group');
    
    if (navCta && !existingCtaGroup) {
      const ctaGroup = document.createElement('div');
      ctaGroup.className = 'nav-menu-cta-group';
      
      const phoneVal = document.querySelector('.nav-phone')?.getAttribute('href') || 'tel:09422370787';
      const phoneText = document.querySelector('.nav-phone')?.textContent?.trim() || '094223 70787';
      
      ctaGroup.innerHTML = `
        <a href="${phoneVal}" class="nav-menu-phone">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:18px;height:18px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.122-4.1-6.924-6.924l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          ${phoneText}
        </a>
        <a href="contact.html" class="btn btn-primary" style="width: 100%;">Book a Trial</a>
      `;
      navMenu.appendChild(ctaGroup);
    }

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      
      if (navMenu.classList.contains('open')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close menu when clicking links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
        body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
        body.style.overflow = '';
      }
    });
  }
}

/**
 * Intersection Observer for scroll-reveal animations
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window && elements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    elements.forEach(el => el.classList.add('reveal-visible'));
  }
}

/**
 * Animated Stats Counter Strip
 */
function initStatsCounter() {
  const statsSection = document.querySelector('.stats-strip');
  const counters = document.querySelectorAll('.stat-number');
  
  if (!statsSection || counters.length === 0) return;

  const runCounter = () => {
    counters.forEach(counter => {
      const targetText = counter.getAttribute('data-target');
      const hasPlus = targetText.includes('+');
      const hasStars = targetText.includes('★') || targetText.includes('/5');
      
      let target = parseFloat(targetText.replace(/[^0-9.]/g, ''));
      let count = 0;
      const speed = 100; // lower is slower
      const increment = target / speed;
      
      const updateCount = () => {
        count += increment;
        if (count < target) {
          if (hasStars) {
            counter.innerText = count.toFixed(1) + (targetText.includes('/5') ? '/5' : '');
          } else {
            counter.innerText = Math.ceil(count).toLocaleString() + (hasPlus ? '+' : '');
          }
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = targetText;
        }
      };
      
      updateCount();
    });
  };

  // Run when section comes into view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(statsSection);
  } else {
    runCounter();
  }
}

/**
 * FAQ Accordion Toggling
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all active items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/**
 * Highlights active page link in the header nav
 */
function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPath = href.split('?')[0]; // strip query parameters
      
      // Check if current page matches the link path
      if (
        (currentPath === '/' && linkPath === 'index.html') ||
        currentPath.endsWith(linkPath) ||
        (currentPath.endsWith('/') && linkPath === 'index.html')
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

/**
 * Animate rating breakdown progress bars
 */
function initProgressBars() {
  const progressFills = document.querySelectorAll('.progress-bar-fill');
  if (progressFills.length === 0) return;
  
  const runFills = () => {
    progressFills.forEach(fill => {
      const width = fill.getAttribute('data-width') || '0%';
      fill.style.width = width;
    });
  };
  
  const dashboard = document.querySelector('.reviews-dashboard');
  if (dashboard && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runFills();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(dashboard);
  } else {
    runFills();
  }
}

