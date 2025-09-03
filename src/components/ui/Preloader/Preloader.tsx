import { type FC } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './preloader.scss';

// /. imports

export const Preloader: FC = () => {
    return (
        <div className="preloader">
            <Spin
                indicator={
                    <LoadingOutlined
                        style={{ fontSize: 44 }}
                        spin
                    />
                }
            />
        </div>
    );
};
