function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Image carousel functionality
function changeSlide(button, direction) {
  const carousel = button.closest(".project-carousel");
  const slides = carousel.querySelectorAll(".project-img");
  const dots = carousel.querySelectorAll(".dot");
  let currentIndex = Array.from(slides).findIndex((slide) =>
    slide.classList.contains("active-slide")
  );

  slides[currentIndex].classList.remove("active-slide");
  dots[currentIndex].classList.remove("active-dot");

  currentIndex = (currentIndex + direction + slides.length) % slides.length;

  slides[currentIndex].classList.add("active-slide");
  dots[currentIndex].classList.add("active-dot");
}

function currentSlide(dot, index) {
  const carousel = dot.closest(".project-carousel");
  const slides = carousel.querySelectorAll(".project-img");
  const dots = carousel.querySelectorAll(".dot");

  slides.forEach((slide) => slide.classList.remove("active-slide"));
  dots.forEach((d) => d.classList.remove("active-dot"));

  slides[index].classList.add("active-slide");
  dots[index].classList.add("active-dot");
}

// Auto-advance carousel every 5 seconds
setInterval(() => {
  document.querySelectorAll(".next-btn").forEach((btn) => {
    changeSlide(btn, 1);
  });
}, 5000);
