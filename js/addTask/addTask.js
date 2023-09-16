let selectedContacts = [];
/**
 * This functions loads the category options at the beginning
 */
function loadAddTask() {
    addCategory();
    renderUser();
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
function switchBorderandDropdownOfContacts() {
    let border = document.getElementById('contact_dropdown');
    let dropDown = document.getElementById('drop_1')
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

function allMightyClear() {
    document.getElementById('input').value = '';
    document.getElementById('textarea').value = '';
    document.getElementById('date').value = '';
    clearPriorityButtons();
    clearCategory();
    document.getElementById('subtask').value = '';
    document.getElementById('subtask-content').innerHTML = '';
}

function clearPriorityButtons() {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    let urgentImg = document.getElementById('urgent-img');
    let mediumImg = document.getElementById('medium-img');
    let lowImg = document.getElementById('low-img');

    if (urgent.classList.contains('bg-urgent')) {
        switchUrgentBack(urgent, urgentImg);
    }
    if (medium.classList.contains('bg-medium')) {
        switchMediumBack(medium, mediumImg);
    }
    if (low.classList.contains('bg-low')) {
        switchLowBack(low, lowImg);
    }
}

function clearCategory() {
    let select = document.getElementById('select');
    let content = document.getElementById('content');
    select.firstElementChild.innerText = "Select Task Category";
    content.classList.remove('active');
    addCategory('');
}

function renderUser() {
    let content = document.getElementById('contact_content');
    content.innerHTML = '';
    for (let i = 0; i < allContacts.length; i++) {
        const user = allContacts[i];
        let username = user.name;
        const initials = getInitials(username);
        content.innerHTML += /*html*/ `
            <div id="user-selection-${i}" class="contact-selection d-flex justify-content-between fs-20 rounded-3"> <!-- Klick-Event hinzufügen -->
                <div class="d-flex align-items-center contact-selection-box ">
                    <div id="contact-${i}" class="initials">
                        <span>${initials}</span>
                    </div>
                    <label class="label-contact" for="user-${i}">${username}</label>
                </div>
                <input type="checkbox" id="user-${i}" onclick="toggleCheckbox(${i})">
            </div>
        `;
        changeBgColor(i, `contact-${i}`);
    }
}

function getInitials(name) {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts.length > 1 ? nameParts[1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`;
}

function toggleCheckbox(id) {
    let selection = document.getElementById(`user-selection-${id}`);
    if (!selection.classList.contains('checked')) {
        selection.classList.add('checked');
    } else {
        selection.classList.remove('checked');
    }
}

function changeBgColor(i, id){
    if (i > bgColors.length) {
        const randomDecimal = Math.random();
        const randomInteger = Math.floor(randomDecimal * 8);
        newBgColorPosition = randomInteger;
        document.getElementById(id).style.backgroundColor = bgColors[newBgColorPosition];
    }
    document.getElementById(id).style.backgroundColor = bgColors[i];
}

function moveSelectedContacts() {
    let dropdown = document.getElementById('contacts');
    let selectedContactsDiv = document.getElementById('selected_contacts');
    selectedContactsDiv.innerHTML = ''; // Leeren Sie das Ziel-Div zuerst
    
    for (let i = 0; i < allContacts.length; i++) {
        let selection = document.getElementById(`user-selection-${i}`);
        let checkbox = document.getElementById(`user-${i}`);
        
        if (selection.classList.contains('checked') && checkbox.checked) {
            const user = allContacts[i];
            let username = user.name;
            const initials = getInitials(username);
            let contactBgColor = window.getComputedStyle(document.getElementById(`contact-${i}`)).backgroundColor;
            selectedContactsDiv.innerHTML += /*html*/ `
                <div class="initials-selected" id="selected_contact-${i}" style="background-color: ${contactBgColor}">${initials}</div>
            `;
        }
    }
    dropdown.classList.remove('active');
    switchBorderandDropdownOfContacts();
}

