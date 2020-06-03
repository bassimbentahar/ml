import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import RouteWithLayout  from './components/RouteWithLayout/RouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import Students from './Containers/central/Students';
import NotFound from "./components/NotFound/NotFound";
const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/students"
      />
      <RouteWithLayout
        component={Students}
        exact
        layout={MainLayout}
        path="/students"
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
