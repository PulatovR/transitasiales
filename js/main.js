(() => {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo(0, 0);

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const panel = document.querySelector("[data-menu]");
  const openBtn = document.querySelector("[data-menu-open]");
  const setMenu = (open) => {
    if (!panel) return;
    panel.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  openBtn?.addEventListener("click", () => setMenu(true));
  document.querySelectorAll("[data-menu-close]").forEach((node) => {
    node.addEventListener("click", () => setMenu(false));
  });
  panel?.addEventListener("click", (event) => {
    if (event.target === panel) setMenu(false);
  });

  const setBrandMenu = (menu, open) => {
    const root = menu.closest(".brand-menu");
    const button = root?.querySelector("[data-brand-open]");
    menu.hidden = !open;
    button?.setAttribute("aria-expanded", open ? "true" : "false");
  };
  document.querySelectorAll("[data-brand-open]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const menu = button.parentElement.querySelector("[data-brand-menu]");
      const willOpen = menu.hidden;
      document.querySelectorAll("[data-brand-menu]").forEach((item) => setBrandMenu(item, false));
      setBrandMenu(menu, willOpen);
    });
  });
  document.querySelectorAll("[data-brand-menu]").forEach((menu) => {
    menu.addEventListener("click", (event) => event.stopPropagation());
  });
  document.addEventListener("click", () => {
    document.querySelectorAll("[data-brand-menu]").forEach((menu) => setBrandMenu(menu, false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll("[data-brand-menu]").forEach((menu) => setBrandMenu(menu, false));
    }
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const slider = document.querySelector("[data-hero-slider]");
  if (slider) {
    const slides = [...slider.querySelectorAll(".hero__slide")];
    if (slides.length > 1) {
      let index = slides.findIndex((slide) => slide.classList.contains("is-active"));
      if (index < 0) index = 0;
      setInterval(() => {
        slides[index].classList.remove("is-active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("is-active");
      }, 3000);
    }
  }

  const leadForm = document.querySelector("[data-lead-form]");
  leadForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(leadForm);
    const clean = (value) => String(value || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
    const text = [
      "Здравствуйте! Заявка с сайта Транзит Азия-Лес.",
      "",
      `Имя: ${clean(data.get("name"))}`,
      `Компания: ${clean(data.get("company"))}`,
      `Телефон: ${clean(data.get("phone"))}`,
      `Почта: ${clean(data.get("email"))}`,
      "",
      "Сообщение:",
      clean(data.get("message")),
    ].join("\n").slice(0, 1500);
    window.location.href = `https://max.ru/:share?text=${encodeURIComponent(text)}`;
    leadForm.reset();
  });
})();
