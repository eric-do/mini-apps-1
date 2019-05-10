import React from 'react';

var GamePiece = (props) => {
  var style = props.val === 'EMPTY' ? {background: "lightgray"} :
              props.val === true ? {background: "green"} : {background:"red"};
  return (<td style={style} className="game-piece" onClick={() => props.onClick(props.y)}></td>);
};


export default GamePiece;