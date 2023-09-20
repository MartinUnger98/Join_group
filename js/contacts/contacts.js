let initialLetter = [];


async function initContacts() {
    await init();
    loadContacts();
}

function sortByFirstName(allContacts) {
    return allContacts.sort(function (a, b) {
        const firstNameA = a.name.split(' ')[0];
        const firstNameB = b.name.split(' ')[0];
        return firstNameA.localeCompare(firstNameB);
    });
}

function showContactEditor() {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    editor.innerHTML = showNewContactEditor();
    overlay.style.opacity = '0.7';
    overlay.style.zIndex = '997';
    editor.style.right = '0px';
}


function closeEditorCtc() {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-5';
    editor.style.right = '-6000px';
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
    findNewPosition(nameInput);
}

async function saveNewContact() {
    try {
        const allContactsAsString = JSON.stringify(allContacts);
        await setItem('allContacts', allContactsAsString); // Auf das Ergebnis warten
        loadContacts();
        closeEditorCtc();
    } catch (error) {
        console.error('Fehler beim Speichern des Kontakts:', error);
    }
}


function getInitials(name) {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts.length > 1 ? nameParts[1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`;
}


function loadContacts() {
    let allContactsContainer = document.getElementById('allContacts');
    allContactsContainer.innerHTML = '';
    initialLetter = [];
    sortByFirstName(allContacts);
    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i];
        const initials = getInitials(contact['name']);
        const firstInitial = initials[0][0];
        const bgColor = contact.bgColor;
        checkInitialLetter(firstInitial);
        if (initialLetter[i] != 'blank') {
            allContactsContainer.innerHTML += contactHead(initials);
        }
        allContactsContainer.innerHTML += contactLayout(initials, contact, i);
        document.getElementById(`initialLogo${i}`).style.backgroundColor = bgColor;
    }
}

function checkInitialLetter(firstInitial) {
    if (!initialLetter.includes(firstInitial)) {
        initialLetter.push(firstInitial);
    }
    else {
        initialLetter.push('blank');
    }
}


function showContact(i) {
    let contactDetailContainer = document.getElementById('contactDetailView');
   
    if (contactDetailContainer.style.left === '') {
        changeDetails(i, contactDetailContainer);
        document.getElementById('initialsDetailView').style.backgroundColor = allContacts[i]['bgColor'];
    }
    else {
        contactDetailContainer.style.left = '100vw';
        setTimeout(function () {
            changeDetails(i, contactDetailContainer);
            document.getElementById('initialsDetailView').style.backgroundColor = allContacts[i]['bgColor'];
        }, 225);
    }
    
}

function showDetails() {
    document.getElementById("contactsContainer").classList.add("opacity0");
    document.getElementById("contactDetailContainer").classList.remove("opacity0"); 
    document.getElementById("addContactBtn").disabled = true;
}

function showContacts() {
    document.getElementById("contactsContainer").classList.remove("opacity0");
    document.getElementById("contactDetailContainer").classList.add("opacity0");
    document.getElementById("addContactBtn").disabled = false; 
}


function changeDetails(i, contactDetailContainer) {
    contactDetailContainer.innerHTML = '';
    contactDetailContainer.innerHTML += detailView(i);
    contactDetailContainer.style.left = '764px';
    showDetails();
}


async function deleteContact(i) {
    let contactDetailContainer = document.getElementById('contactDetailView');
    allContacts.splice(i, 1);
    contactDetailContainer.style.left = '100vw';
    await saveNewContact();
}


function editContact(i) {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    editor.innerHTML = showEditor(i);
    overlay.style.opacity = '0.7';
    overlay.style.zIndex = '997';
    editor.style.right = '0px';
    document.getElementById('name').value = checkUndefined(allContacts[i]['name']);
    document.getElementById('email').value = checkUndefined(allContacts[i]['email']);
    document.getElementById('phone').value = checkUndefined(allContacts[i]['number']);
    document.getElementById('initialDiv').style.backgroundColor = allContacts[i]['bgColor'];
}

function checkUndefined(value) {
    return value !== undefined ? value : '';
}



async function saveContact(i) {
    allContacts[i].name = document.getElementById("name").value;
    allContacts[i].email = document.getElementById("email").value;
    allContacts[i].number = document.getElementById("phone").value;
    closeEditorCtc();
    loadContacts();
    await saveNewContact();
    findNewPosition(allContacts[i].name);
}


function findNewPosition(nameInput) {
    for (let j = 0; j < allContacts.length; j++) {
        if (allContacts[j].name === nameInput) {
            showContact(j);
        }
    }
}






