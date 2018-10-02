import './header.css';
import Link from './links/link';
import NavBar from './nav-bar';
import React from 'react';

const Header = () => (
  <header className={'Header'}>
    <Link to={'/'}>
      <h1>
        {'File Flinger'}
      </h1>
    </Link>

    <NavBar />
  </header>
);

export default Header;
