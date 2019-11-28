import React from 'react';
import { connect } from 'react-redux';
import styles from './Todo.css';

import { deleteTodo, completeTodo } from '../../actionCreators';
import { changeLocalStorage } from '../../helpers';

const Todo = ({ hash, task, complete, removeToDo, finishToDo }) => {
  const handleClick = () => {
    console.log(removeToDo);
    changeLocalStorage(todo => delete todo[hash]);
    removeToDo(hash);
  };

  const handleChange = () => {
    changeLocalStorage(todo => (todo[hash].complete = !todo[hash].complete));
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
