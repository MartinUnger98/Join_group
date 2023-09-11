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


function updateGreeting() {
    init();
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const greetingDiv = document.getElementById('greetingContainer');

    if (currentHour >= 0 && currentHour < 12) {
        greetingDiv.innerHTML = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingDiv.innerHTML = 'Good afternoon';
    } else {
        greetingDiv.innerHTML = 'Good evening';
    }
}