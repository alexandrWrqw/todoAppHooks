import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

function TaskTimer({ task, saveTimer, hasTimer, getTimer, deleteTimer }) {
  const [seconds, setSeconds] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(true);

  function transformTime(numValue) {
    const strValue = numValue.toString();

    if (strValue.length < 2) {
      return `0${strValue}`;
    }

    return strValue;
  }

  function formatTime(s) {
    let min = 0;
    let sec = s;

    if (s >= 60) {
      min = Math.floor(s / 60);
      sec = s % 60;
    }

    return `${transformTime(min)}:${transformTime(sec)}`;
  }

  useEffect(() => {
    if (!hasTimer(task.id)) return;

    const savedTimer = getTimer(task.id);
    const [sec, saveDate, isOnTimer] = savedTimer;
    let newSeconds = sec;

    if (isOnTimer) {
      newSeconds = sec + Math.ceil((new Date() - saveDate) / 1000);

      if (newSeconds >= (task.endTimer ? task.endTimer : Infinity)) {
        newSeconds = task.endTimer;
      }
    }

    setSeconds(newSeconds);
    setIsTimerOn(isOnTimer);
    deleteTimer(task.id);
  }, []);

  useEffect(() => {
    deleteTimer(task.id);
    let interval;

    if (isTimerOn) {
      interval = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
    }

    if (seconds >= (task.endTimer ? task.endTimer : Infinity)) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      saveTimer(task.id, [seconds, new Date(), isTimerOn]);
    };
  }, [seconds, isTimerOn]);

  useEffect(() => {
    if (task.completed) {
      setIsTimerOn(false);
    } else {
      setIsTimerOn(true);
    }
  }, [task.completed]);

  return (
    <span className="description">
      <span style={{ color: seconds === task.endTimer ? 'red' : null }}>
        {formatTime(seconds)}
        {task.endTimer ? ` (end ${formatTime(task.endTimer)})` : null}
      </span>
      {task.completed ? null : (
        <>
          <button
            type="button"
            className="icon icon-play"
            aria-label="Play"
            onClick={() => (isTimerOn ? null : setIsTimerOn(true))}
          />
          <button
            type="button"
            className="icon icon-pause"
            aria-label="Pause"
            onClick={() => (isTimerOn ? setIsTimerOn(false) : null)}
          />
        </>
      )}
    </span>
  );
}

TaskTimer.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    endTimer: PropTypes.number,
    createdTime: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
  }),
  saveTimer: PropTypes.func.isRequired,
  hasTimer: PropTypes.func.isRequired,
  getTimer: PropTypes.func.isRequired,
  deleteTimer: PropTypes.func.isRequired,
};

TaskTimer.defaultProps = {
  task: {},
};

export default TaskTimer;
