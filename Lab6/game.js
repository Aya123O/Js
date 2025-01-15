import { categories } from './categories.js';
import { updateMessage, startTimer } from './utils.js';

export let selectedDifficulty, selectedCategory, selectedWord, wordProgress, guessedLetters, lives, intervalId, hintUsed;
export let score = 0;
export let gameHistory = [];

document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById("startGame");
    startGameButton.addEventListener("click", startGame);
});
document.getElementById("submitGuess").addEventListener("click", makeGuess);
document.getElementById("hintButton").addEventListener("click", useHint);
document.getElementById("tryagain").addEventListener("click", resetGame);
document.getElementById("guessInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});


export function startGame() {
    selectedDifficulty = document.getElementById("level").value;
    selectedCategory = document.getElementById("category").value;

    const categoryTitle = document.getElementById("selectedCategory");
    categoryTitle.textContent = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

    const difficultyBadge = document.createElement("span");
    difficultyBadge.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    difficultyBadge.className = `difficulty-badge difficulty-${selectedDifficulty}`;
    categoryTitle.appendChild(difficultyBadge);

    const categoryData = categories.find(cat =>
        cat.difficulty === selectedDifficulty && cat.category === selectedCategory
    );

    if (!categoryData) {
        updateMessage("Category not found.", "danger");
        return;
    }

    const randomIndex = Math.floor(Math.random() * categoryData.words.length);
    selectedWord = categoryData.words[randomIndex];
    const hint = categoryData.hints[randomIndex];

    wordProgress = Array(selectedWord.length).fill('_').join(' ');
    guessedLetters = [];
    lives = 6;
    hintUsed = false;

    document.getElementById("wordProgress").textContent = wordProgress;
    document.getElementById("lives").textContent = lives;
    document.getElementById("message").textContent = '';
    document.getElementById("gameArea").style.display = 'block';
    document.getElementById("categorySelect").style.display = 'none';
    document.getElementById("levelSelect").style.display = 'none';

    const guessInput = document.getElementById("guessInput");
    guessInput.disabled = false;
    guessInput.value = '';
    guessInput.focus();

    document.getElementById("submitGuess").disabled = false;
    document.getElementById("hintButton").disabled = false;
    document.getElementById("hint").style.display = 'none';
    document.getElementById("hint").textContent = hint;
    document.getElementById("tryagain").style.display = 'none';

    intervalId = startTimer(timeLeft => document.getElementById("timer").textContent = timeLeft);
}


export function makeGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';
    guessInput.focus();

    if (!guess.match(/[a-z]/) || guess.length !== 1) {
        guessInput.classList.add('shake');
        setTimeout(() => guessInput.classList.remove('shake'), 500);
        updateMessage("Please enter a valid letter.");
        return;
    }

    if (guessedLetters.includes(guess)) {
        guessInput.classList.add('shake');
        setTimeout(() => guessInput.classList.remove('shake'), 500);
        updateMessage("You already guessed that letter.");
        return;
    }

    guessedLetters.push(guess);

    if (selectedWord.includes(guess)) {
        updateWordProgress(guess);
        updateMessage("Good guess!", "success");

        // Add points for correct guess
        score += 10;
        document.querySelector('.stat-value:last-child').textContent = score;

        // Restart timer for correct guess
        clearInterval(intervalId);
        intervalId = startTimer(timeLeft => document.getElementById("timer").textContent = timeLeft);
    } else {
        lives--;
        document.getElementById("lives").textContent = lives;
        updateMessage(`Wrong guess! Lives remaining: ${lives}`, "danger");
        document.getElementById("gameArea").classList.add('shake');
        setTimeout(() => document.getElementById("gameArea").classList.remove('shake'), 500);
    }

    if (wordProgress.replace(/\s/g, '').indexOf('_') === -1) {
        winGame();
    } else if (lives === 0) {
        loseGame(`Game over! The word was: ${selectedWord}`);
    }
}


export function updateWordProgress(guess) {
    wordProgress = selectedWord.split('').map((letter) =>
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');

    const wordProgressElement = document.getElementById("wordProgress");
    wordProgressElement.textContent = wordProgress;
    wordProgressElement.classList.add('text-success');
    setTimeout(() => wordProgressElement.classList.remove('text-success'), 300);
}

export function winGame() {
    clearInterval(intervalId);
    score += 50 * (selectedDifficulty === 'hard' ? 3 : selectedDifficulty === 'medium' ? 2 : 1);
    document.querySelector('.stat-value:last-child').textContent = score;

    updateMessage(`Congratulations! You won! Score: ${score}`, "success");
    gameOver();
}

export function loseGame(message) {
    clearInterval(intervalId);
    updateMessage(message, "danger");
    document.getElementById("wordProgress").textContent = selectedWord;
    gameOver();
}


export function gameOver() {
    document.getElementById("submitGuess").disabled = true;
    document.getElementById("guessInput").disabled = true;
    document.getElementById("hintButton").disabled = true;
    document.getElementById("tryagain").style.display = 'block';

    gameHistory.push({
        word: selectedWord,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        won: lives > 0,
        score: score
    });
}


export function useHint() {
    if (hintUsed) {
        updateMessage("You've already used your hint!", "warning");
        return;
    }

    hintUsed = true;
    
    document.getElementById("hint").style.display = 'block';
}


function resetGame() {
    clearInterval(intervalId);

    document.getElementById("gameArea").style.display = 'none';
    document.getElementById("categorySelect").style.display = 'block';
    document.getElementById("levelSelect").style.display = 'block';
    document.getElementById("message").textContent = '';

    const guessInput = document.getElementById("guessInput");
    guessInput.value = '';
    guessInput.disabled = true;

    document.getElementById("submitGuess").disabled = true;
    document.getElementById("hintButton").disabled = true;
    document.getElementById("hint").style.display = 'none';
    document.getElementById("tryagain").style.display = 'none';

    const statsDisplay = document.querySelector('.game-stats');
    if (statsDisplay) {
        statsDisplay.remove();
    }

    selectedDifficulty = null;
    selectedCategory = null;
    selectedWord = null;
    wordProgress = null;
    guessedLetters = [];
    lives = 6;
    timer = null;
    score = 0;
    hintUsed = false;
    gameHistory = [];
}

