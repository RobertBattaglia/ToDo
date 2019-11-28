import React from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import { loginUser } from '../../actionCreators';

const Header = ({ login }) => {
  const responseFacebook = res => {
    login(res);
  };

  return (
    <div>
      <FacebookLogin
        appId="561942184373005"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUser(user))
});

export default connect(null, mapDispatchToProps)(Header);
