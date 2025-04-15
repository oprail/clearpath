const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");
const darkModeIcon = document.querySelector("#darkModeIcon");
const body = document.querySelector("body");
const todoInput = document.querySelector("#todo-input");





// todos
const incompleteTodoBox = document.querySelector(".incomplete");
const completeTodoBox = document.querySelector(".complete");

// events
const eventNameInput = document.querySelector("#event-name");
const eventTypeInput = document.querySelector("#event-type");
const eventDateInput = document.querySelector("#event-date");
const eventColorInput = document.querySelector("#event-color");
const eventsTimeline = document.querySelector(".events-timeline");

// Sllybus
const subjectNameInput = document.querySelector("#subject-name");



// variable
let darkMode = false;
let letterLimit = 2;








//  ❤❤️❤️❤️❤️❤️❤️
let months = ["Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augt",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let tempEvents = [];
let events = [];














window.onload = function() {
   eventDateInput.valueAsDate = new Date();
   changeMode();
}


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

function setWordLimit(input, limit) {
   letterLimit = limit;
   
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


function addNewEvent() {
   
  if (
    eventNameInput.value === ""
    || eventTypeInput.value ===""
    || eventDateInput.value ==="") {
    alert("write suff");
    return;
  }
   
let date = eventDateInput.value;



let day = date.substring(8, 33);
let month = date.substring(5, 7);
let eventYear = date.substring(0, 4);
let eventDate = `${day} ${months[month - 1]}`;


let fullTime = `${eventYear}${month}${day}`;




   
   let event = `<div class="date-box" style="border-right: 2px solid ${eventColorInput.value};">
    <p id="event-day">${eventDate}</p>
    <p id="event-year">${eventYear}</p>
  </div>
  <div class="event-box">
    <p id="eventName">${eventNameInput.value}</p>
    <p id="eventType">${eventTypeInput.value}</p>
  </div>
  <div class="icon-box">
    <i onclick="deleteEvent(event)" class="fas fa-trash"></i>
    <i onclick="editEvent(event)" class="fas fa-pen"></i>
  </div>`;
   
   
   
   let eventDiv = document.createElement("div");
   eventDiv.classList.add("event");
   eventDiv.innerHTML = event;
   
   let newEvent = {
     eventEl : eventDiv,
     eventDate : fullTime,
   }
   
   sortEvents(newEvent);
   
   
}


function sortEvents(newEvent) {
  let tempEvents = [...events];
  tempEvents.push(newEvent);
  events = [];
  
  while (tempEvents.length > 0) {
    let biggerDate = tempEvents.reduce((pre, curr) => {
      return pre.eventDate > curr.eventDate ? pre : curr;
    });
    
    tempEvents.splice(tempEvents.indexOf(biggerDate), 1);
    events.push(biggerDate);
  }
  
  // console.log("sorted list", events);
  
  displayTimeline()
}

function displayTimeline() {
   
   events.forEach((event) => {
     eventsTimeline.prepend(event.eventEl);
   })
}

function deleteEvent(e) {
   
   let confirmRemoval = confirm("This Can't be reversed");
   
   if (!confirmRemoval) return;
   
   let target = e.target.parentElement.parentElement;
   
   events.forEach((event) => {
     
    if (event.eventEl === target){
       
       events.splice(events.indexOf(event), 1);
       target.remove();
       
     }
   })
   
   
   
}
function editEvent(e) {
   
   let confirmRemoval = confirm("Do you want to delete this and add new");
   
   if (!confirmRemoval) return;
   
   let target = e.target.parentElement.parentElement;
   
   eventNameInput.value = target.querySelector("#eventName").innerText;
   eventTypeInput.value = target.querySelector("#eventType").innerText;
   
   
   
   events.splice(events.indexOf(event), 1);
   target.remove();
   
}


// Working On Sllybus 



function addNewSubject() {
   console.log("new subject");
}






















// event listneres
todoInput.addEventListener("input", () => {
   setWordLimit(todoInput, 20);
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

// new






