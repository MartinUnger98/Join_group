
/**
 * This functions loads the category options at the beginning
 */
function loadDropdowns() {
    addCategory();
}

/**
 *  This function creates vars for elements and and executes the toggle-function
 * @param {*} priority - contains ID of the respective priority box
 */
function togglePriority(priority) {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    let urgentImg = document.getElementById('urgent-img');
    let mediumImg = document.getElementById('medium-img');
    let lowImg = document.getElementById('low-img');
    toggle(priority, urgent, medium, urgentImg, mediumImg, low, lowImg);
}

/**
 * This function starts the toggle for the specififc priority
 * @param {*} priority - refers to togglePriority
 * @param {*} urgent - ID of urgent-priority
 * @param {*} medium - ID of medium-priority 
 * @param {*} urgentImg - ID of urgent-image
 * @param {*} mediumImg - ID of medium-image 
 * @param {*} low - ID of low-priority 
 * @param {*} lowImg - ID of low-image 
 */

function toggle(priority, urgent, medium, urgentImg, mediumImg, low, lowImg) {
    if (priority === 'urgent') {
        toggleUrgent(urgent, medium, urgentImg, mediumImg, low, lowImg);   
    }
    if (priority === 'medium') {
        toggleMedium(urgent, medium, urgentImg, mediumImg, low, lowImg);
    } 
    if (priority === 'low') {
        toggleLow(urgent, medium, urgentImg, mediumImg, low, lowImg);
    }
}

/**
 * This function toggles the urgent-priority and switch the other priorities back, 
 * if they have been already selected.
 */
function toggleUrgent(urgent, medium, urgentImg, mediumImg, low, lowImg) {
    if (urgent.classList.contains('bg-white')) {
        switchUrgent(urgent, urgentImg);
    } else {
        switchUrgentBack(urgent, urgentImg);
    }
    if (medium.classList.contains('bg-medium')) {
        switchMediumBack(medium, mediumImg);
    }
    if (low.classList.contains('bg-low')) {
        switchLowBack(low, lowImg);
    }
}

/**
 * This function toggles the medium-priority and switch the other priorities back, 
 * if they have been already selected.
 */
function toggleMedium(urgent, medium, urgentImg, mediumImg, low, lowImg) {
    if (medium.classList.contains('bg-white')) {
        switchMedium(medium, mediumImg);
    } else {
        switchMediumBack(medium, mediumImg);
    }
    if (urgent.classList.contains('bg-urgent')) {
        switchUrgentBack(urgent, urgentImg);
    }
    if (low.classList.contains('bg-low')) {
        switchLowBack(low, lowImg);
    }
}

/**
 * This function toggles the low-priority and switch the other priorities back, 
 * if they have been already selected.
 */
function toggleLow(urgent, medium, urgentImg, mediumImg, low, lowImg) {
    if (low.classList.contains('bg-white')) {
        switchLow(low, lowImg);
    } else {
        switchLowBack(low, lowImg);
    }
    if (urgent.classList.contains('bg-urgent')) {
        switchUrgentBack(urgent, urgentImg);
    }
    if (medium.classList.contains('bg-medium')) {
        switchMediumBack(medium, mediumImg);
    }
}

/**
 * This function switches the backgroundcolors and the img of the urgent-priority
 */
function switchUrgent(urgent, urgentImg) {
    urgent.classList.remove('bg-white');
    urgent.classList.add('bg-urgent');
    urgentImg.src = '../img/urgent_white.svg';
}

/**
 * This function switches the backgroundcolors and the img of the urgent-priority back
 */
function switchUrgentBack(urgent,urgentImg) {
    urgent.classList.remove('bg-urgent');
    urgent.classList.add('bg-white');
    urgentImg.src = '../img/urgent_red.svg';
}

/**
 * This function switches the backgroundcolors and the img of the urgent-priority
 */
function switchMedium(medium, mediumImg) {
    medium.classList.remove('bg-white');
    medium.classList.add('bg-medium');
    mediumImg.src = '../img/medium_white.svg';
}

/**
 * This function switches the backgroundcolors and the img of the medium-priority back
 */
function switchMediumBack(medium, mediumImg) {
    medium.classList.remove('bg-medium');
    medium.classList.add('bg-white');
    mediumImg.src = '../img/medium_yellow.svg';
}

/**
 * This function switches the backgroundcolors and the img of the urgent-priority
 */
function switchLow(low, lowImg) {
    low.classList.remove('bg-white');
    low.classList.add('bg-low');
    lowImg.src = '../img/low_white.svg';
}

/**
 * This function switches the backgroundcolors and the img of the low-priority back
 */
function switchLowBack(low, lowImg) {
    low.classList.remove('bg-low');
    low.classList.add('bg-white');
    lowImg.src = '../img/low_green.svg';
}

/**
 * This function sets the vars of the two dropdowns.
 * @param {*} dropDown - specific value for the dropdown; referred to function showDrowns
 */

function toggleDropdown(dropDown) {
    let category = document.getElementById('content');
    let assign = document.getElementById('contacts');
    let borderContact = document.getElementById('contact_dropdown');
    let borderCategory = document.getElementById('select');
    showDropdowns(dropDown, category, assign, borderContact, borderCategory);
}

/**
 * This function execute the toggle for the specific 
 * @param {*} category - ID of dropdown content of category
 * @param {*} assign - ID of dropdown content of contacts
 * @param {*} borderContact - ID of contact-div; used to switch border-color
 * @param {*} borderCategory - ID of category - div; used to switch border-color
 */

function showDropdowns(dropDown, category, assign, borderContact, borderCategory) {
    if(dropDown == 'contact') {
        toggleStatusAndBorderOfContact(assign, borderContact);
        switchDropDownArrow(dropDown);
    }
    if (dropDown == 'category') {
        toggleStatusAndBorderOfCategory(category,borderCategory);
        switchDropDownArrow(dropDown);
    }  
}

/**
 * This function toggles the visibility of the dropdown-content of contacts (active)
 * and the border-color of the contact-div
 */

function toggleStatusAndBorderOfContact(assign, borderContact) {
    assign.classList.toggle('active');
    borderContact.classList.toggle('border-color');
}

/**
 * This function toggles the visibility of the dropdown-content of category (active)
 * and the border-color of the category-div
 */
function toggleStatusAndBorderOfCategory(category,borderCategory) {
    category.classList.toggle('active');
    borderCategory.classList.toggle('border-color');
}

/**
 * This function scales the arrow-image the specific dropDown
 * @param {*} dropDown - referred to function toggleDropdown
 */
function switchDropDownArrow(dropDown) {
    let imgContact = document.getElementById('drop_1')
    let imgCategory = document.getElementById('drop_2');
    if (dropDown == 'contact') {
        imgContact.classList.toggle('switch')
    }
    if (dropDown == 'category') {
        imgCategory.classList.toggle('switch');
    }
}

/**
 * This function loads the categories of the categories-array
 * @param {*} selectedCategory - selected "li"-text of the specific category; referred to updateName();
 */
function addCategory(selectedCategory) {
    debugger;
    let option = document.getElementById('options');
    option.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        let isSelected = category == selectedCategory ? 'selected' : '';
        option.innerHTML += /*html*/`
            <li class="rounded-3 fs-20 d-flex align-items-center ${isSelected}" id="category-${i}" onclick="updateName(this)">${category}</li>
        `;
    }
}

/**
 * This function gets the innerText of the li-item and removes the 'active'-class
 * @param {*} selectedLi - "li" of specific category;
 */
function updateName(selectedLi) {
    let select = document.getElementById('select');
    let content = document.getElementById('content');
    select.firstElementChild.innerText = selectedLi.innerText;
    content.classList.remove('active');
    addCategory(selectedLi.innerText);
    switchBorderandDropdown();
}

function switchBorderandDropdown() {
    let border = document.getElementById('select');
    let dropDown = document.getElementById('drop_2')
    border.classList.remove('border-color');
    dropDown.classList.remove('switch');
}

/**
 * This function creates a new subtask-input-field
 * showNewSubtask -> addTask-templates.js
 */

function openNewSubtask() {
    let newField = document.getElementById('new-subtask-field');
    newField.innerHTML = '';
    newField.innerHTML += showNewSubtask();
    document.getElementById('subtask').value = '';
    addBorderColor();
}

/**
 * This functions adds a new border-color to the subtask-div
 */
function addBorderColor() {
    let borderColor = document.getElementById('subtask-creator');
    borderColor.classList.add('border-color');
}

/**
 * This function restores the previous subtask-input-field
 */
function restoreOldSubtask() {
    let oldSubtask = document.getElementById('new-subtask-field');
    oldSubtask.innerHTML = '';
    oldSubtask.innerHTML += /*html*/ `
    <div class="subtask-buttons d-flex align-items-center justify-content-center" onclick="openNewSubtask()">
        <img src="../img/add_addTask.svg" alt="plus" class="add">
    </div>    
    `;
    document.getElementById('subtask').value = '';
    removeBorderColor();
}

/**
 * This function removes the border-color of the subtask-div
 */
function removeBorderColor() {
    let borderColor = document.getElementById('subtask-creator');
    borderColor.classList.remove('border-color');
}

/**
 * This function creates the added subtask
 * showAddedSubtasks -> addTask-templates.js
 */


function addSubtask() {
    let content = document.getElementById('subtask-content');
    let input = document.getElementById('subtask').value;
    let subtaskID = `subtask-${subtaskcounter}`;
    if (input.length > 0) {
        content.innerHTML += showAddedSubtasks(subtaskID, input);
        subtaskcounter++;
    }
    document.getElementById('subtask').value = '';
    restoreOldSubtask();
}

/**
 * This function creates an edit-section for the specific subtask
 * @param {*} subtaskID - ID of specific added subtask
 * @param {*} input - value of old subtask
 * showInputEditor() -> addTask-templates.js
 */
function openInputForEdit(subtaskID, input) {
    let content = document.getElementById(`${subtaskID}`);
    content.innerHTML = '';
    content.innerHTML += showInputEditor(subtaskID, input);
}

/**
 * This function updates the new input value.
 * @param {*} subtaskID - ID of new subtask-div 
 * @param {*} inputID - ID of new input
 */
function updateInputValue(subtaskID, inputID) {
    const content = document.getElementById(`${subtaskID}`);
    const newValue = document.getElementById(`${inputID}`).value;
    content.innerHTML = '';
    content.innerHTML += showUpdatedInputValue(newValue, subtaskID);
}

/**
 * This functions deletes the added subtask permanently
 * @param {*} subtaskID 
 */
function deleteSubtask(subtaskID) {
    let subtaskElement = document.getElementById(subtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}

function clearAll() {
    document.getElementById('input').innerHTML = '';
}
