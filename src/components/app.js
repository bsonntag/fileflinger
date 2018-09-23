import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './nav-bar';
import React, { Fragment } from 'react';
import Receive from './receive';
import Send from './send';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <header>
        <h1>
          {'File Flinger'}
        </h1>

        <NavBar />
      </header>

      <Switch>
        <Route
          component={Send}
          path={'/send'}
        />

        <Route
          component={Receive}
          path={'/receive'}
        />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default App;
