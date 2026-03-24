// Main JS for ARJUN BIKE WORLD

(function () {
  const { isValidEmail, setFeedback } = window.ABW_VALIDATORS || {};

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function initLoader() {
    const loader = document.getElementById("page-loader");
    if (!loader) return;
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hidden"), 400);
    });
  }

  function initTheme() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    const stored = window.localStorage.getItem("abw_theme");
    if (stored === "light" || stored === "dark") {
      document.body.setAttribute("data-theme", stored);
    }
    toggle.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", next);
      window.localStorage.setItem("abw_theme", next);
    });
  }

  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
  }

  function initYear() {
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function formatPriceINR(value) {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(value);
    } catch {
      return `₹${value}`;
    }
  }

  function initFeaturedBikes() {
    const container = document.getElementById("featuredBikesContainer");
    if (!container || !Array.isArray(window.ABW_BIKES)) return;
    const featured = window.ABW_BIKES.slice(0, 3);
    container.innerHTML = featured
      .map((bike) => {
        const primaryImg = (bike.images && bike.images[0]) || "assets/img/bikes/placeholder.jpg";
        return `
          <div class="col-md-4">
            <article class="bike-card reveal">
              <img src="${primaryImg}" alt="${bike.name}" loading="lazy" />
              <div class="bike-card-body">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <h3 class="bike-card-title mb-0">${bike.name}</h3>
                  <span class="badge rounded-pill bg-danger-subtle text-danger badge-category">${bike.category}</span>
                </div>
                <p class="bike-card-price mb-1">${formatPriceINR(bike.priceExShowroom)} <span class="text-light-50 fs-6">ex-showroom</span></p>
                <p class="bike-card-specs mb-0">
                  ${bike.engineCC ? `${bike.engineCC} cc` : bike.type} • ${bike.power} • ${bike.mileage || bike.rangeKM || "--"} ${bike.mileage ? "km/l" : bike.rangeKM ? "km range" : ""}
                </p>
              </div>
              <div class="bike-card-footer">
                <a href="bike-details.html?id=${encodeURIComponent(bike.id)}" class="btn btn-sm btn-outline-light">View Details</a>
                <a href="emi.html?amount=${encodeURIComponent(bike.priceExShowroom)}" class="btn btn-sm btn-danger">Check EMI</a>
              </div>
            </article>
          </div>
        `;
      })
      .join("");
  }

  function initNewsletterForm() {
    const form = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("newsletterEmail");
    const feedback = document.getElementById("newsletterFeedback");
    if (!form || !emailInput) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!isValidEmail || !isValidEmail(email)) {
        setFeedback && setFeedback(feedback, "Please enter a valid email address.");
        return;
      }
      const entry = {
        email,
        createdAt: new Date().toISOString()
      };
      if (window.abwAppendToArray && window.ABW_STORAGE_KEYS) {
        window.abwAppendToArray(window.ABW_STORAGE_KEYS.newsletter, entry);
      }
      emailInput.value = "";
      setFeedback && setFeedback(feedback, "Subscribed successfully. We'll keep you posted!", false);
    });
  }

  onReady(() => {
    initLoader();
    initTheme();
    initScrollReveal();
    initYear();
    initFeaturedBikes();
    initNewsletterForm();
  });
})();

