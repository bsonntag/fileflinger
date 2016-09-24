import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import Router from './Router.jsx'

const Root = React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
  },
  render: function() {
    return <Provider store={this.props.store}>
      <Router></Router>
    </Provider>
  },
})

export default Root
