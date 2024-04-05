import { useState } from 'react';
import PropTypes from 'prop-types';

function Header({ addTask }) {
  const [label, setLabel] = useState('');

  function onChangeTask(e) {
    setLabel(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    if (label.trim() !== '') addTask(label);
    setLabel('');
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={(e) => onSubmit(e)} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => onChangeTask(e)}
          value={label}
          required
        />
        {/* <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={() => onChangeMin()}
          value={min}
          autoFocus
          type="number"
          min="0"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onChangeSec}
          value={sec}
          autoFocus
          type="number"
          max="59"
          min="0"
        /> */}
        <button type="submit" aria-label="submit" />
      </form>
    </header>
  );
}

Header.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default Header;
