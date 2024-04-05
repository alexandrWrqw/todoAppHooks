import { useState } from 'react';

import Header from '../Header/Header';
import TodoList from '../TodoList/TodoList';
import Footer from '../Footer/Footer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  function createTask(description) {
    return {
      id: Date.now(),
      description,
      createdTime: new Date(),
      completed: false,
    };
  }

  function addTask(description) {
    setTasks([...tasks, createTask(description)]);
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

  const notCompletedCount = tasks.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <Header addTask={(description) => addTask(description)} />
      <section className="main">
        <TodoList
          tasks={filterTasks()}
          deleteTask={(id) => deleteTask(id)}
          toggleCompleteTask={(id) => toggleCompleteTask(id)}
          editTask={(id, value) => editTask(id, value)}
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
