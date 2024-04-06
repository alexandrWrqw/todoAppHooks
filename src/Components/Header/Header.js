import './Header.css';

import { useState } from 'react';

import PropTypes from 'prop-types';

function Header({ addTask }) {
  const [label, setLabel] = useState('');
  const [labelSec, setLabelSec] = useState('');
  const [labelMin, setLabelMin] = useState('');

  function transformTimeLabelsInSec(sec, min) {
    const normalSec = sec !== 0 && sec !== '';
    const normalMin = min !== 0 && min !== '';

    let result;

    if (normalSec && normalMin) result = min * 60 + sec;
    if (normalSec && !normalMin) result = sec;
    if (!normalSec && normalMin) result = min * 60;
    if (!normalSec && !normalMin) result = null;

    return result;
  }

  function onSubmit(e) {
    e.preventDefault();

    if (label.trim() !== '')
      addTask(
        label,
        transformTimeLabelsInSec(Number(labelSec), Number(labelMin)),
      );

    setLabel('');
    setLabelSec('');
    setLabelMin('');
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={(e) => onSubmit(e)}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => setLabel(e.target.value)}
          value={label}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(e) => setLabelMin(e.target.value)}
          value={labelMin}
          type="number"
          min="0"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(e) => setLabelSec(e.target.value)}
          value={labelSec}
          type="number"
          max="59"
          min="0"
        />
        <button type="submit" aria-label="submit" />
      </form>
    </header>
  );
}

Header.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default Header;
