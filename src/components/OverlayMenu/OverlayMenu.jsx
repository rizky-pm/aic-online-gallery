import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectTag } from '../../store/tag.slice';
import { disableScroll } from '../../helper';

import './OverlayMenu.scss';
import { Link } from 'react-router-dom';
import { clearArtworks, resetPage } from '../../store/artworks.slice';
import { toggleMenu } from '../../store/page.slice';

const OverlayMenu = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.page.isMenuOpen);
  const tagData = useSelector((state) => state.tag.data);

  const selectTagHandler = (tag) => {
    dispatch(resetPage());
    dispatch(clearArtworks());
    dispatch(selectTag(tag));
    dispatch(toggleMenu());
  };

  useEffect(() => {
    disableScroll(isMenuOpen);
  }, [isMenuOpen]);

  return (
    <div
      className={`home__overlay ${isMenuOpen ? 'home__overlay--active' : ''}`}
    >
      <div className='home__overlay--content'>
        <Link
          className='menu--link'
          to='/'
          onClick={() => selectTagHandler('')}
        >
          Explore
        </Link>
        {tagData?.map((item) => (
          <Link
            key={item.id}
            className='menu--link'
            to={`/t/${item.title}`}
            onClick={() => selectTagHandler('')}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OverlayMenu;
