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

var today = new Date();
   var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   var dateTime = date+' '+time;
   document.getElementById("curent-day").innerHTML = date;
