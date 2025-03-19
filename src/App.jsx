import './App.scss';
import Board from './components/Board/Board';
import NumberPad from './components/NumberPad/NumberPad';
import BoardController from './components/BoardController/BoardController';

const App = () => {
  const matrix = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  return (
    <div className="app">
      <h1 className="heading">Sudoku Solver</h1>
      <div className="app__container">
        <div className="app__board">
          <Board matrix={matrix} />
          <div className="app__board-actions">
            <BoardController />
            <NumberPad />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
