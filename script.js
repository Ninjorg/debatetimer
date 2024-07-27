// Timer State
const timers = {
    team: {
        '4min': { time: 240, running: false, intervalId: null },
        '3min': { time: 180, running: false, intervalId: null },
        '2min': { time: 120, running: false, intervalId: null },
        'prep': { time: 60, running: false, intervalId: null }
    },
    opponent: {
        '4min': { time: 240, running: false, intervalId: null },
        '3min': { time: 180, running: false, intervalId: null },
        '2min': { time: 120, running: false, intervalId: null },
        'prep': { time: 60, running: false, intervalId: null }
    }
};

function updateTimerDisplay(timerId, time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById(timerId).textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer(teamOrOpponent, timerType) {
    const timer = timers[teamOrOpponent][timerType];
    if (timer.running) return;

    timer.intervalId = setInterval(() => {
        if (timer.time > 0) {
            timer.time--;
            updateTimerDisplay(`${teamOrOpponent}-${timerType}`, timer.time);
        } else {
            clearInterval(timer.intervalId);
            timer.running = false;
        }
    }, 1000);

    timer.running = true;
}

function stopTimer(teamOrOpponent, timerType) {
    const timer = timers[teamOrOpponent][timerType];
    clearInterval(timer.intervalId);
    timer.running = false;
}

function resetTimer(teamOrOpponent, timerType) {
    const timer = timers[teamOrOpponent][timerType];
    stopTimer(teamOrOpponent, timerType);
    timer.time = {
        '4min': 240,
        '3min': 180,
        '2min': 120,
        'prep': 60
    }[timerType];
    updateTimerDisplay(`${teamOrOpponent}-${timerType}`, timer.time);
}

// Event Listeners for Team Timers
document.getElementById('team-4min-start').addEventListener('click', () => startTimer('team', '4min'));
document.getElementById('team-4min-pause').addEventListener('click', () => stopTimer('team', '4min'));
document.getElementById('team-4min-reset').addEventListener('click', () => resetTimer('team', '4min'));

document.getElementById('team-3min-start').addEventListener('click', () => startTimer('team', '3min'));
document.getElementById('team-3min-pause').addEventListener('click', () => stopTimer('team', '3min'));
document.getElementById('team-3min-reset').addEventListener('click', () => resetTimer('team', '3min'));

document.getElementById('team-2min-start').addEventListener('click', () => startTimer('team', '2min'));
document.getElementById('team-2min-pause').addEventListener('click', () => stopTimer('team', '2min'));
document.getElementById('team-2min-reset').addEventListener('click', () => resetTimer('team', '2min'));

document.getElementById('team-prep-start').addEventListener('click', () => startTimer('team', 'prep'));
document.getElementById('team-prep-pause').addEventListener('click', () => stopTimer('team', 'prep'));
document.getElementById('team-prep-reset').addEventListener('click', () => resetTimer('team', 'prep'));

// Event Listeners for Opponent Timers
document.getElementById('opponent-4min-start').addEventListener('click', () => startTimer('opponent', '4min'));
document.getElementById('opponent-4min-pause').addEventListener('click', () => stopTimer('opponent', '4min'));
document.getElementById('opponent-4min-reset').addEventListener('click', () => resetTimer('opponent', '4min'));

document.getElementById('opponent-3min-start').addEventListener('click', () => startTimer('opponent', '3min'));
document.getElementById('opponent-3min-pause').addEventListener('click', () => stopTimer('opponent', '3min'));
