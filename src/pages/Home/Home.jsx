import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getAllArtworks } from '../../api';
import { fetchTotalData, fetchTotalPage } from '../../store/artworks.slice';

import Header from '../../layout/Header/Header';

import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();

  const fetchTotalDataHandler = async () => {
    const queryPayload = '';
    const response = await getAllArtworks(queryPayload);
    if (response.status === 200) {
      dispatch(fetchTotalData(response.data.pagination.total));
      dispatch(fetchTotalPage(response.data.pagination.total_pages));
    }
  };

  useEffect(() => {
    fetchTotalDataHandler();
  }, []);

  return (
    <section className='home__container'>
      <Header />
      <Outlet />
    </section>
  );
};

export default Home;
