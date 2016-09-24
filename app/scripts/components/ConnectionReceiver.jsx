import _ from 'lodash'
import React, { PropTypes } from 'react'

import RemoteCodeForm from './RemoteCodeForm.jsx'

const ConnectionReceiver = React.createClass({
  propTypes: {
    localCode: PropTypes.string,
    onRemoteCode: PropTypes.func,
  },
  getDefaultProps() {
    return {
      isRemoteCodeObtained: false,
      localCode: '',
      onRemoteCode: _.noop,
    }
  },
  handleRemoteCode(remoteCode) {
    this.setState({ isRemoteCodeObtained: true })
    this.props.onRemoteCode(remoteCode)
  },
  render() {
    return <div>
      {this.renderRemoteCodeForm()}
      {this.renderLocalCode()}
    </div>
  },
  renderRemoteCodeForm() {
    return <RemoteCodeForm
      onRemoteCode={this.handleRemoteCode}
    >
    </RemoteCodeForm>
  },
  renderLocalCode() {
    if(this.props.localCode) {
      return <div>
        Your code:
        <pre>
          {this.props.localCode}
        </pre>
      </div>
    }
  },
})

export default ConnectionReceiver
