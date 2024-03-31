// Define arrays to store todo items, completed items, and remaining items
var todoList = [];
var comdoList = [];
var remList = [];

// Get references to HTML elements
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

// Event listeners for buttons
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

// Event listener for clicks on document
document.addEventListener('click', (e) => {
    // If clicked element is a complete button or its icon
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    // If clicked element is a delete button or its icon
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e);
    }
    // If clicked element is "All" filter
    if (e.target.id == "all") {
        viewAll();
    }
    // If clicked element is "Pending" filter
    if (e.target.id == "rem") {
        viewRemaining();
    }
    // If clicked element is "Completed" filter
    if (e.target.id == "com") {
        viewCompleted();
    }
});

// Event listener for pressing Enter in input field
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

// Function to update completed and remaining lists
function update() {
    comdoList = todoList.filter((ele) => {
        return ele.complete;
    });
    remList = todoList.filter((ele) => {
        return !ele.complete;
    });
    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
}

// Function to add a new todo item
function add() {
    var value = todoInput.value;
    if (value === '') {
        alert("😮 Task cannot be empty");
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });
    todoInput.value = "";
    update();
    addinmain(todoList);
}

// Function to add todo items to the main list
function addinmain(todoList) {
    allTodos.innerHTML = "";
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
        allTodos.innerHTML += x;
    });
}

// Function to delete a todo item
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted;
    });
    update();
    addinmain(todoList);
}

// Function to mark a todo item as completed
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true;
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false;
                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    });
    update();
    addinmain(todoList);
}

// Function to delete all todo items
function deleteAll(todo) {
    todoList = [];
    update();
    addinmain(todoList);
}

// Function to delete selected todo items
function deleteS(todo) {
    todoList = todoList.filter((ele) => {
        return !ele.complete;
    });
    update();
    addinmain(todoList);
}

// Function to view only completed todo items
function viewCompleted() {
    addinmain(comdoList);
}

// Function to view only remaining todo items
function viewRemaining() {
    addinmain(remList);
}

// Function to view all todo items
function viewAll() {
    addinmain(todoList);
}
