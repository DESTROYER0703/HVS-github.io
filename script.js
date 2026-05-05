/* ============================================================
   SCRIPT.JS – Portfolio Interactivity
   ============================================================ */

// ── Typewriter ──────────────────────────────────────────────
const phrases = [
  "Full-Stack Developer",
  "Backend Engineer",
  "Problem Solver",
  "CSE @ VIT Bhopal",
];

let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById("typewriter");

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── Navbar scroll effect ─────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  updateActiveNav();
});

// ── Active nav link ──────────────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
  });
}

// ── Scroll reveal ────────────────────────────────────────────
const reveals = document.querySelectorAll(
  ".glass-card, .section-label, .section-title, .hero-badge, .hero-desc, .hero-actions, .hero-stats, .contact-desc"
);
reveals.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
reveals.forEach((el) => observer.observe(el));

// ── Hamburger menu ───────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
let mobileOpen = false;
let mobileMenu = null;

hamburger.addEventListener("click", () => {
  mobileOpen = !mobileOpen;
  if (mobileOpen) {
    mobileMenu = document.createElement("div");
    mobileMenu.id = "mobile-menu";
    mobileMenu.innerHTML = `
      <style>
        #mobile-menu {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(5,8,20,0.97);
          backdrop-filter: blur(20px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 32px;
          animation: fadeIn .2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        #mobile-menu a {
          font-size: 2rem; font-weight: 800;
          color: #e2e8f0;
          transition: all .2s;
        }
        #mobile-menu a:hover { color: #38bdf8; }
        #mobile-close {
          position: absolute; top: 24px; right: 24px;
          background: none; border: none; color: #e2e8f0;
          font-size: 2rem; cursor: pointer;
        }
      </style>
      <button id="mobile-close">✕</button>
      <a href="#about" class="mm-link">About</a>
      <a href="#projects" class="mm-link">Projects</a>
      <a href="#skills" class="mm-link">Skills</a>
      <a href="#coding" class="mm-link">Coding</a>
      <a href="#contact" class="mm-link">Contact</a>
    `;
    document.body.appendChild(mobileMenu);

    document.getElementById("mobile-close").addEventListener("click", closeMobile);
    mobileMenu.querySelectorAll(".mm-link").forEach((l) =>
      l.addEventListener("click", closeMobile)
    );
  } else {
    closeMobile();
  }
});

function closeMobile() {
  mobileOpen = false;
  if (mobileMenu) { mobileMenu.remove(); mobileMenu = null; }
}

// ── Parallax hero bg ─────────────────────────────────────────
const heroBg = document.querySelector(".hero-bg");
window.addEventListener("scroll", () => {
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});

// ── Card tilt on mouse move ──────────────────────────────────
document.querySelectorAll(".project-card, .about-card, .skill-group").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ── Cursor glow (desktop only) ───────────────────────────────
if (window.matchMedia("(pointer: fine)").matches) {
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left .12s ease, top .12s ease;
  `;
  document.body.appendChild(glow);
  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

// ── Smooth link behaviour ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

console.log("%c Harsh Vardhan Singh – Portfolio", "color:#38bdf8;font-size:18px;font-weight:bold;");
console.log("%c Built with ❤️ using vanilla HTML/CSS/JS", "color:#a855f7;font-size:14px;");
