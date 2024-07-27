const timerSettings = {
    '4min': 240,
    '3min': 180,
    '2min': 120,
    'prep': 60
};

const timers = {
    team: {},
    opponent: {}
};

function createTimerSection(sectionId, teamOrOpponent) {
    const timerGroup = document.getElementById(sectionId);
    for (const [label, time] of Object.entries(timerSettings)) {
        const timerId = `${teamOrOpponent}-${label}`;
        const timerElement = document.createElement('div');
        timerElement.className = 'timer';
        timerElement.innerHTML = `
            <div id="${timerId}-display" class="timer-display">${formatTime(time)}</div>
            <button class="timer-btn" data-action="start" data-timer="${timerId}">Start ${label.replace('min', ' Min')}</button>
            <button class="timer-btn" data-action="pause" data-timer="${timerId}">Pause</button>
            <button class="timer-btn" data-action="reset" data-timer="${timerId}">Reset</button>
        `;
        timerGroup.appendChild(timerElement);
        timers[teamOrOpponent][label] = { time, running: false, intervalId: null };
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateTimerDisplay(timerId, time) {
    document.getElementById(`${timerId}-display`).textContent = formatTime(time);
}

function startTimer(teamOrOpponent, label) {
    const timer = timers[teamOrOpponent][label];
    if (timer.running) return;

    timer.intervalId = setInterval(() => {
        if (timer.time > 0) {
            timer.time--;
            updateTimerDisplay(`${teamOrOpponent}-${label}`, timer.time);
        } else {
            clearInterval(timer.intervalId);
            timer.running = false;
        }
    }, 1000);

    timer.running = true;
}

function stopTimer(teamOrOpponent, label) {
    const timer = timers[teamOrOpponent][label];
    clearInterval(timer.intervalId);
    timer.running = false;
}

function resetTimer(teamOrOpponent, label) {
    const timer = timers[teamOrOpponent][label];
    stopTimer(teamOrOpponent, label);
    timer.time = timerSettings[label];
    updateTimerDisplay(`${teamOrOpponent}-${label}`, timer.time);
}

// Setup event listeners
function setupEventListeners() {
    document.querySelectorAll('.timer-btn').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const timerId = button.getAttribute('data-timer');
            const [teamOrOpponent, label] = timerId.split('-');
            if (action === 'start') startTimer(teamOrOpponent, label);
            if (action === 'pause') stopTimer(teamOrOpponent, label);
            if (action === 'reset') resetTimer(teamOrOpponent, label);
        });
    });

    document.getElementById('team-dark-mode').addEventListener('click', toggleDarkMode);
    document.getElementById('opponent-dark-mode').addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Initialize Timers
createTimerSection('team-timers', 'team');
createTimerSection('opponent-timers', 'opponent');

// Set up event listeners
setupEventListeners();
