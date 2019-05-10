import React from 'react';
import GamePiece from './GamePiece.jsx';

const GameBoard = (props) =>  (
    <div>
      <table>
      <tbody>
      {
        props.board.map((row, hindex) => {
          return (
            <tr> 
              {
                row.map((col, vindex) => (
                  <GamePiece currentPlayer={props.currentPlayer} onClick={props.onClick} val={props.board[hindex][vindex]}  x={hindex} y={vindex}/>
                ))
              }
            </tr>
          )
        })
      }
      </tbody>
      </table>
    </div>
  );


export default GameBoard;