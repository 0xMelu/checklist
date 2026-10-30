const header = document.querySelector("#site-header");
const footer = document.querySelector("#site-footer");

if (header) {
  header.innerHTML = `
    <div class="topbar">
      <div class="container">
        <div class="topbar-contact">
          <a href="mailto:hello@saffronandstone.com"><i class="bi bi-envelope"></i> hello@saffronandstone.com</a>
          <a href="tel:+12125550148"><i class="bi bi-telephone"></i> (212) 555-0148</a>
        </div>
        <div class="topbar-links">
          <span class="topbar-clock" id="currentDateTime" aria-live="off"></span>
          <a href="reservation.html">Reservations</a>
          <a href="login.html">Log in</a>
          <a href="signup.html">Register</a>
        </div>
      </div>
    </div>
    <div class="main-nav">
      <nav class="navbar navbar-expand-lg container" aria-label="Main navigation">
        <a class="brand-mark" href="index.html" aria-label="Saffron and Stone home">
          <span class="brand-icon">S.</span><span class="brand-name">Saffron &amp; Stone<small>Neighborhood kitchen</small></span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNavigation">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="menu.html">Menu</a></li>
            <li class="nav-item"><a class="nav-link" href="reservation.html">Reservation</a></li>
            <li class="nav-item"><a class="nav-link" href="index.html#story">About us</a></li>
            <li class="nav-item"><a class="nav-link" href="index.html#contact">Contact</a></li>
          </ul>
          <a class="btn btn-primary nav-book" href="reservation.html">Book a table <i class="bi bi-arrow-up-right ms-1"></i></a>
        </div>
      </nav>
    </div>`;
}

if (footer) {
  footer.innerHTML = `
    <footer class="site-footer" id="contact">
      <div class="footer-main">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-4 col-md-6 footer-brand" id="story">
              <a class="brand-mark" href="index.html"><span class="brand-icon">S.</span><span class="brand-name">Saffron &amp; Stone<small>Neighborhood kitchen</small></span></a>
              <p>Seasonal cooking, thoughtful hospitality, and a table with room for one more.</p>
              <div class="social-links" aria-label="Social media">
                <a href="https://www.instagram.com/" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                <a href="https://www.facebook.com/" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="https://www.tiktok.com/" aria-label="TikTok"><i class="bi bi-tiktok"></i></a>
              </div>
            </div>
            <div class="col-6 col-lg-2 col-md-3">
              <h2 class="footer-heading">Come on in</h2>
              <div class="footer-links"><a href="index.html">Home</a><a href="menu.html">Our menu</a><a href="reservation.html">Reservations</a><a href="dish.html">Chef's pick</a></div>
            </div>
            <div class="col-6 col-lg-2 col-md-3">
              <h2 class="footer-heading">Your account</h2>
              <div class="footer-links"><a href="login.html">Log in</a><a href="signup.html">Register</a><a href="reservation.html">Book a table</a></div>
            </div>
            <div class="col-lg-4 col-md-6 footer-contact">
              <h2 class="footer-heading">Find us here</h2>
              <p><i class="bi bi-geo-alt"></i>48 Orchard Street, New York, NY 10002</p>
              <p><i class="bi bi-telephone"></i><a href="tel:+12125550148">(212) 555-0148</a></p>
              <p><i class="bi bi-envelope"></i><a href="mailto:hello@saffronandstone.com">hello@saffronandstone.com</a></p>
              <p><i class="bi bi-clock"></i>Tue – Sun, 5:00 pm – 10:00 pm</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom"><div class="container"><p>© <span data-current-year></span> Saffron &amp; Stone. Made for good evenings.</p><p>Images via <a href="https://unsplash.com/" class="text-white-50">Unsplash</a>.</p></div></div>
    </footer>`;
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".main-nav .nav-link").forEach((link) => {
  const linkPage = link.getAttribute("href")?.split("#")[0];
  if (linkPage === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

const updateDateTime = () => {
  const clock = document.querySelector("#currentDateTime");
  if (clock) {
    clock.textContent = new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());
  }
};
updateDateTime();
window.setInterval(updateDateTime, 60_000);

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const reservationForm = document.querySelector("#reservationForm");
if (reservationForm instanceof HTMLFormElement) {
  const dateInput = reservationForm.querySelector('input[type="date"]');
  if (dateInput instanceof HTMLInputElement) {
    dateInput.min = new Date().toISOString().slice(0, 10);
  }
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    reservationForm.classList.add("was-validated");
    if (!reservationForm.checkValidity()) return;

    const formData = new FormData(reservationForm);
    const name = String(formData.get("name") ?? "").trim();
    const date = String(formData.get("date") ?? "");
    const time = String(formData.get("time") ?? "");
    const guests = String(formData.get("guests") ?? "");
    const formattedDate = new Intl.DateTimeFormat(undefined, {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(new Date(`${date}T12:00:00Z`));
    const confirmationName = document.querySelector("#confirmationName");
    const confirmationDetails = document.querySelector("#confirmationDetails");
    if (confirmationName) confirmationName.textContent = name.split(/\s+/)[0];
    if (confirmationDetails) {
      confirmationDetails.textContent = `Your request for ${guests.toLowerCase()} on ${formattedDate} at ${time} is ready.`;
    }
    const confirmation = document.querySelector("#reservationConfirmation");
    if (confirmation && window.bootstrap) {
      window.bootstrap.Modal.getOrCreateInstance(confirmation).show();
    }
  });
}

document.querySelectorAll("[data-demo-auth]").forEach((form) => {
  if (!(form instanceof HTMLFormElement)) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated");
    if (!form.checkValidity()) return;
    const feedback = form.querySelector(".form-feedback");
    if (feedback) {
      feedback.textContent = "This demo is ready for account services to be connected.";
    }
  });
});

document.querySelectorAll("[data-feedback-form]").forEach((form) => {
  if (!(form instanceof HTMLFormElement)) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const feedback = form.querySelector(".form-feedback");
    if (feedback) feedback.textContent = "Thanks for joining us. Newsletter delivery can be connected here.";
    form.reset();
  });
});

const menuItems = Array.from(document.querySelectorAll(".menu-item"));
const menuPagination = document.querySelector("#menuPagination");
const menuResultCount = document.querySelector("#menuResultCount");
const pageSize = 6;
let activeCategory = "all";
let activePage = 1;

const renderMenu = () => {
  if (menuItems.length === 0) return;
  const filteredItems = menuItems.filter((item) => activeCategory === "all" || item.dataset.category === activeCategory);
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  activePage = Math.min(activePage, pageCount);
  const start = (activePage - 1) * pageSize;
  const visibleItems = new Set(filteredItems.slice(start, start + pageSize));
  menuItems.forEach((item) => {
    item.hidden = !visibleItems.has(item);
  });

  if (menuResultCount) {
    const shownStart = filteredItems.length === 0 ? 0 : start + 1;
    const shownEnd = Math.min(start + pageSize, filteredItems.length);
    menuResultCount.textContent = `Showing ${shownStart}–${shownEnd} of ${filteredItems.length} dishes`;
  }
  if (menuPagination) {
    menuPagination.innerHTML = Array.from({ length: pageCount }, (_, index) => {
      const page = index + 1;
      const active = page === activePage;
      return `<li class="page-item${active ? " active" : ""}"><button class="page-link" data-page="${page}"${active ? ' aria-current="page"' : ""}>${page}</button></li>`;
    }).join("");
  }
};

document.querySelectorAll(".category-link[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category ?? "all";
    activePage = 1;
    document.querySelectorAll(".category-link").forEach((categoryLink) => {
      categoryLink.classList.toggle("active", categoryLink === button);
    });
    renderMenu();
  });
});

menuPagination?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest("[data-page]");
  if (!(button instanceof HTMLButtonElement)) return;
  activePage = Number(button.dataset.page);
  renderMenu();
});
renderMenu();

document.querySelectorAll("[data-quantity]").forEach((button) => {
  button.addEventListener("click", () => {
    const output = document.querySelector("#quantityValue");
    if (!output) return;
    const currentQuantity = Number(output.textContent);
    const change = button.getAttribute("data-quantity") === "plus" ? 1 : -1;
    output.textContent = String(Math.max(1, currentQuantity + change));
  });
});

document.querySelectorAll("[data-order-button]").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Online ordering coming soon";
    button.setAttribute("aria-live", "polite");
  });
});

document.querySelectorAll("[data-menu-order]").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Online ordering coming soon";
    button.setAttribute("aria-live", "polite");
    button.disabled = true;
  });
});
