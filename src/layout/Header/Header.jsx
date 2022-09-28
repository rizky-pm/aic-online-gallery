import React, { useState, useEffect } from 'react';

import InputComponent from '../../components/InputComponent/InputComponent';

import './Header.scss';

import { getAllArtworks, getArtworkById } from '../../api';
import { randomNumberWithMinMax } from '../../helper';

const PageLimit = 9;

const Header = () => {
  const [headerData, setHeaderData] = useState({});

  const fetchAllArtworks = async () => {
    const query = `/search?fields=artist_id,artist_title,date_start,id,image_id,alt_image_ids,title,artwork_type_title,thumbnail,artwork_type_id&query[match][artwork_type_title]=Painting&limit=${PageLimit}`;

    const response = await getAllArtworks(query);

    console.log(response);
    if (response.status === 200) {
      setHeaderData(response.data.data[randomNumberWithMinMax(0, PageLimit)]);
    }
  };

  console.log(headerData);

  useEffect(() => {
    fetchAllArtworks();
  }, []);

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

        <div className='header--content__credit'>
          <p className='header--content__credit--text'>
            By {headerData?.artist_title}
          </p>
          <p className='header--content__credit--text'>{headerData?.title}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
