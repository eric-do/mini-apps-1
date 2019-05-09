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
                  <GamePiece onClick={props.onClick} x={hindex} y={vindex}/>
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