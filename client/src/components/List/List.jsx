import React from 'react';
import { connect } from 'react-redux';

import Todo from '../Todo/Todo';

const List = ({ todos }) => {
  return (
    <div>
      {Object.keys(todos).map(key => (
        <Todo task={todos[key]} hash={key} key={key} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos
});

export default connect(mapStateToProps)(List);
