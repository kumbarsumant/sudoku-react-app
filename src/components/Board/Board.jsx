import './Board.scss';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Represents a single cell in the Sudoku board.
const Cell = ({ value, isSelected, row, col, error }) => {
  const extraClassNames = [];

  if (isSelected) {
    extraClassNames.push('board__cell--selected');
  }

  if (error) {
    extraClassNames.push('board__cell--error');
  }

  return (
    <div
      className={`board__cell ${extraClassNames.join(' ')}`}
      data-row={row}
      data-col={col}
    >
      {value == 0 ? '' : value}
    </div>
  );
};

// Represents a 3x3 chunk of cells in the Sudoku board.
const Chunk = ({ board, startRow, startCol, selectedCell, errorCells }) => {
  const cells = [];
  const { row: selectedRow, col: selectedCol } = selectedCell;

  for (let row = startRow; row < startRow + 3; row++) {
    for (let col = startCol; col < startCol + 3; col++) {
      let errorExists = false;
      if (errorCells.length > 0) {
        for (let i = 0; i < errorCells.length; i++) {
          const errorCell = errorCells[i];
          if (errorCell.row === row && errorCell.col === col) {
            errorExists = true;
            break;
          }
        }
      }

      cells.push(
        <Cell
          key={`cell-${row}-${col}`}
          value={board[row][col]}
          row={row}
          col={col}
          isSelected={row === selectedRow && col === selectedCol}
          error={errorExists}
        />,
      );
    }
  }

  return <div className="board__chunk">{cells}</div>;
};

// Represents the entire Sudoku board.
const Board = ({ board, selectedCell, onCellSelect, errorCells }) => {
  const chunks = [];
  const boardRef = useRef(null);

  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      chunks.push(
        <Chunk
          key={`chunk-${row}-${col}`}
          board={board}
          startRow={row}
          startCol={col}
          selectedCell={selectedCell}
          errorCells={errorCells}
        />,
      );
    }
  }

  return (
    <div ref={boardRef} className="board" onClick={onCellSelect}>
      {chunks}
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

Cell.propTypes = {
  value: PropTypes.number.isRequired,
};

Chunk.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  startRow: PropTypes.number.isRequired,
  startCol: PropTypes.number.isRequired,
};

// Export the Board component
export default Board;
