import React from 'react';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className='footer__container'>
      <p className='footer__description'>
        Art Gallery showing artworks colletion from{' '}
        <a
          className='footer__list--item__link'
          href='https://www.artic.edu/'
          target='_blank'
          rel='noreferrer'
        >
          Art Institute of Chicago
        </a>
        .{' '}
        <a
          className='footer__list--item__link'
          href='https://www.artic.edu/'
          target='_blank'
          rel='noreferrer'
        >
          Art Institute of Chicago
        </a>{' '}
        recognize that all art is made in a particular context, demanding
        continual, dynamic reconsideration in the present.
      </p>
      <ul className='footer__list--container'>
        <li className='footer__list--item'>
          <a
            className='footer__list--item__link'
            href='https://www.artic.edu/'
            target='_blank'
            rel='noreferrer'
          >
            Art Institute of Chicago
          </a>
        </li>
        <li className='footer__list--item'>
          <a
            className='footer__list--item__link'
            href='https://www.artic.edu/image-licensing'
            target='_blank'
            rel='noreferrer'
          >
            Image Licensing
          </a>
        </li>
        <li className='footer__list--item'>
          <a
            className='footer__list--item__link'
            href='https://api.artic.edu/docs/'
            target='_blank'
            rel='noreferrer'
          >
            Art Institute of Chicago API
          </a>
        </li>
        <li className='footer__list--item'>
          Made by{' '}
          <a
            className='footer__list--item__link'
            href='https://github.com/rizky-pm'
            target='_blank'
            rel='noreferrer'
          >
            Rizky Putra Mahendra
          </a>{' '}
          🔥
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
