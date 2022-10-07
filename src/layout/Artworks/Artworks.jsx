import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from 'antd';

import ArtworkCard from '../../components/ArtworkCard/ArtworkCard';

import { getAllArtworks, getTotalPages } from '../../api';
import {
  includeString,
  querySelector,
  randomNumberWithMinMax,
  removeString,
  splitArray,
  uniqueRandomNumber,
} from '../../helper';
import {
  addPage,
  clearArtworks,
  fetched,
  fetchTotalPage,
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
  const { keyword } = useParams();

  let tag = removeString(useLocation().pathname, '/art-gallery/t/');
  const searchQuery = removeString(useLocation().pathname, '/art-gallery/s/');
  const sectionRef = useRef(null);

  const fetchAllArtworks = async (artworksPage) => {
    dispatch(addPage());
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

    setIsFetching(true);

    const response = await getAllArtworks(query);

    if (response.status === 200) {
      dispatch(fetched(response.data.data));
      dispatch(fetchTotalPage(response.data.pagination.total_pages));
    }

    setIsFetching(false);
  };

  const fetchTotalPages = async () => {
    let page = 1;

    const query = tag.includes('/art-gallery/s/')
      ? querySelector(location, (tag = ''), searchQuery, page)
      : querySelector(location, tag, searchQuery, page);
    const response = await getTotalPages(query);

    if (response.status === 200) {
      fetchTotalPage(response.data.pagination.total_pages);
    }
  };

  const splitArrayHandler = (array, page) => {
    setSplittedArray(splitArray(array, page === 1 ? 3 : 3 * page));
  };

  useEffect(() => {
    dispatch(resetPage());
  }, []);

  useEffect(() => {
    dispatch(clearArtworks());
    fetchAllArtworks(pageState);
    fetchTotalPages();
    setUsedPage([]);

    if (sectionRef) {
      dispatch(setRefOffSet(sectionRef.current.offsetTop));
    }
  }, [location, keyword]);

  useEffect(() => {
    if (artworksState.length > 0) {
      splitArrayHandler(artworksState, pageState);
    }
  }, [artworksState]);

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
        {artworksState.length > 0 && pageState <= totalPageState ? (
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
