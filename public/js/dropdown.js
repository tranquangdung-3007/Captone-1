var dropdown = document.querySelector(".dropdown-menu")
var clickdropdown = document.querySelector(".arrow")
var menu_c = document.querySelectorAll("#dropdown > li")
for (var i=0;i < menu_c.length;i++){
    menu_c[i].addEventListener("click",function(e){
        for(var j = 0;j < dropdown.length;j++){
            dropdown[j].style.display ="none"
        }
        this.children[1].style.display = "block";
        
    })
}