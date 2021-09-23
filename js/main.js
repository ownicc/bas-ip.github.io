var menu = document.querySelector(".mob-header");
var ham = document.querySelector(".mob-header__burger");

ham.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (menu.classList.contains("mob-header--show")) {
    menu.classList.remove("mob-header--show");
    ham.classList.toggle("mob-header__burger--change");
  } else {
    menu.classList.add("mob-header--show");
    ham.classList.toggle("mob-header__burger--change");
  }
}

var menuLinks = document.querySelectorAll(".link");

menuLinks.forEach(function (menuLink) {
  menuLink.addEventListener("click", toggleMenu);
});
