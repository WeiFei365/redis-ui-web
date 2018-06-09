import React from 'react';

import logo from 'images/logo.svg';
import antd from 'images/antd.svg';
import eggjs from 'images/eggjs.svg';
import fb from 'images/facebook.png';
import github from 'images/github.svg';
import nodejs from 'images/nodejs.svg';
import redis from 'images/redis.png';

import style from './index.css';


const links = [
  [github, 'Github', 'https://github.com/'],
  [fb, 'facebook', 'https://github.com/facebook'],
  [logo, 'redis-ui & redis-ui-web', 'https://github.com/WeiFei365/redis-ui'],
  [eggjs, 'egg.js', 'https://github.com/eggjs/egg/'],
  [redis, 'redis', 'https://redis.io/'],
  [antd, 'antd', 'https://github.com/ant-design/ant-design/'],
  [nodejs, 'nodejs', 'https://nodejs.org/'],
];

export default function AppFooter(props) {
  return (
    <footer className={style['app-footer']}>
      <div className={style['app-contact']}>
        <a href="https://github.com/WeiFei365/redis-ui">@redis-ui</a>
        <a href="https://github.com/WeiFei365/redis-ui-web">@redis-ui-web</a>
      </div>
      {links.map((d) => (
        <a href={d[2]} key={d[1]} title={d[1]} className={style['app-link']}>
          <img src={d[0]} alt={1[1]} />
        </a>
      ))}
    </footer>
  );
};
