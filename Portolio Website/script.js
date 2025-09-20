var typed = new Typed('#element', {
    strings: ['Web Designer', 'Video Editor', 'Photo Editor', 'UI/UX Designer'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);

    const heroContent = document.querySelector('.hero-content');
    if (window.scrollY > 0) {
        heroContent.classList.add('visible');
    }
});

const form = document.querySelector('.contact-form');
form.addEventListener('submit', function(event) {
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });
});

let cursor = document.querySelector('#cursor');
let blur_crs = document.querySelector('#blur');

document.addEventListener("mousemove", function (dets) {
    cursor.style.left = dets.x + "px";
    cursor.style.top = dets.y + "px";
    cursor.style.transition = "all 0.1s linear";
    blur_crs.style.left = dets.x + "px";
    blur_crs.style.top = dets.y + "px";
    blur_crs.style.transition = "all 0.1s linear";
    blur_crs.style.transform = "translate(-50%,-50%)";
  });

var hov = document.querySelectorAll(".nav-links li,.social-icons a,.skills span,.btn,footer ul li");
hov.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    cursor.style.scale = 3;
    cursor.style.border = "1px solid #BB86FC";
    cursor.style.backgroundColor = "transparent";
  });
  elem.addEventListener("mouseleave", function () {
    cursor.style.scale = 1;
    cursor.style.border = "0px solid #8A2BE2";
    cursor.style.backgroundColor = "#8A2BE2";
  });
});