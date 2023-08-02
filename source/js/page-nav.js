"use strict";

const menu = document.querySelector(".page-nav");
const button = document.querySelector(".page-nav__toggle");

menu.classList.remove("page-nav_no-js")

button.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (menu.classList.contains("page-nav_closed")) {
    menu.classList.remove("page-nav_closed");
    menu.classList.add("page-nav_opened");
  } else {
    menu.classList.remove("page-nav_opened");
    menu.classList.add("page-nav_closed");
  }
});
