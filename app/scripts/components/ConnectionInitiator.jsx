import _ from 'lodash'
import React, { PropTypes } from 'react'

import RemoteCodeForm from './RemoteCodeForm.jsx'

const ConnectionInitiator = React.createClass({
  propTypes: {
    createCode: PropTypes.func.isRequired,
    localCode: PropTypes.string,
    onRemoteCode: PropTypes.func,
  },
  getDefaultProps() {
    return {
      localCode: '',
      onRemoteCode: _.noop,
    }
  },
  handleGenerate(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.createCode()
  },
  render() {
    return <div>
      {this.renderGenerateCodeButton()}
      {this.renderLocalCode()}
      {this.renderRemoteCodeForm()}
    </div>
  },
  renderGenerateCodeButton() {
    if(!this.props.localCode) {
      return <button onClick={this.handleGenerate}>
        Generate a code
      </button>
    }
  },
  renderLocalCode() {
    if(this.props.localCode) {
      return <div>
        Your code:
        <pre className='u-base64'>
          {this.props.localCode}
        </pre>
      </div>
    }
  },
  renderRemoteCodeForm() {
    if(this.props.localCode) {
      return <RemoteCodeForm
        onRemoteCode={this.props.onRemoteCode}
      >
      </RemoteCodeForm>
    }
  },
})

export default ConnectionInitiator
