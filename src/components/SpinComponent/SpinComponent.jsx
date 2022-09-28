import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: '#fff',
    }}
    spin
  />
);

const SpinComponent = () => <Spin indicator={antIcon} />;

export default SpinComponent;
