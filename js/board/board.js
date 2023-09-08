function loadColumns() {
    let toDo = document.getElementById('toDo');
    toDo.innerHTML = '';
    toDo.innerHTML += /*html*/ `
        <div class="no-task-container d-flex justify-content-center align-items-center rounded-3">
            <span class="no-task-color">No tasks to Do</span>
        </div>
    `;
}
