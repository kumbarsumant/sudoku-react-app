import './NumberPad.scss';

const NumberPad = ({ onNumberClick }) => {
  const buttons = [];
  for (let i = 1; i <= 9; i++) {
    buttons.push(
      <button
        key={i}
        data-key={i}
        className="numpad-btn"
        onClick={(event) => onNumberClick(event.currentTarget.dataset.key)}
      >
        <div className="numpad-btn__container">{i}</div>
      </button>,
    );
  }

  return <div className="number-pad">{buttons}</div>;
};

export default NumberPad;
