import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './Spinner.scss';

const Spinner = (props) => {
    return <Spin className="loadingSpinner" indicator={<LoadingOutlined spin />} />
};

export default Spinner;