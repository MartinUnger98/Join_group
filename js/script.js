let users = [];
let tasks = [];
let allContacts = [];
let categories = ['Technical Task', 'User Story'];
let subtaskcounter = 0;
let bgColors = ['#FF7A00', '#462F8A', '#FFBB2B', '#FC71FF', '#6E52FF', '#1FD7C1', '#9327FF', '#FF4646',];
let loggedInUser;
let popup = "";

async function init() {
    await includeHTML();
    await loadData();
    if (window.location.pathname === '/html/board.html' || window.location.pathname === '/html/addTask.html') {
        loadAddTask();
    }
    if (window.location.pathname === '/html/board.html') {
        loadBoard();
    }
}

function setCurrentViewInMenu() {
    let currentView = window.location.pathname;
    let lastSlashIndex = currentView.lastIndexOf('/');
    let dotIndex = currentView.lastIndexOf('.');
    let id = currentView.substring(lastSlashIndex + 1, dotIndex);
    document.getElementById("menu-" + id).classList.remove('menu-sections');
    document.getElementById("menu-" + id).classList.add('menu-sectionsNoHover');
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

// Funktion, um eine zufällige Hintergrundfarbe aus bgColors auszuwählen

async function pushUsersToContacts(user) {
    let isUserInContacts = allContacts.some(contact => contact.email === user.email);
    if (!isUserInContacts) {
        allContacts.push(user);
        const allContactsAsString = JSON.stringify(allContacts);
        await setItem('allContacts', allContactsAsString);
    }
}


function setColor() {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
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
    if (window.location.pathname !== '/html/legalNotice.html' && window.location.pathname !== '/html/privatPolicy.html') {
        setCurrentViewInMenu();
    }
    
}

function showLoggedInUser() {
    let box = document.getElementById('loggedInUser');
    let initials = getInitials(loggedInUser);
    box.innerHTML = initials;
}

/**
 * creates a popup message
 * 
 */
function showSuccessMessage() {
    let successDivContainer = document.createElement('div');
    successDivContainer.id = 'popup';
    let successDiv = document.createElement('div');
    successDiv.textContent = popup;
    successDiv.classList.add('btnDark');
    successDiv.classList.add('widthFit');
    successDiv.classList.add('popupAnimation');
    successDivContainer.appendChild(successDiv);
    document.body.appendChild(successDivContainer);
    setTimeoutPopup(successDivContainer);
}


/**
 * delete the popup and continues to the next page
 *  
 * @param {object} successDivContainer 
 */
function setTimeoutPopup(successDivContainer) {
    setTimeout(() => {
        successDivContainer.remove();
        pathAfterPopup();
    }, 1000);
}

function pathAfterPopup() {
    switch (popup) {
        case "An Email has been sent to you":
            resetPasswordView();
            break;
        case "You reset your password": 
        case "You Signed Up successfully":
            backToLogin();
            break;
        case "Task added to Board":
            if (window.location.pathname !== '/html/board.html') {
                window.location.href = '/html/board.html';
            } else {
                loadBoard();
            }
            break;
    }
}