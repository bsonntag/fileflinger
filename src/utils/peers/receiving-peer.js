import { createPeer, setRemoteCode } from './common';

export function createReceivingPeer(options) {
  const { onBlob, onFile, ...rest } = options;
  const peer = createPeer({ initiator: false, ...rest });
  let fileDataReceived = false;

  peer.on('data', data => {
    if (!fileDataReceived) {
      fileDataReceived = true;
      onFile(JSON.parse(String(data)));
      peer.send('ok');
    } else {
      onBlob(new Blob([data], { type: 'application/octet-stream' }));
    }
  });

  return {
    destroy: () => peer.destroy(),
    setRemoteCode: code => setRemoteCode(peer, code),
  };
}
