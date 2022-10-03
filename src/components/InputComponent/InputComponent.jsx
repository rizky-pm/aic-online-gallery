import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { resetPage } from '../../store/artworks.slice';

import './InputComponent.scss';

const InputComponent = ({ type, onClick }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const dispatch = useDispatch();

  const searchHandler = async () => {
    navigate(`/s/${search}`);
    onClick();
  };

  useEffect(() => {
    setSearch('');
  }, [location]);

  return (
    <Input
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      value={search}
      prefix={
        <SearchOutlined
          onClick={() => {
            searchHandler();
            dispatch(resetPage());
          }}
          className='input-search-component'
        />
      }
      className={type}
      placeholder='Search by artist, title, or keyword'
    />
  );
};

export default InputComponent;
