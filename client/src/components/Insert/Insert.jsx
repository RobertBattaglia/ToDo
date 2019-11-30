import React, { useState } from 'react';
import { connect } from 'react-redux';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import styles from './Insert.css';

import { createTodo } from '../../actionCreators';
import { changeLocalStorage } from '../../helpers';

const Insert = ({ insertTodo, user, todos }) => {
  const [task, setTask] = useState('');

  const postTodo = async () => {
    const { id, name, email } = user;
    const todo = { id: sha256(task + id).toString(), task, complete: false };
    const body = { id, name, email, todo };
    try {
      await axios.post('/todo', body);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleChange = e => {
    setTask(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const hash = sha256(task).toString();
    if (!(hash in todos)) {
      if (user.isLoggedIn) {
        postTodo();
      }
      changeLocalStorage(todo => (todo[hash] = { task, complete: false }));
      insertTodo({ hash, task, complete: false });
    }

    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.insert}
        type="text"
        placeholder="Add ToDo Item ..."
        value={task}
        onChange={handleChange}
      />
    </form>
  );
};

const handleStateToProps = ({ user, todos }) => ({
  user,
  todos
});

const handleDispatchToProps = dispatch => ({
  insertTodo: task => dispatch(createTodo(task))
});

export default connect(handleStateToProps, handleDispatchToProps)(Insert);
