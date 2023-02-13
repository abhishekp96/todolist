let taskArray = []; //create an empty array to store the tasks


document.getElementById("taskListContainer").style.display = "none"; //get the task list container and hide it by default

var newTask = document.getElementById("newTask");
newTask.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addBtn").click();
  }
});

//add new task on the press of 'Add Button'
let addBtn = document.getElementById("addBtn"); //get the 'add task' button
//add 'click' event to the 'add task' button
addBtn.addEventListener("click", () => {
  let newTask = document.getElementById("newTask").value; //get the new task value from input
  let taskItem = ""; //create an empty variable to store the task item

  let taskList = document.getElementById("taskList"); //get the table of contents
  taskList.innerHTML = "";

  // check if input field is empty
  if (newTask === "") {
    document.getElementById("alreadyEmptyAlert").style.display = "none"; // hide alert
    document.getElementById("emptyAlert").style.display = "block"; //display the alert
    document.getElementById("duplicateTasksAlert").style.display = "none"; // hide the alert
    document.getElementById("deletedTasksAlert").style.display = "none"; // hide alert
} else if (taskArray.includes(newTask)) {
  document.getElementById("alreadyEmptyAlert").style.display = "none"; // hide alert
  document.getElementById("emptyAlert").style.display = "none"; // hide alert
  document.getElementById("duplicateTasksAlert").style.display = "block"; // display the alert
  document.getElementById("deletedTasksAlert").style.display = "none"; // hide alert
}
else {
    taskArray.push(newTask); //add the task to the list of tasks
    // console.log(taskItem);
    document.getElementById("emptyAlert").style.display = "none"; // hide alert
    document.getElementById("alreadyEmptyAlert").style.display = "none"; // hide alert
    document.getElementById("deletedTasksAlert").style.display = "none"; // hide alert
    document.getElementById("duplicateTasksAlert").style.display = "none"; // hide the alert
    document.getElementById("taskListContainer").style.display = "block"; //get the task list container and display it
}

taskItem = buildTable(taskArray);

  taskList.innerHTML = taskItem; //add the table row to the table
  // console.log(taskList.innerHTML);

  document.getElementById("newTask").value = ""; //empty the input field
});

// display the tasklist
function buildTable(taskArray) {
    
    let taskItem = "";
    
    for(let i=0; i<taskArray.length; i++){
        taskItem += `<tr id="taskRow" >
                        <td >${i + 1}.</td>
                        <td onclick="completedTask((${i + 1}))" id="completeTask"> ${taskArray[i]} </td>
                        <td><div class="float-end">
                        <button type="button" id="editButton" onclick="editItem((${i + 1}))" class="text-primary border-0" data-toggle="tooltip" title="Edit Task"><i class="fa fa-edit"></i></button>
                        <button type="button" onclick="dltItem((${i + 1}))" class="text-danger border-0" data-toggle="tooltip" title="Delete Task"><i class="fa fa-trash"></i></button>
                        </div></td>  
                    </tr>`;
    }
       
    // console.log(taskItem);
  return taskItem;
}
    
//delete all tasks on the press of 'Delete All Button'
let dltAllBtn = document.getElementById("dltAllBtn");
//add 'click' event to the 'delete all' button
dltAllBtn.addEventListener("click", () => {
  if (taskArray.length === 0) {
    document.getElementById("alreadyEmptyAlert").style.display = "block"; // show alert
    document.getElementById("emptyAlert").style.display = "none"; // hide alert
    document.getElementById("deletedTasksAlert").style.display = "none"; // hide alert
  } else {
    document.getElementById("taskListContainer").style.display = "none"; //get the task list container and hide it
    taskArray.length = 0; //empty the 'taskArray' by setting the array length to 0
    // console.log(taskArray);

    document.getElementById("alreadyEmptyAlert").style.display = "none"; // hide alert
    document.getElementById("emptyAlert").style.display = "none"; // hide alert
    document.getElementById("deletedTasksAlert").style.display = "block"; // show alert
    document.getElementById("updateBtn").style.display = "none"; //hide update button
    document.getElementById("addBtn").style.display = "block"; //display add button
    document.getElementById("newTask").value = ""; //empty the input field
  }
});

//Cancel the edit functionality on click of cancel button
let cancelBtn = document.getElementById("cancelBtn");
//add 'click' event to the 'Cancel' button
cancelBtn.addEventListener("click", () => {
  document.getElementById("newTask").value = ""; //empty the input field
  document.getElementById("addBtn").style.display = "block"; //display add button
  document.getElementById("updateBtn").style.display = "none"; //hide update button
  cancelBtn.style.display = "none"; //hide cancel button
});


//clear the input field when clicked on close button
let inputCloseBtn = document.getElementById("inputCloseBtn");
inputCloseBtn.addEventListener("click", () => {
  document.getElementById("newTask").value = ""; //get the new task value from input
});


//delete the item when clicked on delete button
function dltItem(index) {
  // console.log(taskArray[index - 1]);
  taskArray.splice(index - 1, 1);

  let taskItem = buildTable(taskArray);
  let taskList = document.getElementById("taskList"); //get the table of contents

  taskList.innerHTML = taskItem; //add the table row to the table

  if (taskArray.length === 0) {
    document.getElementById("taskListContainer").style.display = "none"; //get the task list container and hide it
  }
  // console.log(taskArray);
  // console.log(taskArray[index - 1]);
}


// edit an item on the list on click of the edit button

function editItem(index) {
  let addBtn = document.getElementById("addBtn");
  let updateBtn = document.getElementById("updateBtn");
  let cancelBtn = document.getElementById("cancelBtn");
  // console.log(index);
  // console.log(taskArray[index - 1]);
//  console.log(newTask);
 document.getElementById("newTask").value = taskArray[index-1]; //get value of selected task in to input field
 addBtn.style.display = "none";  //hide the add button
 updateBtn.style.display = "block";  //show the update button
 cancelBtn.style.display = "block"; //show the cancel button

 //update the task on the press of update button
 updateBtn.addEventListener("click", () => {
  // console.log("updateBtn clicked");
  let newTask = document.getElementById("newTask").value; //get the new task value from input
  // console.log(newTask);

  taskArray.splice(index -1 , 1, newTask);  //remove the old task and add the new task
  // console.log(taskArray);
  let taskItem = buildTable(taskArray);
  let taskList = document.getElementById("taskList"); //get the table of contents

  taskList.innerHTML = taskItem; //add the table row to the table
  addBtn.style.display = "block";  //show the add button
  updateBtn.style.display = "none";  //hide the update button
  document.getElementById("newTask").value = ""; //empty the input field
 });
}

// completed tasks

function completedTask(index){
  let task = taskArray[index-1]; //storing the completed task in to variable
  if(task.includes('<span class="text-success" style="text-decoration:line-through">')){ //check if the task already had strike through and ticked out
    task = task.replace('<span class="text-success" style="text-decoration:line-through">', '').replace('</span> ', ''); //if yes then remove them
  } else {
    task = '<span class="text-success" style="text-decoration:line-through">' + task + '</span>  '; //if not the add them
  }
  taskArray[index-1] = task; //change the completed
  let taskItem = buildTable(taskArray);
  let taskList = document.getElementById("taskList"); //get the table of contents

  taskList.innerHTML = taskItem; //add the table row to the table
  
}
