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
// popup
const popup = document.querySelector(".popup");
const subPopup = document.querySelector(".subPopup");
// Sllybus
const subjectNameInput = document.querySelector("#subject-name");
const subjectColorInput = document.querySelector("#subject-color");
const subjectsContainer = document.querySelector(".subjects-container");

const chapterNameInput = document.querySelector("#chapter-name");
const chapterLinkInput = document.querySelector("#chapter-link");


// doubt pagr
const doubtSubjectInput = document.querySelector("#doubt-subject");
const doubtQuestionInput = document.querySelector("#doubt-question");
const doubtInput = document.querySelector("#doubt-doubt");
const doubtSolutionInput = document.querySelector("#doubt-solution");
const solutionLinkInput = document.querySelector("#doubt-solution-link");
const doubtContainer = document.querySelector(".doubt-container");


// link saverpage
const linkTitleInput = document.querySelector("#title-input");
const linkInput = document.querySelector("#link-input");
const linkContainer = document.querySelector(".link-container");

// const Input = document.querySelector("#title-input");
// const Input = document.querySelector("#title-input");

// progress board

const todoProgress = document.querySelector(".todo-progress");


// save data to local storage



// const Progress = document.querySelector(".");
// const Progress = document.querySelector(".");
// const Progress = document.querySelector(".");
// const Progress = document.querySelector(".");
// const Progress = document.querySelector(".");






// variable
let darkMode = false;
let letterLimit = 2;
let subTarget;







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
   
   
   // imp
   displayTodoData();
   displaySllybusData();
   displayDoubtData();
   displayLinkData();
   displayEventData();
   
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
   
   
   
   
   updateTodoStats();
   saveTodoData();
}



function checkTodo(e) {
   
   
   if (e.target.classList.contains("todo")) {
     
     let icon = e.target.querySelector("i")
     icon.classList.remove("fa-square");
     icon.classList.add("fa-check-square");
    // icon.style.color = "green";
    
    
    // move it
    completeTodoBox.prepend(e.target);
    
    
    updateTodoStats();
    saveTodoData();
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
   
   updateTodoStats();
   saveTodoData();
}

function deleteTodo(e) {
   
   if (e.target.classList.contains("todo")) {
     
     let confirmRemoval = confirm("Do you want to delete this task?");
     
     if (confirmRemoval) {
       e.target.remove();
     }
     
   }
   
   updateTodoStats();
   saveTodoData();
}









// event



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
   });
   saveEventData();
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
   
   
   saveEventData();
}
function editEvent(e) {
   
   let confirmRemoval = confirm("Do you want to delete this and add new");
   
   if (!confirmRemoval) return;
   
   let target = e.target.parentElement.parentElement;
   
   eventNameInput.value = target.querySelector("#eventName").innerText;
   eventTypeInput.value = target.querySelector("#eventType").innerText;
   
   
   
   events.splice(events.indexOf(event), 1);
   target.remove();
   
   
   saveEventData();
}



// popup 
function showPopup(e) {
   subPopup.style.display ="none";
   popup.classList.remove("hide");
   
   subTarget = e.target.parentElement.parentElement.parentElement.parentElement;
}
function hidePopup() {
   popup.classList.add("hide");
   subPopup.style.display ="block";
}




// Working On Sllybus 

function addNewSubject() {
   
   
   if (subjectNameInput.value === "") {
    alert("fill the field");
    return;
   }
   
   
   let subjectBoxHtml = `<div class="sub-info">
     <p class="subjectName" style="color: ${subjectColorInput.value};">${subjectNameInput.value}</p><div class="sub-icon">
   <button onclick="showPopup(event)" class="button" type="submit">
     <i class="fas fa-plus"></i>
   </button>
   <button onclick="deleteSubject(event)" class="button deleteBtn" type="submit">
     <i class="fas fa-trash">
      </i>
    </button>
</div>
   </div>
    <div class="chapter-container">
    </div>`;
   
   
   let subjectDiv = document.createElement("div");
   
   subjectDiv.classList.add("subject");
   subjectDiv.innerHTML = subjectBoxHtml;
   
    subjectsContainer.prepend(subjectDiv);
    
    
    saveSllybusData();
}



function deleteSubject(e) {
   
   let target = e.target.parentElement.parentElement.parentElement.parentElement;
   
   
   let confirmRemoval = confirm("subject will be deleted");
   
   
   if (confirmRemoval) {
     target.remove();
   }
   
   saveSllybusData();
}

function addNewChapter(param) {
   
   
   if (chapterNameInput.value === "" || chapterLinkInput.value === "") {
     alert("fill the fields");
     return;
   }
   
   
   
   let shortDisplayLink = chapterLinkInput.value.substring(0, 15);
   
   let chapterContainer = subTarget.querySelector(".chapter-container");
   
   let chapterBoxHtml = `<div class="chapter-info">
     <p class="chapterName">${chapterNameInput.value}</p>
     <p class="revised" id="0">Rivesed 0x</p>
     <a href"${chapterLinkInput.value}">${shortDisplayLink}...</a>
   </div>
   <div class="icons">
     <i onclick="chapterCompleted(event)" class="far fa-square"></i>
     <i onclick="addRevision (event)" class="fas fa-book"></i>
     <i onclick="deleteChapter(event)" class="fas fa-trash"></i>
    </div>`;
   
   
   let chapterDiv = document.createElement("div");
   
   chapterDiv.classList.add("chapter");
   chapterDiv.innerHTML = chapterBoxHtml;
   
   chapterContainer.prepend(chapterDiv);
   
   saveSllybusData();
}




function deleteChapter(e) {
  
  let target = e.target.parentElement.parentElement;
  
  
  let confirmRemoval = confirm("chapter will be deleted");
  
  
  if (confirmRemoval) {
    target.remove();
  }
  
  saveSllybusData();
}



function chapterCompleted(e) {
   
   let target = e.target.parentElement.parentElement;
   
   if (e.target.classList.contains("fa-square")) {
     e.target.classList.remove("fa-square");
     e.target.classList.add("fa-check-square");
     e.target.style.color ="green";
     target.id = "complete";
   } else {
     e.target.classList.remove("fa-check-square");
     e.target.classList.add("fa-square");  
     e.target.style.color ="#000";
     target.id = "incomplete";
   }
   
   
   saveSllybusData();
}

    

function addRevision(e) {
   
   let msg = "do you want increse revision count";
   
    if (!confirm(msg)) {
      return;
    }
   
   
   let target = e.target.parentElement.parentElement;
   
   
   let revisedP = target.querySelector(".revised");
   
   let reviseCount = parseInt(revisedP.id) + 1;
   
   revisedP.id = reviseCount;
   
   revisedP.style.fontSize = "0.65rem";
   
   revisedP.innerText = `Rivesed ${reviseCount}x`;
   
   setTimeout(()=> {revisedP.style.fontSize = "0.6rem";},300);
   
   
   saveSllybusData();
}







// Doubt page 
function addNewDoubt() {
   
   
  if (doubtSubjectInput.value === "" 
  || doubtQuestionInput.value === "" 
  || doubtInput.value === "" 
  || doubtSolutionInput.value === "") {
     
    alert("fill the fields");
    return;
  }
   
   
   
   let doubtHtml = `<div class="doubt-sub">
     <p class="doubtSubjectName">${doubtSubjectInput.value}</p>
     <button onclick="deleteDoubt(event)" class="button" type="submit">
        <i class="fas fa-trash"></i>
     </button>
   </div>
   <div class="doubt-info">
     <textarea id="doubt-qus" readonly>Question : ${doubtQuestionInput.value}
     </textarea>
     <textarea readonly>Doubt : ${doubtInput.value}
     </textarea>
     <textarea readonly>Solution : ${doubtSolutionInput.value}
     </textarea>
     <div id="doubtLink">
       <a href="${solutionLinkInput.value}">${solutionLinkInput.value}</a>
      </div>
   </div>`;
   
   let doubtDiv = document.createElement("div");
   doubtDiv.classList.add("doubt");
   doubtDiv.innerHTML = doubtHtml;
   doubtContainer.prepend(doubtDiv);
   
   
   doubtSubjectInput.value = "";
   doubtQuestionInput.value = "";
   doubtInput.value = "";
   doubtSolutionInput.value = "";
   solutionLinkInput.value = "";
   
   
   saveDoubtData();
}

function deleteDoubt(e) {
   let target = e.target.parentElement.parentElement.parentElement;
   
   let confirmRemoval = confirm("doubt will be deleted");
   
   if (confirmRemoval) {
     target.remove();
   }
   
   saveDoubtData();
}



// link saver
function saveLink() {
   
   
   if (linkTitleInput.value === "" || linkInput.value === "") {
     alert("please fill the feilds");
     return;
   }
   
   
   let linkHtml = `<p>${linkTitleInput.value}</p><i onclick="removeLink(event)" class="fas fa-trash"></i>
   <a href="${linkInput.value}">${linkInput.value}</a>`;
   
   
   let linkDiv = document.createElement("div");
   linkDiv.classList.add("link");
   linkDiv.innerHTML = linkHtml;
   linkContainer.prepend(linkDiv);
   
   linkTitleInput.value = "";
   linkInput.value = "";
   
   saveLinkData();
}

function removeLink(e) {
   let target = e.target.parentElement;
   
   
  let confirmRemoval = confirm("link will be deleted");
   
   if (confirmRemoval) {
    target.remove();
   }   
   
   saveLinkData();
}












// progress bar 
function updateTodoStats() {
   
   
   let totalIncompleteTodo = incompleteTodoBox.querySelectorAll(".todo").length;
   let totalCompleteTodo = completeTodoBox.querySelectorAll(".todo").length;
   
   
   let compPercent = totalCompleteTodo / (totalIncompleteTodo + totalCompleteTodo) * 100;
   
   let incompPercent = totalIncompleteTodo / (totalCompleteTodo + totalIncompleteTodo) * 100;
   
   
   todoProgress.querySelector("p").innerText = `${parseInt(compPercent)}%`;
   
   
   let statsHtml = `<p>Total Tasks : ${totalIncompleteTodo + totalCompleteTodo}</p>
    <p style="color: red;">Complete : ${totalCompleteTodo}</p>
    <p style="color: green;">Incomplete : ${totalIncompleteTodo}</p>`;
   
    
    todoProgress.style.background =  `linear-gradient(120deg, #1BFF00 ${compPercent}%, red 0%)`;
   
   let statsBox = todoProgress.nextElementSibling;
   statsBox.innerHTML = statsHtml;
   
}

















// saving data
function saveTodoData() {
   
  localStorage.removeItem("incompleteTodoData");
  localStorage.removeItem("completeTodoData");
   
  localStorage.setItem("incompleteTodoData", incompleteTodoBox.innerHTML);
  localStorage.setItem("completeTodoData", completeTodoBox.innerHTML);
   
  // displayData();
   
}
function displayTodoData() {
   
   
  if (localStorage.getItem("incompleteTodoData") === undefined && localStorage.getItem("completeTodoData") === undefined) {
    return;
  }
   
  console.log("seted")
  incompleteTodoBox.innerHTML = localStorage.getItem("incompleteTodoData");
   
   
  completeTodoBox.innerHTML = localStorage.getItem("completeTodoData");
   
}






// sllybus data
function saveSllybusData() {
  
  localStorage.removeItem("sllybusData");
  
  
  localStorage.setItem("sllybusData", subjectsContainer.innerHTML);
  
  
  // displayData();
  
}

function displaySllybusData() {
  
  let data = localStorage.getItem("sllybusData");
  
  console.log(data)
  
  if (data === null) {
    return;
  }
  
  subjectsContainer.innerHTML = data;
  
}



// Doubt data
function saveDoubtData() {
  
  localStorage.removeItem("doubtData");
  
  
  localStorage.setItem("doubtData", doubtContainer.innerHTML);
  
  
  // displayData();
  
}

function displayDoubtData() {
  
  let data = localStorage.getItem("doubtData");
  
  console.log(data)
  
  if (data === null) {
    return;
  }
  
  doubtContainer.innerHTML = data;
}

// link data
function saveLinkData() {
  
  localStorage.removeItem("linkData");
  
  
  localStorage.setItem("linkData", linkContainer.innerHTML);
  
  
  // displayData();
  
}

function displayLinkData() {
  
  let data = localStorage.getItem("linkData");
  
  
  if (data === null) {
    return;
  }
  
  linkContainer.innerHTML = data;
}


// event data
function saveEventData() {
  
  localStorage.removeItem("eventData");
  
  
  localStorage.setItem("eventData", eventsTimeline.innerHTML);
  
  
  // displayData();
  
}

function displayEventData() {
  
  let data = localStorage.getItem("eventData");
  
  
  if (data === null) {
    return;
  }
  
  eventsTimeline.innerHTML = data;
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






