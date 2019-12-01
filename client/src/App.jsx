import React from 'react';
import styles from './styles.css';

import Header from './components/Header/Header';
import Insert from './components/Insert/Insert';
import List from './components/List/List';

const App = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Insert />
      <List />
    </div>
  );
};

export default App;
