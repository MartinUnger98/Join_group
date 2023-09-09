loadTask();

function loadBoard() {
    addTaskToTodo();
}

function loadNoTask() {
    let toDo = document.getElementById('toDo');
    toDo.innerHTML = '';
    toDo.innerHTML += /*html*/ `
        <div class="no-task-container d-flex justify-content-center align-items-center rounded-3">
            <span class="no-task-color">No tasks to Do</span>
        </div>
    `;
}


function addTaskToTodo() {
    let content = document.getElementById('toDo');
    content.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let title = task.title;
        let category = task.category;
        let description = task.description;
        let priority = task.prio
        content.innerHTML += showAddedSubtasks(title, category, description, priority, i);
        determineCategoryColor(category, `cardPrio-${i}`);    
    }
}

function determineCategoryColor(category, id) {
    let label = document.getElementById(id);
    if (category === 'Technical Task') {
        label.classList.add('technical-task')
    } else if (category === 'User Story') {
        label.classList.add('user-story');
    } else {
        label.innerHTML ='';
    }
}

function openDetailedTask(i) {
    renderDetailedTask(i);
    pushDetailedTaskToMiddle();
}

function renderDetailedTask(i) {
    let content = document.getElementById('detailedTask');
    content.innerHTML = '';
    const task = tasks[i];
    let title = task.title;
    let category = task.category;
    let description = task.description;
    let priority = task.priority;
    let prioImg = task.prio;
    let date = task.date;
    let subtask = task.subtask;
    content.innerHTML += showDetailedTask(title, category, description, priority,prioImg, date, i, subtask);
    renderSubtasks(subtask, i); 
        
    determineCategoryColor(category, `prio-detail-${i}`); 
}   

function renderSubtasks(subtask, i) {
    let subtaskContent = document.getElementById(`subtasks-${i}`);
    if (subtaskContent) {
        subtaskContent.innerHTML = '';
        
        if (subtask && subtask.length > 0) {
            for (let j = 0; j < subtask.length; j++) {
                const subtaskItem = subtask[j];
                subtaskContent.innerHTML += showSubtasksOfDetailedTask(subtaskItem, i, j);
            }
        }
    }
}


function pushDetailedTaskToMiddle() {
    let task = document.getElementById('detailedTask');
    task.classList.add('show-task');
    showHiddenBackground();
    scrollToTop();
}

function showHiddenBackground() {
    let bg = document.getElementById('bg');
    bg.classList.remove('d-none');
}

function hideBackground() {
    let bg = document.getElementById('bg');
    bg.classList.add('d-none');
}

function hideDetailedTask() {
    let task = document.getElementById('detailedTask');
    task.classList.remove('show-task');
    hideBackground();
}

function doNotClose(event) {
    event.stopPropagation();
}

function scrollToTop() {
    window.scrollTo({
        top: 50,
        behavior: 'smooth'
    });
}

function deleteNote(i) {
    debugger;
    hideDetailedTask();
    tasks.splice(i, 1);
    saveTasks();
    loadBoard();
    allMightyRender();
}