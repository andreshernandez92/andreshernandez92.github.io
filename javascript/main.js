// ========== TYPEWRITER EFFECT ==========
const titles = [
  "IT Support Specialist (Tier 2 / Tier 3)",
  "Network Administrator (CCNA)",
  "Business Automation Engineer",
  "Cloud Administrator (M365 & Azure)",
  "GoHighLevel & Make.com Expert"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;
  
  const currentTitle = titles[titleIndex];
  
  if (isDeleting) {
    el.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    el.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentTitle.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
  }
  
  const speed = isDeleting ? 40 : 80;
  setTimeout(typeWriter, speed);
}

// ========== HAMBURGER MENU ==========
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  
  if (!hamburger || !navLinks) return;

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  function toggleMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

// ========== SCROLL REVEAL (IntersectionObserver) ==========
function initScrollReveal() {
  const faders = document.querySelectorAll(".fade-in");
  
  if (!faders.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  faders.forEach(el => observer.observe(el));
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = "rgba(13, 13, 13, 0.95)";
    } else {
      navbar.style.background = "rgba(13, 13, 13, 0.85)";
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

// ========== CONTACT FORM HANDLER (mailto) ==========
async function submitContactForm(e) {
  e.preventDefault();
  
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");
  
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const subject = document.getElementById("contact-subject").value.trim();
  const service = document.getElementById("contact-service").value;
  const message = document.getElementById("contact-message").value.trim();

  // Build email body
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    service ? `Service Needed: ${service}` : '',
    ``,
    `Message:`,
    message
  ].filter(Boolean).join('\n');

  // Build mailto link
  const mailtoLink = `mailto:ajhl1992@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Show status
  statusEl.textContent = "Opening your email client...";
  statusEl.className = "status-message";
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  // Small delay for visual feedback, then open mail client
  setTimeout(() => {
    window.location.href = mailtoLink;
    
    statusEl.textContent = "Email client opened! If it didn't open, you can email me directly at ajhl1992@gmail.com";
    statusEl.className = "status-message success";
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    
    // Reset form after a moment
    setTimeout(() => {
      document.getElementById("contact-email-form").reset();
    }, 1000);
  }, 500);
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offsetTop = targetEl.offsetTop - 80; // account for fixed navbar
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });
}

// ========== INIT ALL ==========
document.addEventListener("DOMContentLoaded", () => {
  typeWriter();
  initHamburger();
  initScrollReveal();
  initNavbarScroll();
  initSmoothScroll();
});
