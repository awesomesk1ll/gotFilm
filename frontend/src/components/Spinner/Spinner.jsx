import React from 'react';
import { Spin } from 'antd';

import './Spinner.scss';

const Spinner = (props) => {
    return <Spin className="loadingSpinner" />
};

export default Spinner;