const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggle = document.querySelector(".theme-toggler");
menuBtn.onclick = function () {
    sideMenu.style.display = 'block';
}

closeBtn.onclick = function () {
    sideMenu.style.display = 'none';
}

themeToggle.onclick = function () {
    document.body.classList.toggle('dark-theme-variables');
    themeToggle.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggle.querySelector('span:nth-child(2)').classList.toggle('active');
}