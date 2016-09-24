// Import polyfills before anything else
import 'babel-polyfill'
import 'isomorphic-fetch'

/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import ReactDom from 'react-dom'

import Root from './containers/Root.jsx'
import store from './store'

ReactDom.render(<Root store={store}></Root>, document.getElementById('app'))
