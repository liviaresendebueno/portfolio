const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

function handleButtonClick(event) {
    nav.classList.toggle("active")
}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);