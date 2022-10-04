import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { getArtworkById } from '../../api';
import { IIIF_URL } from '../../constants';
import './Detail.scss';

const Detail = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const { artworkId } = useParams();

  console.log(data);

  const imageLinkRef = useRef(null);

  const fetchArtworkById = async () => {
    const query =
      '?fields=artist_id,artist_title,date_start,id,image_id,alt_image_ids,title,artwork_type_title,artwork_type_id,thumbnail,dimensions';

    setIsFetching(true);
    const response = await getArtworkById(artworkId, query);
    setIsFetching(false);

    if (response.status === 200) {
      setData(response.data.data);
    }
  };

  const imageClickHandler = () => {
    imageLinkRef.current.click();
  };

  useEffect(() => {
    fetchArtworkById();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      {isFetching ? (
        <h1>Loading</h1>
      ) : (
        <section className='detail__container'>
          <div className='detail__header'>
            <h1 className='detail__header__title'>
              {data?.title} ({data?.date_start})
            </h1>
            <p className='detail__header__artist'>By {data?.artist_title}</p>
          </div>
          <div className='detail__wrapper__image'>
            {data?.image_id ? (
              <>
                <img
                  src={`${IIIF_URL}${data?.image_id}/full/1686,/0/default.jpg`}
                  alt=''
                  className='detail__image'
                  loading='lazy'
                  onClick={imageClickHandler}
                />
                <a
                  ref={imageLinkRef}
                  href={`${IIIF_URL}${data?.image_id}/full/1686,/0/default.jpg`}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    display: 'none',
                  }}
                >
                  Open in new tab
                </a>
              </>
            ) : null}
          </div>
          <p className='detail__description'>{data?.thumbnail.alt_text}</p>
        </section>
      )}
    </>
  );
};

export default Detail;
