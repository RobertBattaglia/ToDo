import React from 'react';
import FacebookLogin from 'react-facebook-login';

import Insert from './components/Insert/Insert';
import List from './components/List/List';

const App = () => {
  const responseFacebook = res => {
    console.log(res);
  };
  return (
    <>
      <FacebookLogin
        appId="561942184373005"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      />
      <h2>To Do</h2>
      <Insert />
      <List />
    </>
  );
};

export default App;
