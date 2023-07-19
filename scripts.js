// To Do List - JavaScript, HTML, and CSS
// STEPS
//
// 1. Enter new task in the input field and click 'Add' button
// 2. See new task item showing below input field
// 3. New task item have a checkbox for strikethrough task item
//    if completed task and X button to remove a task item.
// 4. Add new task if needed
// 5. Strikethrough task when completed task
// 6. Remove task item to click on "X" button

// Array to store tasks
let arrayTask = [];
// count each task item
let count = 0;
// get data from input field
taskInput = document.getElementById("getInput");
// localStorage declaration to set up storage
let allTodos = JSON.parse(localStorage.getItem("user_todos"))
  ? JSON.parse(localStorage.getItem("user_todos"))
  : [];
// assign to array
arrayTask = allTodos;

// Call btnAddTask function from click 'Add' button to add a new task item
function btnAddTask() {
  // Add value into newTask variable
  let newTask = document.getElementById("getInput").value;
  // when entered without data, alert message activate
  if (newTask === "") {
    alert("you forgot to enter your to do task item");
  }
  // newTask variable's trim to clean up space
  if (newTask.trim() !== "") {
    // object objTask has 3 variables: id, text, done
    let objTask = {
      id: count,
      text: newTask,
      done: false,
    };
    // push object in an array
    arrayTask.push(objTask);
    // call function to process data
    processTask();
    // input field to be empty
    taskInput.value = null;
    // add 1 to count
    count++;
    // save data in localStorage
    saveData();
  }
}

// function call to process data to put together on HTML tags
function processTask() {
  // create taskDisplay variable to show output on browser
  let taskDisplay = document.getElementById("display");
  // clear the HTML output
  taskDisplay.innerHTML = "";
  // create each element tag to output into taskItem
  arrayTask.forEach((objTask) => {
    // insert <li> element
    let taskItem = document.createElement("li");
    taskItem.className = objTask.done ? "done" : "";
    //  insert <input> element for checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = objTask.done;

    checkbox.addEventListener("change", () => changeTaskCompleted(objTask.id));
    // insert <span> element
    let spanText = document.createElement("span");
    spanText.textContent = objTask.text;
    // insert <button> element
    let removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.className = "remove-button";
    removeButton.addEventListener("click", () => removeTask(objTask.id));
    // add task item into object
    taskItem.appendChild(checkbox);
    taskItem.appendChild(spanText);
    taskItem.appendChild(removeButton);
    // display to do task item
    taskDisplay.appendChild(taskItem);
  });
}

processTask();

function changeTaskCompleted(id) {
  // toggle the change with strike through by click on checkbox
  let objTask = arrayTask.find((objTask) => objTask.id === id);
  objTask.done = !objTask.done;
  processTask();
  // save data in localStorage
  saveData();
}

function removeTask(id) {
  // returns the elements of an array that meet the condition specified in a callback function.
  arrayTask = arrayTask.filter((objTask) => objTask.id !== id);
  processTask();
  // save data in localStorage
  //saveData();
}

function saveData() {
  // let myObj_serialized = JSON.stringify(objTask);
  // localStorage.setItem("objTask", myObj_serialized);
  localStorage.setItem("user_todos", JSON.stringify(arrayTask));
}

// function showData() {
//   let myObj_deserialized = JSON.parse(localStorage.getItem(objTask));
//   document.getElementById("display").innerHTML = myObj_deserialized;
// }
