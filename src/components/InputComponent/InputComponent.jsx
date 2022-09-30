import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import './InputComponent.scss';

const InputComponent = ({ type }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation().pathname;

  console.log(location);

  const searchHandler = async () => {
    navigate(`/s/${search}`);
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
