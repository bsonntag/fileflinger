import { Component } from 'react';
import { createReceivingPeer } from '/utils/peers/receiving-peer';

class ReceivingPeer extends Component {

  state = {
    blob: null,
    code: null,
    connected: false,
    file: null,
  }

  setRemoteCode = code => this.peer.setRemoteCode(code);

  initializePeer() {
    this.peer = createReceivingPeer({
      onBlob: blob => this.setState({ blob }),
      onCode: code => this.setState({ code }),
      onConnected: () => this.setState({ connected: true }),
      onDisconnected: () => {
        this.setState({ connected: false });
        this.initializePeer();
      },
      onFile: file => this.setState({ file }),
    });
  }

  componentDidMount() {
    this.initializePeer();
  }

  componentWillUnmount() {
    if (this.peer) {
      this.peer.destroy();
    }
  }

  render() {
    return this.props.children({
      ...this.state,
      setRemoteCode: this.setRemoteCode,
    });
  }

}

export default ReceivingPeer;
