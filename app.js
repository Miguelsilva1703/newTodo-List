//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(event){
    //Prevent Form from submitting
    event.preventDefault()

    //Create wrap
    const todoDivWrap = document.createElement("div")
    todoDivWrap.classList.add("div-wrap");

    //Create TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');


    //Create LI within DIV
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    //Add TODO to Local Storage
    saveLocalTodos(todoInput.value);
 
    //Create complete/check mark button
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);


    //Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);


    //Append Wrap
    todoDivWrap.appendChild(todoDiv);
    //Append to List
    todoList.appendChild(todoDivWrap);

    //Clear TODO value
    todoInput.value = "";
}



//Delete TODO 
function deleteCheck (event){
    const item = event.target;

    if(item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }


    //Check Mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                } 
                break;  
            case "incomplete":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}



//Local Storage
function saveLocalTodos(todo) {
    //Storage Check --- Do i already have anything in there?
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}




function getTodos(){
    
    //Storage Check --- Do i already have anything in there?
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
   
    todos.forEach(function(todo){
        //Create TODO DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');


        //Create LI within DIV
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        //Create complete/check mark button
        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completeButton);


        //Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(deleteButton);

        //Append to List
        todoList.appendChild(todoDiv);
    })
}


function removeLocalTodos(todo){
    //Storage Check --- Do i already have anything in there?
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
    
}