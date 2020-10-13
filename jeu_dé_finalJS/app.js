
/*
REGLES DU JEU:

- Le jeu a 2 joueurs, jouant à tour de rôle
- A chaque round, un joueur lance un dé autant de fois qu'il le souhaite. Chaque résultat est ajouté à son score de la round
- MAIS, si le joueur obtient un 1 (dé montre 1), tout son score ROND est perdu. Après ça, c'est au tour du joueur suivant
- Le joueur peut choisir de «HOLD», ce qui signifie que son score ROUND est ajouté à son score GLOBAL. Après ça, c'est au tour du joueur suivant
- Le premier joueur à atteindre 50 points sur le score GLOBAL remporte la partie

*/

var scores, roundScore, activePlayer, previousDice, scoreLimitInput;

newGame();

function rollDice(){
    scoreLimitInput = parseInt(document.getElementById("scorelimit").value);
    console.log(scoreLimitInput);
    var dice = getDiceValue();
    
    if ( (dice === 1) || ((dice === previousDice) && (dice === 6)) ) {
        document.getElementById("score-" + activePlayer).textContent = 0;
        scores[activePlayer] = 0;
        switchPlayer();
    } else {
        roundScore += dice;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
        previousDice = dice;
    }
    verifyExistWinner();
}

function verifyExistWinner() {
    if ((roundScore + scores[activePlayer]) >= scoreLimitInput) {
        document.getElementById("name-" + activePlayer).textContent = "Winner !";
        document.querySelector(".btn-roll").disabled = true;
        document.querySelector(".btn-hold").disabled = true;
        document.getElementById("current-" + activePlayer).textContent = 0;
        document.getElementById("score-" + activePlayer).textContent = roundScore + scores[activePlayer];
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        roundScore = 0;
    }
}

function getDiceValue() {
    var dice = Math.floor(Math.random() * 6 + 1);
    document.querySelector(".dice").style.display = "block";
    document.querySelector(".dice").src = "dice-" + dice + ".png";
    if (previousDice != null) {
        document.querySelector(".previousdice").style.display = "block";
        document.querySelector(".previousdice").src="dice-" + previousDice + ".png";
    }
    return dice;
}

function holdScore(){
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    switchPlayer();
}

function newGame() {
    scoreLimitInput = parseInt(document.getElementById("scorelimit").textContent);
    document.querySelector(".btn-roll").disabled = false;
    document.querySelector(".btn-hold").disabled = false;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".previousdice").style.display = "none";
    activePlayer = 0;
    roundScore = 0;
    scores = [0,0];
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    previousDice = undefined;
}

function switchPlayer() {
    scoreLimitInput = parseInt(document.getElementById("scorelimit").textContent);
    document.querySelector('#current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector(".previousdice").style.display = "none";
    previousDice = undefined;
}