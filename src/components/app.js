import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './homepage';
import Page from './page';
import React from 'react';
import Receive from './receive';
import Send from './send';

const basename = process.env.NODE_ENV === 'production' ? 'fileflinger' : null; // eslint-disable-line no-process-env

const App = () => (
  <BrowserRouter basename={basename}>
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
