const rulesBtn = document.querySelector('.rules-btn');
const rulesContent = document.querySelector('.rules-content');
const closeRulesBtn = document.querySelector('.close-rules');
const resultText = document.getElementById('result-text');
const choices = document.querySelectorAll('.choice');
const playerScoreElement = document.querySelector('.player-score');
const computerScoreElement = document.querySelector('.computer-score');

// Track scores
let playerScore = 0;
let computerScore = 0;

// Show or hide rules
rulesBtn.addEventListener('click', () => {
    rulesContent.classList.toggle('show');
});

closeRulesBtn.addEventListener('click', () => {
    rulesContent.classList.remove('show');
});

// Function to show the result in the result section
function showResult(result) {
    resultText.textContent = result;
}

// Function to update the scores on screen
function updateScores() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

// Game logic: handle player's choice and determine result
choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        const playerChoice = e.target.classList[1];
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);
        showResult(result);

        // Update score based on result
        if (result === "You Win!") {
            playerScore++;
            updateScores();
            // Show the win screen
            setTimeout(showWinScreen, 1000); // Delay to show the win screen
        } else if (result === "You Lose!") {
            computerScore++;
            updateScores();
        }
    });
});

// Simulate random computer choice
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    return options[Math.floor(Math.random() * options.length)];
}

// Determine the game result
function getResult(player, computer) {
    if (player === computer) {
        return "It's a Tie!";
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    ) {
        return "You Win!";
    } else {
        return "You Lose!";
    }
}

// Function to show the win screen
function showWinScreen() {
    // Replace the result text with a win message
    resultText.textContent = "Hooray! You Win!";
    
    // Create a Play Again button
    const playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.classList.add('play-again-btn');
    
    // Append the button to the result display
    resultText.parentElement.appendChild(playAgainBtn);

    // Add event listener to the play again button
    playAgainBtn.addEventListener('click', continuePlaying);
}

// Function to continue playing the game
function continuePlaying() {
    // Reset the result text to the default message
    resultText.textContent = "Make your move!";
    
    // Remove the Play Again button
    const playAgainBtn = document.querySelector('.play-again-btn');
    if (playAgainBtn) {
        playAgainBtn.remove();
    }
}
