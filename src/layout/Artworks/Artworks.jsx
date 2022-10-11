import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';

import ArtworkCard from '../../components/ArtworkCard/ArtworkCard';

import { getAllArtworks } from '../../api';
import {
  includeString,
  querySelector,
  removeString,
  splitArray,
  uniqueRandomNumber,
} from '../../helper';
import {
  addPage,
  clearArtworks,
  fetched,
  resetPage,
  setRefOffSet,
} from '../../store/artworks.slice';

import './Artworks.scss';
import SpinComponent from '../../components/SpinComponent/SpinComponent';

const Artworks = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [splittedArray, setSplittedArray] = useState([]);
  const [usedPage, setUsedPage] = useState([]);

  const artworksState = useSelector((state) => state.artworks.data);
  const pageState = useSelector((state) => state.artworks.page);
  const totalPageState = useSelector((state) => state.artworks.totalPage);

  const dispatch = useDispatch();
  const location = useLocation().pathname;

  let tag = removeString(useLocation().pathname, '/art-gallery/t/');
  const searchQuery = removeString(useLocation().pathname, '/art-gallery/s/');
  const sectionRef = useRef(null);

  const fetchAllArtworks = async () => {
    dispatch(addPage());
    const page = uniqueRandomNumber(
      1,
      totalPageState > 100 ? 100 : totalPageState,
      usedPage,
      setUsedPage
    );

    const query = tag.includes('/art-gallery/s/')
      ? querySelector(location, (tag = ''), searchQuery, page)
      : querySelector(location, tag, searchQuery, page);

    setIsFetching(true);

    const response = await getAllArtworks(query);

    if (response.status === 200) {
      dispatch(fetched(response.data.data));
    }

    setIsFetching(false);
  };

  const splitArrayHandler = (array, page) => {
    setSplittedArray(splitArray(array, page === 1 ? 3 : 3 * page));
  };

  useEffect(() => {
    dispatch(resetPage());
  }, []);

  useEffect(() => {
    dispatch(clearArtworks());

    if (totalPageState > 0) {
      fetchAllArtworks(pageState);
    }

    setSplittedArray([]);

    if (sectionRef) {
      dispatch(setRefOffSet(sectionRef.current.offsetTop));
    }
  }, [totalPageState]);

  useEffect(() => {
    if (artworksState.length > 0) {
      splitArrayHandler(artworksState, pageState);
    }
  }, [artworksState]);

  useEffect(() => {
    setUsedPage([]);
  }, [location]);

  return (
    <section ref={sectionRef} className='artworks__container'>
      {includeString(tag, '/art-gallery/s/') && (
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
        {usedPage.length !== totalPageState ? (
          <Button
            block
            type='primary'
            onClick={() => {
              fetchAllArtworks(pageState);
            }}
          >
            {isFetching ? <SpinComponent /> : 'Load More'}
          </Button>
        ) : null}
      </div>
    </section>
  );
};

export default Artworks;
