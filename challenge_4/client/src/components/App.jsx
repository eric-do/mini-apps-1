import React from 'react';
import Status from './Status.jsx';
import GameBoard from './GameBoard.jsx';
import GamePiece from './GamePiece.jsx';

const EMPTY = null;
const PLAYER1 = true;
const PLAYER2 = false;
const WIN = 0;
const DRAW = 1;
const INPROGRESS = 2;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.size = props.boardsize;
    this.board = this.createBoard(props.boardsize);
    this.state = {
      currentUser: PLAYER1,
      gameStatus: INPROGRESS,
      board: this.board
    };

    console.log('done constructing');
  }

  /* MODEL */
  switchUser() {
    var currentUser = !this.state.currentUser;

    this.setState({
      currentUser: currentUser
    });
  }

  updateStatus(row, col) {
    // Inputs: row and col where the recent piece dropped
    // Return WIN, DRAW, INPROGRESS
  }

  updateBoard(col) {
    // Input: col
    // Return: nothing
    // Drop the square to the available row in the respective column

  }

  validateMove(col) {
    // Input: column
    // Return: bool. True if move is valid, false if not
    // Return true if column has empty cells available, false if full
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

  displayUser() {

  }

  displayStatus() {

  }

  /* CONTROLLER */
  moveHandler(x, y) {
    console.log(`Square ${x}, ${y} was clicked!`);
  }

  render() {
    return (
      <div>
        <h1>CONNECT 4</h1>
        <Status />
        <GameBoard onClick={this.moveHandler.bind(this)} board={this.state.board} size={this.state.size} />
      </div>
    );
  }
}

export default App;