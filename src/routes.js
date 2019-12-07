import React, { Component } from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Revendedor from './pages/Revendedor';
import SignIn from './pages/SignIn';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/signin' component={SignIn} />
          <Route path='/admin/:children/:edit?' component={Revendedor} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
