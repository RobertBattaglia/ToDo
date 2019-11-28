import React from 'react';
import { connect } from 'react-redux';
import styles from './Todo.css';

import { deleteTodo, completeTodo } from '../../actionCreators';

const Todo = ({ hash, task, complete, removeToDo, finishToDo }) => {
  const handleClick = () => {
    const local = Object.assign({}, JSON.parse(localStorage.getItem('todos')));
    delete local[hash];
    localStorage.setItem('todos', JSON.stringify(local));
    removeToDo(hash);
  };

  const handleChange = () => {
    const local = Object.assign({}, JSON.parse(localStorage.getItem('todos')));
    local[hash].complete = !local[hash].complete;
    localStorage.setItem('todos', JSON.stringify(local));
    finishToDo(hash);
  };

  return (
    <div className={styles.todo}>
      <input
        type="checkbox"
        defaultChecked={complete}
        onChange={handleChange}
      />
      <p className={`${complete ? styles.complete : ''}`}>{task}</p>
      <button onClick={handleClick}>X</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  removeToDo: hash => dispatch(deleteTodo(hash)),
  finishToDo: hash => dispatch(completeTodo(hash))
});

export default connect(null, mapDispatchToProps)(Todo);
