import ConnectionInitiator from './connection-initiator';
import FilePicker from './file-picker';
import React from 'react';
import SendingPeer from './sending-peer';

const Send = () => (
  <SendingPeer>
    {({ code, connected, sendFile, setRemoteCode }) => {
      if (!connected) {
        return (
          <ConnectionInitiator
            code={code}
            onRemoteCode={setRemoteCode}
          />
        );
      }

      return (
        <div>
          <FilePicker onChange={sendFile} />
        </div>
      );
    }}
  </SendingPeer>
);

export default Send;
