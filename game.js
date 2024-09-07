let randomNumber = Math.floor(Math.random() * 100) + 1; // Adjusted to ensure integer range

const submit = document.querySelector('#sub');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultPress');
const lowOrHi = document.querySelector('.lowOrHi');

let previousGuesses = [];
let numGuesses = 1;

submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
});

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1!');
    } else if (guess > 100) {
        alert('Please enter a number less than 100!');
    } else {
        previousGuesses.push(guess);
        if (numGuesses === 10) { // Max attempts reached
            displayGuesses(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        } else {
            displayGuesses(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed correctly!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Too low! Try again!`);
    } else if (guess > randomNumber) {
        displayMessage(`Too high! Try again!`);
    }
}

function displayGuesses(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `; // Added space between guesses
    numGuesses++;
    remaining.innerHTML = `${10 - numGuesses}`; // Display remaining attempts
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h1>${message}</h1>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    if (!document.querySelector('#newGame')) {
        const newGameButton = document.createElement('button');
        newGameButton.id = 'newGame';
        newGameButton.textContent = 'Start New Game';
        startOver.appendChild(newGameButton);

        newGameButton.addEventListener('click', function () {
            randomNumber = Math.floor(Math.random() * 100) + 1;
            previousGuesses = [];
            numGuesses = 1;
            guessSlot.innerHTML = '';
            lowOrHi.innerHTML = '';
            remaining.innerHTML = `10`; // Reset attempts
            userInput.removeAttribute('disabled');
            startOver.removeChild(newGameButton);
        });
    }
}
