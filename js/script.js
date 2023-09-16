let users = [];
let tasks = [];
let allContacts = [];
let categories = ['Technical Task', 'User Story'];
let subtaskcounter = 0;
let bgColors = ['#FF7A00','#9327FF','#6E52FF','#FC71FF','#FFBB2B','#1FD7C1','#462F8A','#FF4646',];
let loggedInUser;


async function init() {
    await includeHTML();  
    await loadData();      
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
    loggedInUser = await getItem('loggedInUser');
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
    showLoggedInUser();

}

function showLoggedInUser() {
    let box = document.getElementById('loggedInUser');
    let initials = getInitials(loggedInUser);
    box.innerHTML = initials;
}