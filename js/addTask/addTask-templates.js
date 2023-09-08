/**
 * This function creates a new subtask-input-field
 */
function showNewSubtask() {
    return /*html*/ `
        <div class="d-flex align-items-center justify-content-between">
            <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick=" restoreOldSubtask()">
                <img src="../img/clear.png" alt="clear">
            </div>
            <span class="mini-separator">|</span>
            <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="addSubtask()">
                <img src="../img/check_darkblue.png" alt="check">
            </div>
        </div>  
    `;
}

/**
 * This function creates new added subtasks
 * @param {*} subtaskID - ID of specific added subtask
 * @param {*} input - value of added subtask
 * @returns 
 */
function showAddedSubtasks(subtaskID, input) {
    return /*html*/ `
        <div id="${subtaskID}" class="added-subtask-container">
            <div class="added_subtask rounded-3 d-flex align-items-center justify-content-between">
                <li>${input}</li>
                <div class="hidden">
                    <img src="../img/edit.png" alt="edit" onclick="openInputForEdit('${subtaskID}','${input}')">
                    <span class="mini_separator_2">|</span>
                    <img src="../img/delete_subtask.png" alt="delete" onclick="deleteSubtask('${subtaskID}')">
                </div>
            </div>
        </div>
    `;
}

/**
 * This function creates editor for the specific added subtask
 * @param {*} subtaskID -ID of specific added subtask 
 * @param {*} input - value of added subtask
 * @returns 
 */
function showInputEditor(subtaskID, input) {
    return /*html*/ `
        <div class="edit-box d-flex justify-content-between align-items-center bg-white" id="${subtaskID}">
            <input type="text" value="${input}" class="edit-input" id="input-${subtaskID}">
            <div class="d-flex justify-content-between align-items-center">
                <div class="subtask-buttons d-flex align-items-center justify-content-center">
                    <img src="../img/check_darkblue.png" alt="check" onclick="updateInputValue('${subtaskID}','input-${subtaskID}')">
                </div>
                <span class="mini-separator">|</span>
                <div class="subtask-buttons d-flex align-items-center justify-content-center">
                    <img src="../img/delete_subtask.png" alt="delete" onclick="deleteSubtask('${subtaskID}')">
                </div>
            </div>
        </div>
    `;
}

/**
 * This function creates the edited subtask
 * @param {*} newValue - value of editor-input
 * @param {*} subtask - ID of edited subtask
 * @returns 
 */

function showUpdatedInputValue(newValue, subtask) {
    return /*html*/ `
    <div class="added_subtask d-flex justify-content-between align-items-center rounded-3">
        <li>${newValue}</li>
        <div class="hidden">
            <img src="../img/edit.png" alt="edit" onclick="openInputForEdit('${subtask}','${newValue}')">
            <span class="mini_separator_2">|</span>
            <img src="../img/delete_subtask.png" alt="delete" onclick="deleteSubtask('${subtask}')">
        </div>
    </div>
`;
}