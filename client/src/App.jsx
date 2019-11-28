import React from 'react';
import FacebookLogin from 'react-facebook-login';

import Insert from './components/Insert/Insert';
import List from './components/List/List';

const App = () => {
  const responseFacebook = (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  };
  return (
    <>
      <FacebookLogin
        appId="423407844996823"
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
