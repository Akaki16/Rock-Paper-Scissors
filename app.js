'use strict';

// UI variables
const btns = Array.from(document.querySelectorAll('button'));
const playerScoreTxt = document.querySelector('.player-score');
const computerScoreTxt = document.querySelector('.computer-score');
const modal = document.querySelector('.modal');
const playAgainBtn = document.querySelector('.play-again-btn');
const msg = document.getElementById('message');
const modalMessage = document.querySelector('.modal-message');
const playerScoreOnModal = document.querySelector('.p-score-on-modal');
const computerScoreOnModal = document.querySelector('.c-score-on-modal');

// set globals
let playerScore = 0;
let computerScore = 0;
let gameRound = 1;
let message;

let computerOptions = ['rock', 'paper', 'scissors'];

// get random option from (computerOptions) array
const getRandomOption = () => {
    return Math.floor(Math.random() * computerOptions.length);
}

const setMessage = (value) => {
    msg.innerHTML = value;
}

const incPlayerScore = () => {
    playerScore++;
    playerScoreTxt.textContent = playerScore;
}

const incComputerScore = () => {
    computerScore++;
    computerScoreTxt.textContent = computerScore;
}

const playerSelection = (playerChoice, computerChoice) => {
    if (playerChoice === 'rock' && computerChoice === 'paper') {
        message = 'You lose - paper beats* rock';
        incComputerScore();
        gameRound++;
        setMessage(`Round ${gameRound}: ${message}.`);
    } else if (playerChoice === 'paper' && computerChoice === 'rock') {
        message = 'You win - paper beats* rock';
        incPlayerScore();
        gameRound++;
        setMessage(`Round ${gameRound}: ${message}.`);
    } else if (playerChoice === 'rock' && computerChoice === 'scissors') {
        message = 'You win - rock beats* scissors';
        incPlayerScore();
        gameRound++;
        setMessage(`Round ${gameRound}: ${message}.`);
    } else if (playerChoice === 'paper' && computerChoice === 'scissors') {
        message = 'You lose - scissors beats* paper';
        incComputerScore();
        gameRound++;
        setMessage(`Round ${gameRound}: ${message}.`);
    } else if (playerChoice === 'scissors' && computerChoice === 'paper') {
        message = 'You win - scissors beats* paper';
        incPlayerScore();
        gameRound++;
        setMessage(`Round ${gameRound}: ${message}.`);
    } else if (playerChoice === 'scissors' && computerChoice === 'rock') {
        message = 'You lose - rock beats* scissors';
        incComputerScore();
        gameRound++;
        setMessage(`Round ${gameRound}: ${message}.`);
    } else {
        message = 'Tie';
        setMessage(`Round ${gameRound}: ${message}.`);
    }
}

const setModalMessage = (value, color) => {
    modalMessage.textContent = value;
    modalMessage.style.color = color;
}

const updateScoresOnModal = (score1, score2) => {
    playerScoreOnModal.textContent = `player: ${score1}`;
    computerScoreOnModal.textContent = `computer: ${score2}`;
}

const endGame = () => {
    if (gameRound >= 15) {
        // show modal
        modal.style.display = 'block';
    }

    if (playerScore > computerScore) {
        setModalMessage('You won the game!', 'rgb(73, 175, 144)');
        updateScoresOnModal(playerScore, computerScore);
    } else if (playerScore < computerScore) {
        setModalMessage('You lost the game!', 'rgb(129, 68, 68)');
        updateScoresOnModal(playerScore, computerScore);
    } else {
        setModalMessage('The game was tie!', 'rgb(87, 137, 179)');
        updateScoresOnModal(playerScore, computerScore);
    }
}

const restartGame = () => {
    let modal_message = '';
    playerScore = 0;
    computerScore = 0;
    gameRound = 0;
    message = 'messages will be shown here';
    playerScoreTxt.textContent = playerScore;
    computerScoreTxt.textContent = computerScore;
    playerScoreOnModal.textContent = playerScore;
    computerScoreOnModal.textContent = computerScore;
    modalMessage.textContent = modal_message;
    msg.textContent = message;
    modal.style.display = 'none';
}

// main function
const playGame = () => {

    btns.forEach((btn) => {
        btn.addEventListener('click', e => {
            let playerChoice = e.target.dataset.value;
            let compChoice = computerOptions[getRandomOption()];
            playerSelection(playerChoice, compChoice);
            // console.log(playerChoice);
            // console.log(compChoice);
            endGame();
        });
    });

    playAgainBtn.addEventListener('click', restartGame);

}

playGame();