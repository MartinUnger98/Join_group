let currentDraggedElement;
let statusTasks = ["toDo", "inProgress", "awaitFeedback", "taskDone"];

/**
 * This function is the render-function for board.html
 */
function loadBoard() {
    allMightyRender();
}

/**
 * This function renders every task in each column
 */
function allMightyRender() {
    renderTasks('toDo');
    renderTasks('inProgress');
    renderTasks('awaitFeedback');
    renderTasks('taskDone');
}

/**
 * This function creates tasks inside of each column
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
/**
 * This function checks, if a task exists in one of the columns
 * @param {*} array - taskstatus
 * @param {*} status - one of the columns
 */
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
 * This function opens the specific detailed task
 * @param {*} id - id of task
 */
function openDetailedTask(id) {
    let position = idToPosition(tasks, id);
    renderDetailedTask(position, id);
    pushDetailedTaskToMiddle();
}

/**
 * This function gets the position of a task
 * @param {*} arr 
 * @param {*} id 
 * @returns 
 */
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

/**
 * This function renders the contacts of task
 * @param {*} task - array task[i]
 * @param {*} contact - array tasks[i].contact
 * @param {*} id - id of tasks
 */
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

/**
 * This function renders all contacts of task in the detailed card
 * @param {*} task - array task[i]
 * @param {*} contact - array tasks[i].contact
 * @param {*} id - id of tasks
 */
function renderSelectedContactsInDetailedTask(task, contact, id) {
    let content = document.getElementById(`contacts-detailed-${id}`);
    let bgColor = task.contactsBg;
    if (contact) {
        content.innerHTML = '';
        for (let i = 0; i < contact.length; i++) {
            showSelectedContactsInDetailedTask(contact, bgColor, i, content);
        }
    }
}

/**
 * This function creates the selected contacts in the detailed task
 * @param {*} contact - tasks.contacts
 * @param {*} bgColor - task.contactsBg
 * @param {*} i - index of contact-array
 * @param {*} content - div `contacts-detailed-${id}`
 */
function showSelectedContactsInDetailedTask(contact, bgColor, i, content) {
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
            addChangeListenersToCheckboxes(i, id);
        }
    }
}

/**
 * This functions updates the checkboxes
 * @param {*} i - index of task
 * @param {*} id - id of task
 */
function addChangeListenersToCheckboxes(i, id) {
    const checkboxes = document.querySelectorAll(`#subtasks-${i} input[type="checkbox"]`);
    checkboxes.forEach((checkbox, j) => {
        checkbox.addEventListener('change', () => {
            tasks[i].subtaskStatus[j] = checkbox.checked;
            updateCheckedSubtasksCount(i, id);
        });
    });
}

/**
 * This function checks if a checkbox is checked
 * @param {*} i - index of task
 * @param {*} id - id of task
 */
function updateCheckedSubtasksCount(i, id) {
    const checkboxes = document.querySelectorAll(`#subtasks-${i} input[type="checkbox"]`);
    checkedCount = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });
    const checkedSubtasksSpan = document.getElementById(`checked_subtasks-${id}`);
    if (checkedSubtasksSpan) {
        checkedSubtasksSpan.textContent = checkedCount.toString();
    }
    updateProgressbar(id);
    saveTasks();
}

/**
 * This function updates the progressbar of a task
 * @param {*} id - id of task
 */
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
    task.classList.remove('d-none');
    setTimeout(function () {
        task.classList.add('show-task');
    }, 50); 
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
 * This function hides the dark background by adding d-none
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

/**
 * This function pushes the addTask-card to the right
 */
function hideAddTask() {
    let boardAddTask = document.getElementById('board-addTask');
    boardAddTask.classList.remove('show-task');
    setTimeout(function () {
        boardAddTask.classList.add('d-none');
    }, 200); 
    hideBackground();
    allMightyClear();
}

/**
 * This function pushes the detailed task card to the right
 */
function hideDetailedTask() {
    let task = document.getElementById('detailedTask');
    task.classList.remove('show-task');
    setTimeout(function () {
        task.classList.add('d-none');
    }, 200); 
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

/**
 * This function starts the dragging-function a task
 * @param {*} id - id of task
 */
function startDragging(id) {
    currentDraggedElement = id;
    rotateTask(id);
    getCurrentdragObjektStatus(id);
}

/**
 * This function stops the dragging-function of a task
 * @param {*} id - id of task
 */
function stopDragging(id) {
    stopRotateTask(id);
    searchTask();
}

/**
 * This function gets the dragging position of a task
 * @param {*} id - id of task
 */
function getCurrentdragObjektStatus(id) {
    let position = idToPosition(tasks, id);
    let currentDragObjektStatus = tasks[position]['status'];
    showEmptyTasks(currentDragObjektStatus);
}

/**
 * This function shows the hidden tasks while dragging
 * @param {*} currentDragObjektStatus - task position status
 */
function showEmptyTasks(currentDragObjektStatus) {
    statusTasks.forEach(sTask => {
        if (currentDragObjektStatus !== sTask) {
            document.getElementById("emptyTask" + sTask).classList.remove("d-none");
        }
    });
}

/**
 * This function rotates a task while dragging
 * @param {*} id - id of task
 */
function rotateTask(id) {
    document.getElementById("task-" + id).classList.add("rotateTask");
}

/**
 * This function stops the rotation of a task
 * @param {*} id - id of task
 */
function stopRotateTask(id) {
    document.getElementById("task-" + id).classList.remove("rotateTask");
    statusTasks.forEach(sTask => {
        document.getElementById("emptyTask" + sTask).classList.add("d-none");
    });
}

/**
 * This function allows the dragging
 * @param {*} event 
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * This function sets the move position of a dragged task
 * @param {*} status - status of task
 */
function moveTo(status) {
    let position = idToPosition(tasks, currentDraggedElement);
    tasks[position]['status'] = status;
    allMightyRender();
    saveTasks();
}

/**
 * This function pushes the addTask-card to the left
 */
function showHiddenAddTask() {
    let boardAddTask = document.getElementById('board-addTask');
    boardAddTask.classList.remove('d-none');
    setTimeout(function () {
        boardAddTask.classList.add('show-task');
    }, 50); 
    showHiddenBackground();
    scrollToTop();
}

document.addEventListener('DOMContentLoaded', function () {
    enableHorizontalScroll('scrollContainer1');
    enableHorizontalScroll('scrollContainer2');
    enableHorizontalScroll('scrollContainer3');
    enableHorizontalScroll('scrollContainer4');

});

/**
 * This function allows the horizontal scroll of tasks. 
 * Used for responsive
 * @param {*} containerId - id of columns
 * @returns 
 */
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
        const scrollSpeed = 1;
        const walk = (x - startX) * scrollSpeed;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}

/**
 * This function searches the specific task
 */
function searchTask() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    if (input.length !== 0) {
        filterTasksByTitle(input);
    } else {
        allMightyRender();
    }
}

/**
 * This function filters the task titles
 * @param {*} input - id of input
 */
function filterTasksByTitle(input) {
    for (let i = 0; i < tasks.length; i++) {
        const taskTitle = tasks[i]['title'].toLowerCase();
        const id = tasks[i].id;
        const taskContainer = document.getElementById(`task-${id}`);
        if (!taskTitle.startsWith(input)) {
            hideTask(taskContainer);
        } else {
            showTask(taskContainer);
        }
    }
}

/**
 * This function hides all task, which are not matching
 * @param {*} taskContainer - id of task
 */
function hideTask(taskContainer) {
    if (taskContainer !== null) {
        taskContainer.classList.remove('d-flex');
        taskContainer.style.display = 'none';
    }
}

/**
 * This function show the matching tasks
 * @param {*} taskContainer - id of task
 */
function showTask(taskContainer) {
    if (taskContainer !== null) {
        taskContainer.classList.add('d-flex');
    }
}

