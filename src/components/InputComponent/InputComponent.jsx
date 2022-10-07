import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

import './InputComponent.scss';

const InputComponent = ({ type, onClick }) => {
  const searchInputRef = useRef(null);
  const [search, setSearch] = useState('');
  const location = useLocation().pathname;

  const onPressEnterHanlder = () => {
    if (search.length > 0) {
      onClick();
      searchInputRef.current.click();
    }
  };

  useEffect(() => {
    setSearch('');
  }, [location]);

  return (
    <Input
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      onPressEnter={onPressEnterHanlder}
      value={search}
      prefix={
        <Link
          ref={searchInputRef}
          onClick={(e) => {
            onClick();
          }}
          to={`/art-gallery/s/${search}`}
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
