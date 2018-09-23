import { decodeSignal, encodeSignal } from '/utils/signal-encoder';
import Code from './code';
import CodeForm from './code-form';
import React, { Component } from 'react';
import SimplePeer from 'simple-peer';

class ConnectionInitiator extends Component {

  state = {
    code: null,
  };

  initializePeer = () => {
    this.peer = new SimplePeer({
      initiator: true,
      trickle: false,
    });

    this.peer.on('connect', () => this.props.onConnected(this.peer));

    this.peer.on('signal', signal => {
      const code = encodeSignal(signal);

      this.setState({ code });
    });
  }

  handleRemoteCode = code => {
    const signal = decodeSignal(code);

    this.peer.signal(signal);
  }

  render() {
    const { code } = this.state;

    return (
      <div>
        {code ? (
          <div>
            {'Your code:'}

            <Code>
              {code}
            </Code>

            <CodeForm onSubmit={this.handleRemoteCode} />
          </div>
        ) : (
          <button onClick={this.initializePeer}>
            {'Generate a code'}
          </button>
        )}
      </div>
    );
  }

}

export default ConnectionInitiator;
