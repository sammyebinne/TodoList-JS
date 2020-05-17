// Define variables for form
const addBtn = document.querySelector('.add-btn');
const title = document.querySelector('.todo-input');
const taskDetail = document.querySelector('.todo-input-details');
const todoList = document.querySelector('.todo-list');

// Define variables for scroll
// const header = document.querySelector('header');
// const form = document.querySelector('form');
// const sticky = header.offsetTop;



// Event Listeners
addBtn.addEventListener('click', formValidate);
todoList.addEventListener('click', deleteCheck);
//window.onscroll = stickyScroll();



//Functions
function formValidate (event){
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
    newDetail ? todoDiv.appendChild(newDetail): null;
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
    // title.value = '';
    // taskDetail.value = '';
}

function deleteCheck(event){
    const item = event.target;
    const todo = item.parentElement;

    item.classList[0] === 'trash-btn' ? todo.remove() : item.classList[0] === 'check-btn' ? todo.classList.toggle('checked') : null; 
    
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
