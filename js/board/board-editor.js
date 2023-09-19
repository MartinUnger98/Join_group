/**
 *  This function creates vars for elements and and executes the toggle-function
 * @param {*} priority - contains ID of the respective priority box
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
 * This function sets the vars of the two dropdowns.
 * @param {*} dropDown - specific value for the dropdown; referred to function showDrowns
 */
function toggleEditorDropdown(id) {
    let assign = document.getElementById(`contacts-${id}`);
    let borderContact = document.getElementById(`contact_dropdown-${id}`);
    showDropdownInEditor(assign, borderContact, id);
}

function showDropdownInEditor(assign, borderContact, id) {
    toggleStatusAndBorderOfContact(assign, borderContact);
    switchDropDownArrowInEditor(id);
}

function switchDropDownArrowInEditor(id) {
    let imgContact = document.getElementById(`drop_1-${id}`);
    imgContact.classList.toggle('switch');
}


function openNewSubtaskInEditor(id) {
    let newField = document.getElementById(`new-subtask-field-${id}`);
    newField.innerHTML = '';
    newField.innerHTML += showNewSubtaskInEditor(`${id}`);
    document.getElementById(`subtask-${id}`).value = '';
    addBorderColorInEditor(id);
}

function addBorderColorInEditor(id) {
    let borderColor = document.getElementById(`subtask-creator-${id}`);
    borderColor.classList.add('border-color');
}

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

function removeBorderColorInEditor(id) {
    let borderColor = document.getElementById(`subtask-creator-${id}`);
    borderColor.classList.remove('border-color');
}

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

function openInputForEditInEditor(subtaskID, input) {
    let content = document.getElementById(`${subtaskID}`);
    content.innerHTML = '';
    content.innerHTML += showInputEditorInEditor(subtaskID, input);
}

function updateInputValueInEditor(subtaskID, inputID) {
    const content = document.getElementById(`${subtaskID}`);
    const newValue = document.getElementById(`${inputID}`).value;
    content.innerHTML = '';
    content.innerHTML += showUpdatedInputValueInEditor(newValue, subtaskID);
}

function deleteSubtaskInEditor(subtaskID) {
    let subtaskElement = document.getElementById(subtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}

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

function savedEditedTask(id, i) {
    const newTask = tasks[i];
    let input = document.getElementById(`input-editor-${id}`).value;
    let textarea = document.getElementById(`textarea-editor-${id}`).value;
    let date = document.getElementById(`date-editor-${id}`).value;
    let priorityImg = getPrioImageFromEditor(id);
    let priority = getPriorityFromEditor(id);
    let contacts = getContactsFromEditor();
    let subtasks = getSubtasksFromEditor();
    let bgContacts = getBgofContactFromEditor(id);
    newTask.title = input;
    newTask.description = textarea;
    newTask.date = date;
    newTask.prio = priorityImg;
    newTask.priority = priority;
    newTask.contacts = contacts;
    newTask.contactsBg = bgContacts;
    newTask.subtask = subtasks;
    hideDetailedTask();
    allMightyRender();
}

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

function getBgofContactFromEditor(id) {
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

function getSubtasksFromEditor() {
    let subtaskElements = document.querySelectorAll('.added-subtask-editor');
    let subtasks = [];
    subtaskElements.forEach(subtaskElement => {
        subtasks.push(subtaskElement.innerText);
    });
    return subtasks;
}

function renderUserInEditor(id) {
    let content = document.getElementById(`contact_content-editor${id}`);
    content.innerHTML = '';
    for (let i = 0; i < allContacts.length; i++) {
        const user = allContacts[i];
        let username = user.name;
        const initials = getInitials(username);
        const bgUser = user.bgColor;
        content.innerHTML += /*html*/ `
            <div id="user-selection-${id}-${i}" class="contact-selection d-flex justify-content-between fs-20 rounded-3 fs-responsive"> <!-- Klick-Event hinzufügen -->
                <div class="d-flex align-items-center contact-selection-box ">
                    <div id="contact-${id}-${i}" class="initials" style="background-color: ${bgUser}">
                        <span>${initials}</span>
                    </div>
                    <label class="label-contact-editor" for="user-editor${id}-${i}">${username}</label>
                </div>
                <input type="checkbox" id="user-editor${id}-${i}" onclick="toggleCheckboxInEditor(${id}, ${i})">
            </div>
        `;
    }
    
}

function toggleCheckboxInEditor(id, i) {
    let selection = document.getElementById(`user-selection-${id}-${i}`);
    if (!selection.classList.contains('checked-editor')) {
        selection.classList.add('checked-editor');
    } else {
        selection.classList.remove('checked-editor');
    }
}

function moveSelectedContactsInEditor(id) {
    debugger;
    let dropdown = document.getElementById(`contacts-${id}`);
    let selectedContactsDiv = document.getElementById(`selected_contacts_editor-${id}`);
    selectedContactsDiv.innerHTML = ''; // Leeren Sie das Ziel-Div zuerst
    for (let i = 0; i < allContacts.length; i++) {
        let selection = document.getElementById(`user-selection-${id}-${i}`);
        let checkbox = document.getElementById(`user-editor${id}-${i}`);
        
        if (selection.classList.contains('checked-editor') && checkbox.checked) {
            const user = allContacts[i];
            let username = user.name;
            const initials = getInitials(username);
            const bgUser = user.bgColor;
            selectedContactsDiv.innerHTML += /*html*/ `
                <div class="initials-selected" id="selected_contact-${id}-${i}" style="background-color: ${bgUser}">${initials}</div>
            `;
        }
    }
    dropdown.classList.remove('active');
    switchBorderandDropdownOfContacts(id);
}

function switchBorderandDropdownOfContacts(id) {
    let border = document.getElementById(`contact_dropdown-${id}`);
    let dropDown = document.getElementById(`drop_1-${id}`);
    border.classList.remove('border-color');
    dropDown.classList.remove('switch');
}

function updateEditorWithSelected(id, i) {
    const task = tasks[i]
    let priority = task.priority;
    let urgent = document.getElementById(`urgent-${id}`);
    let medium = document.getElementById(`medium-${id}`);
    let low = document.getElementById(`low-${id}`);
    let urgentImg = document.getElementById(`urgent-img-${id}`);
    let mediumImg = document.getElementById(`medium-img-${id}`);
    let lowImg = document.getElementById(`low-img-${id}`);
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

function renderSelectedContactsInEditor(id, i) {
    let content = document.getElementById(`selected_contacts_editor-${id}`);
    const task = tasks[i];
    let contact = task.contacts;
    let bgContact= task.contactsBg;
    if (contact) {
        for (let j = 0; j < contact.length; j++) {
            const selectedContact = contact[j];
            const initials = getInitials(selectedContact);
            const selectedContactsBg = bgContact[j];
            content.innerHTML += /*html*/ `
                <div class="initials-selected" style="background-color: ${selectedContactsBg}">${initials}</div>
            `;
        }
    }
}



