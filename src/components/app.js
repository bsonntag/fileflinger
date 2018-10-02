import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './homepage';
import Page from './page';
import React from 'react';
import Receive from './receive';
import Send from './send';

const App = () => (
  <BrowserRouter>
    <Page>
      <Switch>
        <Route
          component={Send}
          path={'/send'}
        />

        <Route
          component={Receive}
          path={'/receive'}
        />

        <Route component={Homepage} />
      </Switch>
    </Page>
  </BrowserRouter>
);

export default App;
