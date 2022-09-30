import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';

import ArtworkCard from '../../components/ArtworkCard/ArtworkCard';

import { getAllArtworks } from '../../api';
import {
  getQueryArtworkTypeImageId,
  includeString,
  querySelector,
  randomNumberWithMinMax,
  removeSlash,
  removeString,
  splitArray,
} from '../../helper';
import {
  clearArtworks,
  fetched,
  fetchTotalPage,
} from '../../store/artworks.slice';

import './Artworks.scss';
import SpinComponent from '../../components/SpinComponent/SpinComponent';
import { FIELDS_PARAM } from '../../constants';

const Artworks = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [splittedArray, setSplittedArray] = useState([]);

  const artworksState = useSelector((state) => state.artworks.data);
  const pageState = useSelector((state) => state.artworks.page);

  const dispatch = useDispatch();
  const location = useLocation().pathname;
  let tag = removeString(useLocation().pathname, '/t/');
  const searchQuery = removeString(useLocation().pathname, '/s/');

  const fetchAllArtworks = async () => {
    setPage((prevState) => prevState + 1);

    const query = tag.includes('/s/')
      ? querySelector(location, (tag = ''), searchQuery, page)
      : querySelector(location, tag, searchQuery);

    console.log(query);

    setIsFetching(true);

    const response = await getAllArtworks(query);
    setIsFetching(false);

    if (response.status === 200) {
      dispatch(fetched(response.data.data));
      dispatch(fetchTotalPage(response.data.pagination.total_pages));
    }
  };

  useEffect(() => {
    dispatch(clearArtworks());
    fetchAllArtworks();
  }, [location]);

  useEffect(() => {
    setSplittedArray(
      splitArray(artworksState, pageState === 1 ? 3 : 3 * pageState)
    );
  }, [artworksState, location]);

  return (
    <section className='artworks__container'>
      {includeString(tag, '/s/') && (
        <h1 className='artworks__title'>
          Showing results related to "{searchQuery}"
        </h1>
      )}
      {splittedArray && (
        <div className='artworks__gallery--outer'>
          <div className='artworks__gallery--inner'>
            {splittedArray[0]?.map((artwork) => {
              return <ArtworkCard key={artwork.id} data={artwork} />;
            })}
          </div>
          <div className='artworks__gallery--inner'>
            {splittedArray[1]?.map((artwork) => {
              return <ArtworkCard key={artwork.id} data={artwork} />;
            })}
          </div>
          <div className='artworks__gallery--inner'>
            {splittedArray[2]?.map((artwork) => {
              return <ArtworkCard key={artwork.id} data={artwork} />;
            })}
          </div>
        </div>
      )}
      <div className='artworks__button'>
        {artworksState.length > 0 && (
          <Button block type='primary' onClick={fetchAllArtworks}>
            {isFetching ? <SpinComponent /> : 'Load More'}
          </Button>
        )}
      </div>
    </section>
  );
};

export default Artworks;
