// Selectors
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');
const suggestionsBox = document.getElementById('suggestions');
const pomodoroTimer = document.getElementById('pomodoro-timer');
const pomodoroStart = document.getElementById('pomodoro-start');
const pomodoroReset = document.getElementById('pomodoro-reset');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const motivationalQuote = document.getElementById('motivational-quote');
const undoTaskBtn = document.getElementById('undo-task');
const confettiCanvas = document.getElementById('confetti-canvas');
const searchInput = document.getElementById('search-input');
const filterCategory = document.getElementById('filter-category');
const dueDateInput = document.getElementById('due-date');
const taskCategory = document.getElementById('task-category');
const statsToggle = document.getElementById('stats-toggle');
const statsPanel = document.getElementById('stats-panel');
const soundToggle = document.getElementById('sound-toggle');
const completeSound = document.getElementById('complete-sound');
const addSound = document.getElementById('add-sound');
const exportBtn = document.getElementById('export-tasks');
const importBtn = document.getElementById('import-tasks');
const importInput = document.getElementById('import-input');

// App State
let tasks = [];
let completedHistory = [];
let suggestions = [];
let pomodoroInterval = null;
let pomodoroTime = 25 * 60;
let pomodoroTimeLeft = pomodoroTime;
let isDark = false;
let dragSrcIndex = null;
let isSoundEnabled = true;
let searchTerm = '';
let selectedCategory = 'all';

const QUOTES = [
  "Your only limit is your mind.",
  "Dream it. Wish it. Do it.",
  "Stay positive, work hard, make it happen!",
  "Great things never come from comfort zones.",
  "Push yourself, because no one else is going to do it for you.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't stop when you're tired. Stop when you're done.",
  "Little things make big days.",
  "It's going to be hard, but hard does not mean impossible."
];

// --- LocalStorage ---
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
  const data = localStorage.getItem('tasks');
  if (data) tasks = JSON.parse(data);
}
function saveTheme() {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
function loadTheme() {
  isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}
function saveSoundPreference() {
  localStorage.setItem('sound', isSoundEnabled);
}
function loadSoundPreference() {
  isSoundEnabled = localStorage.getItem('sound') !== 'false';
  soundToggle.innerHTML = isSoundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
}

// --- Task Functions ---
function renderTasks() {
  taskList.innerHTML = '';
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  filteredTasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');
    
    // Add overdue/due-today classes
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dueDate < today) li.classList.add('overdue');
      else if (dueDate.getTime() === today.getTime()) li.classList.add('due-today');
    }

    li.setAttribute('draggable', 'true');
    li.setAttribute('data-index', i);

    const content = document.createElement('div');
    content.className = 'task-content';

    // Priority dot
    const priorityDot = document.createElement('span');
    priorityDot.className = 'task-priority ' + task.priority;
    content.appendChild(priorityDot);

    // Task text
    const span = document.createElement('span');
    span.textContent = task.text;
    content.appendChild(span);

    // Category badge
    if (task.category) {
      const category = document.createElement('span');
      category.className = 'task-category';
      category.textContent = task.category;
      content.appendChild(category);
    }

    // Due date
    if (task.dueDate) {
      const dueDate = document.createElement('span');
      dueDate.className = 'task-due-date';
      dueDate.textContent = new Date(task.dueDate).toLocaleDateString();
      content.appendChild(dueDate);
    }

    li.appendChild(content);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'task-actions';
    
    // Complete button
    if (!task.completed) {
      const completeBtn = document.createElement('button');
      completeBtn.title = 'Complete';
      completeBtn.innerHTML = '✔️';
      completeBtn.onclick = () => completeTask(i);
      actions.appendChild(completeBtn);
    }

    // Notes button
    const notesBtn = document.createElement('button');
    notesBtn.title = 'Add Notes';
    notesBtn.innerHTML = '📝';
    notesBtn.onclick = () => toggleNotes(i);
    actions.appendChild(notesBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.title = 'Delete';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.onclick = () => deleteTask(i);
    actions.appendChild(deleteBtn);

    // Priority button
    const priorityBtn = document.createElement('button');
    priorityBtn.title = 'Change Priority';
    priorityBtn.innerHTML = '⚡';
    priorityBtn.onclick = () => changePriority(i);
    actions.appendChild(priorityBtn);

    li.appendChild(actions);

    // Notes section
    if (task.notes) {
      const notes = document.createElement('div');
      notes.className = 'task-notes';
      notes.textContent = task.notes;
      li.appendChild(notes);
    }

    // Drag events
    li.addEventListener('dragstart', e => {
      dragSrcIndex = i;
      li.classList.add('dragging');
    });
    li.addEventListener('dragend', e => {
      li.classList.remove('dragging');
    });
    li.addEventListener('dragover', e => {
      e.preventDefault();
      li.classList.add('drag-over');
    });
    li.addEventListener('dragleave', e => {
      li.classList.remove('drag-over');
    });
    li.addEventListener('drop', e => {
      li.classList.remove('drag-over');
      if (dragSrcIndex !== null && dragSrcIndex !== i) {
        const moved = tasks.splice(dragSrcIndex, 1)[0];
        tasks.splice(i, 0, moved);
        saveTasks();
        renderTasks();
        updateProgress();
      }
      dragSrcIndex = null;
    });

    taskList.appendChild(li);
  });
  updateStats();
}

function addTask(text, priority = 'medium') {
  if (!text.trim()) return;
  const task = {
    text,
    completed: false,
    priority,
    category: taskCategory.value,
    dueDate: dueDateInput.value || null,
    notes: null,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
  updateProgress();
  updateSuggestions(text);
  taskInput.value = '';
  dueDateInput.value = '';
  suggestionsBox.classList.remove('active');
  if (isSoundEnabled) addSound.play();
}

function completeTask(index) {
  if (tasks[index].completed) return;
  tasks[index].completed = true;
  completedHistory.push({ ...tasks[index], index });
  saveTasks();
  renderTasks();
  updateProgress();
  showConfetti();
  showMotivationalQuote();
  if (isSoundEnabled) completeSound.play();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  updateProgress();
}

function changePriority(index) {
  const levels = ['low', 'medium', 'high'];
  let current = levels.indexOf(tasks[index].priority);
  tasks[index].priority = levels[(current + 1) % levels.length];
  saveTasks();
  renderTasks();
}

function toggleNotes(index) {
  const task = tasks[index];
  const notes = prompt('Add notes to this task:', task.notes || '');
  if (notes !== null) {
    task.notes = notes;
    saveTasks();
    renderTasks();
  }
}

function undoLastComplete() {
  if (completedHistory.length === 0) return;
  const last = completedHistory.pop();
  if (last && tasks[last.index]) {
    tasks[last.index].completed = false;
    saveTasks();
    renderTasks();
    updateProgress();
  }
}

function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  progressBar.style.width = percent + '%';
  progressText.textContent = `${done}/${total} completed (${percent}%)`;
}

function updateSuggestions(newTask) {
  const all = tasks.map(t => t.text);
  suggestions = Array.from(new Set(all.filter(t => 
    t.toLowerCase().includes(taskInput.value.toLowerCase()) && 
    t !== taskInput.value
  )));
  renderSuggestions();
}

function renderSuggestions() {
  if (taskInput.value.trim() === '' || suggestions.length === 0) {
    suggestionsBox.classList.remove('active');
    suggestionsBox.innerHTML = '';
    return;
  }
  suggestionsBox.classList.add('active');
  suggestionsBox.innerHTML = '';
  suggestions.forEach(s => {
    const div = document.createElement('div');
    div.textContent = s;
    div.onclick = () => {
      taskInput.value = s;
      suggestionsBox.classList.remove('active');
      taskInput.focus();
    };
    suggestionsBox.appendChild(div);
  });
}

// --- Stats Functions ---
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueToday = tasks.filter(t => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime();
  }).length;
  const overdue = tasks.filter(t => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }).length;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-due-today').textContent = dueToday;
  document.getElementById('stat-overdue').textContent = overdue;

  // Update category chart
  const categoryChart = document.getElementById('category-chart');
  const categories = {};
  tasks.forEach(task => {
    if (task.category) {
      categories[task.category] = (categories[task.category] || 0) + 1;
    }
  });

  // Simple bar chart
  categoryChart.innerHTML = '';
  Object.entries(categories).forEach(([category, count]) => {
    const bar = document.createElement('div');
    bar.className = 'category-bar';
    bar.style.height = `${(count / total) * 100}%`;
    bar.title = `${category}: ${count} tasks`;
    categoryChart.appendChild(bar);
  });
}

// --- Pomodoro Functions ---
function startPomodoro() {
  if (pomodoroInterval) return;
  pomodoroStart.textContent = '⏸️';
  let running = true;
  pomodoroInterval = setInterval(() => {
    if (!running) return;
    if (pomodoroTimeLeft > 0) {
      pomodoroTimeLeft--;
      updatePomodoroDisplay();
    } else {
      clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      pomodoroStart.textContent = 'Start';
      showMotivationalQuote();
      showConfetti();
      pomodoroTimeLeft = pomodoroTime;
      updatePomodoroDisplay();
      if (isSoundEnabled) completeSound.play();
    }
  }, 1000);
  pomodoroStart.onclick = () => {
    running = !running;
    pomodoroStart.textContent = running ? '⏸️' : '▶️';
  };
}

function resetPomodoro() {
  if (pomodoroInterval) clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  pomodoroTimeLeft = pomodoroTime;
  updatePomodoroDisplay();
  pomodoroStart.textContent = 'Start';
}

function updatePomodoroDisplay() {
  const min = String(Math.floor(pomodoroTimeLeft / 60)).padStart(2, '0');
  const sec = String(pomodoroTimeLeft % 60).padStart(2, '0');
  pomodoroTimer.textContent = `${min}:${sec}`;
}

// --- Confetti ---
function showConfetti() {
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  let confetti = [];
  for (let i = 0; i < 120; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 40 + 10,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      tilt: Math.random() * 10 - 10
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
    update();
    frame++;
    if (frame < 80) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
  function update() {
    confetti.forEach(c => {
      c.y += Math.cos(frame / 10 + c.d) + 2 + c.r / 2;
      c.x += Math.sin(frame / 15) * 2;
      if (c.y > confettiCanvas.height) {
        c.x = Math.random() * confettiCanvas.width;
        c.y = Math.random() * -20;
      }
    });
  }
  draw();
}

// --- Motivational Quotes ---
function showMotivationalQuote() {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  motivationalQuote.textContent = '"' + quote + '"';
  motivationalQuote.style.color = '#ff6a6a';
  setTimeout(() => {
    motivationalQuote.style.color = '';
  }, 2000);
}

// --- Export/Import ---
function exportTasks() {
  const data = JSON.stringify(tasks, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tasks.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importTasks() {
  importInput.click();
}

function handleImport(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importedTasks = JSON.parse(e.target.result);
        if (Array.isArray(importedTasks)) {
          tasks = importedTasks;
          saveTasks();
          renderTasks();
          updateProgress();
        }
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  }
}

// --- Event Listeners ---
addTaskBtn.addEventListener('click', () => addTask(taskInput.value));
taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask(taskInput.value);
});
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  saveTheme();
});
soundToggle.addEventListener('click', () => {
  isSoundEnabled = !isSoundEnabled;
  soundToggle.innerHTML = isSoundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
  saveSoundPreference();
});

// Stats panel toggle functionality
function toggleStatsPanel() {
  updateStats();
  const panel = document.getElementById('statsPanel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

statsToggle.addEventListener('click', toggleStatsPanel);
pomodoroStart.addEventListener('click', startPomodoro);
pomodoroReset.addEventListener('click', resetPomodoro);
undoTaskBtn.addEventListener('click', undoLastComplete);
exportBtn.addEventListener('click', exportTasks);
importBtn.addEventListener('click', importTasks);
importInput.addEventListener('change', handleImport);
searchInput.addEventListener('input', e => {
  searchTerm = e.target.value;
  renderTasks();
});
filterCategory.addEventListener('change', e => {
  selectedCategory = e.target.value;
  renderTasks();
});
document.getElementById('closeStats').addEventListener('click', () => {
  toggleStatsPanel();
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    taskInput.focus();
  }
  if (e.key === 'Escape' && statsPanel.style.display === 'block') {
    toggleStatsPanel();
  }
});

// --- Init ---
function init() {
  loadTasks();
  loadTheme();
  loadSoundPreference();
  renderTasks();
  updateProgress();
  updatePomodoroDisplay();
  // Ensure stats panel is hidden initially
  statsPanel.style.display = 'none';
}
init();