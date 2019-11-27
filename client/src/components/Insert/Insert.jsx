import React, { useState } from 'react';
import { connect } from 'react-redux';
import sha256 from 'crypto-js/sha256';

import { createTodo } from '../../actionCreators';

const Insert = props => {
  const [task, setTask] = useState('');

  const handleChange = e => {
    setTask(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.insertToDo({ hash: sha256(task), task });
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

const handleDispatchToProps = dispatch => ({
  insertToDo: task => dispatch(createTodo(task))
});

export default connect(null, handleDispatchToProps)(Insert);
