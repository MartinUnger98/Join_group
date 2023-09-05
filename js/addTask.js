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
    let content = document.getElementById('content');
    let assign = document.getElementById('contacts');
    if(dropDown == 'contact') {
        assign.classList.toggle('active');
        switchDropDownArrow(dropDown);
    }
    if (dropDown == 'category') {
        content.classList.toggle('active');
        switchDropDownArrow(dropDown);
    }  
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

function updateName(selectedLi) {
    let select = document.getElementById('select');
    let content = document.getElementById('content');
    let img = document.getElementById('drop');
    select.firstElementChild.innerText = selectedLi.innerText;
    content.classList.remove('active');
    addCategory(selectedLi.innerText);
}


function openNewSubtask() {
    let newField = document.getElementById('new-subtask-field');
    newField.innerHTML = '';
    newField.innerHTML += /*html*/ `
        <div class="newfield" id="newfield">
            <div class="subtask-buttons" onclick="deleteInputValue()">
                <img src="../img/clear.png" alt="clear">
            </div>
            <span class="mini-separator">|</span>
            <div class="subtask-buttons" onclick="addSubtask()">
                <img src="../img/check_darkblue.png" alt="check">
            </div>
        </div>    
    `;
    let input = document.getElementById('subtask-creator');
    input.classList.add('border-color');
}

function deleteInputValue() {
    let text = document.getElementById('subtask');
    text.value = '';
 
}

let subtaskcounter = 0;

function addSubtask() {
    let content = document.getElementById('subtask-content');
    let input = document.getElementById('subtask').value;
    if (input.length > 0) {
        let subtaskID = `subtask-${subtaskcounter}`
        content.innerHTML += /*html*/ `
        <div id="${subtaskID}" class="added_subtask">
            <li>${input}</li>
            <div class="hidden">
                <img src="../img/edit.png" alt="edit" onclick="">
                <span class="mini_separator_2">|</span>
                <img src="../img/delete_subtask.png" alt="delete" onclick="deleteSubtask('${subtaskID}')">
            </div>
        </div>
    `;
    subtaskcounter++;
    }
    document.getElementById('subtask').value = '';
}

function deleteSubtask(subtaskID) {
    let subtaskElement = document.getElementById(subtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}