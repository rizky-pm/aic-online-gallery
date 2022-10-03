import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import { selectTag } from '../../store/tag.slice';
import { clearArtworks, resetPage } from '../../store/artworks.slice';
import './Navbar.scss';
import InputComponent from '../../components/InputComponent/InputComponent';
import { scrollToPosition } from '../../helper';

const Navbar = () => {
  const navLinksRef = useRef(null);
  const dispatch = useDispatch();
  const offsetState = useSelector((state) => state.artworks.refOffSet);

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

  return (
    <nav>
      <InputComponent onClick={scrollToPositionHandler} type='rounded' />
      <div className='nav__tag'>
        <span className='nav__btn--left' onClick={scrollToLeft}>
          <CaretLeftOutlined className='nav__btn--left__icon' />
        </span>
        <div className='link__wrapper' ref={navLinksRef}>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            end
            to='/'
            onClick={() => selectTagHandler('')}
          >
            Explore
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/paintings'
            onClick={() => selectTagHandler('Paintings')}
          >
            Paintings
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/sculptures'
            onClick={() => selectTagHandler('Sculptures')}
          >
            Sculptures
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/graphic-designs'
            onClick={() => selectTagHandler('Graphic Designs')}
          >
            Graphic Designs
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/photograph'
            onClick={() => selectTagHandler('Photograph')}
          >
            Photograph
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/mixed-media'
            onClick={() => selectTagHandler('Mixed Media')}
          >
            Mixed Media
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/textile'
            onClick={() => selectTagHandler('Textile')}
          >
            Textile
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/furniture'
            onClick={() => selectTagHandler('Furniture')}
          >
            Furniture
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/mask'
            onClick={() => selectTagHandler('Mask')}
          >
            Mask
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/decorative-arts'
            onClick={() => selectTagHandler('Decorative Arts')}
          >
            Decorative Arts
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              (isActive ? 'navbar--link__active' : undefined) + ' navbar--link'
            }
            to='/t/book'
            onClick={() => selectTagHandler('Book')}
          >
            Book
          </NavLink>
        </div>
        <span className='nav__btn--right' onClick={scrollRight}>
          <CaretRightOutlined className='nav__btn--left__icon' />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
