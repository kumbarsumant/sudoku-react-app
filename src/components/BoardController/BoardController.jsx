import './BoardController.scss';
import { LuEraser, LuBrain, LuRefreshCw } from 'react-icons/lu';

/**
 * BoardController Component
 *
 * A control panel component that provides game control buttons:
 * - Reset: Resets the game board (currently disabled)
 * - Erase: Erases selected cells
 * - Solve: Triggers the solving algorithm
 */
const BoardController = () => {
  return (
    <div className="board__controller">
      {/* Reset Button */}
      <button className="button button--action button--action--disabled">
        <div className="button__container">
          <LuRefreshCw className="icon icon--action" />
          <span className="button__text">Reset</span>
        </div>
      </button>

      {/* Erase Button */}
      <button className="button button--action">
        <div className="button__container">
          <LuEraser className="icon icon--action" />
          <span className="button__text">Erase</span>
        </div>
      </button>

      {/* Solve Button */}
      <button className="button button--action">
        <div className="button__container">
          <LuBrain className="icon icon--action" />
          <span className="button__text">Solve</span>
        </div>
      </button>
    </div>
  );
};

export default BoardController;
