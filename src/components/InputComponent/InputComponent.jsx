import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { fetched, clearArtworks } from '../../store/artworks.slice';
import { getSearchedArtworks } from '../../api/artwork.services';
import { randomNumberWithMinMax } from '../../helper';

import './InputComponent.scss';
import { FIELDS_PARAM } from '../../constants';

const InputComponent = ({ type }) => {
  const [search, setSearch] = useState('');
  const artworkState = useSelector((state) => state.artworks.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = async () => {
    navigate(`/s/${search}`);
    // if (search) {
    //   const query = `?q=${search}${FIELDS_PARAM}&page=1&limit=9`;
    //   console.log(query);
    //   const response = await getSearchedArtworks(query);
    //   if (response.status === 200) {
    //     console.log(response);
    //     dispatch(clearArtworks());
    //     dispatch(fetched(response.data.data));
    //   }
    // }
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
