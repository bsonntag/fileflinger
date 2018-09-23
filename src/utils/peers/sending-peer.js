import { createPeer, setRemoteCode } from './common';

function sendFile(peer, file) {
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

export function createSendingPeer(options) {
  const peer = createPeer({ initiator: true, ...options });

  return {
    destroy: () => peer.destroy(),
    sendFile: file => sendFile(peer, file),
    setRemoteCode: code => setRemoteCode(peer, code),
  };
}
