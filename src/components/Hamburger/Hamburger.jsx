import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleMenu } from '../../store/page.slice';
import './Hamburger.scss';

const Hamburger = () => {
  const isMenuOpen = useSelector((state) => state.page.isMenuOpen);
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div onClick={toggleMenuHandler} className='hamburger__container'>
      <span
        className={`${
          isMenuOpen ? 'hamburger__line--active' : ''
        } hamburger__line`}
      ></span>
      <span
        className={`${
          isMenuOpen ? 'hamburger__line--active' : ''
        } hamburger__line`}
      ></span>
      <span
        className={`${
          isMenuOpen ? 'hamburger__line--active' : ''
        } hamburger__line`}
      ></span>
    </div>
  );
};

export default Hamburger;
