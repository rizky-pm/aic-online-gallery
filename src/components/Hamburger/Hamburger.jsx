import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleMenu } from '../../store/page.slice';
import './Hamburger.scss';

const Hamburger = () => {
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div onClick={toggleMenuHandler} className='hamburger__container'>
      <span className={`hamburger__line`}></span>
      <span className={`hamburger__line`}></span>
      <span className={`hamburger__line`}></span>
    </div>
  );
};

export default Hamburger;
