function openNewSubtaskInAddTaskCard() {
    let newField = document.getElementById('new-subtask-field');
    newField.innerHTML = '';
    newField.innerHTML += showNewSubtaskInAddTaskCard();
    document.getElementById('subtask').value = '';
    addBorderColor();
}

function restoreOldSubtaskInAddTaskCard() {
    let oldSubtask = document.getElementById('new-subtask-field');
    oldSubtask.innerHTML = '';
    oldSubtask.innerHTML += /*html*/ `
    <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="openNewSubtaskInAddTaskCard()">
        <img src="../img/add_addTask.svg" alt="plus" class="add">
    </div>    
    `;
    document.getElementById('subtask').value = '';
    removeBorderColor();
}

function addSubtaskInAddTaskCard() {
    let content = document.getElementById('subtask-content');
    let input = document.getElementById('subtask').value;
    let subtaskID = `subtask-${subtaskcounter}`;
    if (input.length > 0) {
        content.innerHTML += showAddedSubtasksInAddTaskCard(subtaskID, input);
        subtaskcounter++;
    }
    document.getElementById('subtask').value = '';
    restoreOldSubtaskInAddTaskCard();
}



function openInputForEditInAddTaskCard(subtaskID, input) {
    let content = document.getElementById(`${subtaskID}`);
    content.innerHTML = '';
    content.innerHTML += showInputEditorInAddTaskCard(subtaskID, input);
}



function updateInputValueInAddTaskCard(subtaskID, inputID) {
    const content = document.getElementById(`${subtaskID}`);
    const newValue = document.getElementById(`${inputID}`).value;
    content.innerHTML = '';
    content.innerHTML += showUpdatedInputValueInAddTaskCard(newValue, subtaskID);
}



function deleteSubtaskInAddTaskCard(subtaskID) {
    let subtaskElement = document.getElementById(subtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}