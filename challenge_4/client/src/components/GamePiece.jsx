import React from 'react';

var GamePiece = (props) => ( 
  <td className="game-piece" onClick={() => props.onClick(props.x, props.y)}></td>
);


export default GamePiece;