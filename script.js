/**
 * ==========================================================================
 * PERSONAL CV WEBSITE - JAVASCRIPT VANILLA
 * Name: Deshinta Melani
 * Field: Software Engineer & Data Analyst
 * Features:
 *   1. Sticky Navbar Transition on Scroll
 *   2. Mobile Hamburger Menu Toggle & Auto-Close
 *   3. Active Navigation Highlighting based on Scroll Position
 *   4. Scroll Reveal Animation (Fade-in & Slide-up)
 *   5. Animated Technical Skills Progress Bars
 *   6. Download CV Interaction
 *   7. Interactive Contact Form with Validation & Feedback
 *   8. Automatic Current Year in Footer
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. AUTOMATIC CURRENT YEAR IN FOOTER ---
  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- 2. STICKY NAVBAR TRANSITION ON SCROLL ---
  const navbar = document.getElementById('navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Initial verification

  // --- 3. MOBILE MENU TOGGLE ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          const icon = navToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  // --- 4. SCROLL REVEAL (FADE-IN & SLIDE-UP ANIMATIONS) ---
  const revealElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animasi dipicu sekali saat elemen muncul
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback untuk browser lawas
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // --- 5. ANIMATED PROGRESS BARS FOR SKILLS ---
  const skillsSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  let isSkillsAnimated = false;

  const triggerProgressAnimation = () => {
    progressBars.forEach(bar => {
      const targetPercent = bar.getAttribute('data-skill-level') || '0';
      bar.style.width = `${targetPercent}%`;
    });
    isSkillsAnimated = true;
  };

  if (skillsSection && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isSkillsAnimated) {
          triggerProgressAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    skillsObserver.observe(skillsSection);
  } else {
    // Fallback jika tidak didukung
    triggerProgressAnimation();
  }

  // --- 6. ACTIVE NAVIGATION LINK ON SCROLL ---
  const monitoredSections = document.querySelectorAll('section[id], main[id]');

  const handleActiveNavLinks = () => {
    const scrollPosition = window.scrollY + 130;

    monitoredSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleActiveNavLinks);

  // --- 7. DOWNLOAD CV BUTTON INTERACTION ---
  const btnDownloadCv = document.getElementById('btnDownloadCv');
  if (btnDownloadCv) {
    btnDownloadCv.addEventListener('click', (e) => {
      const href = btnDownloadCv.getAttribute('href');
      if (href === '#download' || href === '#') {
        e.preventDefault();
        alert('File CV digital sedang dipersiapkan. Untuk menghubungkan file Anda, silakan letakkan file PDF di folder proyek dan atur atribut href tombol ini di index.html (misal: href="cv-deshinta-melani.pdf").');
      }
    });
  }

  // --- 8. FORMAL CONTACT FORM SUBMISSION & VALIDATION ---
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nameInput')?.value.trim();
      const email = document.getElementById('emailInput')?.value.trim();
      const subject = document.getElementById('subjectInput')?.value.trim();
      const message = document.getElementById('messageInput')?.value.trim();

      // Validasi kolom wajib
      if (!name || !email || !subject || !message) {
        renderFeedback('Mohon lengkapi seluruh kolom yang bertanda bintang (*).', 'error');
        return;
      }

      // Validasi pola email sederhana
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        renderFeedback('Format alamat email yang dimasukkan tidak valid.', 'error');
        return;
      }

      // Simulasi pengiriman pesan
      const submitBtn = contactForm.querySelector('.btn-submit');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim...</span>';
      }

      renderFeedback('Sedang memproses pesan...', 'success');

      setTimeout(() => {
        contactForm.reset();
        renderFeedback('Terima kasih! Pesan Anda telah terkirim kepada Deshinta Melani. Tanggapan akan segera disampaikan melalui email yang Anda cantumkan.', 'success');
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Kirim Pesan</span>';
        }
      }, 1000);
    });
  }

  function renderFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback-message ${type}`;

    setTimeout(() => {
      if (formFeedback.textContent === message) {
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback-message';
      }
    }, 8000);
  }

});
