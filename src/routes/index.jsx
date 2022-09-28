import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Detail from '../pages/Detail/Detail';

import Home from '../pages/Home/Home';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/artwork/:artworkId' element={<Detail />} />
      </Routes>
    </>
  );
};

export default Router;
