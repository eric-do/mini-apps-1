var results = [];
currentPlayer = 'x';
const X = 'x';
const O = 'o';
const EMPTY = '----';

/* View  */
var init = (n) => {
  // Input: N as the number of rows
  // Return: nothing
  // This function can initialize as well as reset a table
  // Find table
  // Remove all child alements
  // Loop N times
  //   Create a new TR
  //   Loop N times
  //     Append a TD with button to the TR
  //   Append TR to table
  var table = document.getElementById("game-table");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  currentPlayer = X;
  for (var i = 0; i < n; i++) {
    var row = document.createElement("tr");
    var rowArr = [];
    for (var j = 0; j < n; j++) {
      var cell = document.createElement("td");
      var button = createButton();
      rowArr.push(button);
      cell.append(button);
      row.append(cell);
    }
    results.push(rowArr);
    table.append(row);
  }
  var reset = document.getElementById("reset");
  reset.addEventListener("click", resetButtons);
}

function resetButtons() {
  results.forEach(row => {
    row.forEach(cell => {
      cell.textContent = "----";
      cell.disabled = false;
    });
  });
}

function createButton() {
  // Input: none
  // Returns: a button
  // Create a button element
  // Add event listener to the button
  // Return button
  var button = document.createElement("button");
  button.class = "game-button";
  button.setAttribute("style", "height: 50px; width: 50px")
  button.addEventListener("click", buttonClick);
  button.textContent = "----";
  return button;
}

function buttonClick() {
  this.textContent = currentPlayer;
  this.disabled = true;
  if (checkResults(currentPlayer) === true){
    declareWinner(currentPlayer);
  } else if (isDraw() === true) {
    declareDraw();
  } else {
    currentPlayer = currentPlayer === X ? O : X;
  }
}

function declareWinner(player) {
  results.forEach(row => {
    row.forEach(button => {
      button.disabled = true;
    });  
  });
  console.log(`${player} is the winner!`);
}

function declareDraw() {
  results.forEach(row => {
    row.forEach(button => {
      button.disabled = true;
    });  
  });
  console.log(`Game is a draw!`);
}

function checkResults(player) {
  // Input: player
  // Check rows for player victory
  // Check columns for player victory
  // Check diagonals for player victory
  if (checkRows(player) === true) {
    return true;
  }

  if (checkCols(player) === true) {
    return true;
  }

  if (checkPrimaryDiagonal(player) === true) {
    return true;
  }

  if (checkSecondaryDiagonal(player) === true) {
    return true;
  }

  return false;
 }

function checkRows(char) {
  // Input: X or O as a string
  // Return true/false for winner
  // Check rows to see if row is all the same value
  // Check columns to see if any column as all the same values
  // Check diagonals to see if any have the same values
  var winner = false;
  // Check rows
  results.forEach(row => {
    // If the entire row is the same char, winner is found
    rowResult = row.filter(cell => {
      return cell.textContent === char;
    });
    if (rowResult.length === row.length) {
      winner = true;
    }
  });
  return winner;
}



function checkCols(char) {

  // Check columns
  var winner = true;
  for (var i = 0; i < results.length; i++) {
    winner = true;
    for (var j = 0; j < results.length; j++) {
      if (results[j][i].textContent !== char) {
        winner = false;
      }
    }
    if (winner === true) {
      return winner;
    }
  }

  return winner;
}

function checkPrimaryDiagonal(char) {

  var winner = true;
  for (var i = 0; i < results.length; i++) {
    if (results[i][i].textContent !== char) {
      winner = false;
    }
  }
  return winner;
}

function checkSecondaryDiagonal(char) {

  var winner = true;
  var col = results.length - 1;
  
  for (var i = 0; i < results.length; i++) {
    if (results[i][col].textContent !== char) {
      winner = false;
    }
    col--;
  }
  return winner;
}

function isDraw() {
  var emptyCells = results.length * results.length;;
  results.forEach(row => {
    row.forEach(cell => {
      if (cell.textConent === EMPTY) {
        emptyCells--;
      }
    });
  });
  return emptyCells === 0;
}

init(3);

console.log(`I'm working here!`);