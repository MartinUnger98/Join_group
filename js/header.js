function toggleSubmenu() {
    let subMenu = document.getElementById('submenu');
    let cursor = document.getElementById('userProfileInit');
    let profileBackground = document.getElementById('frame31');
    if(subMenu.style.display == 'none') {
        showSubMenu(subMenu);
        switchCursor(cursor);
        changeBg(profileBackground);
    } else {
        hideSubMenu(subMenu);
        switchCursorBack(cursor);
        changeBgBack(profileBackground);
    }
}

function showSubMenu(subMenu) {
    subMenu.style.display = 'block';
}

function switchCursor(cursor) {
    cursor.style.cursor ='default';
}

function changeBg(profileBackground) {
    profileBackground.classList.add('bg-upI');
}

function hideSubMenu(subMenu) {
    subMenu.style.display = 'none';
}

function switchCursorBack(cursor) {
    cursor.style.cursor ='pointer';
}

function changeBgBack(profileBackground) {
    profileBackground.classList.remove('bg-upI');
}