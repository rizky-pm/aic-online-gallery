import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

import './InputComponent.scss';

const InputComponent = ({ type, onClick }) => {
  const [search, setSearch] = useState('');
  const location = useLocation().pathname;

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
        <Link
          onClick={() => {
            onClick();
          }}
          to={`/s/${search}`}
        >
          <SearchOutlined className='input-search-component' />
        </Link>
      }
      className={type}
      placeholder='Search by artist, title, or keyword'
    />
  );
};

export default InputComponent;
