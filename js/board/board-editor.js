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
    debugger;
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
            content.innerHTML += showExistingSubtasksInEditor(sub, j);
        });
    }
}

async function savedEditedTask() {
    await saveTasks();
    allMightyRender();
}

