import React, { Component } from 'react';

import AppHeader from 'components/AppHeader';
import AppContent from 'components/AppContent';
import AppFooter from 'components/AppFooter';

import style from './App.css';


class App extends Component {
  render() {
    return (
      <div className={style['app-content']}>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </div>
    );
  }
}

export default App;
