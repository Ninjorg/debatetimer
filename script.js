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
            updateTimerDisplay(`${teamOrOpponent}-${timerType}-display`, timer.time);
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
    updateTimerDisplay(`${teamOrOpponent}-${timerType}-display`, timer.time);
}

document.querySelectorAll('.timer-btn').forEach(button => {
    button.addEventListener('click', () => {
        const teamOrOpponent = button.getAttribute('data-timer').split('-')[0];
        const
