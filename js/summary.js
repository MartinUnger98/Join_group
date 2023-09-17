let numberOfTasks = 0;
let tasksInProgress = 0;
let taskAwaitingFeedback = 0;
let urgentTasks = 0;
let toDos = 0;
let done = 0;
const monthsInEnglish = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let deadlines = [];


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
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const greetingDiv = document.getElementById('greetingContainer');   

    if (currentHour >= 0 && currentHour < 12) {
        greetingDiv.innerHTML = 'Good morning,';
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingDiv.innerHTML = 'Good afternoon,';
    } else {
        greetingDiv.innerHTML = 'Good evening,';
    }
}

async function summaryInit(){
    await init();
    updateGreeting();
    showUser();
    countTasksInBoard();
    countTasks('numberOftaskInProgress', 'inProgress', tasksInProgress, 'status');
    countTasks('numberOftaskFeedback', 'awaitFeedback', taskAwaitingFeedback, 'status');
    countTasks('numberOfToDO', 'toDo', toDos, 'status');
    countTasks('numberOfDone', 'taskDone', done, 'status');
    countTasks('numberOfUrgent', 'Urgent', urgentTasks, 'priority'); 
    changeDeadline();
}

function countTasksInBoard(){
    let taskInBoardContainer = document.getElementById('numberOftaskInBoard');
    numberOfTasks = tasks.length;
    taskInBoardContainer.innerHTML = `${numberOfTasks}`;
}


function showUser(){
    let userBox = document.getElementById('greetLoggedInUser');
    userBox.innerHTML = loggedInUser;
}


function countTasks(containerId, status, taskNumber, arrayCategory){
    let container = document.getElementById(containerId);
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task[arrayCategory] == status) {
            taskNumber++
        }
    }
    container.innerHTML = taskNumber;
}


function changeDeadline(){
    for (let i = 0; i < tasks.length; i++) {
        const date = tasks[i]['date'];
        deadlines.push(date);
    }
    deadlines = sortDates(deadlines);
    changeDeadlineFormat();
}


function sortDates(dates) {
    return dates.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
  
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });
  }


  function changeDeadlineFormat(){
    let deadLineContainer = document.getElementById('upcomingDeadline');
    let upcomigDeadline = deadlines[0];
    let date = new Date(upcomigDeadline)
    let day = date.getDate();
    let monthNumber = date.getMonth();
    let year = date.getFullYear();
    let month = monthsInEnglish[monthNumber];
    deadLineContainer.innerHTML = `${month} ${day}, ${year}`;

  }