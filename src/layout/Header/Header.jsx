import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import InputComponent from '../../components/InputComponent/InputComponent';

import './Header.scss';

import { getAllArtworks } from '../../api';
import {
  getQueryArtworkTypeImageId,
  randomNumberWithMinMax,
  removeSlash,
} from '../../helper';

const PageLimit = 10;

const Header = () => {
  const [headerData, setHeaderData] = useState({});
  const tag = removeSlash(useLocation().pathname);

  const fetchAllArtworks = async () => {
    const query = `/search?fields=artist_id,artist_title,date_start,id,image_id,alt_image_ids,title,artwork_type_title,thumbnail,artwork_type_id${
      tag ? getQueryArtworkTypeImageId(tag) : ''
    }&limit=${PageLimit}&page=${randomNumberWithMinMax(1, 100)}`;

    const response = await getAllArtworks(query);

    if (response.status === 200) {
      setHeaderData(response.data.data[randomNumberWithMinMax(0, PageLimit)]);
    }
  };

  console.log({ headerData });

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
        <h1 className='header--content__title'>Artstyle</h1>
        <p className='header--content__desc'>
          Museum visit from anywhere and anywhen.
        </p>
        <InputComponent />

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
