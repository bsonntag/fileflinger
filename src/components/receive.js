import ConnectionReceiver from './connection-receiver';
import React, { Component, Fragment } from 'react';

class Receive extends Component {

  state = {
    blob: null,
    file: null,
    peer: null,
  }

  handleConnection = peer => {
    this.setState({ peer });

    peer.on('data', data => {
      const { file } = this.state;

      if (!file) {
        this.setState({ file: JSON.parse(String(data)) });
        peer.send('ok');

        return;
      }

      const blob = new Blob([data], { type: 'application/octet-stream' });

      this.setState({ blob });
    });
  }

  componentWillUnmount() {
    const { peer } = this.state;

    if (peer) {
      peer.destroy();
    }
  }

  render() {
    const { blob, file, peer } = this.state;

    if (!peer) {
      return <ConnectionReceiver onConnected={this.handleConnection} />;
    }

    return (
      <div>
        {!file ? 'Waiting...' : (
          <Fragment>
            <div>
              {'File: '}
              {file.name}
            </div>

            <div>
              {'Size: '}
              {file.size}
            </div>
          </Fragment>
        )}

        {blob && (
          <a
            download={file.name}
            href={URL.createObjectURL(blob)}
          >
            {'Download'}
          </a>
        )}
      </div>
    );
  }

}

export default Receive;
