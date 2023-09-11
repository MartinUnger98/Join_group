/**
 * This function gets creates the array task by getting all specific values.
 */
async function addTask() {
    let title = document.getElementById('input').value;
    let description = document.getElementById('textarea').value;
    let selectedCategory = getCategory();
    let date = document.getElementById('date').value;
    let subtasks = getSubtasks();
    let img = getPrioImage();
    let priority = getPriority();
    let task = {
        'title': title,
        'description': description,
        'date': date,
        'prio': img,
        'priority': priority,
        'category': selectedCategory,
        'subtask': subtasks,
        'subtaskStatus': Array(subtasks.length).fill(false), // Creates new Array "subtaskStatus" according to length of subtasks-Array and fills it with false;
    };
    tasks.push(task);
    await saveTasks();
    window.location.href = "board.html";
}

/**
 * This function gets the selected category
 * @returns selected category or '' in case, no category is selected;
 */
function getCategory() {
    let category = document.querySelector('.selected');
    return category ? category.innerText : '';
}


/**
 * This function gets all add subtasks by pushing them in the array subtasks
 * @returns subtasks-array
 */
function getSubtasks() {
    let subtaskElements = document.querySelectorAll('.added_subtask');
    let subtasks = [];
    subtaskElements.forEach(subtaskElement => {
        subtasks.push(subtaskElement.innerText);
    });
    return subtasks;
}

/**
 * This function gets the selected priority-img
 * @returns img of selected priority
 */
function getPrioImage() {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    let img = '';
    if (urgent.classList.contains('bg-urgent')) {
        img = 'img/urgent_red.svg';
    } else if (medium.classList.contains('bg-medium')) {
        img = 'img/medium_yellow.svg';
    } else if (low.classList.contains('bg-low')) {
        img = 'img/low_green.svg';
    }
    return img;
}

/**
 * This function gets the specific priority.innerText
 * @returns 
 */
function getPriority() {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    let priority = '';
    if (urgent.classList.contains('bg-urgent')) {
        priority = urgent.innerText;
    } else if (medium.classList.contains('bg-medium')) {
        priority = medium.innerText
    } else if (low.classList.contains('bg-low')) {
        priority = low.innerText;
    }
    return priority;
}
/**
 * This function pushes all elements of the array "tasks"
 * @param {*} task JSON task
 */
async function saveTasks() {
    let tasksAsString = JSON.stringify(tasks);
    await setItem('task', tasksAsString);
}
/**
 * This function loads all elements of the array "tasks"
 */

