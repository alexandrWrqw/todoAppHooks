import './App.css';

import { useState } from 'react';

import Header from '../Header/Header';
import TodoList from '../TodoList/TodoList';
import Footer from '../Footer/Footer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [timers, setTimers] = useState(new Map());

  function createTask(description, endTimer) {
    return {
      id: Date.now(),
      description,
      endTimer,
      createdTime: new Date(),
      completed: false,
    };
  }

  function addTask(description, endTimer) {
    setTasks([...tasks, createTask(description, endTimer)]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function editTask(id, value) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) task.description = value;
        return task;
      }),
    );
  }

  function toggleCompleteTask(id) {
    setTasks((oldTasks) => {
      const idx = oldTasks.findIndex((el) => el.id === id);

      const oldTask = oldTasks[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };

      const newTasks = [
        ...oldTasks.slice(0, idx),
        newTask,
        ...oldTasks.slice(idx + 1),
      ];

      return newTasks;
    });
  }

  function deleteCompletedTasks() {
    setTasks((oldTasks) => oldTasks.filter((task) => task.completed === false));
  }

  function changeFilter(fValue) {
    setFilter(fValue);
  }

  function filterTasks() {
    return tasks.filter(({ completed }) => {
      const all = filter === 'all';
      const complete = filter === 'completed';

      let boolResult;

      if (complete) {
        boolResult = completed === true;
      } else {
        boolResult = completed === false;
      }
      if (all) boolResult = true;

      return boolResult;
    });
  }

  function saveTimer(id, timeData) {
    setTimers(timers.set(id, timeData));
  }

  function hasTimer(id) {
    return timers.has(id);
  }

  function getTimer(id) {
    return timers.get(id);
  }

  function deleteTimer(id) {
    timers.delete(id);
  }

  const notCompletedCount = tasks.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <Header
        addTask={(description, secondsTimer) =>
          addTask(description, secondsTimer)
        }
      />
      <section className="main">
        <TodoList
          tasks={filterTasks()}
          deleteTask={(id) => deleteTask(id)}
          toggleCompleteTask={(id) => toggleCompleteTask(id)}
          editTask={(id, value) => editTask(id, value)}
          saveTimer={(id, timeData) => saveTimer(id, timeData)}
          hasTimer={(id) => hasTimer(id)}
          getTimer={(id) => getTimer(id)}
          deleteTimer={(id) => deleteTimer(id)}
        />
        <Footer
          notCompletedCount={notCompletedCount}
          deleteCompletedTasks={(id) => deleteCompletedTasks(id)}
          changeFilter={(fValue) => changeFilter(fValue)}
          filter={filter}
        />
      </section>
    </section>
  );
}

export default App;
