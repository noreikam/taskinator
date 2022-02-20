var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {  
  event.preventDefault();
  // retrieve data from form
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if this is an edit to existing task
  var isEdit = formEl.hasAttribute("data-task-id");

  // call edit if isEdit is true
  if(isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // create new if isEdit is false
  else {
    // package data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    }

    // validate data is complete
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  // send taskDataObj to createTaskEl
  createTaskEl(taskDataObj);
  }  

  formEl.reset();  
};

// function to create a new task item
var createTaskEl = function(taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  // add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // call function for adding modify task buttons
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  
  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  // increment taskIdCounter
  taskIdCounter++;
}

// function to add buttons for actions that modify the task
var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  // create status change dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for(var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
}

//  function to initiate edit task
var editTask = function(taskId) {
  // retrieve current values for name and type
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;

  // send current values to form inputs
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
  console.log("editing " + formEl.getAttribute("data-task-id")); 
}

// function to update task with new values
var completeEditTask = function(taskName, taskType, taskId) {
  // find matching task list item 
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  // remove task id and reset button text
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add task";

}

//  function to delete a task
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
}

// function to handle modify task clicks
var taskButtonHandler = function(event) {
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    editTask(taskId);
  }

  if (targetEl.matches(".delete-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
}

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);