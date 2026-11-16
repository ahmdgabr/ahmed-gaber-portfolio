const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  links.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}
document.getElementById("year").textContent = new Date().getFullYear();


/* Motion system: subtle entrance, scroll reveals and tactile hover feedback */
document.documentElement.classList.add("motion-ready");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  const revealGroups = [
    [".hero-copy > *", 90],
    [".hero-card", 120],
    [".trust-inner > *", 65],
    [".section-heading > *", 110],
    [".project-card", 130],
    [".skill-row", 75],
    [".about-section > *", 130],
    [".contact-inner > *", 140]
  ];

  revealGroups.forEach(([selector, stagger]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index * stagger, 420)}ms`);
    });
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });

  document.querySelectorAll(".scroll-reveal").forEach(element => observer.observe(element));

  window.addEventListener("load", () => {
    document.querySelectorAll(".hero-copy .scroll-reveal, .hero-card.scroll-reveal").forEach(element => {
      element.classList.add("is-visible");
    });
  }, { once: true });
}
