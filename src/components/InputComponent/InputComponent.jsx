import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import './InputComponent.scss';

const InputComponent = ({ rounded }) => {
  return (
    <Input
      prefix={<SearchOutlined className='input-search-component' />}
      className={`${rounded ? 'rounded' : ''}`}
      placeholder='Search by artist, title, or keyword'
    />
  );
};

export default InputComponent;
