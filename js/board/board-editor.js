function openDetailedCardEditor(title, description, date, id, i) {
    editModeOnOrOff = true;
    let editor = document.getElementById('detailedTask');
    let dateEditor = date.split('/');
    let formattedDate = `${dateEditor[2]}-${dateEditor[1]}-${dateEditor[0]}`;
    editor.innerHTML = '';
    editor.innerHTML += showDetailedCardEditor(title, description, formattedDate, id, i);
    renderSubtasksInEditor(id, i);
    renderUserInEditor(id, i);
    updateEditorWithSelectedPriorityBox(id, i);
    updateEditorWithMatchingContacts(id, i,);    
    setIDForEditAndindex(id, i);
}

function setIDForEditAndindex(id, i){
    idForEditmode = id;
    indexForEditmode =  i;
}

/**
 * This function toggles the priority-boxes inside of the editor
 * @param {*} priority - 'priority-name'
 * @param {*} id - id of editor
 */
function togglePriorityEditor(priority, id) {
    let urgent = document.getElementById(`urgent-${id}`);
    let medium = document.getElementById(`medium-${id}`);
    let low = document.getElementById(`low-${id}`);
    let urgentImg = document.getElementById(`urgent-img-${id}`);
    let mediumImg = document.getElementById(`medium-img-${id}`);
    let lowImg = document.getElementById(`low-img-${id}`);
    toggle(priority, urgent, medium, urgentImg, mediumImg, low, lowImg);
}

/**
 * This function determines the contact dropdown
 * @param {*} id - id of editor
 */
function toggleEditorDropdown(id) {
    let assign = document.getElementById(`contacts-${id}`);
    let borderContact = document.getElementById(`contact_dropdown-${id}`);
    showDropdownInEditor(assign, borderContact, id);
}

/**
 * This functions toggles the contact dropdown in editor
 * @param {*} assign - id of contact dropdown in editor
 * @param {*} borderContact - id of contact div
 * @param {*} id - id of editor
 */
function showDropdownInEditor(assign, borderContact, id) {
    toggleStatusAndBorderOfContact(assign, borderContact);
    switchDropDownArrowInEditor(id);
}

/**
 * This function switches the dropdown icon of the contact dropdown back, when a contact was selected
 * @param {*} id 
 */
function switchDropDownArrowInEditor(id) {
    let imgContact = document.getElementById(`drop_1-${id}`);
    imgContact.classList.toggle('switch');
}

/**
 * This function determines the new subtaskbuttons
 * @param {*} id - id of editor
 */
function openNewSubtaskInEditor(id) {
    let newField = document.getElementById(`new-subtask-field-${id}`);
    newField.innerHTML = '';
    newField.innerHTML += showNewSubtaskInEditor(`${id}`);
    document.getElementById(`subtask-${id}`).value = '';
    addBorderColorInEditor(id);
}

/**
 * This function adds a border-color to the subtask container in editor
 * @param {*} id - id of editor
 */
function addBorderColorInEditor(id) {
    let borderColor = document.getElementById(`subtask-creator-${id}`);
    borderColor.classList.add('border-color');
}

/**
 * This function restores the subtask div
 * @param {*} id - id of editor
 */
function restoreOldSubtaskInEditor(id) {
    let oldSubtask = document.getElementById(`new-subtask-field-${id}`);
    oldSubtask.innerHTML = '';
    oldSubtask.innerHTML += /*html*/ `
    <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="openNewSubtaskInInEditor(${id})">
        <img src="../img/add_addTask.svg" alt="plus" class="add">
    </div>    
    `;
    document.getElementById(`subtask-${id}`).value = '';
    removeBorderColorInEditor(id);
}

/**
 * This function removes the border color from the subtask container in editor, when a subtask was added
 * @param {*} id - id of editor
 */
function removeBorderColorInEditor(id) {
    let borderColor = document.getElementById(`subtask-creator-${id}`);
    borderColor.classList.remove('border-color');
}

/**
 * This function determines the added subtasks by giving it a specific id
 * @param {*} id - id of editor
 */
function addSubtaskInEditor(id) {
    let content = document.getElementById(`subtask-content-${id}`);
    let input = document.getElementById(`subtask-${id}`).value;
    let subtaskID = `subtask-editor-${subtaskcounter}`;
    if (input.length > 0) {
        content.innerHTML += showAddedSubtasksInEditor(subtaskID, input);
        subtaskcounter++;
    }
    document.getElementById(`subtask-${id}`).value = '';
    restoreOldSubtaskInEditor(id);
}

/**
 * This function determines the added subtask
 * @param {*} subtaskID - id of added subtask
 * @param {*} input - value of subtask-container-input
 */
function openInputForEditInEditor(subtaskID, input) {
    let content = document.getElementById(`${subtaskID}`);
    content.innerHTML = '';
    content.innerHTML += showInputEditorInEditor(subtaskID, input);
}

/**
 * This determines the updated added subtask
 * @param {*} subtaskID - id of added subtask
 * @param {*} inputID - value of added subtask
 */
function updateInputValueInEditor(subtaskID, inputID) {
    const content = document.getElementById(`${subtaskID}`);
    const newValue = document.getElementById(`${inputID}`).value;
    content.innerHTML = '';
    content.innerHTML += showUpdatedInputValueInEditor(newValue, subtaskID);
}

/**
 * This function deletes the added subtask
 * @param {*} subtaskID - id of added subtask
 */
function deleteSubtaskInEditor(subtaskID) {
    let subtaskElement = document.getElementById(subtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}

/**
 * This function renders the subtasks of the array tasks in editor
 * Used to show existing subtask
 * @param {*} id - id of editor
 * @param {*} i - index of task
 */
function renderSubtasksInEditor(id, i) {
    let subtasks = tasks[i].subtask;
    if (subtasks) {
        let content = document.getElementById(`subtask-content-${id}`);
        content.innerHTML = '';
        subtasks.forEach((sub, j) => {
            content.innerHTML += showExistingSubtasksInEditor(sub, id, j);
        });
    }
}

/**
 * This function saves the editor by updating the specific task array
 * @param {*} id - id of editor
 * @param {*} i -index of array
 */
function savedEditedTask(id, i) {
    editModeOnOrOff = false;
    const newTask = tasks[i];
    let input = document.getElementById(`input-editor-${id}`).value;
    let textarea = document.getElementById(`textarea-editor-${id}`).value;
    let date = document.getElementById(`date-editor-${id}`).value;
    let priorityImg = getPrioImageFromEditor(id);
    let priority = getPriorityFromEditor(id);
    let contacts = getContactsFromEditor();
    let subtasks = getSubtasksFromEditor();
    let bgContacts = getBgofContactFromEditor(id);
    pushEditedTask(newTask, input, textarea, date, priorityImg, priority, contacts, subtasks, bgContacts);
    hideDetailedTask();
    allMightyRender();
}

/**
 * This function pushes all gathered infos of the editor inside of the array tasks
 * @param {*} newTask - array tasks
 * @param {*} input - tasks input
 * @param {*} textarea - tasks textarea
 * @param {*} date - tasks date
 * @param {*} priorityImg - tasks priority image
 * @param {*} priority - tasks priority
 * @param {*} contacts - tasks contact
 * @param {*} subtasks - tasks subtasks
 * @param {*} bgContacts - tasks backgrouncolors of contacts
 */
function pushEditedTask(newTask, input, textarea, date, priorityImg, priority, contacts, subtasks, bgContacts) {
    newTask.title = input;
    newTask.description = textarea;
    newTask.date = date;
    newTask.prio = priorityImg;
    newTask.priority = priority;
    newTask.contacts = contacts;
    newTask.contactsBg = bgContacts;
    newTask.subtask = subtasks;
}

/**
 * This function gets the selected priority-img in editor
 * @param {*} id - id of editor
 * @returns - priority-img
 */
function getPrioImageFromEditor(id) {
    let urgent = document.getElementById(`urgent-${id}`);
    let medium = document.getElementById(`medium-${id}`);
    let low = document.getElementById(`low-${id}`);
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
 * This function gets the selected priority in editor
 * @param {*} - id of editor
 * @returns - priority
 */
function getPriorityFromEditor(id) {
    let urgent = document.getElementById(`urgent-${id}`);
    let medium = document.getElementById(`medium-${id}`);
    let low = document.getElementById(`low-${id}`);
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
 * This function gets the selected contact in editor
 * @returns array of selected contacts
 */
function getContactsFromEditor() {
    let selectedContactsFromEditor = [];
    let checkedContact = document.querySelectorAll('.contact-selection.checked-editor');
    checkedContact.forEach(contact => {
        let label = contact.querySelector('label.label-contact-editor');
        let username = label.textContent;
        selectedContactsFromEditor.push(username);
    });
    return selectedContactsFromEditor;
}

/**
 * This function gets the background-color of each selected contact
 * @param {*} id - id of editor
 * @returns array with background-colors
 */
function getBgofContactFromEditor(id) {
    debugger;
    let bgColorsOfContactsFromEditor = [];
    let checkedContact = document.querySelectorAll('.contact-selection.checked-editor');
    checkedContact.forEach(contact => {
        let contactId = contact.id; 
        let i = parseInt(contactId.slice(-1));
        let contactBgColor = window.getComputedStyle(document.getElementById(`contact-${id}-${i}`)).backgroundColor;
        bgColorsOfContactsFromEditor.push(contactBgColor);
    });
    return bgColorsOfContactsFromEditor;
}

/**
 * This function gets all added subtasks
 * @returns array with subtask
 */
function getSubtasksFromEditor() {
    let subtaskElements = document.querySelectorAll('.added-subtask-editor');
    let subtasks = [];
    subtaskElements.forEach(subtaskElement => {
        subtasks.push(subtaskElement.innerText);
    });
    return subtasks;
}

/**
 * This function renders all users within the contact dropdown in editor
 * @param {*} id - id of editor
 */
function renderUserInEditor(id, i) {
    let content = document.getElementById(`contact_content-editor${id}`);
    content.innerHTML = '';
    sortByFirstName();
    for (let i = 0; i < allContacts.length; i++) {
        const user = allContacts[i];
        let username = user.name;
        const initials = getInitials(username);
        const bgUser = user.bgColor;
        content.innerHTML += showAllContactsinEditor(id, i, initials, bgUser, username);
    };
}

/**
 * This function toggles the the selected contacts in editor
 * @param {*} id - id of editor
 * @param {*} i - index of tasks (used as id for contact selection)
 */
function toggleCheckboxInEditor(id, i) {
    let selection = document.getElementById(`user-selection-${id}-${i}`);
    if (!selection.classList.contains('checked-editor')) {
        selection.classList.add('checked-editor');
        moveSelectedContactsInEditor(id)
    } else {
        selection.classList.remove('checked-editor');
        moveSelectedContactsInEditor(id);
    }
}

/**
 * This function moves the selected contacts into the div underneath
 * @param {*} id - id of editor
 */
function moveSelectedContactsInEditor(id) {
    let selectedContactsDiv = document.getElementById(`selected_contacts_editor-${id}`);
    selectedContactsDiv.innerHTML = ''; 
    for (let i = 0; i < allContacts.length; i++) {
        if (isContactSelectedInEditor(id, i))
        showSelectedContactsInEditor(selectedContactsDiv, id, i);
    }
}
/**
 * This function generates the condition for the function moveSelectedContactsInEditor()
 * @param {*} id - id of detailed task editor
 * @param {*} i - index of tasks
 * @returns - condition
 */
function isContactSelectedInEditor(id, i) {
    let selection = document.getElementById(`user-selection-${id}-${i}`);
    let checkbox = document.getElementById(`user-editor${id}-${i}`);  
    return selection.classList.contains('checked-editor') && checkbox.checked;
}

/**
 * This function shows the selected contacts inside of the div 
 * @param {*} selectedContactsDiv - div of added contacts
 * @param {*} id - id of editor
 * @param {*} i - index of allContacts
 */
function showSelectedContactsInEditor(selectedContactsDiv, id, i) {
    const user = allContacts[i];
    let username = user.name;
    const initials = getInitials(username);
    const bgUser = user.bgColor;
    selectedContactsDiv.innerHTML += /*html*/ `
        <div class="initials-selected" id="selected_contact-${id}-${i}" style="background-color: ${bgUser}">${initials}</div>
    `;
}

/**
 * This function switches the border-color back and closes the dropdown, if contacts were added
 * @param {*} id - id of editor
 */
function switchBorderandDropdownOfContacts(id) {
    let border = document.getElementById(`contact_dropdown-${id}`);
    let dropDown = document.getElementById(`drop_1-${id}`);
    border.classList.remove('border-color');
    dropDown.classList.remove('switch');
}

/**
 * This function determines the priorities and priority-imgages of in editor
 * @param {*} id - id of editor
 * @param {*} i - index of tasks
 */
function updateEditorWithSelectedPriorityBox(id, i) {
    const task = tasks[i]
    let priority = task.priority;
    let urgent = document.getElementById(`urgent-${id}`);
    let medium = document.getElementById(`medium-${id}`);
    let low = document.getElementById(`low-${id}`);
    let urgentImg = document.getElementById(`urgent-img-${id}`);
    let mediumImg = document.getElementById(`medium-img-${id}`);
    let lowImg = document.getElementById(`low-img-${id}`);
    highlightPriorityBoxes(priority, urgent, urgentImg, medium, mediumImg, low, lowImg);
}

/**
 * This function highlights the priority-box in editor, which has the same priority as in the array tasks 
 * @param {*} priority - priority in task
 * @param {*} urgent - id of urgent-box in editor
 * @param {*} urgentImg - id of urgent-img in editor
 * @param {*} medium - id of medium in editor
 * @param {*} mediumImg - id of medium-img in editor
 * @param {*} low - id of low-box in editor
 * @param {*} lowImg -id of low-img in editor
 */
function highlightPriorityBoxes(priority, urgent, urgentImg, medium, mediumImg, low, lowImg) {
    if (priority) {
        if (priority === 'Urgent') {
            switchUrgent(urgent, urgentImg);
        } else if (priority === 'Medium') {
            switchMedium(medium, mediumImg);
        } else if (priority === 'Low') {
            switchLow(low, lowImg);
        }
    }
}

/**
 * This function compares the added contacts of each task with the selection of the contacts dropdown in editor
 * @param {*} id - id of editor
 * @param {*} i - index of task
 */
function updateEditorWithMatchingContacts(id, i) {
    const taskContacts = tasks[i].contacts; // Kontakte aus der Aufgabe
    if (!taskContacts) {
        return; // Keine Aufgabenkontakte vorhanden, nichts zu überprüfen
    }
    for (let j = 0; j < allContacts.length; j++) {
        const user = allContacts[j];
        const username = user.name;
        if (taskContacts.includes(username)) {
            handleMatchingContact(id, j, username, user);
        }
    }
}
/**
 * This function updates the added contacts of each task with the selection of the contacts dropdown in editor
 * @param {*} id - id of editor
 * @param {*} j - index of allContacts
 * @param {*} username - name of contacts in 
 * @param {*} user - array allContacts
 */
function handleMatchingContact(id, j, username, user) {
    const initials = getInitials(username);
    const bgUser = user.bgColor;
    const selection = document.getElementById(`user-selection-${id}-${j}`);
    const checkbox = document.getElementById(`user-editor${id}-${j}`);
    if (!selection.classList.contains('checked-editor')) {
        selection.classList.add('checked-editor');
    }
    checkbox.checked = true;
    showExistingContactsInEditor(id, j, initials, bgUser);
}
/**
 * This function renders the existing contacts within the selected-contacts-div
 * @param {*} id - id of editor
 * @param {*} i - index of allContacts
 * @param {*} initials - initials of contact
 * @param {*} bgUser - background-color of contact
 */
function showExistingContactsInEditor(id, i, initials, bgUser) {
    let selectedContactsDiv = document.getElementById(`selected_contacts_editor-${id}`);
    let selection = document.getElementById(`user-selection-${id}-${i}`);
    let checkbox = document.getElementById(`user-editor${id}-${i}`);  
    if (selection.classList.contains('checked-editor') && checkbox.checked) {
        selectedContactsDiv.innerHTML += /*html*/ `
            <div class="initials-selected" id="selected_contact-${id}-${i}" style="background-color: ${bgUser}">${initials}</div>
        `;
    }
}

/**
 * This function opens the add new contact card (-->addTask.js) and toggles the editor dropdown
 * @param {*} id - id of detailed task
 * @param {*} i - index of tasks
 */
function addNewContactsInEditor() {
    showContactEditor();
}

