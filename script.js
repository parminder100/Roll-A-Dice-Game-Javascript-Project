const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const section0Element = document.querySelector(".section--0");
const section1Element = document.querySelector(".section--1");
const dice = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const currentScoreElement = document.querySelector(".current-score");
const leftCol = document.querySelector(".left-col");
const rightCol = document.querySelector(".right-col");
const newBtn = document.querySelector(".btn--new");


let score;
let currentScore;
let activePlayer;
let playing;

// Starting conditions
let initialize = () =>{
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    score = [0,0];
    dice.classList.add("hidden");
    currentScore = 0;
    activePlayer = 0
    playing = true;
    rightCol.classList.remove("player--active");
    leftCol.classList.add("player--active");
    section0Element.classList.remove("player--winner");
    section1Element.classList.remove("player--winner");
}
initialize();

let switchPlayer = () =>{
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    leftCol.classList.toggle("player--active");
    rightCol.classList.toggle("player--active");
}

// Rolling Dice Functionality
rollBtn.addEventListener("click", function(){
    if(playing){
        // 1. Generate a random dice roll
        let randomNumber = Math.trunc(Math.random()*6) + 1;

        // 2. Display dice
        dice.classList.remove("hidden");
        dice.src = (`./asset/img/dice-${randomNumber}.png`);

        // 3. Checked for rolled 1
        if(randomNumber !== 1){
            // Add dice to current score
            currentScore+=randomNumber;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
        else{
            // Switch to next player
            switchPlayer();
        }
    }
})


holdBtn.addEventListener("click", function(){
    if(playing){
        // 1 Add current score to active player score
        score[activePlayer]+= currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];

        // 2 Check if player score is >=100
        if(score[activePlayer] >= 100){
            // Finish the game
            playing = false;
            dice.classList.add("hidden");

            document.querySelector(`.section--${activePlayer}`).classList.add("player--winner");
            document.querySelector(".left-col").classList.remove("player--active");
        }
        else{
            // Switch to next player
            switchPlayer();
        }
    }
})

// Reset the game and play again
newBtn.addEventListener("click",initialize);