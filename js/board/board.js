let currentDraggedElement;
let statusTasks = ["toDo", "inProgress", "awaitFeedback", "taskDone"];

/**
 * This function is the render-function for board.html
 */
function loadBoard() {
    allMightyRender();
}

function allMightyRender() {
    renderTasks('toDo');
    renderTasks('inProgress');
    renderTasks('awaitFeedback');
    renderTasks('taskDone');
}

function checkColumns(array, status) {
    let toDo = document.getElementById('toDo');
    let inProgress = document.getElementById('inProgress');
    let awaitFeedback = document.getElementById('awaitFeedback');
    let done = document.getElementById('taskDone');
    if (array.length === 0 && status === "toDo") {
        loadNoTask(toDo, "No tasks to do");
    }
    if (array.length === 0 && status === "inProgress") {
        loadNoTask(inProgress, "No tasks in progress");
    }
    if (array.length === 0 && status === "awaitFeedback") {
        loadNoTask(awaitFeedback, "No tasks await feedback");
    }
    if (array.length === 0 && status === "taskDone") {
        loadNoTask(done, "No tasks are done");
    }
}

/**
 * This function creates the no-task-div
 */
function loadNoTask(column, message) {
    /* column.innerHTML = ''; */
    column.innerHTML += /*html*/ `
        <div class="no-task-container d-flex justify-content-center align-items-center rounded-3">
            <span class="no-task-color">${message}</span>
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
        let contact = task.contacts;
        let position = idToPosition(tasks, id);
        content.innerHTML += showAddedTasks(title, category, description, priority, amountOfSubtasks, id, contact);
        determineCategoryColor(category, `cardPrio-${id}`);
        renderDetailedTask(position, id);
        renderSelectedContacts(task, contact, id);
    }
    checkColumns(taskStatus, status);
    content.innerHTML += addEmptytask('emptyTask' + status);
}

function openDetailedTask(id) {
    let position = idToPosition(tasks, id);
    renderDetailedTask(position, id);
    pushDetailedTaskToMiddle();
}

function idToPosition(arr, id) {
    let position;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            position = i;
            break;
        }
    }
    return position;
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

function renderSelectedContacts(task, contact, id) {
    let content = document.getElementById(`selected-contacts-box-${id}`);
    let bgColor = task.contactsBg;
    if (contact) {
        content.innerHTML = '';
        for (let i = 0; i < contact.length; i++) {
            const selectedContact = contact[i];
            const initials = getInitials(selectedContact);
            const selectedContactsBg = bgColor[i];
            content.innerHTML += /*html*/ `
            <div class="initials-selected" style="background-color: ${selectedContactsBg}">${initials}</div>
            `;
        }
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
    let contact = task.contacts;
    let prioImg = task.prio;
    let date = formatDate(task.date);
    let subtask = task.subtask;
    content.innerHTML += showDetailedTask(title, category, description, priority, prioImg, date, i, subtask, id, contact);
    renderSubtasks(subtask, i, id);
    updateCheckedSubtasksCount(i, id);
    determineCategoryColor(category, `prio-detail-${i}`);
    renderSelectedContactsInDetailedTask(task, contact, id);
}

function renderSelectedContactsInDetailedTask(task, contact, id) {
    let content = document.getElementById(`contacts-detailed-${id}`);
    let bgColor = task.contactsBg;
    if (contact) {
        content.innerHTML = '';
        for (let i = 0; i < contact.length; i++) {
            const selectedContact = contact[i];
            const initials = getInitials(selectedContact);
            const selectedContactsBg = bgColor[i];
            content.innerHTML += /*html*/ `
                <div class="d-flex align-items-center column-gap-4">
                    <div class="initials-selected" style="background-color: ${selectedContactsBg}">${initials}</div>
                    <span>${selectedContact}</span>
                </div>
            `;
        }
    }
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
    const checkedSubtasksSpan = document.getElementById(`checked_subtasks-${id}`);
    if (checkedSubtasksSpan) {
        checkedSubtasksSpan.textContent = checkedCount.toString();
    }
    updateProgressbar(id);
    saveTasks();
}

function updateProgressbar(id) {
    const checkedSubtasksSpan = document.getElementById(`checked_subtasks-${id}`);
    const allSubtasksSpan = document.getElementById(`allSubtasks-${id}`);
    const progressBar = document.getElementById(`progress-${id}`);

    if (checkedSubtasksSpan && allSubtasksSpan && progressBar) {
        let checkedSubtask = checkedSubtasksSpan.innerText;
        let allSubtasks = allSubtasksSpan.innerText;
        let percent = checkedSubtask / allSubtasks;
        percent = Math.round(percent * 100);
        progressBar.style.width = `${percent}%`;
    }
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

function hideTasksOfBoard() {
    let task = document.getElementById('detailedTask');
    let boardAddTask = document.getElementById('board-addTask');

    if (task.classList.contains('show-task')) {
        task.classList.remove('show-task');
        hideDetailedTask();
    } else if (boardAddTask.classList.contains('show-task')) {
        boardAddTask.classList.remove('show-task');
        hideAddTask();
    }
}
function hideAddTask() {
    let boardAddTask = document.getElementById('board-addTask');
    boardAddTask.classList.remove('show-task');
    hideBackground();
    allMightyClear();
}
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

function startDragging(id) {
    currentDraggedElement = id;
    rotateTask(id);
    getCurrentdragObjektStatus(id);
}

function stopDragging(id) {
    stopRotateTask(id);
    searchTask();
}

function getCurrentdragObjektStatus(id) {
    let position = idToPosition(tasks, id);
    let currentDragObjektStatus = tasks[position]['status'];
    showEmptyTasks(currentDragObjektStatus);
}

function showEmptyTasks(currentDragObjektStatus) {
    statusTasks.forEach(sTask => {
        if (currentDragObjektStatus !== sTask) {
            document.getElementById("emptyTask" + sTask).classList.remove("d-none");
        }
    });
}

function rotateTask(id) {
    document.getElementById("task-" + id).classList.add("rotateTask");
}

function stopRotateTask(id) {
    document.getElementById("task-" + id).classList.remove("rotateTask");
    statusTasks.forEach(sTask => {
        document.getElementById("emptyTask" + sTask).classList.add("d-none");
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(status) {
    let position = idToPosition(tasks, currentDraggedElement);
    tasks[position]['status'] = status;
    allMightyRender();
    saveTasks();
}

function showHiddenAddTask() {
    let boardAddTask = document.getElementById('board-addTask');
    boardAddTask.classList.add('show-task');
    showHiddenBackground();
    scrollToTop();
}

function openDetailedCardEditor(title, description, date, id, i) {
    let editor = document.getElementById('detailedTask');
    let dateEditor = date.split('/');
    let formattedDate = `${dateEditor[2]}-${dateEditor[1]}-${dateEditor[0]}`;
    editor.innerHTML = '';
    editor.innerHTML += showDetailedCardEditor(title, description, formattedDate, id, i);
    renderSubtasksInEditor(id, i);
    renderUserInEditor(id);
    updateEditorWithSelected(id, i);
    renderSelectedContactsInEditor(id, i);
}

document.addEventListener('DOMContentLoaded', function () {
    enableHorizontalScroll('scrollContainer1');
    enableHorizontalScroll('scrollContainer2');
    enableHorizontalScroll('scrollContainer3');
    enableHorizontalScroll('scrollContainer4');

});

function enableHorizontalScroll(containerId) {
    const scrollContainer = document.getElementById(containerId);
    if (!scrollContainer) {
        console.error(`Element with ID '${containerId}' not found.`);
        return;
    }

    let isDragging = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.cursor = 'grabbing';
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDragging = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollContainer.offsetLeft;
        const scrollSpeed = 1; // Ändern Sie die Geschwindigkeit nach Ihren Wünschen
        const walk = (x - startX) * scrollSpeed;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}


function searchTask() {
    let input = document.getElementById('searchInput').value.toLowerCase();

    if (input.length !=0) {
        for (let i = 0; i < tasks.length; i++) {
            const taskTitle = tasks[i]['title'].toLowerCase();
            const id = tasks[i].id;
            const taskContainer = document.getElementById(`task-${id}`);
            if (!taskTitle.startsWith(input)) {
                if (taskContainer != null) {
                    taskContainer.classList.remove('d-flex');
                    taskContainer.style.display = 'none';
                }
            }
            else{
                taskContainer.classList.add('d-flex');
            }
        }
    }
    else{
        allMightyRender();
    }
}
