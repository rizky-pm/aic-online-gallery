import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

import { getArtworkById } from '../../api';
import { IIIF_URL } from '../../constants';

import Footer from '../../layout/Footer/Footer';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import ProgresiveImage from '../../components/ProgresiveImage/ProgresiveImage';

import './Detail.scss';

const Detail = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [data, setData] = useState(null);
  const { artworkId } = useParams();

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

  useEffect(() => {
    fetchArtworkById();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
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

        {isFetching ? (
          <Skeleton.Image
            loading={isFetching}
            active
            className='detail__image--skeleton'
          />
        ) : null}

        {!isFetching ? (
          <ProgresiveImage
            src={`${IIIF_URL}${data?.image_id}/full/1686,/0/default.jpg`}
            placeholderSrc={data?.thumbnail.lqip}
            width='100%'
          />
        ) : null}

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
      <OverlayMenu />
      <Footer />
    </>
  );
};

export default Detail;
