document.addEventListener('DOMContentLoaded', function() {
    // Holen Sie sich eine Referenz zum Date-Input-Feld
    const dateInput = document.getElementById('date');
    // Holen Sie sich das aktuelle Datum im Format "YYYY-MM-DD"
    const currentDate = new Date().toISOString().split('T')[0];
    // Setzen Sie das min-Attribut auf das aktuelle Datum
    dateInput.setAttribute('min', currentDate);
  });
  
/**
 * This functions loads the category options at the beginning and render all Contacts inside of the contact dropdown
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
function switchUrgentBack(urgent, urgentImg) {
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
    if (dropDown == 'contact') {
        toggleStatusAndBorderOfContact(assign, borderContact);
        switchDropDownArrow(dropDown);
    }
    if (dropDown == 'category') {
        toggleStatusAndBorderOfCategory(category, borderCategory);
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
function toggleStatusAndBorderOfCategory(category, borderCategory) {
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

/**
 * This functions switches the dropdownicon and removes the border-color for the category dropdown.
 * Used when one category got selected
 */
function switchBorderandDropdown() {
    let border = document.getElementById('select');
    let dropDown = document.getElementById('drop_2')
    border.classList.remove('border-color');
    dropDown.classList.remove('switch');
}

/**
 * This functions switches the dropdownicon and removes the border-color for the contacts dropdown.
 * Used when one category got selected
 */
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

/**
 * This function is used for the clear-button and clears all input of addTask
 */
function allMightyClear() {
    document.getElementById('input').value = '';
    document.getElementById('textarea').value = '';
    document.getElementById('date').value = '';
    clearPriorityButtons();
    clearCategory();
    document.getElementById('subtask').value = '';
    document.getElementById('subtask-content').innerHTML = '';
    clearContacts();
}

/**
 * This function restores the priorty buttons
 */
function clearPriorityButtons() {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    let urgentImg = document.getElementById('urgent-img');
    let mediumImg = document.getElementById('medium-img');
    let lowImg = document.getElementById('low-img');
    switchPriorityButtonsToNormal(urgent, medium, low, urgentImg, mediumImg, lowImg);
}

/**
 * This function switches every single priority-button back to normal, in case they were seleceted
 * @param {*} urgent - id of priority-box urgent
 * @param {*} medium - id of priority-box medium
 * @param {*} low - id of priority-box low
 * @param {*} urgentImg - id of img urgent
 * @param {*} mediumImg - id of img medium
 * @param {*} lowImg - id of img loe
 */
function switchPriorityButtonsToNormal(urgent, medium, low, urgentImg, mediumImg, lowImg) {
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

/**
 * The function clears the category dropdown
 */
function clearCategory() {
    let select = document.getElementById('select');
    let content = document.getElementById('content');
    select.firstElementChild.innerText = "Select Task Category";
    content.classList.remove('active');
    addCategory('');
}

/**
 * This function clears the contact dropdown 
 */
function clearContacts() {
    let contacts = document.querySelectorAll('.checked');
    contacts.forEach(contact => {
        contact.classList.remove('checked');
        let checkboxId = contact.querySelector('input[type="checkbox"]').id;
        document.getElementById(checkboxId).checked = false;
    });
    moveSelectedContacts();
}

/**
 * This function loads all existing contacts inside of the contact dropdown
 */
function renderUser() {
    let content = document.getElementById('contact_content');
    content.innerHTML = '';
    sortByFirstName();
    for (let i = 0; i < allContacts.length; i++) {
        const user = allContacts[i];
        let username = user.name;
        const initials = getInitials(username);
        const bgUser = user.bgColor;
        content.innerHTML += showRenderedContacts(initials, bgUser, i, username);
    }
    
}

/**
 * This function creates the initials of each Contact
 * @param {*} name - name of contact from tasks
 * @returns - initial of firstname and initial of lastname (if existing)
 */
function getInitials(name) {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts.length > 1 ? nameParts[1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`;
}

/**
 * This function gets the selected contact highlighted
 * @param {*} id - number of each contact-div
 */
function toggleCheckbox(id) {
    let selection = document.getElementById(`user-selection-${id}`);
    if (!selection.classList.contains('checked')) {
        selection.classList.add('checked');
        moveSelectedContacts();
    } else {
        selection.classList.remove('checked');
        moveSelectedContacts();
    }
}

/**
 * This function moves the selected contacts into the selctedContacts-div.
 * All selected contacts will be shown by their initials
 */
function moveSelectedContacts() {
    let category = document.getElementById('content');
    let selectedContactsDiv = document.getElementById('selected_contacts');
    selectedContactsDiv.innerHTML = '';
    let contactsAdded = false;
    for (let i = 0; i < allContacts.length; i++) {
        if (isContactSelected(i)) {
            const user = allContacts[i];
            addSelectedContact(selectedContactsDiv, user, i);
            contactsAdded = true;
            category.classList.add('category-top');
        }
    }
    updateCategoryVisibility(contactsAdded, category);
}

/**
 * This function sets a condition
 * @param {*} index 
 * @returns - if classlist 'checked' is added and checkbox is checked
 */
function isContactSelected(index) {
    let selection = document.getElementById(`user-selection-${index}`);
    let checkbox = document.getElementById(`user-${index}`);
    return selection.classList.contains('checked') && checkbox.checked;
}

/**
 * This function creates the icon (initials) of the selected contact and adds it to the div underneath
 * @param {*} selectedContactsDiv - div for selected contacts
 * @param {*} user - array of all Contacts
 * @param {*} index - index of each contact
 */
function addSelectedContact(selectedContactsDiv, user, index) {
    const bgUser = user.bgColor;
    const initials = getInitials(user.name);
    selectedContactsDiv.innerHTML += /*html*/ `
        <div class="initials-selected" id="selected_contact-${index}" style="background-color: ${bgUser}">${initials}</div>
    `;
}

/**
 * This function removes the class 'category-top' if no contact is added.
 * Used for position absolute of category dropdown (Only used for responsive)
 * @param {*} contactsAdded - status of added contact
 * @param {*} category - dropdown id of category
 */
function updateCategoryVisibility(contactsAdded, category) {
    if (!contactsAdded) {
        category.classList.remove('category-top');
    }
}


/**
 * This function makes sure that the detailed Task is still clickable
 * @param {*} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}

//------------------------------add new Contact-----------------------------------
function showContactEditor() {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    editor.classList.remove('d-none');
    editor.innerHTML = showNewContactEditor();
    overlay.style.opacity = '0.7';
    overlay.style.zIndex = '997';
    setTimeout(function () {
        editor.style.right = '0px';
    }, 100);
    scrollToTop();
}

function closeEditorCtc() {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-5';
    editor.style.right = '-4000px';
    setTimeout(function () {
        editor.classList.add('d-none');
    }, 100);
}

async function addContact() {
    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;
    const numberInput = document.getElementById("phone").value;
    const contact = {
        name: nameInput,
        email: emailInput,
        number: numberInput,
        bgColor: setColor()
    };
    allContacts.push(contact);
    await saveNewContact();
}

async function saveNewContact() {
    try {
        const allContactsAsString = JSON.stringify(allContacts);
        await setItem('allContacts', allContactsAsString); // Auf das Ergebnis warten
        renderUser();
        closeEditorCtc();
    } catch (error) {
        console.error('Fehler beim Speichern des Kontakts:', error);
    }
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function sortByFirstName() {
    return allContacts.sort(function (a, b) {
        const firstNameA = a.name.split(' ')[0];
        const firstNameB = b.name.split(' ')[0];
        return firstNameA.localeCompare(firstNameB);
    });
}


