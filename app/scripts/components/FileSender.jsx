import _ from 'lodash'
import React, { PropTypes } from 'react'

const FileSender = React.createClass({
  propTypes: {
    cancel: PropTypes.func,
    peer: PropTypes.object.isRequired,
    releasePeer: PropTypes.func,
  },
  getDefaultProps() {
    return {
      cancel: _.noop,
      releasePeer: _.noop,
    }
  },
  getInitialState() {
    return {
      file: null,
    }
  },
  handleFile(event) {
    let file = event.target.files[0]
    this.setState({ file })
    this.props.peer.on('data', data => {
      console.log('received ok')
      console.log(data)
      this.props.peer.send(file)
    })
    console.log('filename:', file.name)
    console.log('type:', file.type)
    this.props.peer.send(file.name)
  },
  handleCancel(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.releasePeer()
    this.props.cancel()
  },
  render() {
    return <div>
      TODO - FileSender
      {this.renderFileInput()}
      {this.renderProgress()}
      <button onClick={this.handleCancel}>
        Cancel
      </button>
    </div>
  },
  renderFileInput() {
    if(!this.state.file) {
      return <div>
        <label htmlFor='file-input'>
          Choose a file
        </label>
        <input
          id='file-input'
          onChange={this.handleFile}
          type='file'
        >
        </input>
      </div>
    }
  },
  renderProgress() {
    if(this.state.file) {
      return <div>
        Sending...
      </div>
    }
  },
})

export default FileSender
