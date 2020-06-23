import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import RouteWithLayout  from './components/RouteWithLayout/RouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import Strategies from './Containers/central/Strategies';
import Retards from './Containers/central/Retards';
import NotFound from "./components/NotFound/NotFound";
const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/Strategies"
      />
      <RouteWithLayout
        component={Strategies}
        exact
        layout={MainLayout}
        path="/Strategies"
      />

        <RouteWithLayout
            component={Retards}
            exact
            layout={MainLayout}
            path="/Retards"
        />
        <RouteWithLayout
            component={NotFound}
            exact
            layout={MinimalLayout}
            path="/not-found"
        />


      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
