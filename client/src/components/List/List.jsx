import React from 'react';
import { connect } from 'react-redux';

import Todo from '../Todo/Todo';

const List = ({ todos }) => {
  return (
    <div>
      {Object.keys(todos).map(key => (
        <Todo
          hash={key}
          task={todos[key].task}
          complete={todos[key].complete}
          key={key}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos
});

export default connect(mapStateToProps)(List);
