export default class SudokuSolver {
  constructor() {
    this.board = this.generateEmptyBoard();
  }

  generateEmptyBoard() {
    return Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));
  }

  getBoard() {
    return JSON.parse(JSON.stringify(this.board));
  }

  validate(row, col, value) {
    if (
      row >= 0 &&
      row < 9 &&
      col >= 0 &&
      col < 9 &&
      value >= 0 &&
      value <= 9
    ) {
      return;
    }
    throw new Error(
      `Row/Column/Value provided is invalid. Row: ${row}, Column: ${col}, Value: ${value}`,
    );
  }

  isSafe(row, col, value) {
    if (value === 0) return true;

    for (let c = 0; c < 9; c++) {
      if (c === col) continue;
      if (this.board[row][c] === value) {
        return false;
      }
    }

    for (let r = 0; r < 9; r++) {
      if (r === row) continue;
      if (this.board[r][col] === value) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (c === col && r === col) continue;
        if (this.board[r][c] === value) {
          return false;
        }
      }
    }
    return true;
  }

  setCellValue(row, col, value) {
    if (this.isSafe(row, col, value)) {
      this.validate(row, col, value);
      this.board[row][col] = value;
      return;
    }
    this.board[row][col] = value;
    throw new Error(
      `Value ${value} not safe to place at row: ${row} and column: ${col}`,
    );
  }

  solveHelper(row, col) {
    if (row === 8 && col === 9) {
      return true;
    }

    if (col === 9) {
      row++;
      col = 0;
    }

    if (this.board[row][col] !== 0) {
      return this.solveHelper(row, col + 1);
    }

    for (let value = 1; value <= 9; value++) {
      if (this.isSafe(row, col, value)) {
        this.board[row][col] = value;
        if (this.solveHelper(row, col + 1)) {
          return true;
        }
        this.board[row][col] = 0;
      }
    }

    return false;
  }

  reset() {
    this.board = this.generateEmptyBoard();
  }

  solve() {
    this.solveHelper(0, 0);
  }
}
