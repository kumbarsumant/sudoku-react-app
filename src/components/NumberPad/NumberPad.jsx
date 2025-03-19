import './NumberPad.scss';

const NumberPad = () => {
  const buttons = [];
  for (let i = 1; i <= 9; i++) {
    buttons.push(
      <button key={i} className="numpad-btn">
        <div className="numpad-btn__container">{i}</div>
      </button>,
    );
  }

  return <div className="number-pad">{buttons}</div>;
};

export default NumberPad;
