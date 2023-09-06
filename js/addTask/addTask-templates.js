function showNewSubtask(subtaskContainerID) {
    return /*html*/ `
        <div class="newfield">
            <div class="subtask-buttons" onclick=" deleteInput('${subtaskContainerID}')">
                <img src="../img/clear.png" alt="clear">
            </div>
            <span class="mini-separator">|</span>
            <div class="subtask-buttons" onclick="addSubtask('${subtaskContainerID}')">
                <img src="../img/check_darkblue.png" alt="check">
            </div>
        </div>  
    `;
}


function showAddedSubtasks(subtaskID, input) {
    return /*html*/ `
        <div id="${subtaskID}" class="added-subtask-container">
            <div class="added_subtask">
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


function showInputEditor(subtask, input) {
    return /*html*/ `
        <div class="edit-box d-flex justify-content-between align-items-center bg-white" id="${subtask}">
            <input type="text" value="${input}" class="edit-input" id="input-${subtask}">
            <div class="d-flex justify-content-between align-items-center">
                <div class="subtask-buttons">
                    <img src="../img/check_darkblue.png" alt="check" onclick="updateInputValue('${subtask}','input-${subtask}')">
                </div>
                <span class="mini-separator">|</span>
                <div class="subtask-buttons">
                    <img src="../img/delete_subtask.png" alt="delete" onclick="deleteSubtask('${subtask}')">
                </div>
            </div>
        </div>
    `;
}


function showUpdatedInputValue(newValue, subtask) {
    return /*html*/ `
    <div class="added_subtask">
        <li>${newValue}</li>
        <div class="hidden">
            <img src="../img/edit.png" alt="edit" onclick="openInputForEdit('${subtask}','${newValue}')">
            <span class="mini_separator_2">|</span>
            <img src="../img/delete_subtask.png" alt="delete" onclick="deleteSubtask('${subtask}')">
        </div>
    </div>
`;
}