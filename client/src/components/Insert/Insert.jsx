import React, { useState } from 'react';
import { connect } from 'react-redux';
import sha256 from 'crypto-js/sha256';

import { createTodo } from '../../actionCreators';
import { changeLocalStorage } from '../../helpers';

const Insert = ({ insertToDo, user }) => {
  const [task, setTask] = useState('');

  const handleChange = e => {
    setTask(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const hash = user.isLoggedIn ? sha256(task + user.id) : sha256(task);
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
