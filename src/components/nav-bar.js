import './nav-bar.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <NavLink
          className={'nav-link'}
          to={'/send'}
        >
          {'Send'}
        </NavLink>
      </li>

      <li>
        <NavLink
          className={'nav-link'}
          to={'/receive'}
        >
          {'Receive'}
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavBar;
