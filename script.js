document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Dark mode toggle
  const modeToggle = document.getElementById("mode-toggle");

  modeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    // Change button text based on mode
    if (document.body.classList.contains("dark-theme")) {
      modeToggle.textContent = "Light Mode";
    } else {
      modeToggle.textContent = "Dark Mode";
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
