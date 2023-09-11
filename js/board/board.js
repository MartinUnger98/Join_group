
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
        addTaskToTodo();
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
function addTaskToTodo() {
    debugger;
    let content = document.getElementById('toDo');
    content.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let title = task.title;
        let category = task.category;
        let description = task.description;
        let priority = task.prio;
        let subtasks = task.subtask;
        let amountOfSubtasks = subtasks.length
        content.innerHTML += showAddedSubtasks(title, category, description, priority, i, amountOfSubtasks);
        determineCategoryColor(category, `cardPrio-${i}`); 
        renderDetailedTask(i);
    }
}

function openDetailedTask(i) {
    renderDetailedTask(i);
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
function renderDetailedTask(i) {
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
    renderSubtasks(subtask, i); 
    updateCheckedSubtasksCount(i);
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
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Beachte, dass Monate 0-basiert sind, daher +1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * This function renders all existing subtasks
 * @param {*} subtask - array inside of the array ""tasks
 * @param {*} i - speicfic number of detailed task (task) - used as id
 */
function renderSubtasks(subtask, i) {
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
                    updateCheckedSubtasksCount(i); // Rufe die Funktion auf, um die Anzahl zu aktualisieren
                });
            });
        }
    }
}

function updateCheckedSubtasksCount(i) {
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
    updateProgressbar(i);
    saveTasks();
}

function updateProgressbar(i) {
    let checkedSubtask = document.getElementById(`checked_subtasks-${i}`).innerText;
    let allSubtasks = document.getElementById(`allSubtasks-${i}`).innerText;
    let percent = checkedSubtask / allSubtasks;
    percent = Math.round(percent *100); 
    document.getElementById(`progress-${i}`).style.width = `${percent}%`;
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
    task.classList.remove('show-task');
    hideBackground();
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

