function showContactEditor(){
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    overlay.style.opacity = '0.7';
    overlay.style.zIndex = '997';
    editor.style.right = '0px';
}

function closeEditorCtc(){
    let overlay = document.getElementById('contactOverlay');
    let editor = document.getElementById('addContact');
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-5';
    editor.style.right = '-6000px';
}