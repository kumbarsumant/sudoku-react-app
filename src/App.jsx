import './App.scss';
import Board from './components/Board/Board';
import NumberPad from './components/NumberPad/NumberPad';
import BoardController from './components/BoardController/BoardController';
import { useState } from 'react';
import { ACTIONS } from './constants';
import solveSudokuPuzzle from './solver';

const App = () => {
  const generateEmptyBoard = () => {
    return Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
  };

  const [board, setBoard] = useState(generateEmptyBoard);

  const onActionButtonClick = (action) => {
    if (action === ACTIONS.SOLVE) {
      setBoard(solveSudokuPuzzle(board));
    } else if (action === ACTIONS.RESET) {
      setBoard(generateEmptyBoard());
    }
  };

  return (
    <div className="app">
      <h1 className="heading">Sudoku Solver</h1>
      <div className="app__container">
        <div className="app__board">
          <Board board={board} />
          <div className="app__board-actions">
            <BoardController onClick={onActionButtonClick} />
            <NumberPad />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
