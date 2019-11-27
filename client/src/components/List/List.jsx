import React from 'react';
import { connect } from 'react-redux';

import Todo from '../Todo/Todo';

const List = ({ todos }) => {
  return (
    <div>
      {Object.keys(todos).map((_, i) => (
        <Todo key={i} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ todos }) => ({
  todos
});

export default connect(mapStateToProps)(List);
