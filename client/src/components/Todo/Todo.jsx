import React from 'react';
import { connect } from 'react-redux';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import styles from './Todo.css';

import { deleteTodo, completeTodo } from '../../actionCreators';
import { changeLocalStorage } from '../../helpers';

const Todo = ({ hash, task, complete, user, removeToDo, finishToDo }) => {
  const deleteTodo = () => {
    const hash = sha256(task + user.id).toString();
    axios.delete(`/todo/${user.id}/${hash}`);
  };

  const setTodoComplete = () => {
    const hash = sha256(task + user.id).toString();
    axios.put(`/todo/${user.id}/${hash}`);
  };

  const handleClick = () => {
    changeLocalStorage(todo => delete todo[hash]);
    removeToDo(hash);
    if (user.isLoggedIn) {
      deleteTodo();
    }
  };

  const handleChange = () => {
    changeLocalStorage(todo => (todo[hash].complete = !todo[hash].complete));
    finishToDo(hash);
    if (user.isLoggedIn) {
      setTodoComplete();
    }
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

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  removeToDo: hash => dispatch(deleteTodo(hash)),
  finishToDo: hash => dispatch(completeTodo(hash))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
