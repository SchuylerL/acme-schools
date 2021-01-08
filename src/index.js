import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ListSchools from './components/ListSchools';
import SchoolDetail from './components/SchoolDetail';
import ListStudent from './components/ListStudent';
import store from './store';

const root = document.querySelector('#root');

render(
  <Provider store={store}>
    <div>
      <HashRouter>
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/students" component={ListStudent} />
        <Route exact path="/schools" component={ListSchools} />
        <Route exact path="/schools/:id" component={SchoolDetail} />
      </HashRouter>
    </div>
  </Provider>,
  root
);
