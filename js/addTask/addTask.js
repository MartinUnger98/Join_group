let categories = ['Technical Task', 'User Story']
let user = [];

function loadDropdowns() {
    addCategory();
}


function togglePriority(priority) {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    let urgentImg = document.getElementById('urgent-img');
    let mediumImg = document.getElementById('medium-img');
    let lowImg = document.getElementById('low-img');
    toggle(priority, urgent, medium, urgentImg, mediumImg, low, lowImg);
}


function toggle(priority, urgent, medium, urgentImg, mediumImg, low, lowImg) {
    if (priority === 'urgent') {
        toggleUrgent(urgent, medium, urgentImg, mediumImg, low, lowImg);   
    } else if (priority === 'medium') {
        toggleMedium(urgent, medium, urgentImg, mediumImg, low, lowImg);
    } else if (priority === 'low') {
        toggleLow(urgent, medium, urgentImg, mediumImg, low, lowImg);
    }
}


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


function switchUrgent(urgent, urgentImg) {
    urgent.classList.remove('bg-white');
    urgent.classList.add('bg-urgent');
    urgentImg.src = '../img/urgent_white.png';
}


function switchUrgentBack(urgent,urgentImg) {
    urgent.classList.remove('bg-urgent');
    urgent.classList.add('bg-white');
    urgentImg.src = '../img/urgent_red.png';
}


function switchMedium(medium, mediumImg) {
    medium.classList.remove('bg-white');
    medium.classList.add('bg-medium');
    mediumImg.src = '../img/medium_white.png';
}


function switchMediumBack(medium, mediumImg) {
    medium.classList.remove('bg-medium');
    medium.classList.add('bg-white');
    mediumImg.src = '../img/medium_yellow.png';
}


function switchLow(low, lowImg) {
    low.classList.remove('bg-white');
    low.classList.add('bg-low');
    lowImg.src = '../img/low_white.png';
}


function switchLowBack(low, lowImg) {
    low.classList.remove('bg-low');
    low.classList.add('bg-white');
    lowImg.src = '../img/low_green.png';
}


function toggleDropdown(dropDown) {
    let category = document.getElementById('content');
    let assign = document.getElementById('contacts');
    let borderContact = document.getElementById('contact_dropdown');
    let borderCategory = document.getElementById('select');
    showDropdowns(dropDown, category, assign, borderContact, borderCategory);
}


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


function toggleStatusAndBorderOfContact(assign, borderContact) {
    assign.classList.toggle('active');
    borderContact.classList.toggle('border-color');
}


function toggleStatusAndBorderOfCategory(category,borderCategory) {
    category.classList.toggle('active');
    borderCategory.classList.toggle('border-color');
}


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


function updateName(selectedLi) {
    let select = document.getElementById('select');
    let content = document.getElementById('content');
    select.firstElementChild.innerText = selectedLi.innerText;
    content.classList.remove('active');
    addCategory(selectedLi.innerText);
}


function addCategory(selectedCategory) {
    let option = document.getElementById('options');
    option.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        let isSelected = category == selectedCategory ? 'selected' : '';
        option.innerHTML += /*html*/`
            <li id="category-${i}" onclick="updateName(this)" class="${isSelected}">${category}</li>
        `;
    }
}


function openNewSubtask(subtaskContainerID) {
    let newField = document.getElementById('new-subtask-field');
    newField.innerHTML = '';
    newField.innerHTML += showNewSubtask(subtaskContainerID);
    document.getElementById('subtask').value = '';
    addBorderColor(subtaskContainerID);
}


function addBorderColor(border) {
    let borderColor = document.getElementById(`${border}`);
    borderColor.classList.add('border-color');
}


function deleteInput(subtaskContainerID) {
    let oldSubtask = document.getElementById('new-subtask-field');
    oldSubtask.innerHTML = '';
    oldSubtask.innerHTML += /*html*/ `
        <img src="../img/add.png" alt="plus" class="add" onclick="openNewSubtask('${subtaskContainerID}')">
    `;
    document.getElementById('subtask').value = '';
    removeBorderColor(subtaskContainerID);
}


function removeBorderColor(border) {
    let borderColor = document.getElementById(`${border}`);
    borderColor.classList.remove('border-color');
}

// Eventlistener
document.addEventListener('click', function(event) {
    const dateContainer = document.getElementById('date_container');
    if (event.target !== dateContainer && !dateContainer.contains(event.target)) {
        removeBorderColor('date_container');
    }
});


let subtaskcounter = 0;

function addSubtask(subtaskContainerID) {
    let content = document.getElementById('subtask-content');
    let input = document.getElementById('subtask').value;
    let subtaskID = `subtask-${subtaskcounter}`;
    if (input.length > 0) {
        content.innerHTML += showAddedSubtasks(subtaskID, input);
        subtaskcounter++;
    }
    document.getElementById('subtask').value = '';
    deleteInput(subtaskContainerID);
}


function openInputForEdit(subtask, input) {
    let content = document.getElementById(`${subtask}`);
    content.innerHTML = '';
    content.innerHTML += showInputEditor(subtask, input);
}


function updateInputValue(subtask, input) {
    const content = document.getElementById(`${subtask}`);
    const newValue = document.getElementById(`${input}`).value;
    content.innerHTML = '';
    content.innerHTML += showUpdatedInputValue(newValue, subtask);
}


function deleteSubtask(subtaskID) {
    let subtaskElement = document.getElementById(subtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}


function setDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    document.getElementById('date').value = formattedDate;
}

