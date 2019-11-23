const AOS = require("aos");
const LazyLoad = require("vanilla-lazyload")

AOS.init();

const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});



function checkSupport(fn) {
    var html = document.documentElement,
        WebP = new Image();

    WebP.onload = WebP.onerror = function() {
        var isSupported = (WebP.height === 2);

        if (isSupported) {
            if (html.className.indexOf('no-webp') >= 0)
                html.className = html.className.replace(/\bno-webp\b/, 'webp');
            else html.className += ' webp';
        }
        fn(isSupported);
    };
    WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

document.addEventListener("DOMContentLoaded", () => {
	//Navigation scripts

	checkSupport((isSupported) => {
		if(!isSupported) {
			document.querySelector("#hero-section").classList.add('no-webp')
		}
	})

	const ul = document.querySelector("ul.nav-list");
	window.addEventListener("scroll", () => {
		const windowTop = window.scrollY;
		const nav = document.querySelector("nav");

		windowTop > 100
			? nav.classList.add("navShadow")
			: nav.classList.remove("navShadow");
		windowTop > 100 ? (ul.style.top = "100px") : (ul.style.top = "160px");
	});

	const logo = document.querySelector(".logo");

	logo.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});

	const links = document.querySelectorAll('a[href*="#"]');
	links.forEach(link => {
		link.addEventListener("click", e => {
			window.scrollTo({
				top:
					document.querySelector(link.getAttribute("href"))
						.offsetTop - 100,
				behavior: "smooth"
			});
			e.preventDefault();
		});
	});

	const menuToggle = document.querySelector("#menu-hamburger");
	menuToggle.addEventListener("click", () => {
		const firstUl = document.querySelector("ul.nav-list"),
			secondUl = document.querySelector("ul.nav-list.second"),
			li = secondUl.querySelectorAll("li");

		const resizeMenu = () => {
			const parent = window.outerWidth <= 960 ? firstUl : secondUl;
			[].forEach.call(li, el => {
				parent.appendChild(el);
			});
		};
		resizeMenu();
		window.addEventListener("resize", resizeMenu, false);

		menuToggle.classList.toggle("closeMenu");
		ul.classList.toggle("showMenu");
		const lists = document.querySelectorAll("li.nav-item");
		lists.forEach(li => {
			li.addEventListener("click", () => {
				ul.classList.remove("showMenu");
				menuToggle.classList.remove("closeMenu");
			});
		});
	});

	//Slider script

	const slides = document.querySelectorAll(".slide");
	const avatars = document.querySelectorAll(".avatar");
	const next = document.querySelector("#next");
	const prev = document.querySelector("#prev");
	const nextSlide = () => {
		const currentSlide = document.querySelector(".slide.current");
		const currentAvatar = document.querySelector(".avatar.current");
		currentSlide.classList.remove("current");

		currentAvatar.classList.remove("current");
		if (currentSlide.nextElementSibling) {
			currentSlide.nextElementSibling.classList.add("current");
			currentAvatar.nextElementSibling.classList.add("current");
		} else {
			slides[0].classList.add("current");
			avatars[0].classList.add("current");
		}
	};
	const prevSlide = () => {
		const currentSlide = document.querySelector(".slide.current");
		const currentAvatar = document.querySelector(".avatar.current");
		currentSlide.classList.remove("current");
		currentAvatar.classList.remove("current");
		if (currentSlide.previousElementSibling) {
			currentSlide.previousElementSibling.classList.add("current");
			currentAvatar.previousElementSibling.classList.add("current");

			currentAvatar.previousElementSibling.classList.add("current");
		} else {
			slides[slides.length - 1].classList.add("current");
			avatars[avatars.length - 1].classList.add("current");
		}
	};
	next.addEventListener("click", e => {
		nextSlide();
	});

	prev.addEventListener("click", e => {
		prevSlide();
	});
});
