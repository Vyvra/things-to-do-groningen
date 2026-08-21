// Things to do in Groningen — progressive-enhancement JS.
// Everything still works if this file fails to load.

(() => {
  // 1. Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the menu after tapping a link (mobile)
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. Scroll-reveal for cards (adds .reveal only when JS runs, so no-JS
  //    users simply see everything).
  var revealables = document.querySelectorAll(
    ".card, .section-head, .table-wrap",
  );
  revealables.forEach((el) => {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    revealables.forEach((el) => {
      io.observe(el);
    });
  } else {
    revealables.forEach((el) => {
      el.classList.add("visible");
    });
  }

  // 3. Scrollspy — highlight the active section in the nav.
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            links.forEach((a) => {
              a.classList.toggle("active", a.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      spy.observe(s);
    });
  }
})();
