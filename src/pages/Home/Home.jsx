import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { getAllArtworks } from '../../api';
import { fetchTotalPage } from '../../store/artworks.slice';

import Header from '../../layout/Header/Header';

import './Home.scss';
import OverlayMenu from '../../components/OverlayMenu/OverlayMenu';
import Footer from '../../layout/Footer/Footer';
import { querySelector, removeString, uniqueRandomNumber } from '../../helper';

const Home = () => {
  const [usedPage, setUsedPage] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  let tag = removeString(useLocation().pathname, '/art-gallery/t/');
  const searchQuery = removeString(useLocation().pathname, '/art-gallery/s/');
  const totalPageState = useSelector((state) => state.artworks.totalPage);

  const fetchTotalDataHandler = async () => {
    const page = uniqueRandomNumber(
      1,
      totalPageState > 100 ? 100 : totalPageState,
      usedPage,
      setUsedPage
    );

    const query = tag.includes('/art-gallery/s/')
      ? querySelector(location, (tag = ''), searchQuery, page)
      : querySelector(location, tag, searchQuery, page);

    const response = await getAllArtworks(query);
    if (response.status === 200) {
      dispatch(fetchTotalPage(response.data.pagination.total_pages));
    }
  };

  useEffect(() => {
    fetchTotalDataHandler();
  }, [location]);

  return (
    <section className='home__container'>
      <Header />
      <Outlet />
      <OverlayMenu />
      <Footer />
    </section>
  );
};

export default Home;
