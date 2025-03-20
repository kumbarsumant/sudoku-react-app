import './Board.scss';
import PropTypes from 'prop-types';

// A Cell is a single square in the Sudoku grid that holds a number
/**
 * A single cell in the Sudoku grid
 * @param {number} value - The number to display (1-9)
 */
const Cell = ({ value }) => (
  <div className="board__cell">{value == 0 ? '' : value}</div>
);

// A Chunk is one of the nine 3x3 boxes in a Sudoku puzzle
// Each chunk should contain numbers 1-9 exactly once
/**
 * A 3x3 section of the Sudoku board
 * @param {number[][]} board - The complete Sudoku grid
 * @param {number} startRow - Top-left row index (0, 3, or 6)
 * @param {number} startCol - Top-left column index (0, 3, or 6)
 */
const Chunk = ({ board, startRow, startCol }) => {
  const cells = [];

  for (let row = startRow; row < startRow + 3; row++) {
    for (let col = startCol; col < startCol + 3; col++) {
      cells.push(<Cell key={`cell-${row}-${col}`} value={board[row][col]} />);
    }
  }

  return <div className="board__chunk">{cells}</div>;
};

/**
 * The main Sudoku board component that renders the complete puzzle
 * @param {Object} props
 * @param {number[][]} props.board - A 9x9 array representing the Sudoku puzzle.
 * @returns {JSX.Element} A div containing 9 Chunk components arranged in a 9x9 grid
 */
const Board = ({ board }) => {
  const chunks = [];

  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      chunks.push(
        <Chunk
          key={`chunk-${row}-${col}`}
          board={board}
          startRow={row}
          startCol={col}
        />,
      );
    }
  }

  return <div className="board">{chunks}</div>;
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

export default Board;
