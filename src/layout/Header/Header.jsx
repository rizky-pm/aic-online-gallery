import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import InputComponent from '../../components/InputComponent/InputComponent';

import './Header.scss';

import { getAllArtworks, getTotalPages } from '../../api';
import {
  querySelector,
  randomNumberWithMinMax,
  removeString,
  scrollToPosition,
  uniqueRandomNumber,
} from '../../helper';
import ProgresiveImage from '../../components/ProgresiveImage/ProgresiveImage';
import { IIIF_URL } from '../../constants';

const Header = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [headerData, setHeaderData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usedPage, setUsedPage] = useState([]);

  const totalPageState = useSelector((state) => state.artworks.totalPage);

  const location = useLocation().pathname;
  let tag = removeString(useLocation().pathname, '/art-gallery/t/');
  const searchQuery = removeString(useLocation().pathname, '/art-gallery/s/');
  const offsetState = useSelector((state) => state.artworks.refOffSet);

  const scrollToPositionHandler = () => {
    scrollToPosition(offsetState);
  };

  const fetchAllArtworks = async () => {
    setPage((prevState) => prevState + 1);
    setIsFetching(true);

    const query = tag.includes('/art-gallery/s/')
      ? querySelector(
          location,
          (tag = ''),
          searchQuery,
          uniqueRandomNumber(
            0,
            totalPageState > 100 ? 100 : totalPageState,
            usedPage,
            setUsedPage
          )
        )
      : querySelector(
          location,
          tag,
          searchQuery,
          uniqueRandomNumber(
            0,
            totalPageState > 100 ? 100 : totalPageState,
            usedPage,
            setUsedPage
          )
        );

    const response = await getAllArtworks(query);
    setIsFetching(false);

    if (response.status === 200) {
      setHeaderData(response.data.data[randomNumberWithMinMax(0, 8)]);
    }
  };

  const fetchTotalPages = async () => {
    const query = `/search?limit=9&query[match][artwork_type_title]=${tag}&[exists][field]=image_id`;

    const response = await getTotalPages(query);

    if (response.status === 200) {
      setTotalPages(response.data.pagination.total_pages);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchTotalPages();
    fetchAllArtworks();
    setUsedPage([]);
  }, [location]);

  return (
    <header
    // style={{
    //   backgroundImage: `url(https://www.artic.edu/iiif/2/${headerData?.image_id}/full/843,/0/default.jpg)`,
    // }}
    >
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
            // backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // backgroundPosition: 'center',
            // height: '90vh',
          }}
        />
      ) : null}
      <div className='header--overlay'></div>
      <div className='header--content'>
        <h1 className='header--content__title'>Art Galleryy</h1>
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
