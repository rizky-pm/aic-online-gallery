import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';

import ArtworkCard from '../../components/ArtworkCard/ArtworkCard';

import { getAllArtworks, getTotalPages } from '../../api';
import {
  includeString,
  querySelector,
  removeString,
  splitArray,
} from '../../helper';
import {
  addPage,
  clearArtworks,
  fetched,
  fetchTotalPage,
  resetPage,
} from '../../store/artworks.slice';

import './Artworks.scss';
import SpinComponent from '../../components/SpinComponent/SpinComponent';

const Artworks = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [splittedArray, setSplittedArray] = useState([]);

  const artworksState = useSelector((state) => state.artworks.data);
  const pageState = useSelector((state) => state.artworks.page);

  const dispatch = useDispatch();
  const location = useLocation().pathname;
  let tag = removeString(useLocation().pathname, '/t/');
  const searchQuery = removeString(useLocation().pathname, '/s/');

  const fetchAllArtworks = async (artworksPage) => {
    dispatch(addPage());
    console.log({ artworksPage });
    const query = tag.includes('/s/')
      ? querySelector(
          location,
          (tag = ''),
          searchQuery,
          artworksPage === 0 ? 1 : artworksPage + 1
        )
      : querySelector(
          location,
          tag,
          searchQuery,
          artworksPage === 0 ? 1 : artworksPage + 1
        );

    console.log(query);
    setIsFetching(true);

    const response = await getAllArtworks(query);
    setIsFetching(false);

    if (response.status === 200) {
      dispatch(fetched(response.data.data));
      dispatch(fetchTotalPage(response.data.pagination.total_pages));
    }
  };

  const fetchTotalPages = async () => {
    const query = `/search?limit=9&query[match][artwork_type_title]=${tag}&[exists][field]=image_id`;

    const response = await getTotalPages(query);

    if (response.status === 200) {
      setTotalPages(response.data.pagination.total_pages);
    }
  };

  const splitArrayHandler = (array, page) => {
    console.log(page);
    setSplittedArray(splitArray(array, page === 1 ? 3 : 3 * page));
  };

  useEffect(() => {
    console.log('Initial');
    dispatch(clearArtworks());
    fetchAllArtworks(pageState);
  }, [location]);

  useEffect(() => {
    if (artworksState.length > 0) {
      console.log('Split');
      splitArrayHandler(artworksState, pageState);
    }
  }, [artworksState]);

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
            {splittedArray[0]?.map((artwork, index) => {
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
          <Button
            block
            type='primary'
            onClick={() => {
              fetchAllArtworks(pageState);
            }}
          >
            {isFetching ? <SpinComponent /> : 'Load More'}
          </Button>
        )}
      </div>
    </section>
  );
};

export default Artworks;
