import Code from './code';
import CodeForm from './code-form';
import React from 'react';

const ConnectionReceiver = ({ code, onRemoteCode }) => (
  <div>
    <CodeForm onSubmit={onRemoteCode} />

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

export default ConnectionReceiver;
