let users = [];
let tasks = [];
let allContacts = [];
let categories = ['Technical Task', 'User Story'];
let subtaskcounter = 0;

async function init() {
    await includeHTML();
    await loadUsers();
    await loadTask();
    await loadAllContacts();
    if (window.location.pathname === '/html/board.html') {
        loadBoard();
    }
}


/**
 * users being loaded form the server
 * 
 */
async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

async function loadTask() {
    try {
        tasks = JSON.parse( await getItem('task'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function loadAllContacts(){
    try {
        allContacts = JSON.parse(await getItem('allContacts'));
    } catch(e){
        console.error('Loading error:', e);
    } 
}


function pushUsersToContacts(){
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        let newContact = {
                email: user['email'],
                name: user['name'],
                number: ''
        }
        allContacts.push(newContact);
    }
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]'); // Alle ELemente mit Attribute '[w3-include.html]' holen.
    for (let i = 0; i < includeElements.length; i++) { // Durch Alle Elemente durchiterieren. In dem Fall nur ein Element (<div>).
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // Diese Zeile liest den Wert des Attributs "w3-include-html" aus -> "include/header.html"
        let response = await fetch(file); // Hier wird der Wert geladen. fetch = laden; await = damit die Funktion mit dem Ausführen wartet, damit alles geladen ist. Wichtig: Funktion muss asynchron sein, siehe bei "function...."
        
        if (response.ok) {
            element.innerHTML = await response.text(); // Hier wird der Text aus dem Wert herausgezogen.
        } else {
            element.innerHTML= 'Page not found';
        }
    }
}