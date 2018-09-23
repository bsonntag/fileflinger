import { decodeSignal, encodeSignal } from '/utils/signal-encoder';
import SimplePeer from 'simple-peer';

export const setRemoteCode = (peer, code) => peer.signal(decodeSignal(code));

export function createPeer(options) {
  const { initiator, onCode, onConnected, onDisconnected } = options;
  const peer = new SimplePeer({
    initiator,
    trickle: false,
  });

  peer.on('connect', onConnected);
  peer.on('signal', signal => onCode(encodeSignal(signal)));
  peer.on('close', onDisconnected);

  return peer;
}
