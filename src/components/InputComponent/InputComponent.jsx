import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

import { clearArtworks, resetPage } from '../../store/artworks.slice';
import './InputComponent.scss';

const InputComponent = ({ type, onClick }) => {
  const searchInputRef = useRef(null);
  const [search, setSearch] = useState('');
  const location = useLocation().pathname;
  const dispatch = useDispatch();

  const onPressEnterHandler = () => {
    if (search.length > 0) {
      onClick();
      searchInputRef.current.click();
      dispatch(resetPage());
      dispatch(clearArtworks());
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
      onPressEnter={onPressEnterHandler}
      type='text'
      value={search}
      tabIndex='-1'
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
