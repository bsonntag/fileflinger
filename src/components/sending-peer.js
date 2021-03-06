import { Component } from 'react';
import { createSendingPeer } from '/utils/peers/sending-peer';

class SendingPeer extends Component {

  state = {
    code: null,
    connected: false,
  };

  setRemoteCode = code => this.peer.setRemoteCode(code);

  sendFile = file => file && this.peer.sendFile(file);

  initializePeer() {
    this.peer = createSendingPeer({
      onCode: code => this.setState({ code }),
      onConnected: () => this.setState({ connected: true }),
      onDisconnected: () => {
        if (this.peer) {
          this.setState({ connected: false });
          this.initializePeer();
        }
      },
    });
  }

  componentDidMount() {
    this.initializePeer();
  }

  componentWillUnmount() {
    const peer = this.peer;

    if (peer) {
      this.peer = null;
      peer.destroy();
    }
  }

  render() {
    return this.props.children({
      ...this.state,
      sendFile: this.sendFile,
      setRemoteCode: this.setRemoteCode,
    });
  }

}

export default SendingPeer;
