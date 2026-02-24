// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('mobile-menu-open');
  });

  // Close menu when clicking links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('mobile-menu-open');
    });
  });
}

// Optimization: Pre-calculate measurements to avoid layout thrashing during scroll
let measurements = {
  windowHeight: window.innerHeight,
  flipElements: [],
  horizontal: null
};

// 🚀 PERFORMANCE OPTIMIZATION: Initialize hero as fast as possible
function fastHeroReveal() {
  const bgImage = document.querySelector('.bg-image');
  if (bgImage) bgImage.classList.add('loaded');

  setTimeout(() => {
    ['.left-content', '.right-image', '.btn-group'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.classList.add('show');
    });

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) processElement(heroTitle);
  }, 100); // Drastically reduced delay
}

// Ensure pre-rendering check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fastHeroReveal);
} else {
  fastHeroReveal();
}

window.addEventListener('load', () => {
  // 1. Initial measurement (needs images for accuracy)
  updateMeasurements();

  // 2. Initialize secondary interactive components
  initializePlacedStudents();

  // 3. Defer heavy decorative animations
  setTimeout(setupGamingTextAnimation, 100);
});

window.addEventListener('resize', () => {
  updateMeasurements();
}, { passive: true });

function updateMeasurements() {
  measurements.windowHeight = window.innerHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Flip Elements
  const flips = document.querySelectorAll('.flip-reveal');
  measurements.flipElements = Array.from(flips).map(el => {
    const rect = el.getBoundingClientRect();
    return {
      el,
      top: rect.top + scrollTop,
      height: rect.height
    };
  });

  // Horizontal Section
  const wrapper = document.querySelector('.sticky-wrapper');
  const track = document.getElementById('courseTrack');
  const progress = document.getElementById('progressSegment');
  if (wrapper && track) {
    const wrapperRect = wrapper.getBoundingClientRect();
    measurements.horizontal = {
      wrapper,
      track,
      progress,
      offsetTop: wrapperRect.top + scrollTop,
      offsetHeight: wrapperRect.height,
      scrollWidth: track.scrollWidth
    };
  }
}

// Gaming Text Animation System - On-Demand Processing
function setupGamingTextAnimation() {
  const targets = document.querySelectorAll(`
        h1:not(.processed),
        h2:not(.processed),
        h3:not(.processed),
        .course-main-title:not(.processed),
        .course-tag:not(.processed),
        .tag-line:not(.processed),
        .section-tagline:not(.processed),
        .btn-primary:not(.processed),
        .left-content p:not(.processed)
      `);

  // Use IntersectionObserver to process only when visible
  const processingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        processElement(entry.target);
        processingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => processingObserver.observe(el));
}

function processElement(el) {
  if (el.classList.contains('processed')) return;
  el.classList.add('processed');

  // Active state observer
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('reveal-active', entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  activeObserver.observe(el);

  const hasManualSpans = el.querySelector('.gaming-char');
  if (hasManualSpans) return;

  const hasNestedSpan = el.querySelector('span');
  if (hasNestedSpan) {
    // Walker logic
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.trim().length > 0) textNodes.push(node);
    }

    let charIndex = 0;
    textNodes.forEach(textNode => {
      const fragment = document.createDocumentFragment();
      [...textNode.textContent].forEach(char => {
        if (char === ' ') {
          fragment.appendChild(document.createTextNode(' '));
        } else {
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'gaming-char';
          span.style.setProperty('--i', charIndex++);
          fragment.appendChild(span);
        }
      });
      textNode.parentNode.replaceChild(fragment, textNode);
    });
  } else {
    // Simple logic
    const text = el.textContent.trim();
    el.innerHTML = '';
    [...text].forEach((char, index) => {
      if (char === ' ') {
        el.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'gaming-char';
        span.style.setProperty('--i', index);
        el.appendChild(span);
      }
    });
  }
}

function handleScrollEffects() {
  const scrollTop = window.scrollY;
  const viewportCenter = scrollTop + measurements.windowHeight / 2;

  measurements.flipElements.forEach(item => {
    const elementTop = item.top;
    const elementBottom = elementTop + item.height;

    if (elementTop < scrollTop + measurements.windowHeight && elementBottom > scrollTop) {
      const itemCenter = elementTop + item.height / 2;
      const distanceFromCenter = Math.abs(viewportCenter - itemCenter);
      const maxDistance = measurements.windowHeight / 1.5;
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

      const scale = 1 - (0.15 * normalizedDistance);
      const rotation = -10 * normalizedDistance;
      const translateY = normalizedDistance * 40;
      const opacity = 1 - normalizedDistance;

      item.el.classList.add('active');
      item.el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotateX(${rotation}deg)`;
      item.el.style.opacity = opacity + 0.2;
    } else if (item.el.classList.contains('active')) {
      item.el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', () => {
  // Use requestAnimationFrame for smoother performance
  if (!window.scrollTicking) {
    window.requestAnimationFrame(() => {
      handleScrollEffects();
      window.scrollTicking = false;
    });
    window.scrollTicking = true;
  }
}, { passive: true });

// Horizontal Scroll Course Section

function handleHorizontalScroll() {
  if (!measurements.horizontal) return;

  const { offsetTop, offsetHeight, track, progress, scrollWidth } = measurements.horizontal;
  const scrollTop = window.scrollY;

  let scrollFraction = (scrollTop - offsetTop) / (offsetHeight - measurements.windowHeight);
  scrollFraction = Math.max(0, Math.min(1, scrollFraction));

  const maxMove = scrollWidth - window.innerWidth;
  if (maxMove > 0) {
    track.style.transform = `translate3d(-${scrollFraction * maxMove}px, 0, 0)`;
  }

  if (progress) progress.style.width = `${scrollFraction * 100}%`;
}

window.addEventListener('scroll', () => {
  if (!window.horizontalTicking) {
    window.requestAnimationFrame(() => {
      handleHorizontalScroll();
      window.horizontalTicking = false;
    });
    window.horizontalTicking = true;
  }
}, { passive: true });

// Placed Students Infinite Scroll - CSS Animation Powered
function initializePlacedStudents() {
  const psTrack = document.getElementById('autoTrack');
  const psProgressFill = document.querySelector('.progress-fill');
  const psCurrentNum = document.getElementById('current-number');

  if (!psTrack) return;

  const cards = Array.from(psTrack.children);
  const cardCount = cards.length;

  // Clone cards for infinite loop
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    psTrack.appendChild(clone);
  });

  // Calculate duration (e.g., 5s per card)
  const duration = cardCount * 5;
  psTrack.style.animation = `psInfiniteScroll ${duration}s linear infinite`;

  // Pause on hover
  psTrack.addEventListener('mouseenter', () => psTrack.style.animationPlayState = 'paused');
  psTrack.addEventListener('mouseleave', () => psTrack.style.animationPlayState = 'running');

  // Efficient active state tracking using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = entry.target.getAttribute('data-index');
        if (index && psCurrentNum) {
          psCurrentNum.innerText = index;
          if (psProgressFill) {
            const pct = (parseInt(index) / cardCount) * 100;
            psProgressFill.style.width = `${pct}%`;
          }
        }
      }
    });
  }, {
    root: psTrack.parentElement,
    threshold: 0.5
  });

  cards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      const isActive = this.classList.contains('card-active');

      // Close all cards first
      cards.forEach(c => c.classList.remove('card-active'));

      // If the clicked card wasn't active, make it active
      if (!isActive) {
        this.classList.add('card-active');
      }

      e.stopPropagation();
    });

    // Hover effect for Desktop
    card.addEventListener('mouseenter', function () {
      if (window.matchMedia("(min-width: 1025px)").matches) {
        this.classList.add('card-active');
      }
    });

    card.addEventListener('mouseleave', function () {
      if (window.matchMedia("(min-width: 1025px)").matches) {
        this.classList.remove('card-active');
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('card-active'));
  });

  // Also close on scroll on mobile to avoid sticky cards
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 1024) {
      cards.forEach(card => card.classList.remove('card-active'));
    }
  }, { passive: true });
});
// ......