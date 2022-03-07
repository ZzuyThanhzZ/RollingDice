'use strict';

//Selector elements

const diceEl = document.querySelector('.dice');

const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.querySelector('#score--1');
const currentScoreEl0 = document.querySelector('#current--0');
const currentScoreEl1 = document.querySelector('#current--1');

const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');


const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//Initial value
diceEl.classList.add('hidden');
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
currentScoreEl0.textContent = 0;
currentScoreEl1.textContent = 0;

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
    currentScoreEl0.textContent = 0;
    currentScoreEl1.textContent = 0;

    diceEl.classList.add('hidden');
    playerEl0.classList.remove('player--winner');
    playerEl1.classList.remove('player--winner');
    playerEl0.classList.add('player--active');
    playerEl1.classList.remove('player--active');
}

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerEl0.classList.toggle('player--active');
    playerEl1.classList.toggle('player--active');

}

//Rolling dice
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        //Show the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //Check for roll 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

//Hold the score
btnHold.addEventListener('click', function () {
    if (playing) {
        //Add current score to the total score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        //Check if player's score >= 100
        if (scores[activePlayer] >= 100) {
            playing = false;    //End the game. Found the winner
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
})

//Create new game
btnNew.addEventListener('click', init);