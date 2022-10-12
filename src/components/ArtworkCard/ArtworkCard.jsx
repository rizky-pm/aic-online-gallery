import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getArtworkById } from '../../api';
import { FIELDS_PARAM, IIIF_URL } from '../../constants';

import './ArtworkCard.scss';
import ProgresiveImage from '../ProgresiveImage/ProgresiveImage';

const ArtworkCard = ({ data }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [lqipThumbnail, setLqipThumbnail] = useState('');
  const [artworkDetail, setArtworkDetail] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const fetchArtworkById = async () => {
    const query = `/?${FIELDS_PARAM}`;

    setIsFetching(true);
    const response = await getArtworkById(data.id, query);

    if (response.status === 200) {
      setIsFetching(false);
      setArtworkDetail(response.data.data);
      setLqipThumbnail(response.data.data.thumbnail?.lqip);
    }
  };

  const onClickHandler = () => {
    navigate('/art-gallery/artwork/' + artworkDetail.id);
  };

  useEffect(() => {
    fetchArtworkById();
  }, []);

  return isFetching ? null : (
    <div
      className='artwork'
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={onClickHandler}
      style={{
        display: artworkDetail?.image_id ? 'block' : 'none',
      }}
    >
      {lqipThumbnail ? (
        <ProgresiveImage
          src={`${IIIF_URL}${artworkDetail?.image_id}/full/600,/0/default.jpg`}
          placeholderSrc={lqipThumbnail}
          width='100%'
          height='100%'
        />
      ) : null}

      <div
        className={`${
          isHovered ? 'artwork--overlay__hovered' : ''
        } artwork--overlay`}
      >
        <div className='artwork--overlay--meta'>
          <p className='artwork--overlay--meta__artist'>
            {artworkDetail?.artist_title}
          </p>
          <p className='artwork--overlay--meta__title'>
            {artworkDetail?.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
