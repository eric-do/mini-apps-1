import React from 'react';

const Status = (props) =>  (
  <div>
    <p>{props.currentPlayer ? `Player 1's turn` : `Player 2's turn`}</p>
  </div>
);

export default Status;