let tasks = [];

document.getElementById('addCheckbox').addEventListener('click', function() {
    let checkboxWrapper = createCheckbox('New Task', false);

    // Insert the new checkboxWrapper just before the "+" button
    const container = document.getElementById('checkboxContainer');
    container.insertBefore(checkboxWrapper, this);

    // Update and save tasks to localStorage
    tasks.push({
        content: 'New Task',
        checked: false
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
});


function createCheckbox(taskContent, isChecked) {
    let checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'custom-checkbox';

    let newCheckboxLabel = document.createElement('label');

    let newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.checked = isChecked;

    let checkmarkSpan = document.createElement('span');
    checkmarkSpan.className = 'checkmark';

    newCheckboxLabel.appendChild(newCheckbox);
    newCheckboxLabel.appendChild(checkmarkSpan);
    checkboxWrapper.appendChild(newCheckboxLabel);

    let newLabel = document.createElement('div');
    newLabel.contentEditable = 'true';
    newLabel.className = 'editable';
    newLabel.textContent = taskContent;
    checkboxWrapper.appendChild(newLabel);

    newLabel.addEventListener("input", function() {
        updateLocalStorage();
    });
    newLabel.addEventListener("keypress", function(e) {
        if (e.keyCode === 13) {
            e.preventDefault(); // Prevents the default action of a newline in contentEditable
            newLabel.blur(); // Removes focus from the label
        }
    });
    newCheckbox.addEventListener("change", function() {
        updateLocalStorage();
    });

    const deleteBtn = createDeleteButton(checkboxWrapper);
    checkboxWrapper.appendChild(deleteBtn);

    newLabel.addEventListener("input", function() {
        updateLocalStorage();
    });
    newCheckbox.addEventListener("change", function() {
        updateLocalStorage();
    });

    return checkboxWrapper;
}


function updateLocalStorage() {
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    tasks = Array.from(checkboxes).map(checkbox => {
        return {
            content: checkbox.querySelector('.editable').textContent,
            checked: checkbox.querySelector('input[type="checkbox"]').checked
        };
    });
    localStorage.setItem(currentDay + 'Tasks', JSON.stringify(tasks));

}

window.addEventListener('DOMContentLoaded', (event) => {
    // Try to load tasks from local storage
    const loadedTasks = JSON.parse(localStorage.getItem(currentDay + 'Tasks'));

    const addButton = document.getElementById('addCheckbox'); // reference to the "+" button
    const container = document.getElementById('checkboxContainer'); // reference to the container

    // If there are no tasks saved, set default tasks
    if (!loadedTasks || loadedTasks.length === 0) {
        tasks = [
            {content: 'Task 1', checked: false},
            {content: 'Task 2', checked: false},
        ];
    } else {
        tasks = loadedTasks;
    }

    tasks.forEach(task => {
        let checkboxWrapper = createCheckbox(task.content, task.checked);
        container.insertBefore(checkboxWrapper, addButton); // insert each task before the "+" button
    });
});


function createDeleteButton(checkboxWrapper) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    deleteButton.addEventListener('click', function() {
        checkboxWrapper.remove(); // Remove the task from the DOM
        updateLocalStorage();    // Update the tasks saved in localStorage
    });

    return deleteButton;
}

