import './code.css';
import React from 'react';

const Code = ({ children }) => (
  <pre className={'code'}>
    {children}
  </pre>
);

export default Code;
