import * as React from 'react';
import { Layout } from 'antd';

import home from './assets/home.png';

const { Header } = Layout;

export const AppHeaderSkeleton = () => {
    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo">
                    <img src={home} alt="App Logo"/>
                </div>
            </div>
        </Header>
    )
}