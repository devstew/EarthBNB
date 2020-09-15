import * as React from 'react';
import { Divider, Skeleton, Alert } from 'antd';

import './styles/ListingsSkeleton.css';

interface Props {
    title: string;
    error?: boolean;
}

export const ListingsSkeleton = ({ title, error = false }: Props) => {
    const message = 'Uh oh! Something went wrong..';

    const errorAlert = error ?
        <Alert
            type='error'
            message={ message }
            className="listings-skeleton__alert"
        />
        : null;

    return (
        <div className="listings-skeleton">
            {errorAlert}
            <h2>{title}</h2>
            <Skeleton active paragraph={{ rows: 1 }}/>
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }}/>
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }}/>
        </div>
    );
};