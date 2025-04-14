const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");
const darkModeIcon = document.querySelector("#darkModeIcon");
const body = document.querySelector("body");
const todoInput = document.querySelector("#todo-input");


// todos

const incompleteTodoBox = document.querySelector(".incomplete");
const completeTodoBox = document.querySelector(".complete");





// variable
let darkMode = true;
let letterLimit = 20;
changeMode();

function toggleSidebar() {
   sidebar.classList.toggle("showSidebar");
}



function changePage(pageName) {
  const allPages = document.querySelectorAll(".page");
  
  allPages.forEach((page) => {
    if (page.id === pageName) {
      page.classList.add("active");
      page.classList.remove("inactive");
    } else {
      page.classList.remove("active");
      page.classList.add("inactive");
    }
  });
  
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







function setWordLimit(input) {
   letterLimit = 20;
   
   let tempText = input.value;
   let limitedText = tempText.substring(0, letterLimit);
   
   input.value = limitedText;
}


function addNewTodo() {
   
   if (todoInput.value == "") {
     alert("Write Todo");
     return;
   }
   
   let todoDiv = document.createElement("div");
   let todoP = document.createElement("p");
   let todoI = document.createElement("i");
   
   todoP.innerText = todoInput.value;
   
   todoDiv.setAttribute("class","todo")
   todoI.classList.add("far");
   todoI.classList.add("fa-square");
   
   todoDiv.appendChild(todoI);
   todoDiv.appendChild(todoP);
   
   
   incompleteTodoBox.prepend(todoDiv);
}



function checkTodo(e) {
   
   
   if (e.target.classList.contains("todo")) {
     console.log("yes");
     
     let icon = e.target.querySelector("i")
     icon.classList.remove("fa-square");
     icon.classList.add("fa-check-square");
    // icon.style.color = "green";
    
    
    // move it
    completeTodoBox.prepend(e.target);
    
    
    
   }
}




function unCheckTodo(e) {
   
   
   if (e.target.classList.contains("todo")) {
     console.log("yes");
     
     let icon = e.target.querySelector("i")
     icon.classList.remove("fa-check-square");
     icon.classList.add("fa-square");
    // icon.style.color = "green";
    
    
    // move it
    incompleteTodoBox.prepend(e.target);
    
   }
}

function deleteTodo(e) {
   
   if (e.target.classList.contains("todo")) {
     
     let confirmRemoval = confirm("Do you want to delete this task?");
     
     if (confirmRemoval) {
       e.target.remove();
     }
     
   }
   
}











// event listneres
todoInput.addEventListener("input", () => {
   setWordLimit(todoInput);
});

incompleteTodoBox.addEventListener("click",(e) => {
   checkTodo(e);
});
completeTodoBox.addEventListener("click", (e) => {
   unCheckTodo(e);
});
incompleteTodoBox.addEventListener("dblclick", (e) => {
  deleteTodo(e);
});
completeTodoBox.addEventListener("dblclick", (e) => {
   deleteTodo(e);
});