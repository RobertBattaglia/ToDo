import React from 'react';
import { connect } from 'react-redux';
import styles from './Todo.css';

import { deleteTodo } from '../../actionCreators';

const Todo = ({ task, hash, removeToDo }) => {
  const handleClick = () => {
    removeToDo(hash);
  };

  return (
    <div className={styles.todo}>
      <input type="checkbox" />
      <p>{task}</p>
      <button onClick={handleClick}>X</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  removeToDo: hash => dispatch(deleteTodo(hash))
});

export default connect(null, mapDispatchToProps)(Todo);
