import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import InputComponent from '../../components/InputComponent/InputComponent';

import './Header.scss';

import { getAllArtworks } from '../../api';
import {
  querySelector,
  randomNumberWithMinMax,
  removeString,
  scrollToPosition,
  uniqueRandomNumber,
} from '../../helper';
import ProgresiveImage from '../../components/ProgresiveImage/ProgresiveImage';
import { IIIF_URL } from '../../constants';
import { resetPage } from '../../store/artworks.slice';

const Header = () => {
  const [headerData, setHeaderData] = useState({});
  const [usedPage, setUsedPage] = useState([]);

  const pageState = useSelector((state) => state.artworks.page);
  const totalPageState = useSelector((state) => state.artworks.totalPage);

  const dispatch = useDispatch();
  const location = useLocation().pathname;
  let tag = removeString(useLocation().pathname, '/art-gallery/t/');
  const searchQuery = removeString(useLocation().pathname, '/art-gallery/s/');
  const offsetState = useSelector((state) => state.artworks.refOffSet);

  const scrollToPositionHandler = () => {
    scrollToPosition(offsetState);
  };

  const fetchAllArtworks = async () => {
    const page = uniqueRandomNumber(
      1,
      totalPageState > 100 ? 100 : totalPageState,
      usedPage,
      setUsedPage
    );

    const query = tag.includes('/art-gallery/s/')
      ? querySelector(location, (tag = ''), searchQuery, page)
      : querySelector(location, tag, searchQuery, page);

    const response = await getAllArtworks(query);
    if (response.status === 200) {
      setHeaderData(response.data.data[randomNumberWithMinMax(0, 8)]);
    }
  };

  useEffect(() => {
    dispatch(resetPage());
  }, []);

  useEffect(() => {
    if (totalPageState > 0) {
      fetchAllArtworks(pageState);
    }

    setUsedPage([]);
  }, [totalPageState]);

  useEffect(() => {
    setHeaderData({});
  }, [location]);

  return (
    <header>
      {headerData?.thumbnail?.lqip ? (
        <ProgresiveImage
          src={`${IIIF_URL}${headerData?.image_id}/full/843,/0/default.jpg`}
          placeholderSrc={headerData?.thumbnail?.lqip}
          width='100%'
          height='100%'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            backgroundSize: 'cover',
          }}
        />
      ) : null}
      <div className='header--overlay'></div>
      <div className='header--content'>
        <h1 className='header--content__title'>Art Gallery</h1>
        <p className='header--content__desc'>
          Home to a collection of art that spans centuries and the globe.
        </p>
        <InputComponent type='default' onClick={scrollToPositionHandler} />

        <div className='header--content__credit'>
          {headerData?.artist_title ? (
            <p className='header--content__credit--artist'>
              By {headerData?.artist_title}
            </p>
          ) : null}
          <Link
            to={`artwork/${headerData?.id}`}
            className='header--content__credit--title'
          >
            {headerData?.title}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
