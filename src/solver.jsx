/**
 * Checks if it's possible to place a value in a given position on the Sudoku board.
 *
 * @param {Array} board - The Sudoku board as a 2D array.
 * @param {Number} row - The row index of the position to check.
 * @param {Number} col - The column index of the position to check.
 * @param {Number} value - The value to check if it can be placed.
 * @returns {Boolean} - Returns true if the value can be placed, false otherwise.
 */
function isValueAllowed(board, row, col, value) {
  // Check if the value already exists in the row
  if (board[row].includes(value)) {
    return false;
  }

  // Check if the value already exists in the column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === value) {
      return false;
    }
  }

  // Calculate the start position of the 3x3 sub-grid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === value) {
        return false;
      }
    }
  }

  // If the value does not exist in the row, column, or sub-grid, it's possible to place it
  return true;
}

/**
 * Recursive helper function to solve the Sudoku puzzle.
 *
 * @param {Array} board - The Sudoku board as a 2D array.
 * @param {Number} row - The current row index.
 * @param {Number} col - The current column index.
 * @returns {Boolean} - Returns true if the puzzle is solved, false otherwise.
 */
function solveSudoku(board, row, col) {
  // Base case: If we've reached the end of the board, the puzzle is solved
  if (row === 8 && col === 9) {
    return true;
  }

  // If we've reached the end of a row, move to the next row
  if (col === 9) {
    row++;
    col = 0;
  }

  // If the current cell is not empty, move to the next cell
  if (board[row][col] !== 0) {
    return solveSudoku(board, row, col + 1);
  }

  for (let value = 1; value <= 9; value++) {
    if (isValueAllowed(board, row, col, value)) {
      board[row][col] = value; // Place the number in the cell
      if (solveSudoku(board, row, col + 1)) {
        return true;
      }
      board[row][col] = 0; // If the recursive call returns false, reset the cell
    }
  }

  // If no number can be placed in the current cell, return false
  return false;
}

/**
 * Solves the Sudoku puzzle and returns the solved board.
 *
 * @param {Array} board - The Sudoku board as a 2D array.
 * @returns {Array} - Returns the solved Sudoku board as a 2D array.
 */
export default function solveSudokuPuzzle(board) {
  const boardCopy = JSON.parse(JSON.stringify(board));
  solveSudoku(boardCopy, 0, 0);
  return boardCopy;
}
