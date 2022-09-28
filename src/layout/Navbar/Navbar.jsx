import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav>
      <NavLink
        className={({ isActive }) =>
          (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
        }
        to='/'
      >
        Artworks
      </NavLink>
      <NavLink className='navbar--link' to='/Home'>
        Home
      </NavLink>
    </nav>
  );
};

export default Navbar;
