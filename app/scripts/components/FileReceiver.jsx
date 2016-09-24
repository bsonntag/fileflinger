import _ from 'lodash'
import FileSaver from 'file-saver'
import React, { PropTypes } from 'react'

const FileReceiver = React.createClass({
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
      filename: null,
    }
  },
  componentDidMount() {
    this.props.peer.on('data', data => {
      console.log('received data')
      if(!this.state.filename) {
        let filename = (new String(data)).toString()
        console.log('filename:', filename)
        this.setState({ filename })
        this.props.peer.send('ok')
      }
      else {
        console.log('file:', data)
        FileSaver.saveAs(new Blob([data]), this.state.filename)
      }
    })
  },
  handleCancel(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.releasePeer()
    this.props.cancel()
  },
  render() {
    return <div>
      TODO - FileReceiver
      <button onClick={this.handleCancel}>
        Cancel
      </button>
    </div>
  },
})

export default FileReceiver
