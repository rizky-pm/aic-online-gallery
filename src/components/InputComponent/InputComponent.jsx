import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import './InputComponent.scss';

const InputComponent = ({ type }) => {
  return (
    <Input
      prefix={
        <SearchOutlined
          onClick={() => {
            console.log('Searching ...');
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
