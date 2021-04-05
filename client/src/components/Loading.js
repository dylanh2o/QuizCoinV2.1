import React from 'react';
import { Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
const container = {
  weight: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

};


const Loading = () => (
<div style={container}>
  <Spin    indicator={antIcon} />
</div>
);


export default Loading;
