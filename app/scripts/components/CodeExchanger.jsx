import _ from 'lodash'
import React, { PropTypes } from 'react'

import SignalEncoder from '../helpers/signal-encoder'

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
    let peer = this.createPeer()
    this.setState({ peer })
  },
  createPeer() {
    let peer = this.props.createPeer({
      initiator: this.props.isInitiator,
      trickle: false,
    })
    peer.on('signal', this.setLocalCode)
    peer.on('connect', this.props.next)
    return peer
  },
  setLocalCode(signal) {
    let localCode = SignalEncoder.encode(signal)
    this.setState({ localCode })
  },
  receiveCode(remoteCode) {
    let remoteSignal = SignalEncoder.decode(remoteCode)
    if(this.props.isInitiator) {
      this.state.peer.signal(remoteSignal)
    }
    else {
      let peer = this.createPeer()
      peer.signal(remoteSignal)
      this.setState({ peer })
    }
    this.setState({ remoteCode })
  },
  handleCancel(event) {
    if(event) {
      event.preventDefault()
      event.stopPropagation()
    }
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
