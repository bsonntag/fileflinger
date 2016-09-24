import _ from 'lodash'
import React, { PropTypes } from 'react'

const App = React.createClass({
  propTypes: {
    goToSend: PropTypes.func,
    goToReceive: PropTypes.func,
  },
  getDefaultProps() {
    return {
      goToSend: _.noop,
      goToReceive: _.noop,
    }
  },
  startSend(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.goToSend()
  },
  startReceive(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.goToReceive()
  },
  render() {
    return <div>
      What do you want to do?
      <button onClick={this.startSend}>
        Send
      </button>
      <button onClick={this.startReceive}>
        Receive
      </button>
    </div>
  },
})

export default App
