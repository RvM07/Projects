// Main Todo App Class
class TodoApp {
    // Set up initial data when app starts
    constructor() {
        // Get saved tasks from browser storage, or use empty array if none exists
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';  // Default filter
        this.startApp();
    }

    // Initialize the app
    startApp() {
        this.addEventListeners();  // Set up button clicks
        this.showCurrentDate();    // Show today's date
        this.showTasks();         // Display tasks
        this.updateTaskCounter(); // Update task count
    }

    // Set up all button clicks and interactions
    addEventListeners() {
        // Add task when "Add" button is clicked
        const addButton = document.getElementById('addTaskBtn');
        addButton.addEventListener('click', () => this.createNewTask());

        // Add task when Enter key is pressed
        const inputField = document.getElementById('taskInput');
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createNewTask();
        });

        // Clear completed tasks button
        const clearButton = document.getElementById('clearCompleted');
        clearButton.addEventListener('click', () => this.removeCompletedTasks());

        // Filter buttons (All, Active, Completed)
        const filterButtons = document.querySelectorAll('.filters button');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.filterTasks(e.target.dataset.filter);
            });
        });
    }

    // Display current date
    showCurrentDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        document.getElementById('currentDate').textContent = today;
    }

    // Add a new task
    createNewTask() {
        const inputField = document.getElementById('taskInput');
        const taskText = inputField.value.trim();
        
        // Don't add empty tasks
        if (!taskText) return;

        // Create new task object
        const newTask = {
            id: Date.now(),                    // Unique ID using current timestamp
            text: taskText,                    // The task text
            completed: false,                  // Not completed by default
            priority: document.getElementById('prioritySelect').value,  // Priority level
            date: new Date().toISOString()     // Current date and time
        };

        // Add task to beginning of list
        this.tasks.unshift(newTask);
        
        // Clear input field
        inputField.value = '';
        
        // Update display
        this.saveAndShowTasks();
    }

    // Mark task as complete/incomplete
    toggleTaskComplete(id) {
        // Find the task and toggle its completed status
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveAndShowTasks();
        }
    }

    // Delete a task
    deleteTask(id) {
        // Remove task from array
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveAndShowTasks();
    }

    // Filter tasks (all, active, completed)
    filterTasks(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        const buttons = document.querySelectorAll('.filters button');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.showTasks();
    }

    // Remove all completed tasks
    removeCompletedTasks() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveAndShowTasks();
    }

    // Get tasks based on current filter
    getTasksToShow() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    // Display tasks on screen
    showTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear current list

        // Create and add each task element
        this.getTasksToShow().forEach(task => {
            const taskElement = this.createTaskHtml(task);
            taskList.appendChild(taskElement);
        });
    }

    // Create HTML for a single task
    createTaskHtml(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskElement.setAttribute('data-priority', task.priority);

        // Format the date for display
        const formattedDate = new Date(task.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Create task HTML
        taskElement.innerHTML = `
            <div class="task-checkbox" onclick="app.toggleTaskComplete(${task.id})"></div>
            <div class="task-content">
                <div class="task-text">
                    <span class="priority-indicator priority-${task.priority}"></span>
                    ${task.text}
                </div>
                <div class="task-meta">${formattedDate}</div>
            </div>
            <div class="task-actions">
                <button onclick="app.deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        return taskElement;
    }

    // Update the task counter
    updateTaskCounter() {
        const remainingTasks = this.tasks.filter(task => !task.completed).length;
        const counterText = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''}`;
        document.getElementById('taskCount').textContent = counterText;
    }

    // Save tasks and update display
    saveAndShowTasks() {
        // Save to browser storage
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        
        // Update display
        this.showTasks();
        this.updateTaskCounter();
    }
}

// Create and start the app
const app = new TodoApp();
window.app = app; // Make app available globally for HTML buttons