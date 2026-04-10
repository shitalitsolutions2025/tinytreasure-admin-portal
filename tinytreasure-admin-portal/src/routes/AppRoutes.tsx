import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import ProductStatusManager from '../components/ProductStatusManager';
import DonationStatusManager from '../components/DonationStatusManager';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/product-status" component={ProductStatusManager} />
        <PrivateRoute path="/donation-status" component={DonationStatusManager} />
        <Route path="/" exact>
          <h1>Welcome to TinyTreasure Admin Portal</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRoutes;