import _ from 'lodash'
import React, { PropTypes } from 'react'

const RemoteCodeForm = React.createClass({
  propTypes: {
    onRemoteCode: PropTypes.func,
  },
  getDefaultProps() {
    return {
      onRemoteCode: _.noop,
    }
  },
  getInitialState() {
    return {
      remoteCode: '',
    }
  },
  handleSubmit(event) {
    if(event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.props.onRemoteCode(this.state.remoteCode)
  },
  handleChange(event) {
    this.setState({
      remoteCode: event.target.value,
    })
  },
  render() {
    return <form onSubmit={this.handleSubmit}>
      <label htmlFor='code-input'>
        Insert the remote code
      </label>
      <input
        id='code-input'
        onChange={this.handleChange}
        type='text'
        value={this.state.remoteCode}
      >
      </input>
      <button
        onClick={this.handleSubmit}
        type='submit'
      >
        Submit
      </button>
    </form>
  },
})

export default RemoteCodeForm
