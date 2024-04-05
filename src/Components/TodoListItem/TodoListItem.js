import { useState } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import EditingTask from '../EditingTask/EditingTask';

function TodoListItem({ task, editTask, toggleCompleteTask, deleteTask }) {
  const [editing, setEditing] = useState(false);

  function onCloseEditingMode() {
    setEditing(false);
  }

  function submitEditedTask(e, val) {
    e.preventDefault();

    if (val.trim() !== '') editTask(task.id, val);
    onCloseEditingMode(false);
  }

  let taskClassName = null;

  if (task.completed) {
    taskClassName = 'completed';
  } else if (editing) {
    taskClassName = 'editing';
  }

  return (
    <li className={taskClassName}>
      <div className="view">
        <input
          className="toggle"
          id={task.id}
          type="checkbox"
          onChange={toggleCompleteTask}
          checked={task.completed}
        />
        <label htmlFor={task.id}>
          <span className="title">{task.description}</span>
          <span className="description">
            {`created ${formatDistanceToNow(task.createdTime, {
              addSuffix: true,
            })}`}
          </span>
        </label>
        {task.completed ? null : (
          <button
            type="button"
            aria-label="edit task"
            className="icon icon-edit"
            onClick={() => setEditing(true)}
          />
        )}
        <button
          type="button"
          aria-label="delete task"
          className="icon icon-destroy"
          onClick={() => deleteTask(task.id)}
        />
      </div>
      {editing ? (
        <EditingTask
          submitEditedTask={(e, val) => submitEditedTask(e, val)}
          onCloseEditingMode={() => onCloseEditingMode()}
          description={task.description}
        />
      ) : null}
    </li>
  );
}

TodoListItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    createdTime: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
  }),
  deleteTask: PropTypes.func.isRequired,
  toggleCompleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

TodoListItem.defaultProps = {
  task: {},
};

export default TodoListItem;
