import React from 'react';
import Status from './Status.jsx';
import GameBoard from './GameBoard.jsx';
import GamePiece from './GamePiece.jsx';

const EMPTY = 'EMPTY';
const PLAYER1 = true;
const PLAYER2 = false;
const WIN = true;
const DRAW = false;
const INPROGRESS = null;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.size = props.boardsize;
    this.board = this.createBoard(props.boardsize);
    this.state = {
      currentPlayer: PLAYER1,
      gameStatus: INPROGRESS,
      board: this.board
    };

    console.log('done constructing');
  }

  /* MODEL */
  switchPlayer() {
    var currentPlayer = !this.state.currentPlayer;

    this.setState({
      currentPlayer: currentPlayer
    });
  }

  updateStatus(row, col) {
    // Inputs: row and col where the recent piece dropped
    // Return WIN, DRAW, INPROGRESS
    var gameStatus = this.checkHorizontal(row) || this.checkVertical(col) 
                  || this.checkDiagonalMajor(row,col) || this.checkDiagonalMinor(row, col);
    if (gameStatus !== WIN) {
      if (this.countEmpty() === 0) {
        gameStatus = DRAW;
      }
    }
    this.setState({
      gameStatus: gameStatus
    });
    //this.setState(state => {gameStatus: gameStatus});
    return gameStatus;
  }

  countEmpty() {
    // Return number of empty cells
    var counter = 0;
    var board = this.state.board;
    
    board.forEach(row => {
      row.forEach(cell => {
        if (cell === EMPTY) {
          counter++;
        }
      });
    });

    return counter;
  }

  checkHorizontal(row) {
    var board = this.state.board;
    var counter = 0;
    
    for (var i = 0; i < board.length; i++) {
      if (board[row][i] === this.state.currentPlayer) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter === 4) {
        return WIN;
      }
    } 
    return INPROGRESS;
  }

  checkVertical(col) {
    var board = this.state.board;
    var currentPlayer = this.state.currentPlayer;
    var counter = 0;
    
    for (var i = 0; i < board.length; i++) {
      if (board[i][col] === currentPlayer) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter === 4) {
        return WIN;
      }
    }
    return INPROGRESS;
  }

  checkDiagonalMajor(row, col) {
    // Check diagonal from bottom left to top right
    // First check everything to bottom left of position
    // Then check everything from top right of position
    // If total consecutive pieces is 4, return WIN
    // Else return INPROGRESS
    var left = 0;
    var right = 0;
    var board = this.state.board;
    var currentPlayer = this.state.currentPlayer;
    var currRow = row;
    var currCol = col;
    
    while (currRow <= board.length - 1 && currCol >= 0 && board[currRow][currCol] === currentPlayer) {
      left++;
      currRow++;
      currCol--;
    }

    currRow = row - 1;
    currCol = col + 1;
    while (currCol <= board.length - 1 && currRow >= 0 && board[currRow][currCol] === currentPlayer) {
      right++;
      currRow--;
      currCol++;
    }
    if (left + right >= 4) { return WIN; }
    return INPROGRESS;
  }

  checkDiagonalMinor(row, col) {
    var left = 0;
    var right = 0;
    var board = this.state.board;
    var currentPlayer = this.state.currentPlayer;
    var currRow = row;
    var currCol = col;

    while (currRow >= 0 && currCol >= 0 && board[currRow][currCol] === currentPlayer) {
      left++;
      currRow--;
      currCol--;
    }

    currRow = row + 1;
    currCol = col + 1;

    while (currRow <= board.length - 1 && currCol <= board.length - 1 && board[currRow][currCol] === currentPlayer) {
      right++;
      currRow++;
      currCol++;
    }
    if (left + right >= 4) { return WIN; }
    return INPROGRESS;
  }

  updateBoard(row, col) {
    // Input: row, col
    // Return: nothing
    // Toggle the board at the indicated row and col with the current user
    var board = Object.assign(this.state.board);
    board[row][col] = this.state.currentPlayer;
    this.setState({
      board: board
    });
  }

  validateMove(col) {
    // Input: column
    // Return: bool. True if move is valid, false if not
    // Return true if column has empty cells available, false if full
    return this.state.board[0][col] === EMPTY;
  }
 
  /* VIEW */
  createBoard(size) {
    // Input: board size
    // Return: board in 2D array
    // We will create a square board using a 2d array
    // Each element in the array will contain a React component - GamePiece
    var board = [];
    for (var i = 0; i < size; i++) {
      var row = [];
      for (var j = 0; j < size; j++) {
        row.push(EMPTY);
      }
      board.push(row);
    }
    return board;
  }

  displayPlayer() {

  }

  displayStatus() {

  }

  /* CONTROLLER */
  moveHandler(col) {
    // Inputs: column of piece insertion
    console.log(`Column ${col} was clicked!`);
    if (this.validateMove(col)) {
      var row = 0;
      while (this.state.board[row + 1] && this.state.board[row + 1][col] === EMPTY && row < this.state.board.length) {
        row++;
        
      }
  
      this.updateBoard(row, col);
      this.updateStatus(row, col);
      
      if (this.state.gameStatus === INPROGRESS) {
        this.switchPlayer();
      }
      
    }
  }

  render() {
    return (
      <div>
        <h1>CONNECT 4</h1>
        <Status currentPlayer={this.state.currentPlayer} gameStatus={this.state.gameStatus}/>
        <GameBoard currentPlayer={this.state.currentPlayer} onClick={this.moveHandler.bind(this)} board={this.state.board} size={this.state.size} />
      </div>
    );
  }
}

export default App;