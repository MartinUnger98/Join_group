let allContacts = [
    {
        name: 'Hans Meier',
        email: 'hasnmeier@webkitURL.de',
        number: '1234'
    },
    {
        name: 'Andreas Müller',
        email: 'hasnmeier@webkitURL.de',
        number: '1234'
    },
    {
        name: 'Franziska Engel',
        email: 'hasnmeier@webkitURL.de',
        number: '1234'
    },
    {
        name: 'Friedrich König',
        email: 'hasnmeier@webkitURL.de',
        number: '1234'
    }
]


function sortByFirstName(allContacts) {
    return allContacts.sort(function(a, b) {
        const firstNameA = a.name.split(' ')[0];
        const firstNameB = b.name.split(' ')[0];
        return firstNameA.localeCompare(firstNameB);
    });
}

function showContactEditor() {
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    overlay.style.opacity = '0.7';
    overlay.style.zIndex = '997';
    editor.style.right = '0px';
}

function closeEditorCtc() {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-5';
    editor.style.right = '-6000px';
}


function addContact() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const numberInput = document.getElementById("phone");
    const contact = {
        name: nameInput.value,
        email: emailInput.value,
        number: numberInput.value
    };
    allContacts.push(contact);
    closeEditorCtc();
    loadContacts();
}


function getInitials(name) {
    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts.length > 1 ? nameParts[1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`;
}


function loadContacts() {
    sortByFirstName(allContacts);
    console.log(allContacts);
    let allContactsContainer = document.getElementById('allContacts');
    allContactsContainer.innerHTML = '';
    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i];
        const initials = getInitials(contact['name']);
        allContactsContainer.innerHTML += `
        <div class="contactLayout">
            <div class="initials"><span>${initials}</span></div>        
            <div class="infoOrder">
                <span>${contact['name']}</span>
                <a>${contact['email']}</a>
            </div>
        </div>
        `;
    }
}


