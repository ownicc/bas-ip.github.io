var menu = document.querySelector(".mob-header");
var ham = document.querySelector(".mob-header__burger");
var body = document.querySelector("body");

ham.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (menu.classList.contains("mob-header--show")) {
    menu.classList.remove("mob-header--show");
    ham.classList.toggle("mob-header__burger--change");
    body.classList.toggle("lock");
  } else {
    menu.classList.add("mob-header--show");
    body.classList.toggle("lock");
    ham.classList.toggle("mob-header__burger--change");
  }
}

var menuLinks = document.querySelectorAll(".mob-header__link");

menuLinks.forEach(function (menuLink) {
  menuLink.addEventListener("click", toggleMenu);
});

$(".multiple-items").slick({
  infinite: false,
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 3,
});
