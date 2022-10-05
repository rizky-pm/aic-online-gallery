import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import { selectTag, fetchTagData } from '../../store/tag.slice';
import { clearArtworks, resetPage } from '../../store/artworks.slice';
import './Navbar.scss';
import InputComponent from '../../components/InputComponent/InputComponent';
import Hamburger from '../../components/Hamburger/Hamburger';
import { scrollToPosition } from '../../helper';
import { getAllArtworkTypes } from '../../api';

const Navbar = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [navbarData, setNavbarData] = useState([]);

  const navLinksRef = useRef(null);
  const dispatch = useDispatch();
  const offsetState = useSelector((state) => state.artworks.refOffSet);
  const isMenuOpen = useSelector((state) => state.page.isMenuOpen);

  const fetchAllArtworkTypes = async () => {
    setIsFetching(true);
    const res = await getAllArtworkTypes();
    setIsFetching(false);

    if (res.status === 200) {
      dispatch(fetchTagData(res.data.data));
      setNavbarData(res.data.data);
    }
  };

  const scrollToPositionHandler = () => {
    scrollToPosition(offsetState);
  };

  const scrollToLeft = () => {
    navLinksRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    navLinksRef.current.scrollLeft += 300;
  };

  const selectTagHandler = (tag) => {
    dispatch(resetPage());
    dispatch(clearArtworks());
    dispatch(selectTag(tag));
  };

  useEffect(() => {
    fetchAllArtworkTypes();
  }, []);

  return (
    <nav className={`${isMenuOpen ? 'nav__menu--open' : 'nav__menu--close'}`}>
      <InputComponent onClick={scrollToPositionHandler} type='rounded' />
      <div className='nav__tag'>
        <div className='nav__tag--hamburger'>
          <Hamburger />
        </div>
        {navbarData.length > 0 ? (
          <span className='nav__btn--left' onClick={scrollToLeft}>
            <CaretLeftOutlined className='nav__btn--left__icon' />
          </span>
        ) : null}
        <div className='link__wrapper' ref={navLinksRef}>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/'
            onClick={() => selectTagHandler('')}
          >
            Explore
          </NavLink>
          {navbarData?.map((item) => (
            <NavLink
              key={item.id}
              className={({ isActive }) =>
                (isActive ? 'navbar--link__active' : undefined) +
                ' navbar--link'
              }
              to={`/t/${item.title}`}
              onClick={() => selectTagHandler('')}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
        {navbarData.length > 0 ? (
          <span className='nav__btn--right' onClick={scrollRight}>
            <CaretRightOutlined className='nav__btn--right__icon' />
          </span>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
