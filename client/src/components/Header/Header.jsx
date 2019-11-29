import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import styles from './Header.css';

import { loginUser, clearTodos, createTodo } from '../../actionCreators';
import { changeLocalStorage } from '../../helpers';

const Header = ({ user, login, clearAllTodos, insertTodo }) => {
  const getTodosForUser = async () => {
    const {
      data: { todos }
    } = await axios.get(`/todo/${user.id}`);
    todos.forEach(todo => {
      const { task, complete } = todo;
      const hash = sha256(task);
      changeLocalStorage(todo => (todo[hash] = { task, complete }));
      insertTodo({ hash, task, complete });
    });
  };

  const responseFacebook = res => {
    clearAllTodos();
    localStorage.clear();
    login(res);
  };

  useEffect(() => {
    if (user.name) {
      getTodosForUser();
    }
  }, [user]);

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
  login: user => dispatch(loginUser(user)),
  clearAllTodos: () => dispatch(clearTodos()),
  insertTodo: todo => dispatch(createTodo(todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
