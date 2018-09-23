import { decodeSignal, encodeSignal } from '/utils/signal-encoder';
import Code from './code';
import CodeForm from './code-form';
import React, { Component } from 'react';
import SimplePeer from 'simple-peer';

class ConnectionReceiver extends Component {

  state = {
    code: null,
  }

  handleRemoteCode = code => {
    this.peer = new SimplePeer({
      initiator: false,
      trickle: false,
    });

    this.peer.on('connect', () => this.props.onConnected(this.peer));

    this.peer.on('signal', signal => {
      const code = encodeSignal(signal);

      this.setState({ code });
    });

    const signal = decodeSignal(code);

    this.peer.signal(signal);
  }

  render() {
    const { code } = this.state;

    return (
      <div>
        <CodeForm onSubmit={this.handleRemoteCode} />

        {code && (
          <div>
            {'Your code:'}

            <Code>
              {code}
            </Code>
          </div>
        )}
      </div>
    );
  }

}

export default ConnectionReceiver;
