function changeIcon(path){
    if (path === '../img/pencilWhite.png') {
        let img = document.getElementById('toDoImg');
        img.src = path;
    }
    else if (path === '../img/checkWhite.png') {
        let img = document.getElementById('doneImg');
        img.src = path;
    }
}


function changeIconBack(path){
    if (path === '../img/pencilIcon.png') {
        let img = document.getElementById('toDoImg');
        img.src = path;
    }
    else if (path === '../img/checkIcon.png') {
        let img = document.getElementById('doneImg');
        img.src = path;
    }
}