const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");
const darkModeIcon = document.querySelector("#darkModeIcon");
const body = document.querySelector("body");


// variable
let darkMode = false;
changeMode();

function toggleSidebar() {
   sidebar.classList.toggle("showSidebar");
}


function changePage(pageName) {
   
   let allPages = main.querySelectorAll("div");
   
   
   allPages.forEach((page) => {
     
     page.setAttribute("class", "inactive");
     
     if (pageName === page.getAttribute("id")){
       page.setAttribute("class", "active");
     }
     
     if (page.classList.contains("active") ){
       page.style.display = "block";
     } else {
      page.style.display = "none";
     }
   })
   
   sidebar.classList.remove("showSidebar");
}



function toggleDarkMode() {
   
   if (darkModeIcon.classList.contains("fa-toggle-off")) {
     darkMode = true;
   } else {
     darkMode = false;
   }
   
   changeMode();
}

function changeMode() {
   
   if (darkMode) {
     darkModeIcon.classList.remove("fa-toggle-off");
     darkModeIcon.classList.add("fa-toggle-on");
     
     body.classList.add("darkMode");
     
     
   } else {
     darkModeIcon.classList.remove("fa-toggle-on");
     darkModeIcon.classList.add("fa-toggle-off");
     
     body.classList.remove("darkMode");
   }
}