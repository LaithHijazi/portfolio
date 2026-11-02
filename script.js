// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Sticky header shadow once the page scrolls
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const menuButton = document.querySelector(".hamburger-icon");
const menu = document.getElementById("nav-links");

function setMenu(open) {
  menu.classList.toggle("open", open);
  menuButton.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuButton.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuButton.contains(e.target)) setMenu(false);
});

// Image carousels: controls are built here so the markup stays simple
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".project-carousel").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".project-img"));
  if (slides.length < 2) return;

  let index = Math.max(0, slides.findIndex((s) => s.classList.contains("active-slide")));
  let paused = false;

  const makeButton = (cls, label, symbol) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `carousel-btn ${cls}`;
    b.setAttribute("aria-label", label);
    b.innerHTML = symbol;
    carousel.appendChild(b);
    return b;
  };

  const prev = makeButton("prev-btn", "Previous image", "&#10094;");
  const next = makeButton("next-btn", "Next image", "&#10095;");

  const dotsWrap = document.createElement("div");
  dotsWrap.className = "carousel-dots";
  const dots = slides.map((_, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "dot";
    d.setAttribute("aria-label", `Show image ${i + 1} of ${slides.length}`);
    d.addEventListener("click", () => show(i));
    dotsWrap.appendChild(d);
    return d;
  });
  carousel.appendChild(dotsWrap);

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle("active-slide", j === index));
    dots.forEach((d, j) => {
      d.classList.toggle("active-dot", j === index);
      d.setAttribute("aria-current", j === index ? "true" : "false");
    });
  }

  prev.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  show(index);

  // Auto-advance, pausing on hover/focus and when off-screen
  if (reduceMotion) return;
  let visible = false;
  carousel.addEventListener("mouseenter", () => (paused = true));
  carousel.addEventListener("mouseleave", () => (paused = false));
  carousel.addEventListener("focusin", () => (paused = true));
  carousel.addEventListener("focusout", () => (paused = false));
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(carousel);

  setInterval(() => {
    if (!paused && visible && !document.hidden) show(index + 1);
  }, 5000);
});
