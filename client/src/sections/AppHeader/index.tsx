import * as React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Viewer } from '../../lib/types';
import { MenuItems } from './components';

import home from './assets/home.png';

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;

export const AppHeader = ({viewer, setViewer }: Props) => {
    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo">
                    <Link to="/">
                        <img src={home} alt="App Logo"/>
                    </Link>
                </div>
            </div>
            <div className="app-header__menu-section">
                <MenuItems viewer={viewer} setViewer={setViewer}/>
            </div>
        </Header>
    )
}