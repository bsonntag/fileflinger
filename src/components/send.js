import ConnectionInitiator from './connection-initiator';
import FilePicker from './file-picker';
import React, { Component } from 'react';

class Send extends Component {

  state = {
    peer: null,
  }

  handleConnection = peer => {
    this.setState({ peer });
  }

  sendFile = file => {
    if (!file) {
      return;
    }

    const { peer } = this.state;

    peer.on('data', data => {
      if (String(data) === 'ok') {
        peer.send(file);
      }
    });

    peer.send(JSON.stringify({
      name: file.name,
      size: file.size,
    }));
  }

  componentWillUnmount() {
    const { peer } = this.state;

    if (peer) {
      peer.destroy();
    }
  }

  render() {
    const { peer } = this.state;

    if (!peer) {
      return <ConnectionInitiator onConnected={this.handleConnection} />;
    }

    return (
      <div>
        <FilePicker onChange={this.sendFile} />
      </div>
    );
  }

}

export default Send;
