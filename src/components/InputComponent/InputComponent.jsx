import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import './InputComponent.scss';

const InputComponent = ({ type }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const searchHandler = async () => {
    navigate(`/s/${search}`);
  };

  return (
    <Input
      onChange={(e) => {
        setSearch(e.target.value);
      }}
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
