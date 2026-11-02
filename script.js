/**
 * KARAOKE F5 PLUS - 66 TỐ HỮU, VẠN PHÚC, HÀ ĐÔNG
 * Website Tĩnh Giới Thiệu - Đặt Phòng Qua Hotline & Bản Đồ Google Maps
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. AMBIENT CANVAS PARTICLES (HIỆU ỨNG BỤI VÀNG LUNG LINH)
     ========================================================== */
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = ['#ffd700', '#ff007f', '#00f0ff', '#ffffff', '#a855f7'];

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6 - 0.2; // slight upward drift
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.7 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.008;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.015;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, this.alpha));
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.size * 5;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particleCount = Math.min(65, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ==========================================================
     2. NAVBAR SCROLL & ACTIVE STATE
     ========================================================== */
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header background toggle khi cuộn
    if (header) {
      if (scrollPos > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Nút cuộn lên đầu trang
    if (scrollTopBtn) {
      if (scrollPos > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }

    // Đánh dấu menu mục đang xem
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================
     3. MENU DI ĐỘNG (MOBILE NAVIGATION DRAWER)
     ========================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Đóng menu khi bấm vào link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  /* ==========================================================
     4. BỘ LỌC PHÒNG HÁT VIP (ROOM FILTER TABS)
     ========================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const roomCards = document.querySelectorAll('.room-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      roomCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================
     5. LIGHTBOX PHÓNG TO ẢNH PHÒNG FULL-SIZE
     ========================================================== */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  window.openLightbox = function(imgSrc, captionText) {
    if (lightboxModal && lightboxImg && lightboxCaption) {
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = captionText;
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Phím ESC đóng Lightbox ảnh
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal) lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

});
