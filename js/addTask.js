function togglePriority(priority) {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    let urgentImg = document.getElementById('urgent-img');
    let mediumImg = document.getElementById('medium-img');
    let lowImg = document.getElementById('low-img');
    if (priority === 'urgent') {
        toggleUrgent(urgent, medium, urgentImg, mediumImg, low, lowImg);   
    } else if (priority === 'medium') {
        toggleMedium(urgent, medium, urgentImg, mediumImg, low, lowImg);
    } else if (priority === 'low') {
        toggleLow(urgent, medium, urgentImg, mediumImg, low, lowImg);
    }
}

function toggleUrgent(urgent, medium, urgentImg, mediumImg, low, lowImg) {
    if (urgent.classList.contains('bg-white')) {
        switchUrgent(urgent, urgentImg);
    } else {
        switchUrgentBack(urgent, urgentImg);
    }
    if (medium.classList.contains('bg-medium')) {
        switchMediumBack(medium, mediumImg);
    }
    if (low.classList.contains('bg-low')) {
        switchLowBack(low, lowImg);
    }
}

function toggleMedium(urgent, medium, urgentImg, mediumImg, low, lowImg) {
    if (medium.classList.contains('bg-white')) {
        switchMedium(medium, mediumImg);
    } else {
        switchMediumBack(medium, mediumImg);
    }
    if (urgent.classList.contains('bg-urgent')) {
        switchUrgentBack(urgent, urgentImg);
    }
    if (low.classList.contains('bg-low')) {
        switchLowBack(low, lowImg);
    }
}

function toggleLow(urgent, medium, urgentImg, mediumImg, low, lowImg) {
    if (low.classList.contains('bg-white')) {
        switchLow(low, lowImg);
    } else {
        switchLowBack(low, lowImg);
    }
    if (urgent.classList.contains('bg-urgent')) {
        switchUrgentBack(urgent, urgentImg);
    }
    if (medium.classList.contains('bg-medium')) {
        switchMediumBack(medium, mediumImg);
    }
}

function switchUrgent(urgent, urgentImg) {
    urgent.classList.remove('bg-white');
    urgent.classList.add('bg-urgent');
    urgentImg.src = '../img/urgent_white.png';
}

function switchUrgentBack(urgent,urgentImg) {
    urgent.classList.remove('bg-urgent');
    urgent.classList.add('bg-white');
    urgentImg.src = '../img/urgent_red.png';
}

function switchMedium(medium, mediumImg) {
    medium.classList.remove('bg-white');
    medium.classList.add('bg-medium');
    mediumImg.src = '../img/medium_white.png';
}

function switchMediumBack(medium, mediumImg) {
    medium.classList.remove('bg-medium');
    medium.classList.add('bg-white');
    mediumImg.src = '../img/medium_yellow.png';
}

function switchLow(low, lowImg) {
    low.classList.remove('bg-white');
    low.classList.add('bg-low');
    lowImg.src = '../img/low_white.png';
}

function switchLowBack(low, lowImg) {
    low.classList.remove('bg-low');
    low.classList.add('bg-white');
    lowImg.src = '../img/low_green.png';
}