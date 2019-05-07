var results = [];
currentPlayer = 'x';
const X = 'x';
const O = 'o';
const EMPTY = '----';

class Game {
  constructor(n) {
    this.results = [];
    this.currentPlayer = X;
    this.buildTable(n);
    this.addResetListener();
    this.displayStatus(`${this.currentPlayer}'s turn`);
  }

  displayStatus(string) {
    var status = document.getElementById('status-ticker');
    status.textContent = string;
  }

  buildTable(n) {
    var table = document.getElementById("game-table");
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
    for (var i = 0; i < n; i++) {
      var row = document.createElement("tr");
      var rowArr = [];
      for (var j = 0; j < n; j++) {
        var cell = document.createElement("td");
        var button = this.createButton();
        rowArr.push(button);
        cell.append(button);
        row.append(cell);
      }
      this.results.push(rowArr);
      table.append(row);
    }
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === X ? O : X;
    this.displayStatus(`${this.currentPlayer}'s turn`);
  }

  addResetListener() {
    var reset = document.getElementById("reset");
    reset.addEventListener("click", () => {
      this.currentPlayer = X;
      this.displayStatus(`${this.currentPlayer}'s turn`);
      this.results.forEach(row => {
        row.forEach(cell => {
          cell.textContent = "----";
          cell.disabled = false;
        });
      });
    });
  }

  createButton() {
    // Input: none
    // Returns: a button  
    // Create a button element
    // Add event listener to the button
    // Return button
    var button = document.createElement("button");
    button.class = "game-button";
    button.setAttribute("style", "height: 50px; width: 50px")
    button.addEventListener("click", () => {
      button.textContent = this.currentPlayer;
      button.disabled = true;
      if (this.checkResults(this.currentPlayer) === true){
        this.declareWinner(this.currentPlayer);
      } else if (this.isDraw() === true) {
        this.declareDraw();
      } else {
        this.switchPlayer();
      }
    });
    button.textContent = "----";
    return button;
  }

  declareWinner(player) {
    this.results.forEach(row => {
      row.forEach(button => {
        button.disabled = true;
      });  
    });
    console.log(`${player} is the winner!`);
    this.displayStatus(`${player} is the winner!`);
  }
  
  declareDraw() {
    this.results.forEach(row => {
      row.forEach(button => {
        button.disabled = true;
      });  
    });
    console.log(`Game is a draw!`);
    this.displayStatus(`Game is a draw!`);
  }

  checkResults(player) {
    // Input: player
    // Check rows for player victory
    // Check columns for player victory
    // Check diagonals for player victory
    if (this.checkRows(player) === true) {
      return true;
    }
  
    if (this.checkCols(player) === true) {
      return true;
    }
  
    if (this.checkPrimaryDiagonal(player) === true) {
      return true;
    }
  
    if (this.checkSecondaryDiagonal(player) === true) {
      return true;
    }
  
    return false;
  }

  checkRows(char) {
    // Input: X or O as a string
    // Return true/false for winner
    // Check rows to see if row is all the same value
    // Check columns to see if any column as all the same values
    // Check diagonals to see if any have the same values
    var winner = false;
    // Check rows
    this.results.forEach(row => {
      // If the entire row is the same char, winner is found
      var rowResult = row.filter(cell => {
        return cell.textContent === char;
      });
      if (rowResult.length === row.length) {
        winner = true;
      }
    });
    return winner;
  }

  checkCols(char) {

    // Check columns
    var winner = true;
    for (var i = 0; i < this.results.length; i++) {
      winner = true;
      for (var j = 0; j < this.results.length; j++) {
        if (this.results[j][i].textContent !== char) {
          winner = false;
        }
      }
      if (winner === true) {
        return winner;
      }
    }
  
    return winner;
  }
  
  checkPrimaryDiagonal(char) {
  
    var winner = true;
    for (var i = 0; i < this.results.length; i++) {
      if (this.results[i][i].textContent !== char) {
        winner = false;
      }
    }
    return winner;
  }
  
  checkSecondaryDiagonal(char) {
    var winner = true;
    var col = this.results.length - 1;
    
    for (var i = 0; i < this.results.length; i++) {
      if (this.results[i][col].textContent !== char) {
        winner = false;
      }
      col--;
    }
    return winner;
  }
  
  isDraw() {
    var emptyCells = this.results.length * this.results.length;;
    this.results.forEach(row => {
      row.forEach(cell => {
        if (cell.textContent !== EMPTY) {
          emptyCells--;
        }
      });
    });
    return emptyCells === 0;
  }
}

var game = new Game(3);

console.log(`I'm working here!`);