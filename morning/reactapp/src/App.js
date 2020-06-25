import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

import './App.css';

import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource'
import ScreenMyArticles from './ScreenMyArticles'
import ScreenSource from './ScreenSource'
import article from './reducer/article'
import token from './reducer/token'

const store = createStore(combineReducers({article,token}));

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route component={ScreenHome} path="/" exact />
        <Route component={ScreenSource} path="/screensource" exact />
        <Route component={ScreenArticlesBySource} path="/screenarticlesbysource/:id" exact />
        <Route component={ScreenMyArticles} path="/screenmyarticles" exact />
      </Switch>
    </Router>
  </Provider>
  );
}

export default App;
