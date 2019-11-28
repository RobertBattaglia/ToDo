import React from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import styles from './Header.css';

import { loginUser } from '../../actionCreators';

const Header = ({ user, login }) => {
  const responseFacebook = res => {
    login(res);
  };

  return (
    <div id={styles.header}>
      {user.name ? (
        <h2>{`${user.name}'s Todo List`}</h2>
      ) : (
        <>
          <h2>My Todo List</h2>
          <p>login to facebook to access list across devices!</p>
          <FacebookLogin
            appId="561942184373005"
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
