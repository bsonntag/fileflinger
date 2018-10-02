import './link.css';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

const Link = ({ children, className, ...rest }) => (
  <RouterLink
    className={classNames('Link', className)}
    {...rest}
  >
    {children}
  </RouterLink>
);

export default Link;
