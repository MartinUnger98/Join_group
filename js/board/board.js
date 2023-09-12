let currentDraggedElement;

/**
 * This function is the render-function for board.html
 */
function loadBoard() {
    renderToDoColumn();
}

/**
 * This function renders either no-task-div or - in case there are saved tasks - all existing tasks
 */
function renderToDoColumn() {
    if (tasks.length < 1) {
        loadNoTask();
    } else {
        renderTasks('toDo');
        renderTasks('inProgress');
        renderTasks('awaitFeedback');
        renderTasks('taskDone');
    }
}

/**
 * This function creates the no-task-div
 */
function loadNoTask() {
    let toDo = document.getElementById('toDo');
    toDo.innerHTML = '';
    toDo.innerHTML += /*html*/ `
        <div class="no-task-container d-flex justify-content-center align-items-center rounded-3">
            <span class="no-task-color">No tasks to do</span>
        </div>
    `;
}

/**
 * This function creates tasks inside of the toDo-column
 */
function renderTasks(status) {
    let taskStatus = tasks.filter(t => t['status'] == status);
    let content = document.getElementById(status);
    content.innerHTML = '';
    for (let i = 0; i < taskStatus.length; i++) {
        const task = taskStatus[i];
        let title = task.title;
        let category = task.category;
        let description = task.description;
        let priority = task.prio;
        let subtasks = task.subtask;
        let amountOfSubtasks = subtasks.length;
        let id = task.id;
        content.innerHTML += showAddedSubtasks(title, category, description, priority, amountOfSubtasks, id);
        determineCategoryColor(category, `cardPrio-${id}`); 
        renderDetailedTask(i, id);
    }
}

function openDetailedTask(id) {
    debugger;
    let position;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        position = i;
        break;
      }
    }
    renderDetailedTask(position, id);
    pushDetailedTaskToMiddle();
}

/**
 * This function determine the backgroundcolor of the specific task
 * @param {*} category - category of task loaded from array "tasks"
 * @param {*} id - ID of specific task
 */
function determineCategoryColor(category, id) {
    let label = document.getElementById(id);
    if (category === 'Technical Task') {
        label.classList.add('technical-task')
    } else if (category === 'User Story') {
        label.classList.add('user-story');
    } 
}

/**
 * This function renders the specifc detailed task for each rendered task
 * @param {*} i - speicfic number of detailed task (task) - used as id
 */
function renderDetailedTask(i, id) {
    let content = document.getElementById('detailedTask');
    content.innerHTML = '';
    const task = tasks[i];
    let title = task.title;
    let category = task.category;
    let description = task.description;
    let priority = task.priority;
    let prioImg = task.prio;
    let date = formatDate(task.date);
    let subtask = task.subtask;
    content.innerHTML += showDetailedTask(title, category, description, priority,prioImg, date, i, subtask);
    renderSubtasks(subtask, i, id); 
    updateCheckedSubtasksCount(i, id);
    determineCategoryColor(category, `prio-detail-${i}`); 
}

/**
 * This function formates the date
 * @param {*} dateString - date-value from array-tasks
 * @returns - formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * This function renders all existing subtasks
 * @param {*} subtask - array inside of the array ""tasks
 * @param {*} i - speicfic number of detailed task (task) - used as id
 */
function renderSubtasks(subtask, i, id) {
    let subtaskContent = document.getElementById(`subtasks-${i}`);
    if (subtaskContent) {
        subtaskContent.innerHTML = '';

        if (subtask && subtask.length > 0) {
            for (let j = 0; j < subtask.length; j++) {
                const subtaskItem = subtask[j];
                const subtaskStatus = tasks[i].subtaskStatus[j];
                subtaskContent.innerHTML += showSubtasksOfDetailedTask(subtaskItem, i, j, subtaskStatus);
            }

            // Füge Event-Listener zu den Checkboxen hinzu
            const checkboxes = document.querySelectorAll(`#subtasks-${i} input[type="checkbox"]`);
            checkboxes.forEach((checkbox, j) => {
                checkbox.addEventListener('change', () => {
                    tasks[i].subtaskStatus[j] = checkbox.checked;
                    updateCheckedSubtasksCount(i, id); // Rufe die Funktion auf, um die Anzahl zu aktualisieren
                });
            });
        }
    }
}

function updateCheckedSubtasksCount(i, id) {
    const checkboxes = document.querySelectorAll(`#subtasks-${i} input[type="checkbox"]`);
    checkedCount = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });
    // Aktualisiere den Wert des <span>-Elements mit der ID "checked_subtasks"
    const checkedSubtasksSpan = document.getElementById(`checked_subtasks-${i}`);
    if (checkedSubtasksSpan) {
        checkedSubtasksSpan.textContent = checkedCount.toString();
    }
    updateProgressbar(id);
    saveTasks();
}

function updateProgressbar(id) {
    let checkedSubtask = document.getElementById(`checked_subtasks-${id}`).innerText;
    let allSubtasks = document.getElementById(`allSubtasks-${id}`).innerText;
    let percent = checkedSubtask / allSubtasks;
    percent = Math.round(percent *100); 
    document.getElementById(`progress-${id}`).style.width = `${percent}%`;
}

/**
 * This function pushes the detailed Task from right to the middle
 */
function pushDetailedTaskToMiddle() {
    let task = document.getElementById('detailedTask');
    task.classList.add('show-task');
    showHiddenBackground();
    scrollToTop();
}

/**
 * This function shows the dark bachground by removing d-none
 */
function showHiddenBackground() {
    let bg = document.getElementById('bg');
    bg.classList.remove('d-none');
}

/**
 * This function hides the dark backgroung by adding d-none
 */
function hideBackground() {
    let bg = document.getElementById('bg');
    bg.classList.add('d-none');
}

/**
 * This function pushes the detailed Task back to the left
 */

function hideDetailedTask() {
    let task = document.getElementById('detailedTask');
    let boardAddTask = document.getElementById('board-addTask');
    
    if (task.classList.contains('show-task')) {
        task.classList.remove('show-task');
        hideBackground();
    } else if (boardAddTask.classList.contains('show-task')) {
        boardAddTask.classList.remove('show-task');
        hideBackground();
    }
}

/**
 * This function makes sure that the detailed Task is still clickable
 * @param {*} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * This function is used to scroll up to the top of each detailed task
 */
function scrollToTop() {
    window.scrollTo({
        top: 50,
        behavior: 'smooth'
    });
}
/**
 * This function deletes the specifif task from the toDo-column und updates the local Storage
 * @param {*} i - specific number of detailed task (task) - used as id
 */
function deleteNote(i) {
    hideDetailedTask();
    tasks.splice(i, 1);
    saveTasks();
    loadBoard();
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(status) {
    let position;
    for (let i = 0; i < tasks.length; i++) {    
        if (tasks[i].id === currentDraggedElement) {
            position = i;
            break;
        }
    }
    tasks[position]['status'] = status;
    renderTasks('toDo');
    renderTasks('inProgress');
    renderTasks('awaitFeedback');
    renderTasks('taskDone');
    saveTasks();
}

function showHiddenAddTask() {
    let boardAddTask = document.getElementById('board-addTask');
    boardAddTask.classList.add('show-task');
    showHiddenBackground();
    scrollToTop();
}

function openDetailedCardEditor(title, category, description, priority,prioImg, date, i, subtask) {
    let editor = document.getElementById('detailedTask');
    editor.innerHTML = '';
    editor.innerHTML += /*html*/ `
        <div class="d-flex flex-column row-gap-4">
            <div class="d-flex justify-content-end">
                <div class="clear-button d-flex align-items-center justify-content-center rounded-5 ms-auto" onclick="hideDetailedTask()">
                    <img src="../img/clear.svg" alt="clear" class="clear-img">
                </div>
            </div>
            <div class="d-flex flex-column">
                <label for="input" class="input-headlines fs-20">Title</label>
                <input class="fs-20 rounded-3 input" required id="input-editor-${i}" type="text" placeholder="Enter a title" value="${title}">
            </div>
            <div class="d-flex flex-column">   
                  <label for="textarea" class="input-headlines fs-20">Description</label>
                  <textarea class="fs-20 rounded-3" required id="textarea" name="" id="" cols="30" rows="10" placeholder="Enter a Description"></textarea>
            </div>  
        </div>
    `;

}



