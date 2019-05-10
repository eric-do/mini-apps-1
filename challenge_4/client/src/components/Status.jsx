import React from 'react';

const Status = (props) =>  {
  var player = props.currentPlayer ? 'Player 1' : 'Player 2';
  return (
    <div>
      <p>{props.currentPlayer ? `Player 1's turn` : `Player 2's turn`}</p>
      <p>{props.gameStatus ? `${player} wins!` : props.gameStatus === false ? `Draw game` : `Game is in progress` }</p>
    </div>
  )
};

export default Status;