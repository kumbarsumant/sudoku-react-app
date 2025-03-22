import './App.scss';
import Board from './components/Board/Board';
import NumberPad from './components/NumberPad/NumberPad';
import BoardController from './components/BoardController/BoardController';
import { useEffect, useRef, useState } from 'react';
import { ACTIONS } from './constants';
import SudokuSolver from './solver';
('./solver');

const App = () => {
  const sudokuRef = useRef(null);
  const [board, setBoard] = useState(new SudokuSolver().board);
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [errorCells, setErrorCells] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  const updateBoard = (row, col, value) => {
    if (isSolved) return;
    const sudoku = sudokuRef.current;
    value = value + 10;
    try {
      sudoku.setCellValue(row, col, value);
      setBoard(sudoku.getBoard());
      if (errorCells.length > 0) {
        const newErrorCells = errorCells.filter(
          (errorCell) => errorCell.row !== row || errorCell.col !== col,
        );
        if (newErrorCells.length !== errorCells.length) {
          setErrorCells(newErrorCells);
        }
      }
    } catch (error) {
      const newErrorCells = [...errorCells, { row, col }];
      setErrorCells(newErrorCells);
      setBoard(sudoku.getBoard());
    }
  };

  const solveBoard = () => {
    const sudoku = sudokuRef.current;
    sudoku.solve();
    setBoard(sudoku.getBoard());
    setIsSolved(true);
  };

  const resetBoard = () => {
    const sudoku = sudokuRef.current;
    sudoku.reset();
    setBoard(sudoku.getBoard());
    setIsSolved(false);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      const { row, col } = selectedCell;
      if (event.key.startsWith('Arrow')) {
        const move = {
          ArrowRight: () => (col < 8 ? { col: col + 1 } : null),
          ArrowDown: () => (row < 8 ? { row: row + 1 } : null),
          ArrowLeft: () => (col > 0 ? { col: col - 1 } : null),
          ArrowUp: () => (row > 0 ? { row: row - 1 } : null),
        }[event.key];
        const moveResult = move();
        if (moveResult) {
          setSelectedCell({ ...selectedCell, ...moveResult });
        }
      } else if (!isNaN(event.key) && !isSolved) {
        updateBoard(row, col, Number(event.key));
      } else if (event.key === 'Backspace' && !isSolved) {
        updateBoard(row, col, 0);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCell, errorCells]);

  useEffect(() => {
    if (!sudokuRef.current) {
      sudokuRef.current = new SudokuSolver();
    }
  }, []);

  const onActionButtonClick = (action) => {
    if (action === ACTIONS.SOLVE) {
      solveBoard();
    } else if (action === ACTIONS.RESET) {
      resetBoard();
    } else if (action === ACTIONS.ERASE) {
      const { row, col } = selectedCell;
      updateBoard(row, col, 0);
    }
  };

  const onCellSelect = (event) => {
    const { target } = event;
    if (target.classList.contains('board__cell')) {
      const { row, col } = target.dataset;
      setSelectedCell({ row: Number(row), col: Number(col) });
    }
  };

  const onNumberClick = (numberKey) => {
    const { row, col } = selectedCell;
    updateBoard(row, col, Number(numberKey));
  };

  return (
    <div className="app">
      <h1 className="heading mg--b--md">Sudoku Solver</h1>
      <div className="app__container">
        <div className="app__board">
          <Board
            board={board}
            selectedCell={selectedCell}
            onCellSelect={onCellSelect}
            errorCells={errorCells}
          />
          <div className="app__board-actions">
            <BoardController
              onClick={onActionButtonClick}
              disableSolve={errorCells.length > 0}
              disableErase={isSolved}
            />
            <NumberPad onNumberClick={onNumberClick} disabled={isSolved} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
