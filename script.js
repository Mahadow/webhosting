/* ============================================
   JACKSON FARMS — Interactive Behaviors
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Scroll-triggered reveals (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Animate dashboard bars when visible
        if (entry.target.id === 'dashboardVisual') {
          animateDashboardBars();
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Sticky navbar ----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
      navbar.classList.add('nav--scrolled');
    } else {
      navbar.classList.remove('nav--scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // ---- Parallax hero ----
  const heroBg = document.getElementById('heroBg');

  window.addEventListener('scroll', () => {
    if (!heroBg) return;
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });

  // ---- Mobile menu toggle ----
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ---- Smooth scrolling for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Dashboard bar animations ----
  function animateDashboardBars() {
    const bars = document.querySelectorAll('.dashboard__widget-bar-fill');
    bars.forEach(bar => {
      const targetWidth = bar.dataset.width;
      if (targetWidth) {
        setTimeout(() => {
          bar.style.width = targetWidth + '%';
        }, 300);
      }
    });
  }

  // ---- Contact form handling ----
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Message Sent!
      `;
      submitBtn.style.background = 'linear-gradient(135deg, #28C840, #22a835)';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });

  // ---- Active nav link highlighting ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('nav__link--active');
      }
    });
  }, { passive: true });

  // ---- Add spin keyframes dynamically ----
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .nav__link--active {
      color: var(--white) !important;
    }
    .nav__link--active::after {
      width: 100% !important;
    }
  `;
  document.head.appendChild(style);
});
