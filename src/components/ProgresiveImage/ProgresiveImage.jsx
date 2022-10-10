import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { includeString } from '../../helper';

import './ProgresiveImage.scss';

const ProgresiveImage = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const location = useLocation();

  const linkRef = useRef(null);

  const imageClickHandler = () => {
    if (includeString(location.pathname, '/artwork/')) {
      console.log(linkRef.current.click());
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return (
    <>
      <img
        {...{ src: imgSrc, ...props }}
        alt={props.alt || ''}
        onClick={imageClickHandler}
        className='progresive-image'
      />
      <a
        ref={linkRef}
        href={src}
        target='_blank'
        rel='noopener noreferrer'
        style={{
          display: 'none',
        }}
      >
        Open in new tab
      </a>
    </>
  );
};

export default ProgresiveImage;
