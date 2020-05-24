// Define variables for form
const addBtn = document.querySelector('.add-btn');
const title = document.querySelector('.todo-input');
const taskDetail = document.querySelector('.todo-input-details');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Define variables for scroll
// const header = document.querySelector('header');
// const form = document.querySelector('form');
// const sticky = header.offsetTop;



// Event Listeners
addBtn.addEventListener('click', formValidate);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('change', filterTodo);
document.addEventListener('DOMContentLoaded', refreshTodo);
//window.onscroll = stickyScroll();



//Functions
function formValidate(event) {
    event.preventDefault();
    title.value ? addTask(event) : alert('Please enter a task');
}

function addTask(event) {
    event.preventDefault();

    // todoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');
    // todoTitle
    const newTitle = document.createElement('li');
    newTitle.classList.add('todo-title');
    newTitle.innerText = title.value;
    todoDiv.appendChild(newTitle);
    // Optional field: todoDetail
    const newDetail = taskDetail.value ? document.createElement('li') : null;
    // conditional statement to handle details input
    newDetail ? newDetail.classList.add('todo-detail') : null;
    newDetail ? newDetail.innerText = taskDetail.value : null;
    //conditional logic to add input to the list display
    newDetail ? todoDiv.appendChild(newDetail) : null;
    //save detail locally
    saveTodoLocally(title.value, taskDetail.value, false);
    // implement buttons
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
    checkBtn.classList.add('check-btn');
    todoDiv.appendChild(checkBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    // add created div to todo list 
    todoList.appendChild(todoDiv);
    title.value = '';
    taskDetail.value = '';
}

function deleteOrCheck(event) {
    const item = event.target;

    if (item.classList[0] === 'trash-btn') {
        const todoDiv = item.parentElement;

        // todo.classList.add('drop');
        // todo.addEventListener('transitionend', function () { 
        //     todo.remove()
        // });
        let title = todoDiv.firstChild.innerText;

        let todos = JSON.parse(localStorage.getItem('todos'));

        todos.forEach(function (t, i){
            todos[i].todo == title ? todos.splice(i, 1) : null
        });

        localStorage.setItem('todos', JSON.stringify(todos));

        todoDiv.remove();
    }

    if (item.classList[0] === 'check-btn') {
        let todoDiv = item.parentElement;
        
        let title = todoDiv.firstChild.innerText;
        
        let todos = JSON.parse(localStorage.getItem('todos'));
        
        todos.forEach(function (t, i) {
            todos[i].todo == title ? (todos[i].done == false ? todos[i].done = true : todos[i].done = false) : null;
        });

        localStorage.setItem('todos', JSON.stringify(todos));
        
        todoDiv.classList.toggle('checked');

    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach(function (todo) {

        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('checked')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                };
                break;
            case "uncompleted":
                if (todo.classList.contains('checked')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                };
                break;
        }
    });
}

function saveTodoLocally(todo, detail, done) {
    let todos;

    class TodoItem {
        constructor(todo, detail) {
            this.todo = todo,
                this.detail = detail,
                this.done = false
        }
    }

    todoNew = new TodoItem(todo, detail, done);

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    console.log(todoNew);
    // push new todo and details into arr
    todos.push(todoNew);
    //set localStorage to strings of new arr
    localStorage.setItem('todos', JSON.stringify(todos));
}

function refreshTodo() {

    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo, i) {

        todo = todos[i].todo;
        detail = todos[i].detail;
        done = todos[i].done;

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todoDiv');
        // todoTitle
        const newTitle = document.createElement('li');
        newTitle.classList.add('todo-title');
        newTitle.innerText = todo;
        todoDiv.appendChild(newTitle);
        // Optional field: todoDetail
        const newDetail = detail ? document.createElement('li') : null;
        // conditional statement to handle details input
        newDetail ? newDetail.classList.add('todo-detail') : null;
        newDetail ? newDetail.innerText = detail : null;
        //conditional logic to add input to the list display
        newDetail ? todoDiv.appendChild(newDetail) : null;
        // implement buttons
        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
        checkBtn.classList.add('check-btn');
        todoDiv.appendChild(checkBtn);

        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);

        // add created div to todo list 
        todoList.appendChild(todoDiv);
        done ? todoDiv.classList.add('checked') : null;

    })

}

// function stickyScroll (){
//     if (window.pageYOffset > sticky) {
//         header.classList.add("sticky");
//         form.classList.add("sticky");
//     } else {
//         header.classList.remove("sticky");
//         header.classList.remove("sticky");
//     }
// }
