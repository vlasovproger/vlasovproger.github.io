const Splide = require("@splidejs/splide");
const LazyLoad = require("vanilla-lazyload");

const lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy",
});

function checkSupport(fn) {
  var html = document.documentElement,
    WebP = new Image();

  WebP.onload = WebP.onerror = function() {
    var isSupported = WebP.height === 2;

    if (isSupported) {
      if (html.className.indexOf("no-webp") >= 0)
        html.className = html.className.replace(/\bno-webp\b/, "webp");
      else html.className += " webp";
    }
    fn(isSupported);
  };
  WebP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

document.addEventListener("DOMContentLoaded", () => {
  //Navigation scripts

  checkSupport((isSupported) => {
    if (!isSupported) {
      document.querySelector("header").classList.add("no-webp");
      document.querySelector("#review").classList.add("no-webp");
      document.querySelector("#contact").classList.add("no-webp");
    }
  });

  const ul = document.querySelector("ul.nav-list");
  window.addEventListener("scroll", () => {
    const windowTop = window.scrollY;
    const nav = document.querySelector("nav");

    windowTop > 300
      ? nav.classList.add("navShadow")
      : nav.classList.remove("navShadow");
    windowTop > 300 ? (ul.style.top = "62px") : (ul.style.top = "52px");
  });

  const logo = document.querySelector(".logo");

  logo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const links = document.querySelectorAll('a[href*="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      window.scrollTo({
        top: document.querySelector(link.getAttribute("href")).offsetTop - 80,
        behavior: "smooth",
      });
      e.preventDefault();
    });
  });

  const menuToggle = document.querySelector("#menu-hamburger");
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("closeMenu");
    ul.classList.toggle("showMenu");
    const lists = document.querySelectorAll("li.nav-item");
    lists.forEach((li) => {
      li.addEventListener("click", () => {
        ul.classList.remove("showMenu");
        menuToggle.classList.remove("closeMenu");
      });
    });
  });

  const quoteButtons = document.querySelectorAll(".get-quote");
  let getSiblings = function(e) {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
      return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;

    // collecting siblings
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  };
  document.querySelector(".shadow").addEventListener("click", () => {
    document.querySelector("#popup").classList.remove("opened");
  });
  document.querySelector("#popup > form > button").addEventListener("click", () => {
    document.querySelector("#popup").classList.remove("opened");
  });
  quoteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".popup-title").innerText = getSiblings(
        button
      )[1].innerText;
      document.querySelector("#popup").classList.toggle("opened");
    });
  });
});
