import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

import ArtworkCard from '../../components/ArtworkCard/ArtworkCard';

import { getAllArtworks } from '../../api';
import { splitArray } from '../../helper';
import { fetched } from '../../store/artworks.slice';

import './Artworks.scss';
import SpinComponent from '../../components/SpinComponent/SpinComponent';

const Artworks = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [splittedArray, setSplittedArray] = useState([]);

  const artworksState = useSelector((state) => state.artworks.data);
  const pageState = useSelector((state) => state.artworks.page);
  const dispatch = useDispatch();

  const fetchAllArtworks = async () => {
    const query = `/search?fields=artist_id,artist_title,date_start,id,image_id,alt_image_ids,title,artwork_type_title,thumbnail,artwork_type_id&query[match][artwork_type_title]=Painting${
      pageState ? `&page=${pageState + 1}` : ''
    }&limit=9`;

    setIsFetching(true);

    const response = await getAllArtworks(query);

    setIsFetching(false);

    if (response.status === 200) {
      dispatch(fetched(response.data.data));
    }
  };

  useEffect(() => {
    if (artworksState.length < 9) {
      fetchAllArtworks();
    }
  }, []);

  useEffect(() => {
    if (artworksState.length > 0) {
      setSplittedArray(
        splitArray(artworksState, pageState === 1 ? 3 : 3 * pageState)
      );
    }
  }, [artworksState]);

  return (
    <section className='artworks-container'>
      <h1>Explore Artworks</h1>
      {splittedArray && (
        <div className='artworks-container__gallery--outer'>
          <div className='artworks-container__gallery--inner'>
            {splittedArray[0]?.map((artwork) => {
              return <ArtworkCard key={artwork.id} data={artwork} />;
            })}
          </div>
          <div className='artworks-container__gallery--inner'>
            {splittedArray[1]?.map((artwork) => {
              return <ArtworkCard key={artwork.id} data={artwork} />;
            })}
          </div>
          <div className='artworks-container__gallery--inner'>
            {splittedArray[2]?.map((artwork) => {
              return <ArtworkCard key={artwork.id} data={artwork} />;
            })}
          </div>
        </div>
      )}
      <div className='artworks-container__button'>
        <Button block type='primary' onClick={fetchAllArtworks}>
          {isFetching ? <SpinComponent /> : 'Load More'}
        </Button>
      </div>
    </section>
  );
};

export default Artworks;
