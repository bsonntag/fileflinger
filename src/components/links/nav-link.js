import './link.css';
import './nav-link.css';
import { NavLink as RouterNavLink } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

const NavLink = ({ children, className, ...rest }) => (
  <RouterNavLink
    className={classNames('Link', 'NavLink', className)}
    {...rest}
  >
    {children}
  </RouterNavLink>
);

export default NavLink;
