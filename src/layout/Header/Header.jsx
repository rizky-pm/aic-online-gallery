import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import InputComponent from '../../components/InputComponent/InputComponent';

import './Header.scss';

import { getAllArtworks } from '../../api';
import {
  querySelector,
  randomNumberWithMinMax,
  removeString,
} from '../../helper';

const PageLimit = 10;

const Header = () => {
  const [headerData, setHeaderData] = useState({});

  const location = useLocation().pathname;
  let tag = removeString(useLocation().pathname, '/t/');
  const searchQuery = removeString(useLocation().pathname, '/s/');

  const fetchAllArtworks = async () => {
    const query = tag.includes('/s/')
      ? querySelector(location, (tag = ''), searchQuery)
      : querySelector(location, tag, searchQuery);
    console.log(query);

    const response = await getAllArtworks(query);

    if (response.status === 200) {
      setHeaderData(response.data.data[randomNumberWithMinMax(0, PageLimit)]);
    }
  };

  useEffect(() => {
    fetchAllArtworks();
  }, [tag]);

  return (
    <header
      style={{
        backgroundImage: `url(https://www.artic.edu/iiif/2/${headerData?.image_id}/full/843,/0/default.jpg)`,
      }}
    >
      <div className='header--overlay'></div>
      <div className='header--content'>
        <h1 className='header--content__title'>Artlerry</h1>
        <p className='header--content__desc'>
          Museum visit from anywhere and anywhen.
        </p>
        <InputComponent type='default' />

        {headerData && (
          <div className='header--content__credit'>
            <p className='header--content__credit--artist'>
              By {headerData?.artist_title}
            </p>
            <Link
              to={`/artwork/${headerData.id}`}
              className='header--content__credit--title'
            >
              {headerData?.title}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
