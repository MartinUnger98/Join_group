/**
 * This function pushes all specific values inside of the array tasks
 */
async function addTask(status) {
    let title = document.getElementById('input').value;
    let description = document.getElementById('textarea').value;
    let selectedCategory = getCategory();
    let date = document.getElementById('date').value;
    let contact = getContacts();
    let contactBg = getBgofContact();
    let subtasks = getSubtasks();
    let img = getPrioImage();
    let priority = getPriority();
    let task = {
        'title': title,
        'description': description,
        'contacts': contact,
        'contactsBg': contactBg,
        'date': date,
        'prio': img,
        'priority': priority,
        'category': selectedCategory,
        'subtask': subtasks,
        'subtaskStatus': Array(subtasks.length).fill(false), // Creates new Array "subtaskStatus" according to length of subtasks-Array and fills it with false;
        'status': status,
        'id': creatId(),
    };
    tasks.push(task);
    await saveTasks();
    popup = "Task added to Board";
    showSuccessMessage();
}


/**
 * This function creates a clearly id for each task
 * @returns - id
 */
function creatId() {
    let id;
    if(tasks.length === 0) {
        id = 0;
    }
    else {
        id = getHighestId() + 1;
    }
    return id;
}


/**
 * This function checks the highest id of a tasks. 
 * Important for giving the very first task a clearly id
 * @returns - highest ID
 */
function getHighestId() {
    let highestId = -1;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id > highestId) {
        highestId = tasks[i].id;
      }
    }
    return highestId;
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
 * @returns - priority
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
 * This function gets all selected contacts
 * @returns - array with selected contacts
 */
function getContacts() {
    let selectedContacts = [];
    let checkedContact = document.querySelectorAll('.contact-selection.checked');
    checkedContact.forEach(contact => {
        let label = contact.querySelector('label.label-contact');
        let username = label.textContent;
        selectedContacts.push(username);
    });
    return selectedContacts;
}


/**
 * This function gets the background-color of the selected contact
 * @returns - array with background-colors
 */
function getBgofContact() {
    let bgColorsOfContacts = [];
    let checkedContact = document.querySelectorAll('.contact-selection.checked');
    checkedContact.forEach(contact => {
        let contactId = contact.id; // Die ID des ausgewählten Kontakt-Elements
        let i = contactId.split('-')[2]; // Extrahieren der Indexnummer aus der ID

        // Die Hintergrundfarbe von id="contact-${i}" abrufen und dem Array hinzufügen
        let contactBgColor = window.getComputedStyle(document.getElementById(`contact-${i}`)).backgroundColor;
        bgColorsOfContacts.push(contactBgColor);
    });
    return bgColorsOfContacts;
}


/**
 * This function pushes all elements of the array "tasks"
 * @param {*} task JSON task
 */
async function saveTasks() {
    let tasksAsString = JSON.stringify(tasks);
    await setItem('task', tasksAsString);
}

