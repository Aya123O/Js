export function updateMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    if (type) {
        messageElement.className = `text-${type}`;
    }
}

export function startTimer(callback) {
    let timeLeft = 30; // 30 seconds timer
    const timer = setInterval(() => {
        timeLeft--;
        callback(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            callback(0);
        }
    }, 1000);

    return timer;
}
