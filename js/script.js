let users = [];
let tasks = [];
let allContacts = [];
let categories = ['Technical Task', 'User Story'];
let subtaskcounter = 0;
let bgColors = ['#FF7A00', '#462F8A', '#FFBB2B', '#FC71FF', '#6E52FF', '#1FD7C1', '#9327FF', '#FF4646',];
let loggedInUser;
let popup = "";
let idForEditmode;
let indexForEditmode;
let editModeOnOrOff = false;


/**
 * 
 * load all data, templates and specific information on specific views
 */
async function init() {
    await includeHTML();
    await loadData();
    if (window.location.pathname === '/Join/html/board.html' || window.location.pathname === '/Join/html/addTask.html') {
        loadAddTask();
    }
    if (window.location.pathname === '/Join/html/board.html') {
        loadBoard();
    }
}


/**
 * 
 * highlight the current view in the menu and removes the hover effect 
 */
function setCurrentViewInMenu() {
    let currentView = window.location.pathname;
    let lastSlashIndex = currentView.lastIndexOf('/');
    let dotIndex = currentView.lastIndexOf('.');
    let id = currentView.substring(lastSlashIndex + 1, dotIndex);
    document.getElementById("menu-" + id).classList.remove('menu-sections');
    document.getElementById("menu-" + id).classList.add('menu-sectionsNoHover');
}


/**
 * 
 * load all data from the storage 
 */
async function loadData() {
    try {
        users = JSON.parse(await getItem('users'));
        tasks = JSON.parse(await getItem('task'));
        allContacts = JSON.parse(await getItem('allContacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * 
 * push the user to the allContacts object 
 * @param {string} user 
 */
async function pushUsersToContacts(user) {
    let isUserInContacts = allContacts.some(contact => contact.email === user.email);
    if (!isUserInContacts) {
        allContacts.push(user);
        const allContactsAsString = JSON.stringify(allContacts);
        await setItem('allContacts', allContactsAsString);
    }
}


/**
 * 
 * @returns a random color from the array bgColors
 */
function setColor() {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
}


/**
 * Includes the header and the menu to the view
 * 
 */
async function includeHTML() {
    loggedInUser = await getItem('loggedInUser');
    let includeElements = document.querySelectorAll('[w3-include-html]'); 
    for (let i = 0; i < includeElements.length; i++) { 
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let response = await fetch(file); 
        if (response.ok) {
            element.innerHTML = await response.text(); 
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    showLoggedInUser();
    if (window.location.pathname !== '/Join/html/legalNotice.html' && window.location.pathname !== '/Join/html/privatPolicy.html' && window.location.pathname !== '/Join/html/help.html') {
        setCurrentViewInMenu();
    }
    
}


/**
 * 
 * shows the initals of the current logged in user
 */
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


/**
 * 
 * switch for the path after the popup on the differnt views
 */
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
            if (window.location.pathname !== '/Join/html/board.html') {
                window.location.href = 'board.html';
            } else {
                loadBoard();
            }
            break;
    }
}