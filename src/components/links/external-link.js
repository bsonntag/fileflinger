import './link.css';
import React from 'react';
import classNames from 'classnames';

const ExternalLink = ({ children, className, ...rest }) => (
  <a
    className={classNames('Link', className)}
    rel={'noopener'}
    target={'_blank'}
    {...rest}
  >
    {children}
  </a>
);

export default ExternalLink;
