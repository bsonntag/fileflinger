import ConnectionReceiver from './connection-receiver';
import React, { Fragment } from 'react';
import ReceivingPeer from './receiving-peer';

const Receive = () => (
  <ReceivingPeer>
    {({ blob, code, connected, file, setRemoteCode }) => {
      if (!connected) {
        return (
          <ConnectionReceiver
            code={code}
            onRemoteCode={setRemoteCode}
          />
        );
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
    }}
  </ReceivingPeer>
);

export default Receive;
