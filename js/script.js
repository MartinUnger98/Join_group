let users = [];
let tasks = [];
let allContacts = [];
let categories = ['Technical Task', 'User Story'];
let subtaskcounter = 0;
let bgColors = ['#FF7A00', '#462F8A', '#FFBB2B', '#FC71FF', '#6E52FF', '#1FD7C1', '#9327FF', '#FF4646',];
let loggedInUser;


async function init() {
    await includeHTML();
    await loadData();
    await pushUsersToContacts();
    if (window.location.pathname === '/html/board.html' || window.location.pathname === '/html/addTask.html') {
        loadAddTask();
    }
    if (window.location.pathname === '/html/board.html') {
        loadBoard();
    }
}


async function loadData() {
    try {
        users = JSON.parse(await getItem('users'));
        tasks = JSON.parse(await getItem('task'));
        allContacts = JSON.parse(await getItem('allContacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


function pushUsersToContacts() {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const isUserInContacts = allContacts.some(contact => contact.email === user.email);
        if (!isUserInContacts) {
            let newContact = {
                email: user.email,
                name: user.name,
                number: '',
                bgColor: ''
            };
            allContacts.push(newContact);
        }
    }
}


async function includeHTML() {
    loggedInUser = await getItem('loggedInUser');
    let includeElements = document.querySelectorAll('[w3-include-html]'); // Alle ELemente mit Attribute '[w3-include.html]' holen.
    for (let i = 0; i < includeElements.length; i++) { // Durch Alle Elemente durchiterieren. In dem Fall nur ein Element (<div>).
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // Diese Zeile liest den Wert des Attributs "w3-include-html" aus -> "include/header.html"
        let response = await fetch(file); // Hier wird der Wert geladen. fetch = laden; await = damit die Funktion mit dem Ausführen wartet, damit alles geladen ist. Wichtig: Funktion muss asynchron sein, siehe bei "function...."

        if (response.ok) {
            element.innerHTML = await response.text(); // Hier wird der Text aus dem Wert herausgezogen.
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    showLoggedInUser();

}

function showLoggedInUser() {
    let box = document.getElementById('loggedInUser');
    let initials = getInitials(loggedInUser);
    box.innerHTML = initials;
}