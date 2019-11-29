import React, { useState } from 'react';
import { connect } from 'react-redux';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';

import { createTodo } from '../../actionCreators';
import { changeLocalStorage } from '../../helpers';

const Insert = ({ insertToDo, user }) => {
  const [task, setTask] = useState('');

  const submitToDatabase = async () => {
    const { id, name, email } = user;
    const todo = { id: sha256(task + id).toString(), task, complete: false };
    const body = { id, name, email, todo };
    try {
      await axios.post('/todo', body);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => {
    setTask(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (user.isLoggedIn) {
      submitToDatabase();
    }
    const hash = sha256(task);
    changeLocalStorage(todo => (todo[hash] = { task, complete: false }));
    insertToDo({ hash, task });
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Insert Todo Item ..."
        value={task}
        onChange={handleChange}
      />
    </form>
  );
};

const handleStateToProps = ({ user }) => ({
  user
});

const handleDispatchToProps = dispatch => ({
  insertToDo: task => dispatch(createTodo(task))
});

export default connect(handleStateToProps, handleDispatchToProps)(Insert);
