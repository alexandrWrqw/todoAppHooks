import './FooterTasksFilter.css';

import PropTypes from 'prop-types';

function TasksFilter({ changeFilter, filter }) {
  return (
    <ul className="filters">
      <li>
        <button
          className={filter === 'all' ? 'selected' : null}
          type="button"
          onClick={() => changeFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'active' ? 'selected' : null}
          type="button"
          onClick={() => changeFilter('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'completed' ? 'selected' : null}
          type="button"
          onClick={() => changeFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  filter: 'all',
};

export default TasksFilter;
