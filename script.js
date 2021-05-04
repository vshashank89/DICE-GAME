'use strict';


// Selecting the elements
const player0El = document.querySelector('.player--0'); //IMPORTANT: We need to use dot('.player--0') to select classes in document.querySelector 
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
// Selecting the elements by Ids  using 'getElementById'
const score1El = document.getElementById('score--1'); // Here we just pass the name of the id without selecting it(#) , a bit faster than querySelector()
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


let scores , currentScore , activePlayer , playingState ; // Just declarations , these variables live outside here , thus can be accessible everywhere in the code and inside any function.


// Initial Conditions

const initConditions = function() {
    // We just reassign these variables , but the variables are declared outside the function.

    scores = [0 , 0];// Why we naed the the classes as 0 and 1 ? here is why we named because we store the final scores in array and indexing of array is zero-based so we stored classes as 0 and 1.

    currentScore = 0;

    activePlayer = 0;// This variable keeps track of the active player and we can switch this value b/w 0 and 1.

    playingState = true; // This variable tells the state of the game whether playing or not . Initally we set it true. 
    // Once a player wins , we're NOT playing the game , so we change it false.
    // This is kind of a state variable tells us the condition of the system.
    

    // Conditions
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent=0;
    current1El.textContent=0;

    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner'); // Only one player can be winner , but we can tell Javascript to remove winner class on both player elements , even if its present or not.

    player1El.classList.remove(`player--active`);
    player0El.classList.add(`player--active`);
}

initConditions(); // THIS FUNCTION SHOULD BE CALLED.


// We simply define this function outside , because we need to use it multiple times , instead of copying it.
const switchPlayer = function () {
    // If the dice is 1 , SWITCH THE PLAYER

        // BEFORE SWICTHING 
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        //document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        // SWITCHING PLAYER
        activePlayer = activePlayer===0 ? 1 : 0;   // This is how we switch the value of activePlayer.

        // AFTER SWITCHING
        //document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

        // TO CHANGE THE BACKGROUND OF ACTIVE PLAYER. we use toggle() method on the classList() property.
        // toggle will remove the class if it is present on th element , or it will add if it's not.
       
        // We start with 'player--active' class on only one element , so toggling on both elements ensures that its only on one of the elements at once.
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
};



// Rolling the dice Funtionality
btnRoll.addEventListener('click' , function(){
    // We need all this code to execute on clicking btnRoll , only if we're playing i.e  only if playingState is true.
    if(playingState){
        // 1. Generate a random dice roll
        const dice = Math.trunc(Math.random()*6) + 1;
        //console.log(dice);

        //2. Display the dice roll
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`; // So to display the dice roll according to the generated random number.
        // So we can manipulate the  element's(img here)  attribute (src) using Javascript.


        // 3. Check for rolled dice 
        if(dice !== 1){
            // if the dice is not 1, add dice to currentScore , and display to current-score element 
            currentScore+= dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;// So here we dynamically change the current score for both players.


            //current0El.textContent = currentScore ; // CHANGE LATER 
        } else {
            // Instead of repeating the same code. 
            switchPlayer(); // We need to call the switchPlayer() function.
        }
    }
})





// HOLDING THE CURRENT SCORE
btnHold.addEventListener('click',function() {

    if(playingState) {
        // 1. Add current score to active player's score and displaying it in the DOM
        scores[activePlayer]+=currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if the active player's score is >= 100
        if(scores[activePlayer] >= 100){

            // If true , FINISH THE GAME
            playingState = false; // The game is over , we are NOT playing.
            
            diceEl.classList.add('hidden'); // When the game finishes , the dice should be hidden.

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`); // FIRST we need to remove the player-active class( i.e. white background)


            document.getElementById(`current--${activePlayer}`).textContent = 0;


        } else {
            // else , SWITCH THE ACTIVE PLAYER
            switchPlayer();
        }
    }
});



// RESETTING THE GAME
btnNew.addEventListener('click' , initConditions); // Just passing the initConditions function , it is the Javascript that calls the function when the new button is clicked.


/* MY SOLUTION FOR RESET BUTTON (NEW GAME) : 
// 
btnNew.addEventListener('click' , function(){
    1.Set all the scores to zero and displaying all the scores 0.
    scores[0] = 0;
    scores[1] = 0;
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];

    currentScore = 0;
    current0El.textContent = currentScore;
    current1El.textContent = currentScore;

    console.log(activePlayer);
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);

    // 2. Removing the WINNER CLASS IF present
    if(!playingState) {
        // i.e if we're not playing the the game , i.e the game is finished and a player has won then ,
        playingState = true;
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    }

    //3. Setting Player 0 as active player.
    activePlayer=0;
    document.querySelector(`.player--${activePlayer}`).classList.add(`player--active`);

    //4. Make the DICE HIDDEN
    diceEl.classList.add('hidden');
}
*/