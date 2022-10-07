import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

import { getArtworkById } from '../../api';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import { IIIF_URL } from '../../constants';
import Footer from '../../layout/Footer/Footer';
import './Detail.scss';

const Detail = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [data, setData] = useState(null);
  const { artworkId } = useParams();

  const imageLinkRef = useRef(null);
  const imageRef = useRef(null);

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

  const onImageLoadedHandler = () => {
    setImageLoaded(true);
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
        <div
          style={{
            height: '100vh',
          }}
        ></div>
      ) : (
        <section className='detail__container'>
          <div className='detail__header'>
            <Skeleton
              className='detail__header__title--skeleton'
              title={{ width: '50%' }}
              loading={isFetching}
              active
              paragraph={false}
            >
              <h1 className='detail__header__title'>
                {data?.title} ({data?.date_start})
              </h1>
            </Skeleton>
            <Skeleton
              className='detail__header__artist--skeleton'
              loading={isFetching}
              active
              paragraph={false}
            >
              <p className='detail__header__artist'>By {data?.artist_title}</p>
            </Skeleton>
          </div>

          {!imageLoaded ? (
            <Skeleton.Image
              loading={isFetching}
              active
              className='detail__image--skeleton'
            />
          ) : null}

          <div className='detail__wrapper__image'>
            {data?.image_id ? (
              <>
                <img
                  ref={imageRef}
                  src={`${IIIF_URL}${data?.image_id}/full/1686,/0/default.jpg`}
                  alt=''
                  style={{ display: imageLoaded ? 'block' : 'none' }}
                  className='detail__image'
                  onClick={imageClickHandler}
                  onLoad={onImageLoadedHandler}
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
          <Skeleton
            className='detail__header__description--skeleton'
            loading={isFetching}
            active={isFetching}
            title={false}
            paragraph={{ rows: 3 }}
          >
            <p className='detail__description'>{data?.thumbnail.alt_text}</p>
          </Skeleton>
        </section>
      )}
      <OverlayMenu />
      <Footer />
    </>
  );
};

export default Detail;
