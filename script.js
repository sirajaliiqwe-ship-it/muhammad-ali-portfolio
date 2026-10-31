
/* ==========================================
   MUHAMMAD ALI PORTFOLIO
   PART 3: JAVASCRIPT
========================================== */

/* 1. SELECT HTML ELEMENTS */

const body = document.body;

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const currentYear = document.getElementById("currentYear");

/* 2. AVAILABLE COLOR THEMES */

const themes = [
  {
    name: "Purple",
    accent: "#8b5cf6",
    accentTwo: "#06b6d4"
  },
  {
    name: "Blue",
    accent: "#2563eb",
    accentTwo: "#38bdf8"
  },
  {
    name: "Pink",
    accent: "#ec4899",
    accentTwo: "#f472b6"
  },
  {
    name: "Green",
    accent: "#10b981",
    accentTwo: "#84cc16"
  },
  {
    name: "Orange",
    accent: "#f97316",
    accentTwo: "#facc15"
  },
  {
    name: "Red",
    accent: "#ef4444",
    accentTwo: "#fb7185"
  },
  {
    name: "Cyan",
    accent: "#0891b2",
    accentTwo: "#22d3ee"
  },
  {
    name: "Gold",
    accent: "#d97706",
    accentTwo: "#fbbf24"
  }
];

/* 3. APPLY COLOR THEME */

function applyTheme(theme) {

  body.style.setProperty(
    "--accent",
    theme.accent
  );

  body.style.setProperty(
    "--accent-two",
    theme.accentTwo
  );

  const rgb = hexToRgb(theme.accent);

  if (rgb) {
    body.style.setProperty(
      "--accent-rgb",
      `${rgb.r}, ${rgb.g}, ${rgb.b}`
    );
  }

}

/* 4. CONVERT HEX TO RGB */

function hexToRgb(hex) {

  const validHex = /^#([0-9a-f]{6})$/i.test(hex);

  if (!validHex) {
    return null;
  }

  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };

}

/* 5. CREATE THEME PICKER */

function createThemePicker() {

  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  const wrapper = document.createElement("div");

  wrapper.className = "theme-picker";

  wrapper.innerHTML = `
    <button
      class="theme-picker-button"
      id="paletteButton"
      aria-expanded="false"
      aria-label="Choose website colors"
    >
      🎨 Colors
    </button>

    <div class="theme-panel" id="themePanel" hidden>

      <h3>Choose Your Color</h3>

      <div class="theme-options" id="themeOptions"></div>

      <div class="custom-color">
        <label for="customColor">
          Custom Color
        </label>

        <input
          type="color"
          id="customColor"
          value="#8b5cf6"
        >
      </div>

    </div>
  `;

  navbar.appendChild(wrapper);

  const paletteButton =
    document.getElementById("paletteButton");

  const themePanel =
    document.getElementById("themePanel");

  const themeOptions =
    document.getElementById("themeOptions");

  const customColor =
    document.getElementById("customColor");

  /* CREATE THEME BUTTONS */

  themes.forEach((theme, index) => {

    const button = document.createElement("button");

    button.className = "theme-option";

    button.type = "button";

    button.setAttribute(
      "aria-label",
      theme.name + " theme"
    );

    button.title = theme.name;

    button.style.background = theme.accent;

    button.addEventListener("click", () => {

      applyTheme(theme);

      customColor.value = theme.accent;

      localStorage.setItem(
        "portfolioAccent",
        theme.accent
      );

      localStorage.setItem(
        "portfolioAccentTwo",
        theme.accentTwo
      );

      updateSelectedTheme(button);

    });

    themeOptions.appendChild(button);

  });

  /* OPEN AND CLOSE COLOR PANEL */

  paletteButton.addEventListener("click", () => {

    const isOpen = !themePanel.hidden;

    themePanel.hidden = isOpen;

    paletteButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

  });

  /* CUSTOM COLOR */

  customColor.addEventListener("input", (event) => {

    const selectedColor = event.target.value;

    applyTheme({
      accent: selectedColor,
      accentTwo: adjustColor(selectedColor)
    });

    localStorage.setItem(
      "portfolioAccent",
      selectedColor
    );

    localStorage.setItem(
      "portfolioAccentTwo",
      adjustColor(selectedColor)
    );

  });

}

/* 6. UPDATE SELECTED THEME */

function updateSelectedTheme(selectedButton) {

  document.querySelectorAll(".theme-option")
    .forEach(button => {

      button.classList.remove("selected");

    });

  selectedButton.classList.add("selected");

}

/* 7. GENERATE SECOND ACCENT COLOR */

function adjustColor(hex) {

  const rgb = hexToRgb(hex);

  if (!rgb) {
    return "#06b6d4";
  }

  const r = Math.min(255, rgb.r + 40);
  const g = Math.min(255, rgb.g + 55);
  const b = Math.min(255, rgb.b + 65);

  return "#" + [r, g, b]
    .map(value => value.toString(16).padStart(2, "0"))
    .join("");

}

/* 8. RESTORE SAVED COLORS */

function restoreColors() {

  const savedAccent =
    localStorage.getItem("portfolioAccent");

  const savedAccentTwo =
    localStorage.getItem("portfolioAccentTwo");

  if (savedAccent) {

    applyTheme({
      accent: savedAccent,
      accentTwo: savedAccentTwo || "#06b6d4"
    });

  }

}

/* 9. DARK AND LIGHT MODE */

function setupDarkLightMode() {

  if (!themeToggle) return;

  const savedMode =
    localStorage.getItem("portfolioMode");

  if (savedMode === "light") {

    body.classList.add("light-theme");

  }

  updateModeButton();

  themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-theme");

    const isLight =
      body.classList.contains("light-theme");

    localStorage.setItem(
      "portfolioMode",
      isLight ? "light" : "dark"
    );

    updateModeButton();

  });

}

function updateModeButton() {

  const isLight =
    body.classList.contains("light-theme");

  if (themeToggle) {

    themeToggle.textContent =
      isLight ? "🌙 Dark" : "☀️ Light";

  }

}

/* 10. MOBILE NAVIGATION */

function setupMobileMenu() {

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {

    const isOpen =
      navLinks.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });

  /* CLOSE MENU AFTER CLICK */

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

  /* CLOSE MENU WHEN CLICKING OUTSIDE */

  document.addEventListener("click", (event) => {

    const clickedInside =
      navLinks.contains(event.target) ||
      menuToggle.contains(event.target);

    if (!clickedInside) {

      navLinks.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

  /* CLOSE MENU WITH ESCAPE KEY */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      navLinks.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

}

/* 11. AUTOMATIC COPYRIGHT YEAR */

function updateCopyrightYear() {

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }

}

/* 12. SCROLL REVEAL ANIMATION */

function setupScrollReveal() {

  const elements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .contact-card"
  );

  if (!("IntersectionObserver" in window)) {

    elements.forEach(element => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });

    return;

  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("revealed");

          observerInstance.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  elements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

  });

}

/* 13. ADDITIONAL CSS FOR THEME PICKER */

function addDynamicStyles() {

  const style = document.createElement("style");

  style.textContent = `

    .theme-picker {
      position: relative;
    }

    .theme-picker-button {
      padding: 10px 14px;
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text);
      background: var(--surface);
      cursor: pointer;
      font-size: 13px;
    }

    .theme-panel {
      position: absolute;
      top: 55px;
      right: 0;
      width: 240px;
      padding: 20px;
      border: 1px solid var(--border);
      border-radius: 18px;
      background: var(--bg-secondary);
      box-shadow: var(--shadow);
      z-index: 1200;
    }

    .theme-panel[hidden] {
      display: none;
    }

    .theme-panel h3 {
      font-size: 14px;
      margin-bottom: 15px;
    }

    .theme-options {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .theme-option {
      width: 35px;
      height: 35px;
      border: 3px solid transparent;
      border-radius: 50%;
      cursor: pointer;
      transition: transform .2s;
    }

    .theme-option:hover {
      transform: scale(1.15);
    }

    .theme-option.selected {
      outline: 2px solid var(--text);
      outline-offset: 3px;
    }

    .custom-color {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .custom-color label {
      font-size: 12px;
    }

    .custom-color input {
      width: 42px;
      height: 35px;
      border: 0;
      background: transparent;
      cursor: pointer;
    }

    .reveal {
      opacity: 0;
      transform: translateY(25px);
      transition: opacity .7s ease, transform .7s ease;
    }

    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    @media(max-width:700px) {

      .theme-picker {
        order: 2;
      }

      .theme-panel {
        right: -50px;
      }

      .theme-picker-button {
        font-size: 11px;
        padding: 8px 10px;
      }

    }

    @media(prefers-reduced-motion:reduce) {

      .reveal {
        opacity: 1;
        transform: none;
      }

    }

  `;

  document.head.appendChild(style);

}

/* 14. INITIALIZE WEBSITE */

function initializePortfolio() {

  restoreColors();

  addDynamicStyles();

  createThemePicker();

  setupDarkLightMode();

  setupMobileMenu();

  updateCopyrightYear();

  setupScrollReveal();

}

/* 15. START */

document.addEventListener(
  "DOMContentLoaded",
  initializePortfolio
);
