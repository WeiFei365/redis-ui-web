import React from 'react';

import logo from 'images/logo.svg';

import style from './index.css';


export default function AppHeader(props) {
  return (
    <header className={style['app-header']}>
      <img src={logo} className={style['app-logo']} alt="logo" />
      <span className={style['app-title']}>Welcome to redis-ui & redis-ui-web</span>
    </header>
  );
};
