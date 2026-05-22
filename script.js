const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const dockLinks = document.querySelectorAll("[data-dock-link]");
const sections = document.querySelectorAll("main section[id]");
const year = document.querySelector("[data-year]");
const themeKey = "az-theme-v9";

const storage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      return undefined;
    }
  }
};

const savedTheme = storage.get(themeKey);
const initialTheme = savedTheme || "dark";
root.dataset.theme = initialTheme;

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  storage.set(themeKey, nextTheme);
});

if (year) {
  year.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -40px 0px", threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
  revealObserver.observe(element);
});

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      dockLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { threshold: 0.52 }
);

sections.forEach((section) => activeObserver.observe(section));
