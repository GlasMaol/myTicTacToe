"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

initGlobalObject();

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner 
    oGameData.gameField = ['', '', '', '', '', '', '', '', ''];

    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
    //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
    //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
    //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
    //oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //Antalet sekunder för timerfunktionen
    oGameData.seconds = 5;

    //Timerns ID
    oGameData.timerId = null;

    //Från start är timern inaktiverad
    oGameData.timerEnabled = false;

    //Referens till element för felmeddelanden
    oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() {
    //Kontrollerar om "X" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 1
    if (checkWinner('X')) {
        return 1;
    }
    //Kontrollerar om "O" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 2
    if (checkWinner('O')) {
        return 2;
    }
    //Kontrollerar om spelet är oavgjort, returnerar isåfall 3
    if (checkForDraw()) {
        return 3;
    }
    //Annars returneras 0, och spelet fortlöper
    else {
        return 0;
    }
}

//Skapa en array av alla vinnande kombinationer.
//Skapa en flagga för isWinner.
//Loopa igenom alla winningCombos.
//I varje loop kontrollerar ni om alla platser i oGameData.GameField 
//som motsvarar nuvarande combo innehåller playerIn. Om sant, ändra värdet på flaggan.
//Returnera flaggan isWinner
function checkWinner(playerIn) {
    const winningCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    let isWinner = false;

    for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        let a = oGameData.gameField[combo[0] - 1];
        let b = oGameData.gameField[combo[1] - 1];
        let c = oGameData.gameField[combo[2] - 1];

        if (playerIn === a && playerIn === b && playerIn === c) {
            isWinner = true;
            break;
        }
    }

    return isWinner;
}

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    if (oGameData.gameField.includes('')) {
        return false;
    } else {
        return true;
    }
}

//Funktion som förbereder spelet inför start

function prepGame() {
    let gameAreaRef = document.querySelector('#gameArea')
    gameAreaRef.classList.toggle('d-none');

    let btnRef = document.querySelector('.btn');
    btnRef.addEventListener('click', initiateGame)
}
prepGame();


function validateForm() {

}

function initiateGame() {

    /*let playerColorInput1 = document.querySelector('#color1'); // Corrected variable name
    let playerColorInput2 = document.querySelector('#color2'); // Corrected variable name
    let playerSymbolInput = document.querySelector('#nick1');
    let playerNicknameInput = document.querySelector('#nick2');

    playerColorInput1.classList.add('d-none'); // Hide color input for player 1
    playerColorInput2.classList.add('d-none'); // Hide color input for player 2
    playerSymbolInput.classList.add('d-none'); // Hide symbol input for player 1
    playerNicknameInput.classList.add('d-none');

    oGameData.gameField = ['', '', '', '', '', '', '', '', ''];//new
    oGameData.currentPlayer = '';//new*/

    let formRef = document.querySelector('#theForm')
    formRef.classList.add('d-none');

    let gameAreaRef = document.querySelector('#gameArea');
    gameAreaRef.classList.remove('d-none');

    /*let btnRef = document.querySelector('.btn');//new
    btnRef.classList.add('d-none');//new*/

    /*let errorMsgRef = document.querySelector('#errorMsg');
    errorMsgRef.innerHTML = '';*/

    document.querySelector('p').classList.add('d-none');

    oGameData.nickNamePlayerOne = document.querySelector('#nick1').value;
    oGameData.nickNamePlayerTwo = document.querySelector('#nick2').value;
    oGameData.colorPlayerOne = document.querySelector('#color1').value;
    oGameData.colorPlayerTwo = document.querySelector('#color2').value;

    let tdElementsRef = document.querySelectorAll('td');
    tdElementsRef.forEach(td => {
        td.textContent = '';
        td.style.backgroundColor = ''; //new
    })

    let playerChar = null;
    let playerName = null;

    let randomPlayer = Math.random();
    if (randomPlayer < 0.5) {
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    } else {
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }

    document.querySelector('h1').textContent = 'Aktuell spelare är ' + playerName;

    let tableListenerRef = document.querySelector('.ml-auto');
    tableListenerRef.addEventListener('click', executeMove);

    // Spela igen fix. ! Det gör du genom att återigen anropa initiateGame() om spelaren trycker på knappen. I din initateGame() så läser du redan in alla td:s och rensar dem
    //add d-none to td, playerColor and on click på starta spelet så aktiveras dessa.
}



/*document.querySelector('.jumbotron h1').textContent = 'Aktuell spelare är ' + playerName';*/

/*console.log('Player Character:', playerChar);
console.log('Player Name:', playerName);
console.log('Current Player:', oGameData.currentPlayer);*/

/*console.log(oGameData.nickNamePlayerOne);
console.log(oGameData.nickNamePlayerTwo);
console.log(oGameData.colorPlayerOne);
console.log(oGameData.colorPlayerTwo);*/

//console.log('it works!'); //anropoar initiateGame i prepGame för att kolla om knappen trycks

function executeMove(event) {
    if (event.target.tagName.toLowerCase() !== 'td') {
        return; // Do nothing if the click did not happen on a td
    }
    const clickedCell = event.target;
    if (clickedCell.textContent !== '') {
        return;//checks whether the clicked cell is already occupied and exits if marked.
    }

    const position = parseInt(clickedCell.getAttribute('data-id'));//retrieves the value of the data-id attribute from the clicked cell. converted to an integer using parseInt because getAttribute returns a string.

    oGameData.gameField[position] = oGameData.currentPlayer;
    clickedCell.textContent = oGameData.currentPlayer;

    changePlayer(position);//position måste vara här för att changePlayer ska fungera.

    const result = checkForGameOver();
    if (result !== 0) {
        gameOver(result);
    }
}

function startGame() {

}

function changePlayer(position) {
    console.log('clicked position', position);
    const currentPlayerSymbol = oGameData.currentPlayer;// Kontrollera vem den nuvarande spelaren är

    const currentPlayerColor = (currentPlayerSymbol === oGameData.playerOne) ? oGameData.colorPlayerOne : oGameData.colorPlayerTwo;// Hämta färgen för den nuvarande spelaren
    const clickedCell = document.querySelector(`[data-id='${position}']`);

    clickedCell.style.backgroundColor = currentPlayerColor;
    clickedCell.textContent = currentPlayerSymbol;
    oGameData.currentPlayer = (currentPlayerSymbol === oGameData.playerOne) ? oGameData.playerTwo : oGameData.playerOne;

    if (oGameData.currentPlayer === oGameData.playerOne) {
        document.querySelector('h1').textContent = 'Aktuell spelare är ' + oGameData.nickNamePlayerOne;
    } else {
        document.querySelector('h1').textContent = 'Aktuell spelare är ' + oGameData.nickNamePlayerTwo;
    }
}

function timer() {

}

/*function gameOver(result) {
    //Remove click listener on the table
    let tableListenerRef = document.querySelector('.ml-auto');
    tableListenerRef.removeEventListener('click', executeMove);

    //Remove the "d-none" class from the form
    document.querySelector('#theForm').classList.remove('d-none');
    //Add the "d-none" class to the game area
    document.querySelector('#gameArea').classList.add('d-none');

    //Determine the winner and display a message
    let winnerMessageRef = '';
    if (result === 1) {
        winnerMessageRef = `${oGameData.nickNamePlayerOne} (Spelare 1) har vunnit!`
    } else if (result === 2) {
        winnerMessageRef = `${oGameData.nickNamePlayerTwo} (Spelare 2) har vunnit!`
    } else if (result === 3) {
        winnerMessageRef = 'Det blev oavgjort!'
    }

    //Display the winner message in the jumbotron
    document.querySelector('.jumbotron').innerHTML = '<h1>' + winnerMessage + '</h1><p>Spela igen?</p>';

    oGameData.gameField = ['', '', '', '', '', '', '', '', ''];
    oGameData.currentPlayer = '';

    document.querySelectorAll('td').forEach(cell => cell.innerHTML = cell.style.backgroundColor = '');
}*/

//code från Jonas
function gameOver(result) {
    let winnerMessage = '';

    let tableListenerRef = document.querySelector('.ml-auto');
    tableListenerRef.removeEventListener('click', executeMove);

    document.querySelector('#theForm').classList.remove('d-none');
    document.querySelector('#gameArea').classList.add('d-none');

    if (result === 1) {
        winnerMessage = oGameData.resultMessage = oGameData.nickNamePlayerOne + ' har vunnit!';
    } else if (result === 2) {
        winnerMessage = oGameData.resultMessage = oGameData.nickNamePlayerTwo + ' har vunnit!';
    } else if (result === 3) {
        winnerMessage = 'Spelet slutade oavgjort!';
    }

    document.querySelector('.jumbotron').innerHTML = '<h1>' + winnerMessage + '</h1><p>Spela igen?</p>';

    // Nollställ endast det som behövs för att starta om spelet
    oGameData.gameField = ['', '', '', '', '', '', '', '', ''];
    oGameData.currentPlayer = ''; // Återställ aktuell spelare

    // Töm innehållet av varje cell i spelplanen           // Återställ färg om du har satt en
    document.querySelectorAll('td').forEach(cell => cell.innerHTML = cell.style.backgroundColor = '');
}