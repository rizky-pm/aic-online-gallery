import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import './InputComponent.scss';

const InputComponent = () => {
  return (
    <Input
      prefix={<SearchOutlined className='input-search-component' />}
      placeholder='Search by artist, title, or keyword'
    />
  );
};

export default InputComponent;
