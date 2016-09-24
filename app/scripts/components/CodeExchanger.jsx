import _ from 'lodash'
import React, { PropTypes } from 'react'

import ConnectionInitiator from './ConnectionInitiator.jsx'
import ConnectionReceiver from './ConnectionReceiver.jsx'

const CodeExchanger = React.createClass({
  propTypes: {
    cancel: PropTypes.func,
    createPeer: PropTypes.func.isRequired,
    isInitiator: PropTypes.bool.isRequired,
    next: PropTypes.func,
    releasePeer: PropTypes.func,
  },
  getDefaultProps() {
    return {
      cancel: _.noop,
      next: _.noop,
      releasePeer: _.noop,
    }
  },
  getInitialState() {
    return {
      localCode: '',
      peer: null,
      remoteCode: '',
    }
  },
  createCode() {
    console.log('creating code')
    let peer = this.props.createPeer({ initiator: true, trickle: false })
    peer.on('signal', signal => {
      let localCode = JSON.stringify(signal)
      console.log('local code:', localCode)
      this.setState({ localCode })
    })
    peer.on('connect', this.props.next)
    this.setState({ peer })
  },
  receiveCode(remoteCode) {
    let remoteSignal = JSON.parse(remoteCode)
    if(this.props.isInitiator) {
      console.log('receiving code from second peer')
      console.log(remoteSignal)
      this.state.peer.signal(remoteSignal)
    }
    else {
      console.log('receiving code from first peer')
      console.log(remoteSignal)
      let peer = this.props.createPeer({ trickle: false })
      peer.on('signal', signal => {
        let localCode = JSON.stringify(signal)
        console.log('local code:', localCode)
        this.setState({ localCode })
      })
      peer.on('connect', this.props.next)
      peer.signal(remoteSignal)
      this.setState({ peer })
    }
    this.setState({ remoteCode })
  },
  handleCancel(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.releasePeer()
    this.props.cancel()
  },
  render() {
    return <div>
      {this.renderConnectionInitiator()}
      {this.renderConnectionReceiver()}
      <button onClick={this.handleCancel}>
        Cancel
      </button>
    </div>
  },
  renderConnectionInitiator() {
    if(this.props.isInitiator) {
      return <ConnectionInitiator
        createCode={this.createCode}
        localCode={this.state.localCode}
        onRemoteCode={this.receiveCode}
      >
      </ConnectionInitiator>
    }
  },
  renderConnectionReceiver() {
    if(!this.props.isInitiator) {
      return <ConnectionReceiver
        localCode={this.state.localCode}
        onRemoteCode={this.receiveCode}
      >
      </ConnectionReceiver>
    }
  },
})

export default CodeExchanger
