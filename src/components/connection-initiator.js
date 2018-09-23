import Code from './code';
import CodeForm from './code-form';
import React, { Fragment } from 'react';

const ConnectionInitiator = ({ code, onRemoteCode }) => (
  <div>
    {!code ? 'Initializing...' : (
      <Fragment>
        <div>
          {'Your code:'}

          <Code>
            {code}
          </Code>
        </div>

        <CodeForm onSubmit={onRemoteCode} />
      </Fragment>
    )}
  </div>
);

export default ConnectionInitiator;
