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
  const [splittedArray, setSplittedArray] = useState([]);

  const artworksState = useSelector((state) => state.artworks.data);
  const pageState = useSelector((state) => state.artworks.page);
  const totalPageState = useSelector((state) => state.artworks.totalPage);
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  let tag = removeString(useLocation().pathname, '/t/');
  const searchQuery = removeString(useLocation().pathname, '/s/');

  const fetchAllArtworks = async () => {
    // const query = `/search?fields=artist_id,artist_title,date_start,id,image_id,alt_image_ids,title,artwork_type_title,thumbnail,artwork_type_id${
    //   tag ? getQueryArtworkTypeImageId(tag) : ''
    // }&page=${randomNumberWithMinMax(1, 100)}&limit=9`;

    const query = tag.includes('/s/')
      ? querySelector(location, (tag = ''), searchQuery)
      : querySelector(location, tag, searchQuery);

    console.log(query);

    setIsFetching(true);

    const response = await getAllArtworks(query);
    console.log({ response });
    setIsFetching(false);

    if (response.status === 200) {
      dispatch(fetched(response.data.data));
      dispatch(fetchTotalPage(response.data.pagination.total_pages));
    }
  };

  useEffect(() => {
    if (artworksState.length < 9) {
      fetchAllArtworks();
    }
  }, [tag]);

  useEffect(() => {
    dispatch(clearArtworks());
  }, [location]);

  useEffect(() => {
    if (artworksState.length > 0) {
      setSplittedArray(
        splitArray(artworksState, pageState === 1 ? 3 : 3 * pageState)
      );
    }
  }, [artworksState]);

  return (
    <section className='artworks__container'>
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
        {artworksState && (
          <Button block type='primary' onClick={fetchAllArtworks}>
            {isFetching ? <SpinComponent /> : 'Load More'}
          </Button>
        )}
      </div>
    </section>
  );
};

export default Artworks;
