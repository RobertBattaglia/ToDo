import React from 'react';

import Header from './components/Header/Header';
import Insert from './components/Insert/Insert';
import List from './components/List/List';

const App = () => {
  return (
    <>
      <Header />
      <h2>To Do</h2>
      <Insert />
      <List />
    </>
  );
};

export default App;
