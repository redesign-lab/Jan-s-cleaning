/* Jan's Simply Cleaning Services — interactions */
(function () {
  "use strict";

  // Mobile menu
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // FAQ accordion (one open at a time)
  var accBtns = document.querySelectorAll(".acc-btn");
  accBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.nextElementSibling;
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      accBtns.forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
        b.nextElementSibling.classList.remove("open");
      });
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        panel.classList.add("open");
      }
    });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form -> opens email app with prefilled message (no fake backend)
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("fName").value.trim();
      var phone = document.getElementById("fPhone").value.trim();
      var service = document.getElementById("fService").value;
      var msg = document.getElementById("fMsg").value.trim();
      if (!name || !phone) {
        alert("Please add your name and phone number so we can reach you.");
        return;
      }
      var subject = encodeURIComponent("Service Request — " + service);
      var body = encodeURIComponent(
        "Name: " + name + "\nPhone: " + phone + "\nService: " + service + "\n\nMessage:\n" + (msg || "—")
      );
      window.location.href = "mailto:jankinney90@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
})();
