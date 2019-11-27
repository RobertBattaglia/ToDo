import React from 'react';

import styles from './style.css';

const Todo = () => {
  return (
    <div className={styles.todo}>
      <input type="checkbox" />
      <p>ToDo</p>
      <button>X</button>
    </div>
  );
};

export default Todo;
