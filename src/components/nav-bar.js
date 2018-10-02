import './nav-bar.css';
import NavLink from './links/nav-link';
import React from 'react';

const NavBar = () => (
  <nav className={'NavBar'}>
    <ul className={'NavBar-list'}>
      <li className={'NavBar-listItem'}>
        <NavLink to={'/send'}>
          {'Send'}
        </NavLink>
      </li>

      <li className={'NavBar-listItem'}>
        <NavLink to={'/receive'}>
          {'Receive'}
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavBar;
